// modal.js (REVISED)

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal');
    const openModalBtn = document.getElementById('addProduct');
    const closeModalBtn = document.getElementById('close-button');
    const addItemForm = document.getElementById('add-item-form');
  
    // ... (Modal display/close logic remains the same) ...
    
    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    });
  
    closeModalBtn.addEventListener('click', closeModal);
  
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
  
    function closeModal() {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
        // Optional: Clear form on close
        addItemForm.reset(); 
    }
    
    // *** THIS IS THE KEY CHANGE ***
    addItemForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
  
        const name = document.getElementById('item-name').value.trim();
        const quantity = parseInt(document.getElementById('quantity').value);
        const price = parseFloat(document.getElementById('price').value);
        const category = document.getElementById('category').value;
        
        if (!name || isNaN(quantity) || isNaN(price) || !category) {
          alert("Please fill out all fields correctly!");
          return;
        }
        
        // 🎯 CALL THE GLOBAL addProduct FUNCTION FROM inventory.js
        // This will add the product, save data, and display the table
        addProduct(name, quantity, price, category);
  
        // Reset form and close modal
        addItemForm.reset();
        closeModal();
    });
  });