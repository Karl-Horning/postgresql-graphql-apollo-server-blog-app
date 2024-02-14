/**
 * Helper to format timestamps.
 * @module time.helper
 */

const moment = require("moment");

/**
 * Function to format timestamps to a human-readable format.
 * @param {Date} timestamp The timestamp to format.
 * @returns {string} The formatted timestamp string.
 * @example const user = { createdAt: new Date(), updatedAt: new Date() };
console.log(formatTimestamp(user.createdAt)); // Format createdAt timestamp
console.log(formatTimestamp(user.updatedAt)); // Format updatedAt timestamp
 */
const formatTimestamp = (timestamp) =>
    moment(timestamp).format("YYYY-MM-DD HH:mm:ss");

module.exports = { formatTimestamp };
