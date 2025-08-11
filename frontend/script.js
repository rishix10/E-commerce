document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");

  fetch("/products")
    .then(res => res.json())
    .then(products => {
      productList.innerHTML = products.map(p => `
        <div class="product">
          <img src="${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>₹${p.price}</p>
          <button>Add to Cart</button>
        </div>
      `).join("");
    })
    .catch(err => console.error("Error loading products:", err));
});
