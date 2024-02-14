/**
 * Resolvers for GraphQL queries.
 * @module resolvers
 */

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
         * @async
         * @param {Object} _ - The parent object (not used).
         * @param {Object} __ - The arguments object (not used).
         * @param {Object} context - The context object containing models.
         * @returns {Array} An array of user objects.
         * @throws {Error} If there is an error fetching users.
         */
        users: async (_, __, { models }) => {
            try {
                // Retrieve all users from the database
                const users = await models.User.findAll();
                // Convert Sequelize model instances to plain JavaScript objects
                return users.map((user) => ({
                    ...user.get({ plain: true }),
                    // Format createdAt timestamp
                    createdAt: moment(user.createdAt).format(
                        "YYYY-MM-DD HH:mm:ss"
                    ),
                    // Format updatedAt timestamp
                    updatedAt: moment(user.updatedAt).format(
                        "YYYY-MM-DD HH:mm:ss"
                    ),
                }));
            } catch (error) {
                console.error("Error fetching users:", error);
                throw error;
            }
        },
    },
};

module.exports = resolvers;
