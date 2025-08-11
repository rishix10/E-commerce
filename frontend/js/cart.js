const cartItemsContainer = document.getElementById("cart-items");
const cartTotalContainer = document.getElementById("cart-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

if (cart.length === 0) {
  cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  cartTotalContainer.innerHTML = "";
} else {
  let total = 0;
  cartItemsContainer.innerHTML = cart.map(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>Price: ₹${item.price}</p>
          <p>Quantity: ${item.qty}</p>
          <p>Subtotal: ₹${subtotal.toFixed(2)}</p>
        </div>
      </div>
    `;
  }).join("");

  cartTotalContainer.innerHTML = `Total: ₹${total.toFixed(2)}`;
}
