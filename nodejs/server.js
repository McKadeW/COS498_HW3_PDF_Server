const express = require('express');
const hbs = require('hbs');
const path = require('path');

// Import modules
const { router } = require("./modules/routes.js");
const { pdfMetadataList } = require('./modules/pdfDiscovery.js');
//const { validatePdfExists } = require('./modules/pdfValidation.js');

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
/*
// The route for PDF download, verified by module
app.get('/pdfs/:filename', (req, res) => {
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
    	res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
    
    	// Send the file
    	res.sendFile(filePath);
});
*/
// Start server
app.listen(PORT, '0.0.0.0', () => {
	console.log(`Server running on port ${PORT}`);
});
