// server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const pdf = require("html-pdf-node");
const handlebars = require("handlebars");

const app = express();
app.use(cors());
app.use(express.json());

// Load HTML template
const templatePath = path.join(__dirname, "template.html");
const htmlTemplate = fs.readFileSync(templatePath, "utf-8");

app.post("/generate-pdf", async (req, res) => {
  const { fullName, fatherName, propertySize, saleAmount, date } = req.body;

  const template = handlebars.compile(htmlTemplate);
  const finalHtml = template({
    name: fullName,
    father_name: fatherName,
    property_size: propertySize,
    sale_amount: saleAmount,
    date,
  });

  const file = { content: finalHtml };
  const options = { format: "A4" };

  try {
    const pdfBuffer = await pdf.generatePdf(file, options);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=sale-deed.pdf",
    });
    res.send(pdfBuffer);
  } catch (err) {
    console.error("PDF generation failed:", err);
    res.status(500).send("PDF generation failed.");
  }
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
