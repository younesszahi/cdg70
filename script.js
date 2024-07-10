document.getElementById('generate-pdf').addEventListener('click', function() {
    const pdf = new jsPDF();

    // Add Pre-Brief checklist items
    pdf.text('Pre-Brief Checklist', 20, 20);
    let yOffset = 30;
    document.querySelectorAll('#pre-brief input[type="checkbox"]:checked + label').forEach(item => {
        pdf.text('- ' + item.textContent.trim(), 30, yOffset);
        yOffset += 10;
    });

    // Add Post-Brief checklist items
    pdf.text('Post-Brief Checklist', 20, yOffset + 10);
    yOffset += 20;
    document.querySelectorAll('#post-brief input[type="checkbox"]:checked + label').forEach(item => {
        pdf.text('- ' + item.textContent.trim(), 30, yOffset);
        yOffset += 10;
    });

    // Save PDF
    pdf.save('CDG70_Vendor_Checklist.pdf');
});
