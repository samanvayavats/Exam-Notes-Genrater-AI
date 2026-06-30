import PDFDocument from "pdfkit";

export async function generatePDF(res, data, imageRes, difficulty) {
    const doc = new PDFDocument();


    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=notes.pdf");

    doc.pipe(res);


    doc.fontSize(18).text(data.title, { underline: true });
    doc.moveDown();


    doc.fontSize(12).text("Introduction:");
    doc.text(data.introduction);
    doc.moveDown();


    doc.text("Concepts:");
    data.concepts.forEach((c, i) => {
        doc.text(`${i + 1}. ${c}`);
    });
    doc.moveDown();

    if (difficulty == 'hard') {
        doc.text("Diagram:");
        const imageBuffer = await imageRes.arrayBuffer();
        doc.image(Buffer.from(imageBuffer), {
            fit: [400, 300],
            align: "center",
        });
    }
    
    if(difficulty == "medium"){
        doc.text("Diagram:");
        doc.font("Courier").text(data.diagram);
    }

    doc.font("Helvetica");
    doc.moveDown();

    doc.text("Applications:");
    data.applications.forEach((a, i) => {
        doc.text(`- ${a}`);
    });
    doc.moveDown();


    doc.text("Important Questions:");
    data.important_questions.forEach((q, i) => {
        doc.text(`${i + 1}. ${q}`);
    });
    doc.moveDown();

    doc.text("Summary:");
    doc.text(data.summary);

    doc.end();
}