/**
 * GraphQL schema definition using Apollo Server's gql tag.
 * @module typeDefs
 */

const { gql } = require("apollo-server");

/**
 * GraphQL schema definition.
 * @type {string}
 */
const typeDefs = gql`
    """
    Represents a tag in the system.
    """
    type Tag {
        """
        Unique identifier for the tag.
        """
        tagId: ID!

        """
        The name of the tag.
        """
        tagName: String!
    }

    type Query {
        """
        Get all tags in the system.
        """
        tags: [Tag!]!
    }
`;

module.exports = typeDefs;
