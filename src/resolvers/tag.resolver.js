/**
 * Resolvers for GraphQL queries.
 * @module resolvers
 */

/**
 * GraphQL resolvers.
 * @type {Object}
 */
const resolvers = {
    Query: {
        /**
         * Resolver function for the "tags" query.
         * Retrieves all tags from the database.
         * @async
         * @param {Object} _ - The parent object (not used).
         * @param {Object} __ - The arguments object (not used).
         * @param {Object} context - The context object containing models.
         * @returns {Array} An array of user objects.
         * @throws {Error} If there is an error fetching tags.
         */
        tags: async (_, __, { models }) => {
            try {
                // Retrieve all tags from the database
                const tags = await models.Tag.findAll();
                // Convert Sequelize model instances to plain JavaScript objects
                return tags.map((tag) => ({
                    ...tag.get({ plain: true }),
                }));
            } catch (error) {
                console.error("Error fetching tags:", error);
                throw error;
            }
        },
    },
};

module.exports = resolvers;
