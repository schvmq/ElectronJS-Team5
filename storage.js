const fs = require("fs");
const path = require("path");

// Save inventory.json inside your project folder
const dataFile = path.join(__dirname, "inventory.json");

// Load items from JSON file
function loadItems() {
  try {
    if (!fs.existsSync(dataFile)) {
      fs.writeFileSync(dataFile, "[]");
    }
    const data = fs.readFileSync(dataFile, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading data:", error);
    return [];
  }
}

// Save items to JSON file
function saveItems(items) {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(items, null, 2));
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

module.exports = { loadItems, saveItems };
