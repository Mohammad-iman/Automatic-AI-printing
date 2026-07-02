// fileUtils.js
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function mergePDFs(filePaths) {
  const mergedPdf = await PDFDocument.create();

  for (const filePath of filePaths) {
    const pdfBytes = fs.readFileSync(filePath);
    const pdf = await PDFDocument.load(pdfBytes);
    
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedPdfBytes = await mergedPdf.save();
  
  const outputPath = './uploads/merged.pdf';
  fs.writeFileSync(outputPath, mergedPdfBytes);

  return outputPath;
}

module.exports = { mergePDFs };