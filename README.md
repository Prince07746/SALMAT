Here’s an updated version of the README for your SALMAT project with added details about the structure, technologies used, and pages:

---

# SALMAT - Support the Future of Children in the DRC

**SALMAT** aims to provide essential support to children and families in the Democratic Republic of Congo (DRC). This project focuses on vulnerable communities in North Kivu, South Kivu, and Kalemie, supporting them through education, medical aid, school supplies, and financial assistance to build a brighter future.

## Technologies Used

- **Node.js** - Server-side JavaScript framework
- **EJS** - Templating engine for dynamic HTML pages
- **CSS/SCSS** - For styling and responsive design
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database (if used)
- **Passport.js** - Authentication middleware (if applicable)
- **dotenv** - For managing environment variables

## Project Structure

```
/SALMAT
│
├── /public
│   ├── /styles          # CSS/SCSS files
│   └── /images          # Image assets
│
├── /views               # EJS templates for rendering pages
│   ├── home.ejs         # Home page template
│   ├── about.ejs        # About page template
│   └── contact.ejs      # Contact page template
│
├── /routes              # Express routes for different pages
│   ├── index.js         # Handles routing for home page
│   └── about.js         # Handles routing for about page
│
├── /models              # Database models (if using MongoDB)
│
├── /controllers         # Application logic
│   ├── homeController.js
│   └── aboutController.js
│
├── /config              # Configuration files
│   └── keys.js          # For storing environment keys
│
├── server.js            # Main server file to start the app
└── package.json         # Project metadata and dependencies
```

## Pages

- **Home Page** - Introduction to the project and its mission.
- **About Page** - Information about the organization's work in the DRC.
- **Contact Page** - A form to get in touch with the organization.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Prince07746/SALMAT.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

4. Visit the app at [http://localhost:3000](http://localhost:3000)

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests to help us enhance the project.

## License

This project is licensed under the MIT License.

---

You can adjust the structure and details as needed based on your project’s specific contents.
