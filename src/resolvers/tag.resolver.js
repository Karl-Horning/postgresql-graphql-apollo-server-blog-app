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
         * @returns {Array} An array of tag objects.
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

        /**
         * Resolver function for the "tag" query.
         * Retrieves a specific tag from the database.
         * @async
         * @param {Object} _ - The parent object (not used).
         * @param {Object} args - The arguments object containing the tag ID.
         * @param {number} args.tagId - The ID of the tag to retrieve.
         * @param {Object} context - The context object containing models.
         * @returns {Object} The tag object.
         * @throws {Error} If there is an error fetching the tag.
         */
        tag: async (_, args, { models }) => {
            try {
                // Retrieve a tag from the database
                const tag = await models.Tag.findByPk(args.tagId);
                return {
                    // Convert Sequelize model instance to plain JavaScript object
                    ...tag.get({ plain: true }),
                };
            } catch (error) {
                console.error("Error fetching tag:", error);
                throw error;
            }
        },
    },
};

module.exports = resolvers;
