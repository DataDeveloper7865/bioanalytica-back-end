const db = require('./db');
const { User } = require('./models');
const { Shirt } = require('./models/shirts');
require('dotenv').config();

async function seed() {
    await db.sync({ force: true });
    console.log("Database now synced!");

    const user1 = await User.create({
        username: "user1",
        email: "user1@gmail.com",
        password: "password1",
    });

    const user2 = await User.create({
        username: "user2",
        email: "user2@gmail.com",
        password: "password2",
    });

    const user3 = await User.create({
        username: "user3",
        email: "user3@gmail.com",
        password: "password3",
    });

    const user4 = await User.create({
        username: "user4",
        email: "user4@gmail.com",
        password: "password4",
    });

    const shirt1 = await Shirt.create({
        shirtName: "shirt1",
        description: "A super cool shirt 1",
        price: "password3",
        imgURL: "https://m.media-amazon.com/images/I/51zLZbEVSTL._AC_SL1200_.jpg"
    });

    const shirt2 = await Shirt.create({
        shirtName: "user3",
        description: "user3@gmail.com",
        price: "password3",
        imgURL: "https://m.media-amazon.com/images/I/51zLZbEVSTL._AC_SL1200_.jpg"
    });


    console.log("seeded the Users");
}

async function runSeed() {
    console.log("Seeding the database now...");
    try {
        await seed();
    } catch (err) {
        console.log(`HOST NAME IS: , ${process.env.DB_HOST}`)
        console.log(err);
        process.exitCode = 1;
    } finally {
        console.log("closing the connection to the database");
        await db.close();
        console.log("Database connection now closed.");
    }
}

if (module === require.main) {
    runSeed();
}