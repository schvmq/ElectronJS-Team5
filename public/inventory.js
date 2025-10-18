// inventory.js (REVISED)

let inventory = [];

// Load any saved data (optional)

// Functions are globally accessible for use by addProductForm.js

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
          <button onclick="editProduct(${product.id})" class="edit-btn">Edit</button>
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

// Load data and set up event listeners on page load
window.onload = function() {
  const savedData = localStorage.getItem('inventory');
  if (savedData) {
    inventory = JSON.parse(savedData);
    displayProducts();
    updateCounts();
  }
  
  // Add event listeners for edit modal
  document.getElementById('close-edit-button').addEventListener('click', closeEditModal);
  
  // Handle edit form submission
  document.getElementById('edit-item-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const id = parseInt(document.getElementById('edit-product-id').value);
    const name = document.getElementById('edit-item-name').value;
    const quantity = document.getElementById('edit-quantity').value;
    const price = document.getElementById('edit-price').value;
    const category = document.getElementById('edit-category').value;
    
    updateProduct(id, name, quantity, price, category);
    closeEditModal();
  });
  
  // Close modal when clicking outside
  document.getElementById('edit-modal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeEditModal();
    }
  });
};

function searchProducts(query) {
  query = query.trim().toLowerCase();

  const tbody = document.getElementById('products-tbody');
  tbody.innerHTML = '';

  // Filter products based on the query
  const filtered = inventory.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No matching products found.</td></tr>';
    return;
  }

  // Display filtered products
  filtered.forEach((product, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${product.name}</td>
      <td>${product.quantity}</td>
      <td>₱${product.price.toFixed(2)}</td>
      <td>${product.category}</td>
      <td>
        <button onclick="editProduct(${product.id})" class="edit-btn">Edit</button>
        <button onclick="deleteProduct(${product.id})" class="delete-btn">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Edit product function
function editProduct(id) {
  const product = inventory.find(p => p.id === id);
  if (!product) return;

  // Populate the edit form with current product data
  document.getElementById('edit-product-id').value = product.id;
  document.getElementById('edit-item-name').value = product.name;
  document.getElementById('edit-quantity').value = product.quantity;
  document.getElementById('edit-price').value = product.price;
  document.getElementById('edit-category').value = product.category;

  // Show the edit modal
  const editModal = document.getElementById('edit-modal');
  editModal.style.display = 'block';
  editModal.setAttribute('aria-hidden', 'false');
}

// Update
function updateProduct(id, name, quantity, price, category) {
  const productIndex = inventory.findIndex(p => p.id === id);
  if (productIndex === -1) return;

  inventory[productIndex] = {
    id: id,
    name: name,
    quantity: parseInt(quantity),
    price: parseFloat(price),
    category: category
  };
  saveData();
  displayProducts();
  updateCounts();
}

function closeEditModal() {
  const editModal = document.getElementById('edit-modal');
  editModal.style.display = 'none';
  editModal.setAttribute('aria-hidden', 'true');
}
