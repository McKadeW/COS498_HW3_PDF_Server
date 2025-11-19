const express = require('express');
const hbs = require('hbs');
const path = require('path');
const router = require("./modules/routes.js");
const app = express();
const PORT = process.env.PORT || 3012;

// Configure Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Forward everything to the router object
app.use("/", router);

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
