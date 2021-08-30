var router = require('express').Router();
var { User } = require('../../db/models');
var jwt = require('jsonwebtoken');

// Register a User
router.post('/register', async (req, res, next) => {

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
router.delete('/logout', (req, res, next) => {
  res.sendStatus(204);
});

router.get('/user', (req, res, next) => {
  if (req.user) {
    return res.json(req.user);
  } else {
    return res.json({});
  }
});

module.exports = router;
