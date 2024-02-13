const { gql } = require("apollo-server");

const typeDefs = gql`
    type Query {
        """
        Test query
        """
        hello: String!
    }
`;

module.exports = typeDefs;
