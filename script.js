// script.js

const canvas = document.getElementById('pdfCanvas');
const ctx = canvas.getContext('2d');
let pdfDoc = null;
let pageIndex = 0;

// Load PDF file
PDFDocument.load(fetch('policies.pdf'))
  .then(doc => {
    pdfDoc = doc;
    renderPage(pdfDoc, pageIndex + 1);
  })
  .catch(err => console.error('Error loading PDF:', err));

function renderPage(pdfDoc, pageNum) {
  const page = pdfDoc.getPage(pageNum);
  const viewport = page.getViewport({ scale: 1.5 });

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  page.render({
    canvasContext: ctx,
    viewport: viewport
  });
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveAnnotation() {
  const page = pdfDoc.getPage(pageIndex + 1);
  const canvasDataURL = canvas.toDataURL('image/png');

  // Embed the drawn image onto the PDF page
  PDFImage.createEmbedded(pdfDoc, canvasDataURL)
    .then(image => {
      page.drawImage(image, {
        x: 100,
        y: 100,
        width: image.width,
        height: image.height,
      });
    })
    .catch(err => console.error('Error embedding image:', err));
}

function downloadPDF() {
  // Save the PDF with annotations
  pdfDoc.saveAs('annotated_policies.pdf');
}
