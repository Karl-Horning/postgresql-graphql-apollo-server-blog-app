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
    Represents a post in the system.
    """
    type Post {
        """
        Unique identifier for the post.
        """
        postId: ID!

        """
        The title of the post.
        """
        title: String!

        """
        The content of the post.
        """
        content: String!

        """
        The date and time when the post was created.
        """
        createdAt: String!

        """
        The date and time when the post was last updated.
        """
        updatedAt: String!

        """
        The user that published a post.
        """
        author(authorId: Int): User!

        """
        The tags that belong to a published post
        """
        tags(postId: Int): [Tag!]
    }

    type Query {
        """
        Get all posts in the system.
        """
        posts: [Post!]!

        """
        Get one post in the system.
        """
        post(
            """
            The unique identifier of the post to retrieve.
            """
            postId: Int!
        ): Post!
    }
`;

module.exports = typeDefs;
