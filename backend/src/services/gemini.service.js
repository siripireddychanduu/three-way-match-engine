const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-flash-latest",
});

async function parseDocument(filePath, documentType) {
  const file = fs.readFileSync(filePath);

  const base64 = file.toString("base64");

  let prompt = "";

  switch (documentType) {
    case "po":
      prompt = `
Extract Purchase Order.

Return ONLY valid JSON.

Extract the following fields exactly.

{
    "poNumber":"",
    "poDate":"",
    "vendorName":"",
    "items":[
        {
            "itemCode":"",
            "description":"",
            "quantity":0,
            "unitRate":0
        }
    ]
}

Rules:
- Extract the unit price/rate if available.
- Look for columns such as Unit Rate, Rate, Unit Price, Basic Rate or Price.
- If unitRate is missing, return 0.
- quantity and unitRate must be numbers.
`;
      break;

    case "grn":
      prompt = `
Extract GRN.

Return ONLY valid JSON.

{
    "grnNumber":"",
    "poNumber":"",
    "grnDate":"",
    "items":[
        {
            "itemCode":"",
            "description":"",
            "receivedQuantity":0,
            "mrp":0
        }
    ]
}

Rules:
- Extract the MRP if it is available.
- Look for columns like MRP, Unit MRP, Maximum Retail Price.
- If MRP is not available, return 0.
- receivedQuantity and mrp must be numeric.
`;
      break;

    case "invoice":
      prompt = `
Extract Invoice.

Return ONLY JSON.

{
    "invoiceNumber":"",
    "poNumber":"",
    "invoiceDate":"",
    "items":[
        {
            "itemCode":"",
            "description":"",
            "quantity":0,
            "unitRate":0,
            "mrp":0
        }
    ]
}
`;
      break;
  }

  const result = await model.generateContent([
    {
      inlineData: {
        data: base64,
        mimeType: "application/pdf",
      },
    },
    prompt,
  ]);

  const response = result.response.text();

  const cleanResponse = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanResponse);
}

module.exports = {
  parseDocument,
};
