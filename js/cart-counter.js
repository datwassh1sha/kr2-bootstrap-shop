function updateCartCounter() {
  const cartCount = document.querySelector("#cart-count");

  if (!cartCount) {
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalQuantity = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  cartCount.textContent = totalQuantity;
}

updateCartCounter();
window.addEventListener("cartUpdated", updateCartCounter);