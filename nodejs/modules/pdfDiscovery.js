// A series of functions that will search for available PDF docs
// within a certain folder, build a list of found documents, and 
// return the results.

const fs = require('fs');
const path = require('path');

// Find all of the PDFs in a directory and return
// a list with the pdfs and their metadata
function pdfMetadataList(fileDirectory, metadataPath){
	// Get all files in the directory
	const files = fs.readdirSync(fileDirectory);
	const pdfs = [];

	// Find all of the PDFs
	for (let i = 0; i < files.length; i++){
		if (files[i].endwith(".pdf")){
			pdf.push(files[i]);
		}
	}
	
	// Open the file metadata
	const metadata = fs.readFileSync(metadataPath, "utf8");
	const parsedMetadata = JSON.parse(metadata);

	// Holds an object: the pdf and its data
	const pdfWithData = [];

	// Map the metadata to the found PDFs
	for (let j = 0; j < pdfs.length; j++){
		// Check to see if the pdf has metadata
		if (parsedMetadata[pdfs[j]]){
			pdfWithData.push({
				pdfTitle: parsedMetadata[pdfs[j]].title, 
				pdfDescription: parsedMetadata[pdfs[j]].description
			});
		}
	}
	return pdfWithData;
}

module.exports = {
	pdfMetadataList
};

