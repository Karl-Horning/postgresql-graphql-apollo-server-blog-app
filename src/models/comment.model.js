/**
 * @file comment.model.js
 * @description Module for defining the Sequelize Comment model and its associations.
 * @module comment.model
 */

const { sequelize } = require("../config/database");
const { DataTypes, Model } = require("sequelize");

// Add required models
const Post = require("./post.model");
const User = require("./user.model");

/**
 * Represents a Comment on a Post by a User.
 * @class
 * @extends Model
 */
class Comment extends Model {}

// Initialize the Comment model with its attributes and options
Comment.init(
    {
        // Unique identifier for each comment
        commentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: "comment_id",
        },
        // ID of the post to which the comment belongs
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Post",
                key: "post_id",
            },
            field: "post_id",
        },
        // ID of the user who authored the comment
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "User",
                key: "user_id",
            },
            field: "author_id",
        },
        // Content of the comment
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: "Content of the comment",
        },
        // Timestamp for when the comment was created
        createdAt: {
            type: DataTypes.DATE,
            field: "created_at",
            allowNull: false,
        },
        // Timestamp for when the comment was last updated
        updatedAt: {
            type: DataTypes.DATE,
            field: "updated_at",
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "comment",
    }
);

// Define the association between Comment and Post models
Comment.belongsTo(Post, { foreignKey: "postId", as: "post" });

// Define the association between Comment and User models
Comment.belongsTo(User, { foreignKey: "authorId", as: "author" });

module.exports = Comment;
