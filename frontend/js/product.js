// product.js

const productDetails = document.getElementById("product-details");
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

fetch(`http://localhost:5000/api/products/${productId}`)
  .then(res => res.json())
  .then(product => {
    productDetails.innerHTML = `
      <img src="images/${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p><strong>₹${product.price}</strong></p>
      <button onclick="addToCart(${product.id})" class="btn">Add to Cart</button>
    `;
  })
  .catch(err => console.error("Error fetching product details:", err));

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
}
