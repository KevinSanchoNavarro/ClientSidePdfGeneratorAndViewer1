async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4"); // Portrait, mm, A4 page size

    const content = document.getElementById("content");

    html2canvas(content, { scale: 2 }).then(canvas => {

        try {
            console.log(canvas);


            const imgData = canvas.toDataURL("image/png");
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 297; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
            let heightLeft = imgHeight;
            let position = 0;
    
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
    
            while (heightLeft > 0) {
                position -= pageHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
    
            // Display the PDF in an iframe
            const pdfBlob = pdf.output("blob");
            console.log(pdfBlob);
            const pdfUrl = URL.createObjectURL(pdfBlob);
            console.log(pdfUrl);
            document.getElementById("pdf-preview").src = pdfUrl;
    
            // Optional: Auto-download the PDF
            //pdf.save("document.pdf");    
            console.log("success");
        } catch (error) {
            console.log("Error");
            console.log(error);
        }
        
    });
}

async function renderW3schoolPage() {

    document.getElementById("w3school-page").src = "https://getbootstrap.com/";

}