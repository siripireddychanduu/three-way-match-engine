# Three-Way Match Engine

## Overview

The Three-Way Match Engine is an AI-powered procurement verification system that automates the matching of Purchase Orders (PO), Goods Receipt Notes (GRN), and Invoices.

The application uses **Google Gemini AI** to extract data from uploaded PDF documents and performs intelligent three-way matching to identify quantity mismatches, price mismatches, missing documents, and SKU mapping issues.

---

## Quick Start

1. Start the backend server.
2. Start the frontend server.
3. Open (https://three-way-match-engine-three.vercel.app/)
4. Login using:

**Username:** `admin`

**Password:** `admin123`

# Features

## Authentication

- JWT Authentication
- Secure Login
- Protected APIs

Demo Credentials

Username: **admin**

Password: **admin123**

---

# Dashboard

- Total Purchase Orders
- Total GRNs
- Total Invoices
- Match Statistics
- Exception Statistics

---

# Document Management

- Upload Purchase Order
- Upload GRN
- Upload Invoice
- PDF Preview
- Download Original PDF
- Document Details

---

# AI Document Parsing

- Google Gemini AI Integration
- Automatic Data Extraction
- Header Information Extraction
- Item Extraction
- Vendor Details Extraction

---

# Three-Way Matching

The application compares:

- Purchase Order
- Goods Receipt Note
- Invoice

The system detects:

- Quantity Mismatch
- Price Mismatch
- Missing GRN
- Missing Invoice
- Unmapped SKU
- Date Validation
- Item Missing in PO

---

# SKU Master

- Add SKU
- Edit SKU
- Delete SKU
- SKU Search
- Vendor SKU Mapping
- Price Tolerance Configuration

---

# Exception Management

Displays

- Exception Type
- Severity
- Description
- Status
- Resolution Details

---

# Match Summary

Displays

- Total Items
- Matched Items
- Quantity Mismatch
- Price Mismatch
- Missing GRN
- Missing Invoice
- Match Accuracy

---

# Technologies Used

## Frontend

- Next.js
- React.js
- Tailwind CSS
- Axios
- React Icons
- React Hot Toast

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer

## AI

- Google Gemini API

---

# Folder Structure

```
Three-Way-Match-Engine
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   └── uploads
│
├── frontend
│   ├── src
│   │   ├── app
│   │   ├── components
│   │   ├── services
│   │   └── styles
│
├── README.md
├── .env.example
└── package.json
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend Setup

```bash
cd backend

npm install

npm start
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:3000
```

Backend runs on

```
http://localhost:5000
```

---

# Environment Variables

Create a `.env` file inside the backend folder.

Example

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key
```

---

# API Endpoints

## Authentication

| Method | Endpoint    |
| ------ | ----------- |
| POST   | /auth/login |

---

## Documents

| Method | Endpoint            |
| ------ | ------------------- |
| POST   | /documents/upload   |
| GET    | /documents          |
| GET    | /documents/:id      |
| GET    | /documents/:id/file |

---

## Matching

| Method | Endpoint               |
| ------ | ---------------------- |
| GET    | /api/match/:poNumber   |
| GET    | /api/summary/:poNumber |
| GET    | /api/exceptions        |

---

## SKU Master

| Method | Endpoint         |
| ------ | ---------------- |
| GET    | /masters/sku     |
| POST   | /masters/sku     |
| PATCH  | /masters/sku/:id |
| DELETE | /masters/sku/:id |

---


## Gemini API Setup

1. Create a Gemini API key from Google AI Studio.
2. Copy `.env.example` to `.env`.
3. Add your API key:

GEMINI_API_KEY=your_actual_api_key
---



## Screenshots

### Login

![Login](screenshots/login.png)

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Upload

![Upload](screenshots/upload.png)

### Three-Way Match

![Match](screenshots/match.png)

### SUK Master

![SUK](screenshots/sukmaster.png)

### summary

![Summary](screenshots/summary.png)

### exceptions

![Exceptions](screenshots/exceptions.png)


### document details

![Document details](screenshots/documentdetails.png)

### match

![Match](screenshots/match.png)

### create suk

![Create suk](screenshots/createsuk.png)


---
## Sample Match API Output

```json

{
    "success": true,
    "poNumber": "CI4PO05788",
    "status": "PARTIALLY_MATCHED",
    "purchaseOrder": {
        "_id": "6a6c4cdfa17d3855260c61bb",
        "poNumber": "CI4PO05788",
        "poDate": "2026-03-16T18:30:00.000Z",
        "vendorName": "M/s AFP",
        "items": [
            {
                "itemCode": "11423 psm",
                "description": "Cheesy Spicy Veg Momos 24.0 Pieces Colour: Size: size Brand:Band_2",
                "quantity": 50,
                "unitRate": 220.762,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "11797",
                "description": "Meatigo Hot Wings 250.0 g Colour: Size: size Brand:Band_3",
                "quantity": 75,
                "unitRate": 126.667,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "18003",
                "description": "Meatigo Chicken Curry Cut Skinless Frozen 450 .0 g Colour: Size: size Brand:Band_1",
                "quantity": 120,
                "unitRate": 141.143,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "18004",
                "description": "Meatigo Chicken Boneless Breast Frozen 450.0 g Colour: Size: size Brand:Band_1",
                "quantity": 540,
                "unitRate": 199.048,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "18906 psm",
                "description": "Spring Rolls Veg Frozen 240.0 g Colour: Size: size Brand:Band_4",
                "quantity": 175,
                "unitRate": 123.048,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "253430 psm",
                "description": "Pork Salami 200.0 g Colour: Size: size Brand:",
                "quantity": 75,
                "unitRate": 188.19,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "33387 psm",
                "description": "Frozen Chicken Chilli Salami 200.0 g Colour: Size: size Brand:TORSO",
                "quantity": 75,
                "unitRate": 126.667,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "33388 psm",
                "description": "Frozen Chicken Pepperoni Salami 100.0 g Colour: Size: size Brand:Band_3",
                "quantity": 120,
                "unitRate": 108.571,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "33390 psm",
                "description": "Chicken Seekh Kebab 500.0 g Colour: Size: size Brand:Band_3",
                "quantity": 272,
                "unitRate": 228,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "398656",
                "description": "Meatigo Chicken Drumsticks 450 .0 g Colour: Size: size Brand:",
                "quantity": 270,
                "unitRate": 188.19,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "414867 psm",
                "description": "Chinese Veg Spring Rolls 240.0 g Colour: Size: size Brand:",
                "quantity": 25,
                "unitRate": 119.429,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "432518",
                "description": "Meatigo Chicken Kheema 450.0 g Colour: Size: size Brand:",
                "quantity": 360,
                "unitRate": 199.048,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "4459 psm",
                "description": "Original Chicken Momos 24.0 Pieces Colour: Size: size Brand:Band_1",
                "quantity": 475,
                "unitRate": 220.762,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "4460 psm",
                "description": "Spicy Chicken Momos 24 .0 Pieces Colour: Size: size Brand:Band_1",
                "quantity": 325,
                "unitRate": 220.762,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "4461 psm",
                "description": "Veg & Paneer Momos 24. 0 Pieces Colour: Size: size Brand:Band_2",
                "quantity": 75,
                "unitRate": 202.667,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "453259 psm",
                "description": "Chicken Cheese & Onion Sausage 250.0 g Colour: Size: size Brand:",
                "quantity": 40,
                "unitRate": 144.762,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "4694 psm",
                "description": "Original Chicken Momos 10.0 Pieces Colour: Size: size Brand:Band_4",
                "quantity": 450,
                "unitRate": 133.905,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "4695 psm",
                "description": "Spicy Chicken Momos 10 .0 Pieces Colour: Size: size Brand:Band_3",
                "quantity": 100,
                "unitRate": 133.905,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "4697 psm",
                "description": "Veg css & Paneer Momos 10. 0 Pieces Colour: Size: size Brand:Band_2",
                "quantity": 400,
                "unitRate": 112.19,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "469735",
                "description": "Meatigo Everyday Chicken Breast (Frozen) 150. 0 g Colour: Size: size Brand:",
                "quantity": 90,
                "unitRate": 119.429,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "4698 psm",
                "description": "Chicken Ham 200.0 g Colour: Size: size Brand:Band_1",
                "quantity": 150,
                "unitRate": 133.905,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "4699 psm",
                "description": "Pork Sausage 250.0 g Colour: Size: size Brand:Band_2",
                "quantity": 40,
                "unitRate": 170.095,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "4700 psm",
                "description": "Pork Ham 200.0 g Colour: Size: size Brand:Band_1",
                "quantity": 50,
                "unitRate": 177.333,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "4701 psm",
                "description": "Pork Breakfast Bacon 300.0 g Colour: Size: size Brand:Band_1",
                "quantity": 20,
                "unitRate": 267.81,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "470663 psm",
                "description": "Whole Wheat Momos - Veg & Paneer 330. 0 g Colour: Size: size Brand:",
                "quantity": 80,
                "unitRate": 162.857,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "489632 psm",
                "description": "Tandoori Momos - Chicken 280.0 g Colour: Size: size Brand:",
                "quantity": 35,
                "unitRate": 159.238,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "49168 psm",
                "description": "Peri Peri Veg Momos 15 .0 Pieces Colour: Size: size Brand:Band_2",
                "quantity": 80,
                "unitRate": 88.667,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "498695 psm",
                "description": "Chicken Salami 200.0 g Colour: Size: size Brand:",
                "quantity": 25,
                "unitRate": 137.524,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "526303 psm",
                "description": "Chicken Pepper & Herb Sausage 250.0 g Colour: Size: size Brand:",
                "quantity": 20,
                "unitRate": 141.143,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "598770 psm",
                "description": "Pork Breakfast Bacon 150.0 g Colour: Size: size Brand:",
                "quantity": 36,
                "unitRate": 152,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "6664 psm",
                "description": "Chicken Sausages 250.0 g Colour: Size: size Brand:Band_2",
                "quantity": 380,
                "unitRate": 130.286,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "6665 psm",
                "description": "Chicken Cheese & Chilli Sausages 250. 0 g Colour: Size: size Brand:Band_3",
                "quantity": 100,
                "unitRate": 133.905,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "730016 psm",
                "description": "Whole Wheat Chicken Momos 330.0 g Colour: Size: size Brand:",
                "quantity": 80,
                "unitRate": 170.095,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "750414 psm",
                "description": "Super Saver Chicken Momo Pack (Chef Momos) 1.0 kg Colour: Size: size Brand:",
                "quantity": 72,
                "unitRate": 247.619,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "755774 psm",
                "description": "Chicken & Cheese Momos 540.0 g Colour: Size: size Brand:",
                "quantity": 25,
                "unitRate": 238.857,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "790919",
                "description": "Meatigo Everyday Fish Fillet 200.0 g Colour: Size: size Brand:",
                "quantity": 30,
                "unitRate": 188.19,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "81521 psm",
                "description": "Peri Peri Chicken Momos 250.0 g Colour: Size: size Brand:Band_4",
                "quantity": 640,
                "unitRate": 72.019,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "89201 psm",
                "description": "Chicken English Breakfast Sausage 1.0 kg Colour: Size: size Brand:Band_2",
                "quantity": 162,
                "unitRate": 222.857,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "205950 psm",
                "description": "Frozen Pork Pepperoni Salami 100.0 g Colour: Size: size Brand:Band_5",
                "quantity": 40,
                "unitRate": 133.905,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "507809 psm",
                "description": "Pizza Minis - Chicken Tikka 180.0 g Colour: Size: size Brand:Band_6",
                "quantity": 50,
                "unitRate": 115.086,
                "mrp": 0,
                "skuMaster": null
            }
        ],
        "fileName": "1785482432509.pdf",
        "filePath": "src\\uploads\\1785482432509.pdf",
        "originalFileName": "PO (1).pdf",
        "createdAt": "2026-07-31T07:21:03.555Z",
        "updatedAt": "2026-07-31T07:21:03.555Z",
        "__v": 0
    },
    "invoice": {
        "_id": "6a6c49dd99f92c7732f8f68f",
        "invoiceNumber": "IN25MH2504251",
        "poNumber": "CI4PO05788",
        "invoiceDate": "2026-03-24T00:00:00.000Z",
        "items": [
            {
                "itemCode": "FG-P-F-0503",
                "description": "PSM Cheesy Spicy Vegetable Momos 24Pcs",
                "quantity": 50,
                "unitRate": 220.76,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-M-F-1703",
                "description": "Meatigo RTC Meatigo Hot Wings 250g",
                "quantity": 75,
                "unitRate": 126.67,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-M-F-0620",
                "description": "Meatigo Chicken Curry Cuts 450g (5%)",
                "quantity": 30,
                "unitRate": 141.14,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-M-F-0619",
                "description": "Meatigo Chicken Boneless Breast 450g (5%)",
                "quantity": 30,
                "unitRate": 199.05,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-P-F-0249",
                "description": "PSM Pork Plain Salami 200g",
                "quantity": 75,
                "unitRate": 188.19,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-P-F-0234",
                "description": "PSM Frozen Chicken Chilli Salami 200g",
                "quantity": 75,
                "unitRate": 126.67,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-P-F-0413",
                "description": "PSM Frozen Chicken Seekh Kabab 500g",
                "quantity": 272,
                "unitRate": 228,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-M-F-0602",
                "description": "Meatigo Chicken Drumsticks 450g (5%)",
                "quantity": 270,
                "unitRate": 188.19,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-P-F-1707",
                "description": "PSM Spring Roll-Chinese Veg 240g",
                "quantity": 25,
                "unitRate": 119.43,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-M-F-0622",
                "description": "Meatigo Chicken Keema (Mince) 450g (5%)",
                "quantity": 360,
                "unitRate": 199.05,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-P-F-0505",
                "description": "PSM Chicken Momos 24Pcs",
                "quantity": 475,
                "unitRate": 220.76,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-P-F-0512",
                "description": "PSM Spicy Chicken Momos 24Pcs",
                "quantity": 325,
                "unitRate": 220.76,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-P-F-0514",
                "description": "PSM Vegetable & Paneer Momos 24Pcs",
                "quantity": 75,
                "unitRate": 202.67,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-P-F-0335",
                "description": "PSM Chicken Cheese & Onion Sausage 250g",
                "quantity": 40,
                "unitRate": 144.76,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-P-F-0504",
                "description": "PSM Chicken Momos 10Pcs",
                "quantity": 450,
                "unitRate": 133.9,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-P-F-0513",
                "description": "PSM Vegetable & Paneer Momos 10Pcs",
                "quantity": 400,
                "unitRate": 112.19,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-M-F-1728",
                "description": "Meatigo RTC Everyday Chicken Breast 150g",
                "quantity": 90,
                "unitRate": 119.43,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-P-F-0323",
                "description": "PSM Frozen Pork Sausage 250g",
                "quantity": 40,
                "unitRate": 170.1,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-P-F-0236",
                "description": "PSM Frozen Pork Ham 200g",
                "quantity": 50,
                "unitRate": 177.33,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-P-F-0580",
                "description": "PSM Whole Wheat Momos-Veg & Paneer 330g",
                "quantity": 40,
                "unitRate": 162.86,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-P-F-0527",
                "description": "PSM Peri Peri Veg Momos 15Pcs",
                "quantity": 80,
                "unitRate": 88.67,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-P-F-0247",
                "description": "PSM Frozen Chicken Salami 200g",
                "quantity": 25,
                "unitRate": 137.52,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-P-F-0102",
                "description": "PSM Frozen Pork Breakfast Bacon 150g",
                "quantity": 36,
                "unitRate": 152,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-P-F-0321",
                "description": "PSM Frozen Chicken Sausage 250g",
                "quantity": 380,
                "unitRate": 130.29,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-P-F-0581",
                "description": "PSM Whole Wheat Momos-Chicken 330g",
                "quantity": 80,
                "unitRate": 170.1,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-P-F-0501",
                "description": "PSM FS Chef Momo-Chicken 1kg",
                "quantity": 72,
                "unitRate": 247.62,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-P-F-0564",
                "description": "PSM Cheese & Chicken Momos 540g",
                "quantity": 25,
                "unitRate": 238.86,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-M-F-1729",
                "description": "Meatigo RTC Everyday Fish Fillet 200g",
                "quantity": 30,
                "unitRate": 188.19,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-P-F-0542",
                "description": "Peri Peri Chicken Momos 250g",
                "quantity": 640,
                "unitRate": 72.02,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-P-F-0237",
                "description": "PSM Frozen Pork Pepperoni Salami 100g",
                "quantity": 40,
                "unitRate": 133.9,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "FG-P-F-1911",
                "description": "PSM Pizza Minis-Chicken Tikka 180g",
                "quantity": 50,
                "unitRate": 115.09,
                "mrp": 0,
                "skuMaster": null
            }
        ],
        "fileName": "1785481668283.pdf",
        "filePath": "src\\uploads\\1785481668283.pdf",
        "originalFileName": "Invoice (1).pdf",
        "createdAt": "2026-07-31T07:08:13.328Z",
        "updatedAt": "2026-07-31T07:08:13.328Z",
        "__v": 0
    },
    "grn": {
        "_id": "6a6c691bb893d1e027bbe6fe",
        "grnNumber": "CI4000020234",
        "poNumber": "CI4PO05788",
        "grnDate": "2026-03-24T00:00:00.000Z",
        "items": [
            {
                "itemCode": "11423",
                "description": "psm Cheesy Spicy Veg Momos 24.0 Pieces",
                "receivedQuantity": 50,
                "unitRate": 0,
                "mrp": 305,
                "skuMaster": null
            },
            {
                "itemCode": "11797",
                "description": "Meatigo Hot Wings 250.0 g",
                "receivedQuantity": 75,
                "unitRate": 0,
                "mrp": 175,
                "skuMaster": null
            },
            {
                "itemCode": "18003",
                "description": "Meatigo Chicken Curry Cut Skinless Frozen 450.0 g",
                "receivedQuantity": 30,
                "unitRate": 0,
                "mrp": 195,
                "skuMaster": null
            },
            {
                "itemCode": "18004",
                "description": "Meatigo Chicken Boneless Breast Frozen 450.0 g",
                "receivedQuantity": 30,
                "unitRate": 0,
                "mrp": 275,
                "skuMaster": null
            },
            {
                "itemCode": "205950",
                "description": "psm Frozen Pork Pepperoni Salami 100.0 g",
                "receivedQuantity": 40,
                "unitRate": 0,
                "mrp": 185,
                "skuMaster": null
            },
            {
                "itemCode": "253430",
                "description": "psm Pork Salami 200.0 g",
                "receivedQuantity": 75,
                "unitRate": 0,
                "mrp": 260,
                "skuMaster": null
            },
            {
                "itemCode": "33387",
                "description": "psm Frozen Chicken Chilli Salami 200.0 g",
                "receivedQuantity": 75,
                "unitRate": 0,
                "mrp": 175,
                "skuMaster": null
            },
            {
                "itemCode": "33390",
                "description": "psm Chicken Seekh Kebab 500.0 g",
                "receivedQuantity": 272,
                "unitRate": 0,
                "mrp": 315,
                "skuMaster": null
            },
            {
                "itemCode": "398656",
                "description": "Meatigo Chicken Drumsticks 450.0 g",
                "receivedQuantity": 270,
                "unitRate": 0,
                "mrp": 260,
                "skuMaster": null
            },
            {
                "itemCode": "414867",
                "description": "psm Chinese Veg Spring Rolls 240.0 g",
                "receivedQuantity": 25,
                "unitRate": 0,
                "mrp": 165,
                "skuMaster": null
            },
            {
                "itemCode": "432518",
                "description": "Meatigo Chicken Kheema 450.0 g",
                "receivedQuantity": 360,
                "unitRate": 0,
                "mrp": 275,
                "skuMaster": null
            },
            {
                "itemCode": "4459",
                "description": "psm Original Chicken Momos 24.0 Pieces",
                "receivedQuantity": 475,
                "unitRate": 0,
                "mrp": 305,
                "skuMaster": null
            },
            {
                "itemCode": "4460",
                "description": "psm Spicy Chicken Momos 24.0 Pieces",
                "receivedQuantity": 325,
                "unitRate": 0,
                "mrp": 305,
                "skuMaster": null
            },
            {
                "itemCode": "4461",
                "description": "psm Veg & Paneer Momos 24.0 Pieces",
                "receivedQuantity": 75,
                "unitRate": 0,
                "mrp": 280,
                "skuMaster": null
            },
            {
                "itemCode": "453259",
                "description": "psm Chicken Cheese & Onion Sausage 250.0 g",
                "receivedQuantity": 40,
                "unitRate": 0,
                "mrp": 200,
                "skuMaster": null
            },
            {
                "itemCode": "4694",
                "description": "psm Original Chicken Momos 10.0 Pieces",
                "receivedQuantity": 450,
                "unitRate": 0,
                "mrp": 185,
                "skuMaster": null
            },
            {
                "itemCode": "4697",
                "description": "psm Veg & Paneer Momos 10.0 Pieces",
                "receivedQuantity": 400,
                "unitRate": 0,
                "mrp": 155,
                "skuMaster": null
            },
            {
                "itemCode": "469735",
                "description": "Meatigo Everyday Chicken Breast (Frozen) 150.0 g",
                "receivedQuantity": 90,
                "unitRate": 0,
                "mrp": 165,
                "skuMaster": null
            },
            {
                "itemCode": "4699",
                "description": "psm Pork Sausage 250.0 g",
                "receivedQuantity": 40,
                "unitRate": 0,
                "mrp": 235,
                "skuMaster": null
            },
            {
                "itemCode": "4700",
                "description": "psm Pork Ham 200.0 g",
                "receivedQuantity": 50,
                "unitRate": 0,
                "mrp": 245,
                "skuMaster": null
            },
            {
                "itemCode": "470663",
                "description": "psm Whole Wheat Momos - Veg & Paneer 330.0 g",
                "receivedQuantity": 40,
                "unitRate": 0,
                "mrp": 225,
                "skuMaster": null
            },
            {
                "itemCode": "49168",
                "description": "psm Peri Peri Veg Momos 15.0 Pieces",
                "receivedQuantity": 80,
                "unitRate": 0,
                "mrp": 245,
                "skuMaster": null
            },
            {
                "itemCode": "498695",
                "description": "psm Chicken Salami 200.0 g",
                "receivedQuantity": 25,
                "unitRate": 0,
                "mrp": 190,
                "skuMaster": null
            },
            {
                "itemCode": "507809",
                "description": "psm Pizza Minis 507809 - Chicken Tikka 180.0 g",
                "receivedQuantity": 50,
                "unitRate": 0,
                "mrp": 159,
                "skuMaster": null
            },
            {
                "itemCode": "598770",
                "description": "psm Pork Breakfast Bacon 150.0 g",
                "receivedQuantity": 36,
                "unitRate": 0,
                "mrp": 210,
                "skuMaster": null
            },
            {
                "itemCode": "6664",
                "description": "psm Chicken Sausages 250.0 g",
                "receivedQuantity": 380,
                "unitRate": 0,
                "mrp": 180,
                "skuMaster": null
            },
            {
                "itemCode": "730016",
                "description": "psm Whole Wheat Chicken Momos 330.0 g",
                "receivedQuantity": 80,
                "unitRate": 0,
                "mrp": 235,
                "skuMaster": null
            },
            {
                "itemCode": "750414",
                "description": "psm Super Saver Chicken Momo Pack (Chef Momos) 1.0 kg",
                "receivedQuantity": 72,
                "unitRate": 0,
                "mrp": 650,
                "skuMaster": null
            },
            {
                "itemCode": "755774",
                "description": "psm Chicken & Cheese Momos 540.0 g",
                "receivedQuantity": 25,
                "unitRate": 0,
                "mrp": 330,
                "skuMaster": null
            },
            {
                "itemCode": "790919",
                "description": "Meatigo Everyday Fish Fillet 200.0 g",
                "receivedQuantity": 30,
                "unitRate": 0,
                "mrp": 260,
                "skuMaster": null
            },
            {
                "itemCode": "81521",
                "description": "psm Peri Peri Chicken Momos 250.0 g",
                "receivedQuantity": 640,
                "unitRate": 0,
                "mrp": 199,
                "skuMaster": null
            }
        ],
        "fileName": "1785489674619.pdf",
        "filePath": "src\\uploads\\1785489674619.pdf",
        "originalFileName": "GRN (1).pdf",
        "createdAt": "2026-07-31T09:21:31.585Z",
        "updatedAt": "2026-07-31T09:21:31.585Z",
        "__v": 0
    },
    "comparison": [
        {
            "sku": "11423 psm",
            "description": "Cheesy Spicy Veg Momos 24.0 Pieces",
            "poQty": 50,
            "grnQty": 50,
            "invoiceQty": 50,
            "poPrice": 220.762,
            "invoicePrice": 220.76,
            "status": "MATCH"
        },
        {
            "sku": "11797",
            "description": "Meatigo Hot Wings 250.0 g",
            "poQty": 75,
            "grnQty": 75,
            "invoiceQty": 75,
            "poPrice": 126.667,
            "invoicePrice": 126.67,
            "status": "MATCH"
        },
        {
            "sku": "18003",
            "description": "Meatigo Chicken Curry Cut Skinless Frozen 450 .0 g",
            "poQty": 120,
            "grnQty": 30,
            "invoiceQty": 30,
            "poPrice": 141.143,
            "invoicePrice": 141.14,
            "status": "MISMATCH"
        },
        {
            "sku": "18004",
            "description": "Meatigo Chicken Boneless Breast Frozen 450.0 g",
            "poQty": 540,
            "grnQty": 30,
            "invoiceQty": 30,
            "poPrice": 199.048,
            "invoicePrice": 199.05,
            "status": "MISMATCH"
        },
        {
            "sku": "253430 psm",
            "description": "Pork Salami 200.0 g",
            "poQty": 75,
            "grnQty": 75,
            "invoiceQty": 75,
            "poPrice": 188.19,
            "invoicePrice": 188.19,
            "status": "MATCH"
        },
        {
            "sku": "33387 psm",
            "description": "Frozen Chicken Chilli Salami 200.0 g",
            "poQty": 75,
            "grnQty": 75,
            "invoiceQty": 75,
            "poPrice": 126.667,
            "invoicePrice": 126.67,
            "status": "MATCH"
        },
        {
            "sku": "33390 psm",
            "description": "Chicken Seekh Kebab 500.0 g",
            "poQty": 272,
            "grnQty": 272,
            "invoiceQty": 272,
            "poPrice": 228,
            "invoicePrice": 228,
            "status": "MATCH"
        },
        {
            "sku": "398656",
            "description": "Meatigo Chicken Drumsticks 450 .0 g",
            "poQty": 270,
            "grnQty": 270,
            "invoiceQty": 270,
            "poPrice": 188.19,
            "invoicePrice": 188.19,
            "status": "MATCH"
        },
        {
            "sku": "414867 psm",
            "description": "Chinese Veg Spring Rolls 240.0 g",
            "poQty": 25,
            "grnQty": 25,
            "invoiceQty": 25,
            "poPrice": 119.429,
            "invoicePrice": 119.43,
            "status": "MATCH"
        },
        {
            "sku": "432518",
            "description": "Meatigo Chicken Kheema 450.0 g",
            "poQty": 360,
            "grnQty": 360,
            "invoiceQty": 360,
            "poPrice": 199.048,
            "invoicePrice": 199.05,
            "status": "MATCH"
        },
        {
            "sku": "4459 psm",
            "description": "Original Chicken Momos 24.0 Pieces",
            "poQty": 475,
            "grnQty": 475,
            "invoiceQty": 475,
            "poPrice": 220.762,
            "invoicePrice": 220.76,
            "status": "MATCH"
        },
        {
            "sku": "4460 psm",
            "description": "Spicy Chicken Momos 24 .0 Pieces",
            "poQty": 325,
            "grnQty": 325,
            "invoiceQty": 325,
            "poPrice": 220.762,
            "invoicePrice": 220.76,
            "status": "MATCH"
        },
        {
            "sku": "4461 psm",
            "description": "Veg & Paneer Momos 24. 0 Pieces",
            "poQty": 75,
            "grnQty": 75,
            "invoiceQty": 75,
            "poPrice": 202.667,
            "invoicePrice": 202.67,
            "status": "MATCH"
        },
        {
            "sku": "453259 psm",
            "description": "Chicken Cheese & Onion Sausage 250.0 g",
            "poQty": 40,
            "grnQty": 40,
            "invoiceQty": 40,
            "poPrice": 144.762,
            "invoicePrice": 144.76,
            "status": "MATCH"
        },
        {
            "sku": "4694 psm",
            "description": "Original Chicken Momos 10.0 Pieces",
            "poQty": 450,
            "grnQty": 450,
            "invoiceQty": 450,
            "poPrice": 133.905,
            "invoicePrice": 133.9,
            "status": "MATCH"
        },
        {
            "sku": "4697 psm",
            "description": "Veg & Paneer Momos 10. 0 Pieces",
            "poQty": 400,
            "grnQty": 400,
            "invoiceQty": 400,
            "poPrice": 112.19,
            "invoicePrice": 112.19,
            "status": "MATCH"
        },
        {
            "sku": "469735",
            "description": "Meatigo Everyday Chicken Breast (Frozen) 150. 0 g",
            "poQty": 90,
            "grnQty": 90,
            "invoiceQty": 90,
            "poPrice": 119.429,
            "invoicePrice": 119.43,
            "status": "MATCH"
        },
        {
            "sku": "4699 psm",
            "description": "Pork Sausage 250.0 g",
            "poQty": 40,
            "grnQty": 40,
            "invoiceQty": 40,
            "poPrice": 170.095,
            "invoicePrice": 170.1,
            "status": "MATCH"
        },
        {
            "sku": "4700 psm",
            "description": "Pork Ham 200.0 g",
            "poQty": 50,
            "grnQty": 50,
            "invoiceQty": 50,
            "poPrice": 177.333,
            "invoicePrice": 177.33,
            "status": "MATCH"
        },
        {
            "sku": "470663 psm",
            "description": "Whole Wheat Momos - Veg & Paneer 330. 0 g",
            "poQty": 80,
            "grnQty": 40,
            "invoiceQty": 40,
            "poPrice": 162.857,
            "invoicePrice": 162.86,
            "status": "MISMATCH"
        },
        {
            "sku": "49168 psm",
            "description": "Peri Peri Veg Momos 15 .0 Pieces",
            "poQty": 80,
            "grnQty": 80,
            "invoiceQty": 80,
            "poPrice": 88.667,
            "invoicePrice": 88.67,
            "status": "MATCH"
        },
        {
            "sku": "498695 psm",
            "description": "Chicken Salami 200.0 g",
            "poQty": 25,
            "grnQty": 25,
            "invoiceQty": 25,
            "poPrice": 137.524,
            "invoicePrice": 137.52,
            "status": "MATCH"
        },
        {
            "sku": "598770 psm",
            "description": "Pork Breakfast Bacon 150.0 g",
            "poQty": 36,
            "grnQty": 36,
            "invoiceQty": 36,
            "poPrice": 152,
            "invoicePrice": 152,
            "status": "MATCH"
        },
        {
            "sku": "6664 psm",
            "description": "Chicken Sausages 250.0 g",
            "poQty": 380,
            "grnQty": 380,
            "invoiceQty": 380,
            "poPrice": 130.286,
            "invoicePrice": 130.29,
            "status": "MATCH"
        },
        {
            "sku": "730016 psm",
            "description": "Whole Wheat Chicken Momos 330.0 g",
            "poQty": 80,
            "grnQty": 80,
            "invoiceQty": 80,
            "poPrice": 170.095,
            "invoicePrice": 170.1,
            "status": "MATCH"
        },
        {
            "sku": "750414 psm",
            "description": "Super Saver Chicken Momo Pack (Chef Momos) 1.0 kg",
            "poQty": 72,
            "grnQty": 72,
            "invoiceQty": 72,
            "poPrice": 247.619,
            "invoicePrice": 247.62,
            "status": "MATCH"
        },
        {
            "sku": "755774 psm",
            "description": "Chicken & Cheese Momos 540.0 g",
            "poQty": 25,
            "grnQty": 25,
            "invoiceQty": 25,
            "poPrice": 238.857,
            "invoicePrice": 238.86,
            "status": "MATCH"
        },
        {
            "sku": "790919",
            "description": "Meatigo Everyday Fish Fillet 200.0 g",
            "poQty": 30,
            "grnQty": 30,
            "invoiceQty": 30,
            "poPrice": 188.19,
            "invoicePrice": 188.19,
            "status": "MATCH"
        },
        {
            "sku": "81521 psm",
            "description": "Peri Peri Chicken Momos 250.0 g",
            "poQty": 640,
            "grnQty": 640,
            "invoiceQty": 640,
            "poPrice": 72.019,
            "invoicePrice": 72.02,
            "status": "MATCH"
        },
        {
            "sku": "507809 psm",
            "description": "Pizza Minis - Chicken Tikka 180.0 g",
            "poQty": 50,
            "grnQty": 50,
            "invoiceQty": 50,
            "poPrice": 115.086,
            "invoicePrice": 115.09,
            "status": "MATCH"
        }
    ],
    "summary": {
        "totalItems": 40,
        "matchedItems": 27,
        "mismatchedItems": 46,
        "quantityMismatch": 3,
        "priceMismatch": 0,
        "mrpMismatch": 0,
        "unmappedSku": 1,
        "invoiceDateMismatch": 1,
        "missingInGRN": 9,
        "missingInInvoice": 1
    },
    "audit": {
        "poNumber": "CI4PO05788",
        "summary": {
            "totalItems": 40,
            "matchedItems": 27,
            "mismatchedItems": 46,
            "quantityMismatch": 3,
            "priceMismatch": 0,
            "mrpMismatch": 0,
            "unmappedSku": 1,
            "invoiceDateMismatch": 1,
            "missingInGRN": 9,
            "missingInInvoice": 1
        },
        "steps": [
            {
                "step": "Invoice Date Check",
                "status": "INVOICE_DATE_AFTER_PO_DATE",
                "message": "Invoice Date Tue Mar 24 2026 05:30:00 GMT+0530 (India Standard Time) is after PO Date Tue Mar 17 2026 00:00:00 GMT+0530 (India Standard Time)"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Cheesy Spicy Veg Momos 24.0 Pieces matched"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Meatigo Hot Wings 250.0 g matched"
            },
            {
                "step": "Quantity Check",
                "status": "QUANTITY_MISMATCH",
                "message": "Meatigo Chicken Curry Cut Skinless Frozen 450 .0 g\nPO=120, GRN=30, Invoice=30"
            },
            {
                "step": "Quantity Check",
                "status": "QUANTITY_MISMATCH",
                "message": "Meatigo Chicken Boneless Breast Frozen 450.0 g\nPO=540, GRN=30, Invoice=30"
            },
            {
                "step": "GRN Match",
                "status": "GRN_MISSING",
                "message": "Spring Rolls Veg Frozen 240.0 g missing in GRN"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Pork Salami 200.0 g matched"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Frozen Chicken Chilli Salami 200.0 g matched"
            },
            {
                "step": "GRN Match",
                "status": "GRN_MISSING",
                "message": "Frozen Chicken Pepperoni Salami 100.0 g missing in GRN"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Chicken Seekh Kebab 500.0 g matched"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Meatigo Chicken Drumsticks 450 .0 g matched"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Chinese Veg Spring Rolls 240.0 g matched"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Meatigo Chicken Kheema 450.0 g matched"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Original Chicken Momos 24.0 Pieces matched"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Spicy Chicken Momos 24 .0 Pieces matched"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Veg & Paneer Momos 24. 0 Pieces matched"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Chicken Cheese & Onion Sausage 250.0 g matched"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Original Chicken Momos 10.0 Pieces matched"
            },
            {
                "step": "GRN Match",
                "status": "GRN_MISSING",
                "message": "Spicy Chicken Momos 10 .0 Pieces missing in GRN"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Veg & Paneer Momos 10. 0 Pieces matched"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Meatigo Everyday Chicken Breast (Frozen) 150. 0 g matched"
            },
            {
                "step": "GRN Match",
                "status": "GRN_MISSING",
                "message": "Chicken Ham 200.0 g missing in GRN"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Pork Sausage 250.0 g matched"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Pork Ham 200.0 g matched"
            },
            {
                "step": "GRN Match",
                "status": "GRN_MISSING",
                "message": "Pork Breakfast Bacon 300.0 g missing in GRN"
            },
            {
                "step": "Quantity Check",
                "status": "QUANTITY_MISMATCH",
                "message": "Whole Wheat Momos - Veg & Paneer 330. 0 g\nPO=80, GRN=40, Invoice=40"
            },
            {
                "step": "GRN Match",
                "status": "GRN_MISSING",
                "message": "Tandoori Momos - Chicken 280.0 g missing in GRN"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Peri Peri Veg Momos 15 .0 Pieces matched"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Chicken Salami 200.0 g matched"
            },
            {
                "step": "GRN Match",
                "status": "GRN_MISSING",
                "message": "Chicken Pepper & Herb Sausage 250.0 g missing in GRN"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Pork Breakfast Bacon 150.0 g matched"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Chicken Sausages 250.0 g matched"
            },
            {
                "step": "GRN Match",
                "status": "GRN_MISSING",
                "message": "Chicken Cheese & Chilli Sausages 250. 0 g missing in GRN"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Whole Wheat Chicken Momos 330.0 g matched"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Super Saver Chicken Momo Pack (Chef Momos) 1.0 kg matched"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Chicken & Cheese Momos 540.0 g matched"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Meatigo Everyday Fish Fillet 200.0 g matched"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Peri Peri Chicken Momos 250.0 g matched"
            },
            {
                "step": "GRN Match",
                "status": "GRN_MISSING",
                "message": "Chicken English Breakfast Sausage 1.0 kg missing in GRN"
            },
            {
                "step": "SKU Match",
                "status": "UNMAPPED_MASTER_SKU",
                "message": "Frozen Pork Pepperoni Salami 100.0 g not found in SKU Master"
            },
            {
                "step": "Invoice Match",
                "status": "INVOICE_MISSING",
                "message": "Frozen Pork Pepperoni Salami 100.0 g missing in Invoice"
            },
            {
                "step": "Three Way Match",
                "status": "MATCHED",
                "message": "Pizza Minis - Chicken Tikka 180.0 g matched"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "PSM Cheesy Spicy Vegetable Momos 24Pcs exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "Meatigo RTC Meatigo Hot Wings 250g exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "Meatigo Chicken Curry Cuts 450g (5%) exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "Meatigo Chicken Boneless Breast 450g (5%) exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "PSM Pork Plain Salami 200g exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "PSM Frozen Chicken Chilli Salami 200g exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "PSM Frozen Chicken Seekh Kabab 500g exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "Meatigo Chicken Drumsticks 450g (5%) exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "PSM Spring Roll-Chinese Veg 240g exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "Meatigo Chicken Keema (Mince) 450g (5%) exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "PSM Chicken Momos 24Pcs exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "PSM Spicy Chicken Momos 24Pcs exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "PSM Vegetable & Paneer Momos 24Pcs exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "PSM Chicken Cheese & Onion Sausage 250g exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "PSM Chicken Momos 10Pcs exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "PSM Vegetable & Paneer Momos 10Pcs exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "Meatigo RTC Everyday Chicken Breast 150g exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "PSM Frozen Pork Sausage 250g exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "PSM Frozen Pork Ham 200g exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "PSM Whole Wheat Momos-Veg & Paneer 330g exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "PSM Peri Peri Veg Momos 15Pcs exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "PSM Frozen Chicken Salami 200g exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "PSM Frozen Pork Breakfast Bacon 150g exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "PSM Frozen Chicken Sausage 250g exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "PSM Whole Wheat Momos-Chicken 330g exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "PSM FS Chef Momo-Chicken 1kg exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "PSM Cheese & Chicken Momos 540g exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "Meatigo RTC Everyday Fish Fillet 200g exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "Peri Peri Chicken Momos 250g exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "PSM Frozen Pork Pepperoni Salami 100g exists in Invoice but not in PO"
            },
            {
                "step": "PO Validation",
                "status": "ITEM_MISSING_IN_PO",
                "message": "PSM Pizza Minis-Chicken Tikka 180g exists in Invoice but not in PO"
            }
        ]
    }
}
```
---

## Sample Summary API Output

```json

{
    "success": true,
    "summary": {
        "poNumber": "CI4PO05788",
        "poAmount": 995278.747,
        "totalOrdered": 6227,
        "totalReceived": 4705,
        "totalInvoiced": 4705,
        "pendingDelivery": 1522,
        "status": "PARTIALLY_MATCHED",
        "associatedDocuments": [
            {
                "type": "PO",
                "number": "CI4PO05788",
                "date": "2026-03-16T18:30:00.000Z",
                "quantity": 6227,
                "amount": 995278.747
            },
            {
                "type": "GRN",
                "number": "CI4000020234",
                "date": "2026-03-24T00:00:00.000Z",
                "quantity": 4705
            },
            {
                "type": "Invoice",
                "number": "IN25MH2504251",
                "date": "2026-03-24T00:00:00.000Z",
                "quantity": 4705,
                "amount": 743263.69
            }
        ]
    }
}
```
---

## Sample Parsed Output
```json
{
    "success": true,
    "id": "6a6cd390217ea1f04340a7e8",
    "fileName": "1785516915959.pdf",
    "documentType": "po",
    "parsedData": {
        "poNumber": "CI4PO05788",
        "poDate": "2026-03-16T18:30:00.000Z",
        "vendorName": "M/s AFP",
        "items": [
            {
                "itemCode": "11423 psm",
                "description": "Cheesy Spicy Veg Momos 24.0 Pieces Colour: Size: size Brand:Band_2",
                "quantity": 50,
                "unitRate": 220.762,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "11797",
                "description": "Meatigo Hot Wings 250.0 g Colour: Size: size Brand:Band_3",
                "quantity": 75,
                "unitRate": 126.667,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "18003",
                "description": "Meatigo Chicken Curry Cut Skinless Frozen 450.0 g Colour: Size: size Brand:Band_1",
                "quantity": 120,
                "unitRate": 141.143,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "18004",
                "description": "Meatigo Chicken Boneless Breast Frozen 450.0 g Colour: Size: size Brand:Band_1",
                "quantity": 540,
                "unitRate": 199.048,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "18906 psm",
                "description": "Spring Rolls Veg Frozen 240.0 g Colour: Size: size Brand:Band_4",
                "quantity": 175,
                "unitRate": 123.048,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "253430 psm",
                "description": "Pork Salami 200.0 g Colour: Size: size Brand:",
                "quantity": 75,
                "unitRate": 188.19,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "33387 psm",
                "description": "Frozen Chicken Chilli Salami 200.0 g Colour: Size: size Brand:TORSC",
                "quantity": 75,
                "unitRate": 126.667,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "33388 psm",
                "description": "Frozen Chicken Pepperoni Salami 100.0 g Colour: Size: size Brand:Band_3",
                "quantity": 120,
                "unitRate": 108.571,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "33390 psm",
                "description": "Chicken Seekh Kebab 500.0 g Colour: Size: size Brand:Band_3",
                "quantity": 272,
                "unitRate": 228,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "398656",
                "description": "Meatigo Chicken Drumsticks 450.0 g Colour: Size: size Brand:",
                "quantity": 270,
                "unitRate": 188.19,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "414867 psm",
                "description": "Chinese Veg Spring Rolls 240.0 g Colour: Size: size Brand:",
                "quantity": 25,
                "unitRate": 119.429,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "432518",
                "description": "Meatigo Chicken Kheema 450.0 g Colour: Size: size Brand:",
                "quantity": 360,
                "unitRate": 199.048,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "4459 psm",
                "description": "Original Chicken Momos 24.0 Pieces Colour: Size: size Brand:Band_1",
                "quantity": 475,
                "unitRate": 220.762,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "4460 psm",
                "description": "Spicy Chicken Momos 24.0 Pieces Colour: Size: size Brand:Band_1",
                "quantity": 325,
                "unitRate": 220.762,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "4461 psm",
                "description": "Veg & Paneer Momos 24.0 Pieces Colour: Size: size Brand:Band_2",
                "quantity": 75,
                "unitRate": 202.667,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "453259 psm",
                "description": "Chicken Cheese & Onion Sausage 250.0 g Colour: Size: size Brand:",
                "quantity": 40,
                "unitRate": 144.762,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "4694 psm",
                "description": "Original Chicken Momos 10.0 Pieces Colour: Size: size Brand:Band_4",
                "quantity": 450,
                "unitRate": 133.905,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "4695 psm",
                "description": "Spicy Chicken Momos 10.0 Pieces Colour: Size: size Brand:Band_3",
                "quantity": 100,
                "unitRate": 133.905,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "4697 psm",
                "description": "Veg & Paneer Momos 10.0 Pieces Colour: Size: size Brand:Band_2",
                "quantity": 400,
                "unitRate": 112.19,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "469735",
                "description": "Meatigo Everyday Chicken Breast (Frozen) 150.0 g Colour: Size: size Brand:",
                "quantity": 90,
                "unitRate": 119.429,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "4698 psm",
                "description": "Chicken Ham 200.0 g Colour: Size: size Brand:Band_1",
                "quantity": 150,
                "unitRate": 133.905,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "4699 psm",
                "description": "Pork Sausage 250.0 g Colour: Size: size Brand:Band_2",
                "quantity": 40,
                "unitRate": 170.095,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "4700 psm",
                "description": "Pork Ham 200.0 g Colour: Size: size Brand:Band_1",
                "quantity": 50,
                "unitRate": 177.333,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "4701 psm",
                "description": "Pork Breakfast Bacon 300.0 g Colour: Size: size Brand:Band_1",
                "quantity": 20,
                "unitRate": 267.81,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "470663 psm",
                "description": "Whole Wheat Momos - Veg & Paneer 330.0 g Colour: Size: size Brand:",
                "quantity": 80,
                "unitRate": 162.857,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "489632 psm",
                "description": "Tandoori Momos - Chicken 280.0 g Colour: Size: size Brand:",
                "quantity": 35,
                "unitRate": 159.238,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "49168 psm",
                "description": "Peri Peri Veg Momos 15.0 Pieces Colour: Size: size Brand:Band_2",
                "quantity": 80,
                "unitRate": 88.667,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "498695 psm",
                "description": "Chicken Salami 200.0 g Colour: Size: size Brand:",
                "quantity": 25,
                "unitRate": 137.524,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "526303 psm",
                "description": "Chicken Pepper & Herb Sausage 250.0 g Colour: Size: size Brand:",
                "quantity": 20,
                "unitRate": 141.143,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "598770 psm",
                "description": "Pork Breakfast Bacon 150.0 g Colour: Size: size Brand:",
                "quantity": 36,
                "unitRate": 152,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "6664 psm",
                "description": "Chicken Sausages 250.0 g Colour: Size: size Brand:Band_2",
                "quantity": 380,
                "unitRate": 130.286,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "6665 psm",
                "description": "Chicken Cheese & Chilli Sausages 250.0 g Colour: Size: size Brand:Band_3",
                "quantity": 100,
                "unitRate": 133.905,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "730016 psm",
                "description": "Whole Wheat Chicken Momos 330.0 g Colour: Size: size Brand:",
                "quantity": 80,
                "unitRate": 170.095,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "750414 psm",
                "description": "Super Saver Chicken Momo Pack (Chef Momos) 1.0 kg Colour: Size: size Brand:",
                "quantity": 72,
                "unitRate": 247.619,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "755774 psm",
                "description": "Chicken & Cheese Momos 540.0 g Colour: Size: size Brand:",
                "quantity": 25,
                "unitRate": 238.857,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "790919",
                "description": "Meatigo Everyday Fish Fillet 200.0 g Colour: Size: size Brand:",
                "quantity": 30,
                "unitRate": 188.19,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "81521 psm",
                "description": "Peri Peri Chicken Momos 250.0 g Colour: Size: size Brand:Band_4",
                "quantity": 640,
                "unitRate": 72.019,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "89201 psm",
                "description": "Chicken English Breakfast Sausage 1.0 kg Colour: Size: size Brand:Band_2",
                "quantity": 162,
                "unitRate": 222.857,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "205950 psm",
                "description": "Frozen Pork Pepperoni Salami 100.0 g Colour: Size: size Brand:Band_5",
                "quantity": 40,
                "unitRate": 133.905,
                "mrp": 0,
                "skuMaster": null
            },
            {
                "itemCode": "507809 psm",
                "description": "Pizza Minis - Chicken Tikka 180.0 g Colour: Size: size Brand:Band_6",
                "quantity": 50,
                "unitRate": 115.086,
                "mrp": 0,
                "skuMaster": null
            }
        ],
        "fileName": "1785516915959.pdf",
        "filePath": "src\\uploads\\1785516915959.pdf",
        "originalFileName": "PO (1).pdf",
        "_id": "6a6cd390217ea1f04340a7e8",
        "createdAt": "2026-07-31T16:55:44.848Z",
        "updatedAt": "2026-07-31T16:55:44.848Z",
        "__v": 0
    }
}
```
---




# Matching Workflow

1. User uploads Purchase Order.
2. User uploads GRN.
3. User uploads Invoice.
4. Google Gemini extracts document data.
5. Parsed data is stored in MongoDB.
6. Match Engine compares all three documents.
7. Exceptions are generated.
8. Dashboard and Summary are updated.

---

# Validation

The system validates:

- SKU Mapping
- Quantity
- Price
- Date
- Missing Documents
- Duplicate Documents
- Price Tolerance

---

# Security

- JWT Authentication
- Protected APIs
- Input Validation
- File Upload Validation

---

# Future Enhancements

- OCR Support
- Multi-User Authentication
- Role-Based Access Control
- Email Notifications
- Export Reports
- Cloud File Storage
- Dashboard Analytics

---

# Screens

- Login
- Dashboard
- Upload Documents
- Documents List
- Document Details
- PDF Preview
- Three-Way Match
- Match Summary
- Exception Management
- SKU Master

---

# Assumptions

- Documents are uploaded in PDF format.
- SKU Master contains valid mappings before matching.
- Gemini AI successfully extracts structured document data.
- JWT is used for securing API endpoints.

---

# Author

**Chandu**

Three-Way Match Engine Assignment

Developed using Node.js, Express.js, MongoDB, Next.js, Tailwind CSS, and Google Gemini AI.
````
