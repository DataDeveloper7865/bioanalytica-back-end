const Sequelize = require('sequelize');
const db = require('../db');
const crptyo = require('crypto');
const { use } = require('../../routes/users');

const User = db.define('user', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        validate: {
            min: 6
        },
        allowNull: false,
        get() {
            return () => this.getDataValue('password');
        }
    },
    salt: {
        type: Sequelize.STRING,
        get() {
            return () => this.getDataValue('salt');
        }
    }
});

User.prototype.correctPassword = function (password) {
    return User.encryptPassword
};

User.createSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainPassword, salt) {
    return crypto.createHash('RSA-SHA256').update(plainPassword).update(salt).digest('hex');
};

const setSaltAndPassword = (user) => {
    if(user.changed('password')) {
        user.salt = User.createSalt();
        user.password = User.encryptPassword(user.password(), user.salt());
    }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate((users) => {
    users.forEach(setSaltAndPassword);
});

module.exports = User;