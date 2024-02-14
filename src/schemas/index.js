const { makeExecutableSchema } = require("@graphql-tools/schema");

const queries = require("./queries.schema");
const resolvers = require("../resolvers");

const schema = makeExecutableSchema({
    typeDefs: queries,
    resolvers,
});

module.exports = schema;
