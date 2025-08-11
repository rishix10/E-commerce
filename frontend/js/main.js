const productList = document.getElementById("product-list");

// Fetch products from backend
fetch("/products")
  .then(res => res.json())
  .then(products => {
    // Render product cards with data attributes on button
    productList.innerHTML = products.map(p => `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}" />
        <h2>${p.name}</h2>
        <p>₹${p.price}</p>
        <button 
          class="add-to-cart" 
          data-id="${p.id}" 
          data-name="${p.name.replace(/'/g, "\\'")}" 
          data-price="${p.price}" 
          data-image="${p.image}">
          Add to Cart
        </button>
      </div>
    `).join("");

    // Add click event listeners to all Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', () => {
        const id = Number(button.dataset.id);
        const name = button.dataset.name;
        const price = Number(button.dataset.price);
        const image = button.dataset.image;
        addToCart(id, name, price, image);
      });
    });
  })
  .catch(err => {
    productList.innerHTML = "<p>Failed to load products.</p>";
    console.error(err);
  });

// Add product to cart in localStorage
function addToCart(id, name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, image, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}
