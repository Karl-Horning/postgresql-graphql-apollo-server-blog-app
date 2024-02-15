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
    Represents a user in the system.
    """
    type User {
        """
        Unique identifier for the user.
        """
        userId: ID!

        """
        The username of the user.
        """
        username: String!

        """
        The email address of the user.
        """
        email: String!

        """
        The hashed password of the user.
        """
        passwordHash: String!

        """
        The date and time when the user was created.
        """
        createdAt: String!

        """
        The date and time when the user was last updated.
        """
        updatedAt: String!
    }

    type Query {
        """
        A test query to check if the server is running.
        """
        hello: String!

        """
        Get all users in the system.
        """
        users: [User!]!

        """
        Get one user in the system.
        """
        user(userId: Int!): User!
    }
`;

module.exports = typeDefs;
