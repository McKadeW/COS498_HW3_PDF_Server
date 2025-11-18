// A module that checks to see if a requested PDF exists
// within its specified folder, if not, return 404 error

const fs = require('fs');
const path = require('path');

function validatePdfExists(pdfDirectory, file){
	// Create the file path to check
	const filePath = path.join(pdfDirectory, file);

	if (fs.existsSync(filePath)){
		return 200;
	}
	else{
		return 404;
	}
}

module.exports = {
	validatePdfExists
};
