function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Handling signature photo upload
  const signatureFile = document.getElementById('signature').files[0];
  let signatureDataURL = '';

  const generateDocument = () => {
    // Page 1: Vendor Information
    doc.setFillColor('#232f3e'); // Background color
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

    doc.setFontSize(16);
    doc.setTextColor('#ff9900'); // Orange color for titles
    doc.text('CDG70 VENDOR BRIEFING CHECKLISTS', 10, 10);

    const vendorName = document.getElementById('vendorName').value;
    const equipment = document.getElementById('equipment').value;
    const mcmSimTNo = document.getElementById('mcmSimTNo').value;
    const jobDescription = document.getElementById('jobDescription').value;

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

    // Move to the next page
    doc.addPage();

    // Page 2: Briefing
    const dateOfVisit = document.getElementById('dateOfVisit').value;
    const preBrief = document.getElementById('preBrief').value;
    const postBrief = document.getElementById('postBrief').value;

    doc.setFillColor('#232f3e'); // Background color
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

    let currentY = 10;

    doc.setFontSize(12);
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

    // Move to the next page
    doc.addPage();

    // Page 3: Checklists
    const securityItems = document.querySelectorAll('input[name="security[]"]:checked');
    const safetyItems = document.querySelectorAll('input[name="safety[]"]:checked');
    const mcmProcessItems = document.querySelectorAll('input[name="mcmProcess[]"]:checked');
    const escalationProcessItems = document.querySelectorAll('input[name="escalationProcess[]"]:checked');
    const engineerTextareas = document.getElementsByName('vendorEngineers[]');

    doc.setFillColor('#232f3e'); // Background color
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

    currentY = 10;

    doc.setFontSize(12);
    doc.setTextColor('#ff9900');
    doc.text('1. Security:', 10, currentY);
    currentY += 10;
    securityItems.forEach((checkbox) => {
      doc.setTextColor('#ffffff');
      doc.text(`- ${checkbox.value}`, 20, currentY);
      currentY += 10;
    });

    doc.setTextColor('#ff9900');
    doc.text('2. Safety:', 10, currentY);
    currentY += 10;
    safetyItems.forEach((checkbox) => {
      doc.setTextColor('#ffffff');
      doc.text(`- ${checkbox.value}`, 20, currentY);
      currentY += 10;
    });

    doc.setTextColor('#ff9900');
    doc.text('3. MCM Process/Workscopes:', 10, currentY);
    currentY += 10;
    mcmProcessItems.forEach((checkbox) => {
      doc.setTextColor('#ffffff');
      doc.text(`- ${checkbox.value}`, 20, currentY);
      currentY += 10;
    });

    doc.setTextColor('#ff9900');
    doc.text('4. Escalation Process:', 10, currentY);
    currentY += 10;
    escalationProcessItems.forEach((checkbox) => {
      doc.setTextColor('#ffffff');
      doc.text(`- ${checkbox.value}`, 20, currentY);
      currentY += 10;
    });

    currentY += 10;
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

    // Move to the next page
    doc.addPage();

    // Page 4: Signature
    doc.setFillColor('#232f3e'); // Background color for the new page
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

    if (signatureDataURL) {
      const imgWidth = 50; // Adjust size as needed
      const imgHeight = 25; // Adjust size as needed
      doc.addImage(signatureDataURL, 'JPEG', 10, 10, imgWidth, imgHeight);
    }

    // Save the PDF
    doc.save('CDG70_Vendor_Briefing_Checklist.pdf');
  };

  if (signatureFile) {
    const reader = new FileReader();
    reader.onload = function (event) {
      signatureDataURL = event.target.result;
      generateDocument();
    };
    reader.readAsDataURL(signatureFile);
  } else {
    generateDocument();
  }
}
