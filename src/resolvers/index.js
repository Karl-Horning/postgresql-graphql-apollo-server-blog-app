/**
 * Module exporting an array of resolvers.
 * @module resolvers
 */

// Import resolvers
const tagResolver = require("./tag.resolver");
const userResolver = require("./user.resolver");

/**
 * Array containing GraphQL resolvers.
 * @type {Array}
 */
module.exports = [tagResolver, userResolver];
