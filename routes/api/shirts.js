var router = require('express').Router();
var { Shirt } = require('../../db/models/shirts')


// Get all shirts
router.get('/', async (req, res, next) => {
    try {
        const shirts = await Shirt.findAll();
        return res.json({shirts})
    } catch(err) {
        return res.status(401);
    }
})

// Get A Shirt By Id
router.get('/:shirtid', async (req, res, next) => {

    const { shirtid } = req.params;

    try {
        const shirt = await Shirt.find({
            where: {
                id: shirtid
            }
        })

        if (!shirt) {
            return res
            .status(400)
            .json("No shirt found for this id")
        }

        return res.json(shirt);
    } catch (err) {
        console.log(err);
    }
})


// Delete A Shirt By Id

// Update A Shirt By Id

//Create A New Shirt
router.post('/new', async (req, res, next) => {
    try {
        const {shirtName, description, price, imgURL } = req.body;

        console.log("MADE IT");
        console.log("REQ.BODY IS", req.body);

        if (!shirtName || !description || !price || !imgURL) {
            return res
            .status(400)
            .json("ShirtName, Description, Price, and ImageURL are all required")
        }

        const shirt = await Shirt.create(req.body);

        console.log("SHIRT IS ", shirt)

        return res.json(shirt)
    } catch(err) {
        return res.status(401)
    }
})

module.exports = router;