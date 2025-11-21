// A module to handle the application's routing
// This also imports the validation module so that it can handle
// the route that will download the PDF files (when selected by user)

const express = require('express');
const path = require('path');
const fs = require('fs');

// Import modules and get the directory holding the PDFs
const { validatePdfExists } = require('./pdfValidation.js');
const PDF_Dir = path.join(__dirname, '..', 'pdfs');

// Create the router
const router = express.Router();

// Home page (send it the # of PDFs to display)
router.get('/', (req, res) => {
	return res.render('home', {
		PDF_Count: req.pdfData.pdfCount
	});
});

// Page to display PDFs (send it the PDF data to display PDFs & metadata)
router.get('/pdfs', (req, res) => {
	return res.render('pdfs', {
		PDF_Content: req.pdfData.pdfs
	});
});

// The route for PDF download, uses validation module before serving
router.get('/pdfs/:filename', (req, res) => {
        const fileName = req.params.filename;

        // Validate the PDF exists (1 = It does, 0 = It doesn't)
        const validate = validatePdfExists(PDF_Dir, fileName);

        if (!validate) {
                return res.status(404).send('PDF not found');
        }

        // Build the file path
        const filePath = path.join(PDF_Dir, fileName);

        // Get file stats
        const stats = fs.statSync(filePath);
        const fileSize = stats.size;

        // Tell client what type of data
        res.setHeader('Content-Type', 'application/pdf');
        // Tell client the file size
        res.setHeader('Content-Length', fileSize);
        // Show the client the file name
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

        // Send the file
        res.sendFile(filePath);
});

// Handles non-existent pages 404
router.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
});

module.exports = {
	router
};
