/**
 * Resolvers for GraphQL queries.
 * @module resolvers
 */

const { QueryTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const { formatTimestamp } = require("../helpers/time.helper");

/**
 * GraphQL resolvers.
 * @type {Object}
 */
const resolvers = {
    Query: {
        /**
         * Resolver function for the "posts" query.
         * Retrieves all posts from the database.
         * @async
         * @param {Object} _ - The parent object (not used).
         * @param {Object} __ - The arguments object (not used).
         * @param {Object} context - The context object containing models.
         * @returns {Array} An array of post objects.
         * @throws {Error} If there is an error fetching posts.
         */
        posts: async (_, __, { models }) => {
            try {
                // Retrieve all posts from the database
                const posts = await models.Post.findAll();
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

        /**
         * Resolver function for the "post" query.
         * Retrieves a specific post from the database.
         * @async
         * @param {Object} _ - The parent object (not used).
         * @param {Object} args - The arguments object containing the post ID.
         * @param {number} args.postId - The ID of the post to retrieve.
         * @param {Object} context - The context object containing models.
         * @returns {Object} The post object.
         * @throws {Error} If there is an error fetching the post.
         */
        post: async (_, args, { models }) => {
            try {
                // Retrieve a post from the database
                const post = await models.Post.findByPk(args.postId);
                return {
                    // Convert Sequelize model instance to plain JavaScript object
                    ...post.get({ plain: true }),
                    // Format createdAt timestamp
                    createdAt: formatTimestamp(post.createdAt),
                    // Format updatedAt timestamp
                    updatedAt: formatTimestamp(post.updatedAt),
                };
            } catch (error) {
                console.error("Error fetching post:", error);
                throw error;
            }
        },
    },

    Post: {
        /**
         * Resolver function for the "author" query for "post".
         * Retrieves a specific user from the database.
         * @async
         * @param {Object} parent - The parent object containing the author's ID.
         * @param {Object} _ - The arguments object (not used).
         * @param {Object} context - The context object containing models.
         * @returns {Object} The user object.
         * @throws {Error} If there is an error fetching the user.
         */
        author: async (parent, _, { models }) => {
            try {
                // Retrieve a user from the database
                const user = await models.User.findByPk(parent.authorId);
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

        /**
         * Resolver function for the "tags" query.
         * Retrieves all tags from the database.
         * @async
         * @param {Object} parent - The parent object containing the post's ID.
         * @returns {Array} An array of tag objects.
         * @throws {Error} If there is an error fetching tags.
         */
        tags: async (parent) => {
            try {
                const sqlQuery = `
                SELECT
                    *
                FROM
                    get_tags_for_post(:postId);
                `;

                const result = await sequelize.query(sqlQuery, {
                    replacements: { postId: parent.postId },
                    type: QueryTypes.SELECT,
                });

                return result;
            } catch (error) {
                console.error("Error fetching tags:", error);
                throw error;
            }
        },
    },
};

module.exports = resolvers;
