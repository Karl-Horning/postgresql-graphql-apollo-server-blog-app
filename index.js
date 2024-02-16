// Import necessary modules and packages
const dotenv = require("dotenv");
const chalk = require("chalk");
const { ApolloServer } = require("apollo-server");
const schema = require("./src/schemas");
const { Comment, Post, PostTag, Tag, User } = require("./src/models");

// Destructuring to get specific chalk colors
const { red, green, yellow } = chalk;

// Load environment variables from .env file
dotenv.config();

/**
 * Ensure that the PORT variable is provided in the .env file
 * @throws {Error} If PORT variable is not provided
 */
if (!process.env.PORT) {
    console.error(red("Please provide a PORT variable in the .env file."));
    process.exit(1);
}

/**
 * The port number for Apollo Server.
 * @type {number}
 */
const port = parseInt(process.env.PORT, 10) || 4000;

/**
 * The Apollo Server instance for serving GraphQL requests.
 * @type {ApolloServer}
 */
const server = new ApolloServer({
    schema, // Your resolver functions
    context: () => ({
        models: {
            Comment,
            Post,
            PostTag,
            Tag,
            User,
        },
    }),
    csrfPrevention: true,
    cache: "bounded",
    introspection: true,
});

/**
 * Starts the Apollo Server and listens on the specified port.
 * @function
 * @param {number} port - The port number to listen on.
 */
const startApolloServer = (port) => {
    server
        .listen({ port })
        .then(({ url }) => {
            console.log(`Apollo Server started at ${url} 🚀`);
        })
        .catch((error) => {
            console.error("Error starting Apollo Server:", error);
            if (error.code === "EADDRINUSE") {
                console.error(
                    `Port ${port} is already in use. Please choose another port.`
                );
            } else {
                console.error(`Unknown error during Apollo Server startup.`);
            }
            process.exit(1);
        });
};

/**
 * Handle SIGINT for graceful shutdown.
 * @event
 */
process.on("SIGINT", async () => {
    try {
        console.log(yellow("Received SIGINT. Closing Apollo Server..."));
        await server.stop();
        console.log(green("Apollo Server closed."));
        process.exit(0);
    } catch (error) {
        console.error(red("Error during graceful shutdown:", error));
        process.exit(1);
    }
});

// Start Apollo Server on the specified port.
startApolloServer(port);
