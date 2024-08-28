// Function to add a new engineer field
function addEngineerField() {
  const container = document.getElementById('engineerGroupContainer');
  const newFieldGroup = document.createElement('div');
  newFieldGroup.className = 'engineer-group';

  const newTextArea = document.createElement('textarea');
  newTextArea.name = 'vendorEngineers[]';
  newTextArea.rows = 2;
  newTextArea.cols = 50;
  newTextArea.required = true;

  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.innerHTML = '-';
  removeButton.onclick = function() {
    container.removeChild(newFieldGroup);
  };

  newFieldGroup.appendChild(newTextArea);
  newFieldGroup.appendChild(removeButton);
  container.appendChild(newFieldGroup);
}

// Function to generate the PDF
function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const pageHeight = doc.internal.pageSize.height; // Page height
  let currentY = 10; // Initial Y position

  const addTextWithPageBreak = (text, x, y, options = {}) => {
    if (y + 10 > pageHeight) { // Check if the Y position will exceed the page height
      doc.addPage();
      y = 10; // Reset Y position for the new page
    }
    doc.text(text, x, y, options);
    return y + 10; // Return the new Y position after adding the text
  };

  // Function to draw each section, dynamically adding pages as needed
  const generateDocument = () => {
    // Vendor Information
    doc.setFillColor('#232f3e'); // Background color
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

    doc.setFontSize(16);
    doc.setTextColor('#ff9900'); // Orange color for titles
    currentY = addTextWithPageBreak('CDG70 VENDOR BRIEFING CHECKLISTS', 10, currentY);

    const vendorName = document.getElementById('vendorName').value;
    const equipment = document.getElementById('equipment').value;
    const mcmSimTNo = document.getElementById('mcmSimTNo').value;
    const jobDescription = document.getElementById('jobDescription').value;

    doc.setFontSize(12);
    doc.setTextColor('#ff9900');
    currentY = addTextWithPageBreak('Vendor Name:', 10, currentY);
    doc.setTextColor('#ffffff');
    currentY = addTextWithPageBreak(vendorName, 50, currentY);

    doc.setTextColor('#ff9900');
    currentY = addTextWithPageBreak('Equipment:', 10, currentY);
    doc.setTextColor('#ffffff');
    currentY = addTextWithPageBreak(equipment, 50, currentY);

    doc.setTextColor('#ff9900');
    currentY = addTextWithPageBreak('MCM/SIM-T No.:', 10, currentY);
    doc.setTextColor('#ffffff');
    currentY = addTextWithPageBreak(mcmSimTNo, 50, currentY);

    doc.setTextColor('#ff9900');
    currentY = addTextWithPageBreak('Job Description:', 10, currentY);
    doc.setTextColor('#ffffff');
    currentY = addTextWithPageBreak(jobDescription, 50, currentY);

    // Vendor/DCEO Engineer(s) section (placed right after Job Description)
    const engineerTextareas = document.getElementsByName('vendorEngineers[]');
    for (let i = 0; i < engineerTextareas.length; i++) {
      const engineerName = engineerTextareas[i].value.trim();
      if (engineerName !== '') {
        doc.setTextColor('#ff9900');
        currentY = addTextWithPageBreak(`Vendor/DCEO Engineer ${i + 1}:`, 10, currentY);
        doc.setTextColor('#ffffff');
        currentY = addTextWithPageBreak(engineerName, 70, currentY);
      }
    }

    // Briefing
    const dateOfVisit = document.getElementById('dateOfVisit').value;
    const preBrief = document.getElementById('preBrief').value;
    const postBrief = document.getElementById('postBrief').value;

    doc.setFontSize(12);
    doc.setTextColor('#ff9900');
    currentY = addTextWithPageBreak('Date of Visit:', 10, currentY);
    doc.setTextColor('#ffffff');
    currentY = addTextWithPageBreak(dateOfVisit, 50, currentY);

    doc.setTextColor('#ff9900');
    currentY = addTextWithPageBreak('Pre-Brief:', 10, currentY);
    doc.setTextColor('#ffffff');
    currentY = addTextWithPageBreak(preBrief, 50, currentY);

    doc.setTextColor('#ff9900');
    currentY = addTextWithPageBreak('Post-Brief:', 10, currentY);
    doc.setTextColor('#ffffff');
    currentY = addTextWithPageBreak(postBrief, 50, currentY);

    // Checklists
    const securityItems = document.querySelectorAll('input[name="security[]"]:checked');
    const safetyItems = document.querySelectorAll('input[name="safety[]"]:checked');
    const mcmProcessItems = document.querySelectorAll('input[name="mcmProcess[]"]:checked');
    const escalationProcessItems = document.querySelectorAll('input[name="escalationProcess[]"]:checked');

    doc.setFontSize(12);
    doc.setTextColor('#ff9900');
    currentY = addTextWithPageBreak('1. Security:', 10, currentY);
    securityItems.forEach((checkbox) => {
      doc.setTextColor('#ffffff');
      currentY = addTextWithPageBreak(`- ${checkbox.value}`, 20, currentY);
    });

    doc.setTextColor('#ff9900');
    currentY = addTextWithPageBreak('2. Safety:', 10, currentY);
    safetyItems.forEach((checkbox) => {
      doc.setTextColor('#ffffff');
      currentY = addTextWithPageBreak(`- ${checkbox.value}`, 20, currentY);
    });

    doc.setTextColor('#ff9900');
    currentY = addTextWithPageBreak('3. MCM Process/Workscopes:', 10, currentY);
    mcmProcessItems.forEach((checkbox) => {
      doc.setTextColor('#ffffff');
      currentY = addTextWithPageBreak(`- ${checkbox.value}`, 20, currentY);
    });

    doc.setTextColor('#ff9900');
    currentY = addTextWithPageBreak('4. Escalation Process:', 10, currentY);
    escalationProcessItems.forEach((checkbox) => {
      doc.setTextColor('#ffffff');
      currentY = addTextWithPageBreak(`- ${checkbox.value}`, 20, currentY);
    });

    // Signature
    const signatureFile = document.getElementById('signature').files[0];
    if (signatureFile) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const signatureDataURL = event.target.result;
        doc.addPage();
        const imgWidth = 50; // Adjust size as needed
        const imgHeight = 25; // Adjust size as needed
        doc.addImage(signatureDataURL, 'JPEG', 10, 10, imgWidth, imgHeight);
        doc.save('CDG70_Vendor_Briefing_Checklist.pdf');
      };
      reader.readAsDataURL(signatureFile);
    } else {
      doc.save('CDG70_Vendor_Briefing_Checklist.pdf');
    }
  };

  generateDocument();
}
