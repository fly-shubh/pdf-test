import puppeteerCore from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { template } = req.body || {};
  if (!template) {
    return res.status(400).send("Template HTML is required");
  }

  const html = `
    <!DOCTYPE html>
    <html lang="en">
 
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <link rel="stylesheet" href="https://cdn.ckeditor.com/ckeditor5/45.2.0/ckeditor5.css" />
    </head>
 
    <body>
      ${template}
    </body>
    </html>
  `;

  try {
    const executablePath = await chromium.executablePath();

    const browser = await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "1cm", bottom: "1cm", left: "1cm", right: "1cm" },
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="output.pdf"');
    res.end(pdf);
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).send("Internal Server Error");
  }
}
