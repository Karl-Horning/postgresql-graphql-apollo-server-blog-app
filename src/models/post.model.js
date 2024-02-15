/**
 * @file post.model.js
 * @description Module for defining the Sequelize Post model and its associations.
 * @module post.model
 */
const { sequelize } = require("../config/database");
const { DataTypes, Model } = require("sequelize");

// Add required model
const User = require("./user.model");

/**
 * Define the Post model.
 * @class
 * @extends Model
 */
class Post extends Model {}

// Initialize the Post model with its attributes and options
Post.init(
    {
        // Unique identifier for each post
        postId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: "post_id",
        },
        // Title of the post
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Content of the post
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // ID of the user who authored the post
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "User",
                key: "user_id",
            },
        },
        // Timestamp for when the post was created
        createdAt: {
            type: DataTypes.DATE,
            field: "created_at",
            allowNull: false,
        },
        // Timestamp for when the post was last updated
        updatedAt: {
            type: DataTypes.DATE,
            field: "updated_at",
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "post",
    }
);

// Define the association between Post and User models
Post.belongsTo(User, { foreignKey: "authorId" });

module.exports = Post;
