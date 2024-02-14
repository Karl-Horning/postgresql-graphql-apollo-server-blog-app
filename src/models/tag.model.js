/**
 * @file tag.model.js
 * @description Module for defining the Sequelize Tag model.
 * @module tag.model
 */

const { sequelize } = require("../config/database");
const { DataTypes, Model } = require("sequelize");

/**
 * Represents a Tag for a Post.
 * @class
 * @extends Model
 */
class Tag extends Model {}

// Initialize the Tag model with its attributes and options
Tag.init(
    {
        // Unique identifier for each tag
        tag_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        // Name of the tag
        tag_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "tag",
        // Disable createdAt and updatedAt fields
        timestamps: false,
    }
);

module.exports = Tag;
