var router = require('express').Router();
var { User } = require('../../db/models/');
var jwt = require('jsonwebtoken');

// Register a User
router.post('/register', async (req, res, next) => {
  try {
    //grab username and password from req.body;
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res
      .status(400)
      .json({ error: "Username, password, and email required"})
    }

    if (password.length < 6) {
      return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });
    }

    const user = await User.create(req.body);

    const token = jwt.sign(
      { id: user.dataValues.id },
      process.env.SESSION_SECRET,
      { expiresIn: 86400 }
    );
    res.json({
      ...user.dataValues,
      token,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(401).json({ error: "User already exists" });
    } else if (error.name === "SequelizeValidationError") {
      return res.status(401).json({ error: "Validation error"});
    } else {
      next(error);
    }
  }
});

// Login a User
router.post('/login', async (req, res, next) => {
  try {
   //must have usernmae and password in the req.body
   const { username, password } = req.body;
   if (!username || !password) 
     return res.status(400).json({ error: "Username and password required" });


     const user = await User.findOne({
       where: {
         username: req.body.username,
       },
     });

     if (!user) {
       console.log({ error: `No user found for username: ${username}`});
       res.sendStatus(401).json({ error: "Wrong username and/or password" });
     } else if (!user.correctPassword(password)) {
       console.log({ error: "Wrong username and/or password" });
       res.status(401).json({ error: "Wrong username and/or password" });
     } else {
       const token = jwt.sign(
         { id: user.dataValues.id },
         process.env.SESSION_SECRET,
         { expiresIn: 86400 }
       );
       res.json({
         ...user.dataValues,
         token,
       });
     }
   } catch (error) {
    next(error);
  }
});

// Logout a User
// TODO: Finish Logout functionality
router.delete('/logout', (req, res, next) => {
  res.sendStatus(204);
});


// Get a User
// TODO: Finish Logout functionality
router.get('/user', (req, res, next) => {
  console.log(req.user)
  if (req.user) {
    return res.json(req.user);
  } else {
    return res.json({});
  }
});

module.exports = router;
