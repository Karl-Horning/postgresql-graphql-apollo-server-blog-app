/**
 * Creates an executable GraphQL schema.
 * @module schemas
 */

const { makeExecutableSchema } = require("@graphql-tools/schema");

// Import GraphQL schema definitions for queries
const tagSchema = require("./tag.schema");
const userSchema = require("./user.schema");
// Import resolvers to resolve queries
const resolvers = require("../resolvers");

/**
 * Creates an executable GraphQL schema using provided type definitions and resolvers.
 * @returns {Object} Executable GraphQL schema.
 */
const schema = makeExecutableSchema({
    typeDefs: [tagSchema, userSchema],
    resolvers,
});

module.exports = schema;
