const express = require('express');
const hbs = require('hbs');
const path = require('path');

// Import modules (validation module is imported in routes.js module)
const { router } = require("./modules/routes.js");
const { pdfMetadataList } = require('./modules/pdfDiscovery.js');

// App and Port Setup
const app = express();
const PORT = process.env.PORT || 3012;

// File/Data directories
const PDF_Dir = path.join(__dirname, 'pdfs');
const PDF_metadata = path.join(__dirname, 'data/metadata.json');

// Configure Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Get and send the PDFs and their metadata on call
// Pass along data and go to the next middleware
app.use((req, res, next) => {
    const pdfContent = pdfMetadataList(PDF_Dir, PDF_metadata);
    req.pdfData = {
        pdfs: pdfContent,
        pdfCount: pdfContent.length
    };
    next();
});

// Use the router middleware
app.use('/', router);

// Start server
app.listen(PORT, '0.0.0.0', () => {
	console.log(`Server running on port ${PORT}`);
});
