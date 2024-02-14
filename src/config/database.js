/**
 * @file database.js
 * @description Module for establishing database connection using Sequelize.
 * @module database
 */
const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");
const chalk = require("chalk");

// Destructuring to get specific chalk colors
const { red, green, yellow } = chalk;

// Load environment variables from .env file
dotenv.config();

/**
 * Sequelize instance for database connection.
 * @constant {Sequelize} sequelize
 */
const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "blog",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
});

/**
 * Function to establish connection to the database.
 * @async
 * @function connectToDb
 * @returns {Promise<void>}
 */
const connectToDb = async () => {
    try {
        await sequelize.authenticate();
        console.log(green("Connection has been established successfully."));
    } catch (error) {
        console.error(red("Unable to connect to the database:", error));
    }
};

module.exports = { sequelize, connectToDb };
