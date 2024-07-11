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

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const vendorName = document.getElementById('vendorName').value;
  const equipment = document.getElementById('equipment').value;
  const mcmSimTNo = document.getElementById('mcmSimTNo').value;
  const jobDescription = document.getElementById('jobDescription').value;
  const engineerTextareas = document.getElementsByName('vendorEngineers[]');
  const dateOfVisit = document.getElementById('dateOfVisit').value;
  const preBrief = document.getElementById('preBrief').value;
  const postBrief = document.getElementById('postBrief').value;

  // Handling signature photo upload
  const signatureFile = document.getElementById('signature').files[0];
  let signatureDataURL = '';

  if (signatureFile) {
    const reader = new FileReader();
    reader.onload = function(event) {
      signatureDataURL = event.target.result;

      // Set background color
      doc.setFillColor('#232f3e'); // Background color
      doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

      // Add other text and checkboxes to the PDF
      doc.setFontSize(16);
      doc.setTextColor('#ff9900'); // Orange color for titles
      doc.text('CDG70 VENDOR BRIEFING CHECKLISTS', 10, 10);

      doc.setFontSize(12);
      doc.setTextColor('#ff9900');
      doc.text('Vendor Name:', 10, 20);
      doc.setTextColor('#ffffff');
      doc.text(vendorName, 50, 20);

      doc.setTextColor('#ff9900');
      doc.text('Equipment:', 10, 30);
      doc.setTextColor('#ffffff');
      doc.text(equipment, 50, 30);

      doc.setTextColor('#ff9900');
      doc.text('MCM/SIM-T No.:', 10, 40);
      doc.setTextColor('#ffffff');
      doc.text(mcmSimTNo, 50, 40);

      doc.setTextColor('#ff9900');
      doc.text('Job Description:', 10, 50);
      doc.setTextColor('#ffffff');
      doc.text(jobDescription, 50, 50);

      let currentY = 70;
      for (let i = 0; i < engineerTextareas.length; i++) {
        const engineerName = engineerTextareas[i].value.trim();
        if (engineerName !== '') {
          doc.setTextColor('#ff9900');
          doc.text(`Vendor/DCEO Engineer ${i + 1}:`, 10, currentY);
          doc.setTextColor('#ffffff');
          doc.text(engineerName, 70, currentY);
          currentY += 10;
        }
      }

      doc.setTextColor('#ff9900');
      doc.text('Date of Visit:', 10, currentY);
      doc.setTextColor('#ffffff');
      doc.text(dateOfVisit, 50, currentY);
      currentY += 10;

      doc.setTextColor('#ff9900');
      doc.text('Pre-Brief:', 10, currentY);
      doc.setTextColor('#ffffff');
      doc.text(preBrief, 50, currentY);
      currentY += 10;

      doc.setTextColor('#ff9900');
      doc.text('Post-Brief:', 10, currentY);
      doc.setTextColor('#ffffff');
      doc.text(postBrief, 50, currentY);
      currentY += 20;

      const securityItems = document.querySelectorAll('input[name="security[]"]:checked');
      const safetyItems = document.querySelectorAll('input[name="safety[]"]:checked');
      const mcmProcessItems = document.querySelectorAll('input[name="mcmProcess[]"]:checked');
      const escalationProcessItems = document.querySelectorAll('input[name="escalationProcess[]"]:checked');

      doc.setTextColor('#ff9900');
      doc.text('1. Security:', 10, currentY);
      currentY += 10;
      securityItems.forEach((checkbox, index) => {
        doc.setTextColor('#ffffff');
        doc.text(`- ${checkbox.value}`, 20, currentY);
        currentY += 10;
      });

      doc.setTextColor('#ff9900');
      doc.text('2. Safety:', 10, currentY);
      currentY += 10;
      safetyItems.forEach((checkbox, index) => {
        doc.setTextColor('#ffffff');
        doc.text(`- ${checkbox.value}`, 20, currentY);
        currentY += 10;
      });

      doc.setTextColor('#ff9900');
      doc.text('3. MCM Process/Workscopes:', 10, currentY);
      currentY += 10;
      mcmProcessItems.forEach((checkbox, index) => {
        doc.setTextColor('#ffffff');
        doc.text(`- ${checkbox.value}`, 20, currentY);
        currentY += 10;
      });

      doc.setTextColor('#ff9900');
      doc.text('4. Escalation Process:', 10, currentY);
      currentY += 10;
      escalationProcessItems.forEach((checkbox, index) => {
        doc.setTextColor('#ffffff');
        doc.text(`- ${checkbox.value}`, 20, currentY);
        currentY += 10;
      });

      // Add a new page for the signature
      doc.addPage();
      doc.setFillColor('#232f3e'); // Background color for new page
      doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

      // Add the signature image to the new page
      const imgWidth = 50; // Adjust size as needed
      const imgHeight = 25; // Adjust size as needed
      doc.addImage(signatureDataURL, 'JPEG', 10, 10, imgWidth, imgHeight);

      // Save PDF with embedded signature photo
      doc.save('CDG70_Vendor_Briefing_Checklist.pdf');
    };
    reader.readAsDataURL(signatureFile);
  } else {
    // Generate PDF without signature photo if not uploaded
    // Set background color
    doc.setFillColor('#232f3e'); // Background color
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

    doc.setFontSize(16);
    doc.setTextColor('#ff9900'); // Orange color for titles
    doc.text('CDG70 VENDOR BRIEFING CHECKLISTS', 10, 10);

    doc.setFontSize(12);
    doc.setTextColor('#ff9900');
    doc.text('Vendor Name:', 10, 20);
    doc.setTextColor('#ffffff');
    doc.text(vendorName, 50, 20);

    doc.setTextColor('#ff9900');
    doc.text('Equipment:', 10, 30);
    doc.setTextColor('#ffffff');
    doc.text(equipment, 50, 30);

    doc.setTextColor('#ff9900');
    doc.text('MCM/SIM-T No.:', 10, 40);
    doc.setTextColor('#ffffff');
    doc.text(mcmSimTNo, 50, 40);

    doc.setTextColor('#ff9900');
    doc.text('Job Description:', 10, 50);
    doc.setTextColor('#ffffff');
    doc.text(jobDescription, 50, 50);

    let currentY = 70;
    for (let i = 0; i < engineerTextareas.length; i++) {
      const engineerName = engineerTextareas[i].value.trim();
      if (engineerName !== '') {
        doc.setTextColor('#ff9900');
        doc.text(`Vendor/DCEO Engineer ${i + 1}:`, 10, currentY);
        doc.setTextColor('#ffffff');
        doc.text(engineerName, 70, currentY);
        currentY += 10;
      }
    }

    doc.setTextColor('#ff9900');
    doc.text('Date of Visit:', 10, currentY);
    doc.setTextColor('#ffffff');
    doc.text(dateOfVisit, 50, currentY);
    currentY += 10;

    doc.setTextColor('#ff9900');
    doc.text('Pre-Brief:', 10, currentY);
    doc.setTextColor('#ffffff');
    doc.text(preBrief, 50, currentY);
    currentY += 10;

    doc.setTextColor('#ff9900');
    doc.text('Post-Brief:', 10, currentY);
    doc.setTextColor('#ffffff');
    doc.text(postBrief, 50, currentY);
    currentY += 20;

    const securityItems = document.querySelectorAll('input[name="security[]"]:checked');
    const safetyItems = document.querySelectorAll('input[name="safety[]"]:checked');
    const mcmProcessItems = document.querySelectorAll('input[name="mcmProcess[]"]:checked');
    const escalationProcessItems = document.querySelectorAll('input[name="escalationProcess[]"]:checked');

    doc.setTextColor('#ff9900');
    doc.text('1. Security:', 10, currentY);
    currentY += 10;
    securityItems.forEach((checkbox, index) => {
      doc.setTextColor('#ffffff');
      doc.text(`- ${checkbox.value}`, 20, currentY);
      currentY += 10;
    });

    doc.setTextColor('#ff9900');
    doc.text('2. Safety:', 10, currentY);
    currentY += 10;
    safetyItems.forEach((checkbox, index) => {
      doc.setTextColor('#ffffff');
      doc.text(`- ${checkbox.value}`, 20, currentY);
      currentY += 10;
    });

    doc.setTextColor('#ff9900');
    doc.text('3. MCM Process/Workscopes:', 10, currentY);
    currentY += 10;
    mcmProcessItems.forEach((checkbox, index) => {
      doc.setTextColor('#ffffff');
      doc.text(`- ${checkbox.value}`, 20, currentY);
      currentY += 10;
    });

    doc.setTextColor('#ff9900');
    doc.text('4. Escalation Process:', 10, currentY);
    currentY += 10;
    escalationProcessItems.forEach((checkbox, index) => {
      doc.setTextColor('#ffffff');
      doc.text(`- ${checkbox.value}`, 20, currentY);
      currentY += 10;
    });

    // Save PDF without signature photo
    doc.save('CDG70_Vendor_Briefing_Checklist.pdf');
  }
}
