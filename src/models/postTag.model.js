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
    post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    // Unique identifier for each tag
    tag_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
},
{
    sequelize,
    modelName: "posts_tag",
    // Disable createdAt and updatedAt fields
    timestamps: false,
});

// Define the association between PostTag and Post models
PostTag.belongsTo(Post, { foreignKey: "post_id" });

// Define the association between PostTag and Tag models
PostTag.belongsTo(Tag, { foreignKey: "tag_id" });

module.exports = PostTag;
