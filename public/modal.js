
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.modal');
  const openModalBtn = document.getElementById('addProduct');
  const closeModalBtn = document.getElementById('close-button');
  const addItemForm = document.getElementById('add-item-form');

  
  openModalBtn.addEventListener('click', () => {
      modal.style.display = 'flex';  // use flex for centering content
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // prevent background scrolling
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
  }

  addItemForm.addEventListener('submit', (event) => {
      event.preventDefault(); 

      const itemName = document.getElementById('item-name').value;
      const quantity = document.getElementById('quantity').value;
      const price = document.getElementById('price').value;
      const category = document.getElementById('category').value;

      console.log('New product added:', {
          itemName,
          quantity,
          price,
          category
      });

      addItemForm.reset();
      closeModal();
  });
});
