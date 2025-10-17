// inventory.js (REVISED)

let inventory = [];

// Load any saved data (optional)
window.onload = function() {
  const savedData = localStorage.getItem('inventory');
  if (savedData) {
    inventory = JSON.parse(savedData);
    displayProducts();
  }
};

// *** REMOVE the duplicate document.getElementById('add-item-form').addEventListener('submit', ...) BLOCK ***

// Keep the functions below, but make sure they are globally accessible if called from modal.js

function addProduct(name, quantity, price, category) {
    const newProduct = {
      id: Date.now(),
      name,
      quantity,
      price,
      category
    };
  
    inventory.push(newProduct);
    saveData();
    displayProducts();
}

function displayProducts() {
    // ... (rest of the displayProducts function remains the same)
    const tbody = document.getElementById('products-tbody');
    tbody.innerHTML = ''; // Clear table first
  
    if (inventory.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No products yet.</td></tr>';
      return;
    }
  
    inventory.forEach((product, index) => {
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>${product.quantity}</td>
        <td>₱${product.price.toFixed(2)}</td>
        <td>${product.category}</td>
        <td>
          <button onclick="deleteProduct(${product.id})" class="delete-btn">Delete</button>
        </td>
      `;
  
      tbody.appendChild(row);
    });

    // 💡 Add logic to update the counts here (Total, Low Stock, Out of Stock)
    updateCounts(); // assuming you create this function
}

function deleteProduct(id) {
    inventory = inventory.filter(product => product.id !== id);
    saveData();
    displayProducts();
}

function saveData() {
    localStorage.setItem('inventory', JSON.stringify(inventory));
}

// 💡 NEW: Function to update summary counts
function updateCounts() {
    const lowStockThreshold = 10; // Define your threshold
    const total = inventory.length;
    const lowStock = inventory.filter(p => p.quantity > 0 && p.quantity <= lowStockThreshold).length;
    const outOfStock = inventory.filter(p => p.quantity === 0).length;

    document.getElementById('total-product-count').textContent = total;
    document.getElementById('low-stock-count').textContent = lowStock;
    document.getElementById('out-of-stock-count').textContent = outOfStock;
}

// Also call displayProducts and updateCounts once on load
window.onload = function() {
  const savedData = localStorage.getItem('inventory');
  if (savedData) {
    inventory = JSON.parse(savedData);
    displayProducts();
    updateCounts();
  }
  // Remove the redundant close-button listener if it's already in modal.js
};