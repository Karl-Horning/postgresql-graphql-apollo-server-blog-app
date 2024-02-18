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
    Represents a comment in the system.
    """
    type Comment {
        """
        Unique identifier for the comment.
        """
        commentId: Int!

        """
        The post that the comment belongs to.
        """
        postId: Int!

        """
        The user that published a comment.
        """
        authorId: Int!

        """
        The content of the comment.
        """
        content: String!

        """
        The date and time when the comment was created.
        """
        createdAt: String!

        """
        The date and time when the comment was last updated.
        """
        updatedAt: String!
    } 
`;

module.exports = typeDefs;
