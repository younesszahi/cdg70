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
  
    doc.setFontSize(16);
    doc.setTextColor('#0073e6');
    doc.text(`CDG70 VENDOR BRIEFING CHECKLISTS`, 10, 10);
    doc.setFontSize(12);
    doc.setTextColor('#000000');
    doc.text(`Vendor Name: ${vendorName}`, 10, 20);
    doc.text(`Equipment: ${equipment}`, 10, 30);
    doc.text(`MCM/SIM-T No.: ${mcmSimTNo}`, 10, 40);
    doc.text(`Job Description: ${jobDescription}`, 10, 50);
    
    let currentY = 70;
    for (let i = 0; i < engineerTextareas.length; i++) {
      const engineerName = engineerTextareas[i].value.trim();
      if (engineerName !== '') {
        doc.text(`Vendor/DCEO Engineer ${i + 1}: ${engineerName}`, 10, currentY);
        currentY += 10;
      }
    }
    
    doc.text(`Date of Visit: ${dateOfVisit}`, 10, currentY);
    currentY += 10;
  
    doc.text(`Pre-Brief: ${preBrief}`, 10, currentY);
    currentY += 10;
  
    doc.text(`Post-Brief: ${postBrief}`, 10, currentY);
    currentY += 20;
  
    const securityItems = document.querySelectorAll('input[name="security[]"]:checked');
    const safetyItems = document.querySelectorAll('input[name="safety[]"]:checked');
    const mcmProcessItems = document.querySelectorAll('input[name="mcmProcess[]"]:checked');
    const escalationProcessItems = document.querySelectorAll('input[name="escalationProcess[]"]:checked');
  
    doc.text(`1. Security:`, 10, currentY);
    currentY += 10;
    securityItems.forEach((checkbox, index) => {
      doc.text(`- ${checkbox.value}`, 20, currentY);
      currentY += 10;
    });
  
    doc.text(`2. Safety:`, 10, currentY);
    currentY += 10;
    safetyItems.forEach((checkbox, index) => {
      doc.text(`- ${checkbox.value}`, 20, currentY);
      currentY += 10;
    });
  
    doc.text(`3. MCM Process/Workscopes:`, 10, currentY);
    currentY += 10;
    mcmProcessItems.forEach((checkbox, index) => {
      doc.text(`- ${checkbox.value}`, 20, currentY);
      currentY += 10;
    });
  
    doc.text(`4. Escalation Process:`, 10, currentY);
    currentY += 10;
    escalationProcessItems.forEach((checkbox, index) => {
      doc.text(`- ${checkbox.value}`, 20, currentY);
      currentY += 10;
    });
  
    doc.save('CDG70_Vendor_Briefing_Checklist.pdf');
  }
  
