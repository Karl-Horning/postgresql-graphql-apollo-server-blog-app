/**
 * Resolvers for GraphQL queries.
 * @module resolvers
 */

const { User } = require("../models");
const moment = require("moment");

/**
 * GraphQL resolvers.
 * @type {Object}
 */
const resolvers = {
    Query: {
        /**
         * Resolver function for the "hello" query.
         * @returns {string} The string "World!"
         */
        hello: () => "World!",

        /**
         * Resolver function for the "users" query.
         * Retrieves all users from the database.
         * @returns {Array} An array of user objects.
         * @throws {Error} If there is an error fetching users.
         */
        users: async () => {
            try {
                // Retrieve all users from the database
                const users = await User.findAll();
                // Convert Sequelize model instances to plain JavaScript objects
                return users.map((user) => ({
                    ...user.get({ plain: true }),
                    createdAt: moment(user.createdAt).format(
                        "YYYY-MM-DD HH:mm:ss"
                    ), // Format createdAt timestamp
                    updatedAt: moment(user.updatedAt).format(
                        "YYYY-MM-DD HH:mm:ss"
                    ), // Format updatedAt timestamp
                }));
            } catch (error) {
                console.error("Error fetching users:", error);
                throw error;
            }
        },
    },
};

module.exports = resolvers;
