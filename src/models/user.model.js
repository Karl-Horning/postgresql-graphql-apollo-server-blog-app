/**
 * @file user.model.js
 * @description Module for defining the Sequelize User model.
 * @module user.model
 */
const { sequelize } = require("../config/database");
const { DataTypes, Model } = require("sequelize");

/**
 * Define the User model.
 * @class
 * @extends Model
 */
class User extends Model {}

// Initialize the User model with its attributes and options
User.init(
    {
        // Unique identifier for each user
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: "user_id",
        },
        // Username of the user
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Email address of the user
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Hashed password of the user
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "password_hash",
        },
        // Timestamp for when the user was created
        createdAt: {
            type: DataTypes.DATE,
            field: "created_at",
            allowNull: false,
        },
        // Timestamp for when the user was last updated
        updatedAt: {
            type: DataTypes.DATE,
            field: "updated_at",
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "user",
    }
);

module.exports = User;
