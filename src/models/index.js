/**
 * @file index.js
 * @description Module for exporting Sequelize model definitions.
 * @module models
 */

// Import Sequelize model definitions
const Comment = require("./comment.model");
const Post = require("./post.model");
const PostTag = require("./postTag.model");
const Tag = require("./tag.model");
const User = require("./user.model");

// Export Sequelize model definitions
module.exports = { Comment, Post, PostTag, Tag, User };
