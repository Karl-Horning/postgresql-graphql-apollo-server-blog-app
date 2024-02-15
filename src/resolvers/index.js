/**
 * Module exporting an array of resolvers.
 * @module resolvers
 */

// Import user resolver
const userResolver = require("./user.resolver");

/**
 * Array containing GraphQL resolvers.
 * @type {Array}
 */
module.exports = [userResolver];
