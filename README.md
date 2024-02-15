# PostgreSQL, GraphQL, and Apollo Server Blog App

This project is a blog application built using PostgreSQL, GraphQL, and Apollo Server.

## Setting Up Development Environment

To set up your development environment, follow these steps:

1. **Create `.vscode` Folder:** Create a `.vscode` folder in the root of the project.

2. **Create `launch.json` File:** Inside the `.vscode` folder, create a `launch.json` file.

3. **Configure Launch Settings:** Add the following configuration to your `launch.json` file:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Run dev script with nodemon",
            "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/nodemon",
            "program": "${workspaceFolder}/index.js",
            "restart": true,
            "console": "integratedTerminal"
        }
    ]
}
```

This configuration allows you to run the development script using nodemon, which automatically restarts the server when changes are detected.

## Running the Application

To run the application, simply execute the development script. Changes to your code will be automatically reflected as the server restarts.

```bash
npm run dev
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Author

**Karl Horning:**
- [Portfolio](https://karl-horning.github.io)
- [GitHub](https://github.com/Karl-Horning/)
- [LinkedIn](https://www.linkedin.com/in/karl-horning/)
- [CodePen](https://codepen.io/karlhorning)