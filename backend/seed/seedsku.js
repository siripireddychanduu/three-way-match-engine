const mongoose = require("mongoose");
const SkuMaster = require("../src/models/skuMaster.model");

mongoose.connect("mongodb://127.0.0.1:27017/three_way_match");

const skuData = [
  {
    internalSku: "11423",
    vendorSku: "FG-P-F-0503",
    description: "Cheesy Spicy Veg Momos",
  },
  {
    internalSku: "11797",
    vendorSku: "FG-M-F-1703",
    description: "Meatigo Hot Wings",
  },
  {
    internalSku: "18003",
    vendorSku: "FG-M-F-0620",
    description: "Meatigo Chicken Curry Cuts",
  },
  {
    internalSku: "18004",
    vendorSku: "FG-M-F-0619",
    description: "Meatigo Chicken Boneless Breast",
  },
  {
    internalSku: "253430",
    vendorSku: "FG-P-F-0249",
    description: "Pork Plain Salami",
  },
  {
    internalSku: "33387",
    vendorSku: "FG-P-F-0234",
    description: "Frozen Chicken Chilli Salami",
  },
  {
    internalSku: "33388",
    vendorSku: "FG-P-F-0237",
    description: "Frozen Pork Pepperoni Salami",
  },
  {
    internalSku: "33390",
    vendorSku: "FG-P-F-0413",
    description: "Chicken Seekh Kabab",
  },
  {
    internalSku: "398656",
    vendorSku: "FG-M-F-0602",
    description: "Meatigo Chicken Drumsticks",
  },
  {
    internalSku: "414867",
    vendorSku: "FG-P-F-1707",
    description: "Chinese Veg Spring Rolls",
  },
  {
    internalSku: "432518",
    vendorSku: "FG-M-F-0622",
    description: "Meatigo Chicken Keema",
  },
  {
    internalSku: "4459",
    vendorSku: "FG-P-F-0505",
    description: "Original Chicken Momos 24Pcs",
  },
  {
    internalSku: "4460",
    vendorSku: "FG-P-F-0512",
    description: "Spicy Chicken Momos 24Pcs",
  },
  {
    internalSku: "4461",
    vendorSku: "FG-P-F-0514",
    description: "Veg & Paneer Momos 24Pcs",
  },
  {
    internalSku: "453259",
    vendorSku: "FG-P-F-0335",
    description: "Chicken Cheese & Onion Sausage",
  },
  {
    internalSku: "4694",
    vendorSku: "FG-P-F-0504",
    description: "Original Chicken Momos 10Pcs",
  },

  // Quantity differs but same product
  {
    internalSku: "4697",
    vendorSku: "FG-P-F-0513",
    description: "Veg & Paneer Momos 10Pcs",
  },

  {
    internalSku: "469735",
    vendorSku: "FG-M-F-1728",
    description: "Everyday Chicken Breast",
  },

  {
    internalSku: "4699",
    vendorSku: "FG-P-F-0323",
    description: "Pork Sausage",
  },

  { internalSku: "4700", vendorSku: "FG-P-F-0236", description: "Pork Ham" },

  {
    internalSku: "470663",
    vendorSku: "FG-P-F-0580",
    description: "Whole Wheat Veg Paneer Momos",
  },

  {
    internalSku: "49168",
    vendorSku: "FG-P-F-0527",
    description: "Peri Peri Veg Momos",
  },

  {
    internalSku: "498695",
    vendorSku: "FG-P-F-0247",
    description: "Chicken Salami",
  },

  {
    internalSku: "598770",
    vendorSku: "FG-P-F-0102",
    description: "Pork Breakfast Bacon 150g",
  },

  {
    internalSku: "6664",
    vendorSku: "FG-P-F-0321",
    description: "Chicken Sausage",
  },

  {
    internalSku: "730016",
    vendorSku: "FG-P-F-0581",
    description: "Whole Wheat Chicken Momos",
  },

  {
    internalSku: "750414",
    vendorSku: "FG-P-F-0501",
    description: "Chef Chicken Momos",
  },

  {
    internalSku: "755774",
    vendorSku: "FG-P-F-0564",
    description: "Chicken Cheese Momos",
  },

  {
    internalSku: "790919",
    vendorSku: "FG-M-F-1729",
    description: "Fish Fillet",
  },

  {
    internalSku: "81521",
    vendorSku: "FG-P-F-0542",
    description: "Peri Peri Chicken Momos",
  },

  {
    internalSku: "507809",
    vendorSku: "FG-P-F-1911",
    description: "Pizza Minis Chicken Tikka",
  },

  // Not present in Invoice
  { internalSku: "18906", vendorSku: "", description: "Spring Rolls Veg" },
  {
    internalSku: "4695",
    vendorSku: "",
    description: "Spicy Chicken Momos 10Pcs",
  },
  { internalSku: "4698", vendorSku: "", description: "Chicken Ham" },
  {
    internalSku: "4701",
    vendorSku: "",
    description: "Pork Breakfast Bacon 300g",
  },
  {
    internalSku: "489632",
    vendorSku: "",
    description: "Tandoori Chicken Momos",
  },
  {
    internalSku: "526303",
    vendorSku: "",
    description: "Chicken Pepper & Herb Sausage",
  },
  {
    internalSku: "6665",
    vendorSku: "",
    description: "Chicken Cheese & Chilli Sausage",
  },
  {
    internalSku: "89201",
    vendorSku: "",
    description: "Chicken English Breakfast Sausage",
  },
];

async function seed() {
  try {
    await SkuMaster.deleteMany({});

    for (const sku of skuData) {
      try {
        await SkuMaster.create(sku);
        console.log("Inserted:", sku.internalSku);
      } catch (err) {
        console.log("Failed:", sku.internalSku);
        console.log(err.message);
      }
    }

    console.log("SKU Master Seeded Successfully");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
