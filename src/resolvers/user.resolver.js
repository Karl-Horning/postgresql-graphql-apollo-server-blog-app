/**
 * Resolvers for GraphQL queries.
 * @module resolvers
 */

const { formatTimestamp } = require("../helpers/time.helper");

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
                    createdAt: formatTimestamp(user.createdAt),
                    // Format updatedAt timestamp
                    updatedAt: formatTimestamp(user.updatedAt),
                }));
            } catch (error) {
                console.error("Error fetching users:", error);
                throw error;
            }
        },

        /**
         * Resolver function for the "user" query.
         * Retrieves a specific user from the database.
         * @async
         * @param {Object} _ - The parent object (not used).
         * @param {Object} args - The arguments object containing the user ID.
         * @param {number} args.userId - The ID of the user to retrieve.
         * @param {Object} context - The context object containing models.
         * @returns {Object} The user object.
         * @throws {Error} If there is an error fetching the user.
         */
        user: async (_, args, { models }) => {
            try {
                // Retrieve a user from the database
                const user = await models.User.findByPk(args.userId);
                return {
                    // Convert Sequelize model instance to plain JavaScript object
                    ...user.get({ plain: true }),
                    // Format createdAt timestamp
                    createdAt: formatTimestamp(user.createdAt),
                    // Format updatedAt timestamp
                    updatedAt: formatTimestamp(user.updatedAt),
                };
            } catch (error) {
                console.error("Error fetching user:", error);
                throw error;
            }
        },
    },

    /**
     * Resolver function for the "posts" child query for "user".
     * Retrieves all posts from the database.
     * @async
     * @param {Object} parent - The parent object containing the author's ID.
     * @param {Object} _ - The arguments object (not used).
     * @param {Object} context - The context object containing models.
     * @returns {Array} An array of post objects.
     * @throws {Error} If there is an error fetching posts.
     */
    User: {
        posts: async (parent, _, { models }) => {
            try {
                // Retrieve all posts from the database
                const posts = await models.Post.findAll({
                    where: {
                        authorId: parent.userId,
                    },
                });
                // Convert Sequelize model instances to plain JavaScript objects
                return posts.map((post) => ({
                    ...post.get({ plain: true }),
                    // Format createdAt timestamp
                    createdAt: formatTimestamp(post.createdAt),
                    // Format updatedAt timestamp
                    updatedAt: formatTimestamp(post.updatedAt),
                }));
            } catch (error) {
                console.error("Error fetching posts:", error);
                throw error;
            }
        },
    },
};

module.exports = resolvers;
