const db = require('./db');
const { User } = require('./models');

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

    console.log("seeded the Users");
}

async function runSeed() {
    console.log("Seeding the database now...");
    try {
        await seed();
    } catch (err) {
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