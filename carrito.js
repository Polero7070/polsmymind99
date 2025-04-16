document.addEventListener('DOMContentLoaded', () => {
  // Referencias a elementos del DOM
  const cartContainer = document.createElement('div');
  cartContainer.classList.add('navbar-item', 'cart-container');
  cartContainer.innerHTML = `
    <img src="https://github.com/Polero7070/polsmymind99/blob/main/carrito.png?raw=true" alt="Carrito" class="navbar-icon">
    <span id="cart-badge" class="cart-badge">0</span>
    <div class="cart-dropdown" id="cart-dropdown">
      <p class="empty-message">Tu carrito está vacío</p>
      <ul class="cart-items" id="cart-items"></ul>
    </div>
  `;

  // Agregar el contenedor del carrito al header
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.appendChild(cartContainer);
  }

  // Elementos del carrito
  const cartBadge = document.getElementById('cart-badge');
  const cartDropdown = document.getElementById('cart-dropdown');
  const cartItems = document.getElementById('cart-items');
  const emptyMessage = document.querySelector('.empty-message');

  // Inicializar el carrito (localStorage para persistencia)
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Renderizar el contenido del carrito
  function renderCart() {
    cartItems.innerHTML = '';
    if (cart.length === 0) {
      emptyMessage.style.display = 'block';
    } else {
      emptyMessage.style.display = 'none';
      cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${item.name}</span>
          <span>${item.quantity}x</span>
          <button class="remove-item" data-index="${index}">&times;</button>
        `;
        cartItems.appendChild(li);
      });
    }
    cartBadge.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  }

  // Añadir un producto al carrito
  function addToCart(product) {
    const existingProduct = cart.find((item) => item.name === product.name);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ name: product.name, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }

  // Eliminar un producto del carrito
  cartItems.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }
  });

  // Mostrar/ocultar el desplegable del carrito
  cartContainer.addEventListener('mouseenter', () => {
    cartDropdown.classList.add('active');
  });
  cartContainer.addEventListener('mouseleave', () => {
    cartDropdown.classList.remove('active');
  });

  // Inicializar
  renderCart();

  // Ejemplo: Botón para añadir productos al carrito
  const addToCartButton = document.getElementById('add-to-cart');
  if (addToCartButton) {
    addToCartButton.addEventListener('click', () => {
      addToCart({ name: 'Producto Ejemplo' });
   `

