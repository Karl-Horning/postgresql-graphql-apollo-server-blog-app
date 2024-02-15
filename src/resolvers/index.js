/**
 * Module exporting an array of resolvers.
 * @module resolvers
 */

// Import resolvers
const postResolver = require("./post.resolver");
const tagResolver = require("./tag.resolver");
const userResolver = require("./user.resolver");

/**
 * Array containing GraphQL resolvers.
 * @type {Array}
 */
module.exports = [postResolver, tagResolver, userResolver];
