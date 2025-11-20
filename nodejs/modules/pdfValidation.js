// A module that checks to see if a requested PDF exists
// within its specified folder, if not, return 404 error

const fs = require('fs');
const path = require('path');

function validatePdfExists(pdfDirectory, file){
	// Create the file path to check
	const filePath = path.join(pdfDirectory, file);

	// See if it exists on path
	if (fs.existsSync(filePath)){
		return 1;
	}

	return 0;
}

module.exports = {
	validatePdfExists
};
