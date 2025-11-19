// A module to handle the application's routing

const express = require('express');

// Create the router
const router = express.Router();

// Home page
app.get('/', (req, res) => {
	return res.render('home');
});

module.exports = {
	router,
};
