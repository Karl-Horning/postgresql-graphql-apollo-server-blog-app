/**
 * @file postTag.model.js
 * @description Module for defining the Sequelize PostTag model and its associations.
 * @module PostTag.model
 */

const { sequelize } = require("../config/database");
const { DataTypes, Model } = require("sequelize");

// Add required models
const Post = require("./post.model");
const Tag = require("./tag.model");

/**
 * Define the PostTag model.
 * @class
 * @extends Model
 */
class PostTag extends Model {}

// Initialize the PostTag model with its attributes and options
PostTag.init({
    // Unique identifier for each post
    postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: "post_id",
    },
    // Unique identifier for each tag
    tagId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: "tag_id",
    },
},
{
    sequelize,
    modelName: "posts_tag",
    // Disable createdAt and updatedAt fields
    timestamps: false,
});

// Define the association between PostTag and Post models
PostTag.belongsTo(Post, { foreignKey: "postId" });

// Define the association between PostTag and Tag models
PostTag.belongsTo(Tag, { foreignKey: "tagId" });

module.exports = PostTag;
