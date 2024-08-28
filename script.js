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

  let currentY = 20; // Initial vertical position

  const addTextWithPageBreak = (text, margin, yPos) => {
    doc.text(text, 10, yPos);
    const textHeight = doc.getTextDimensions(text).h;
    if (yPos + textHeight > doc.internal.pageSize.height - 20) {
      doc.addPage();
      return 20; // Reset Y position after adding a new page
    }
    return yPos + textHeight + margin;
  };

  // Collect form data
  const form = document.getElementById('infoForm');
  const formData = new FormData(form);

  // Extract Vendor Information
  const vendorName = formData.get('vendorName');
  const equipment = formData.get('equipment');
  const mcmSimTNo = formData.get('mcmSimTNo');
  const jobDescription = formData.get('jobDescription');
  const dateOfVisit = formData.get('dateOfVisit');
  const preBrief = formData.get('preBrief');
  const postBrief = formData.get('postBrief');

  doc.setFontSize(12);

  doc.setTextColor('#ff9900');
  currentY = addTextWithPageBreak(`Vendor Name: ${vendorName}`, 10, currentY);
  currentY = addTextWithPageBreak(`Equipment: ${equipment}`, 10, currentY);
  currentY = addTextWithPageBreak(`MCM/SIM-T No.: ${mcmSimTNo}`, 10, currentY);
  currentY = addTextWithPageBreak(`Job Description: ${jobDescription}`, 10, currentY);
  currentY = addTextWithPageBreak(`Date of Visit: ${dateOfVisit}`, 10, currentY);

  // Add Vendor/DCEO Engineers
  const engineers = document.querySelectorAll('textarea[name="vendorEngineers[]"]');
  doc.setTextColor('#ff9900');
  currentY = addTextWithPageBreak('Vendor/DCEO Engineer(s):', 10, currentY);
  doc.setTextColor('#ffffff');
  engineers.forEach(engineer => {
    currentY = addTextWithPageBreak(`- ${engineer.value}`, 20, currentY);
  });

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
}
