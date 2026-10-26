
const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const cartSummary = document.querySelector("#cart-summary");
const cartTotal = document.querySelector("#cart-total");
const clearCartButton = document.querySelector("#clear-cart");

// Получаем корзину из localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Сохраняем корзину
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Отрисовываем товары
function renderCart() {
  const cart = getCart();

  cartItems.replaceChildren();

  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const card = document.createElement("div");
    card.className = "card bg-dark text-light mb-3";

    const body = document.createElement("div");
    body.className = "card-body";

    const row = document.createElement("div");
    row.className = "row align-items-center g-3";

    const imageColumn = document.createElement("div");
    imageColumn.className = "col-4 col-md-2";

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.title;
    image.className = "img-fluid rounded";

    imageColumn.append(image);

    const infoColumn = document.createElement("div");
    infoColumn.className = "col-8 col-md-4";

    const title = document.createElement("h2");
    title.className = "h5";
    title.textContent = item.title;

    const price = document.createElement("p");
    price.className = "mb-0 text-secondary";
    price.textContent = `${item.price} ₽ за штуку`;

    infoColumn.append(title, price);

    const quantityColumn = document.createElement("div");
    quantityColumn.className = "col-6 col-md-3";

    const decreaseButton = document.createElement("button");
    decreaseButton.className = "btn btn-outline-light btn-sm";
    decreaseButton.textContent = "−";
    decreaseButton.setAttribute("aria-label", `Уменьшить количество: ${item.title}`);

    const quantity = document.createElement("span");
    quantity.className = "mx-3";
    quantity.textContent = item.quantity;

    const increaseButton = document.createElement("button");
    increaseButton.className = "btn btn-outline-light btn-sm";
    increaseButton.textContent = "+";
    increaseButton.setAttribute("aria-label", `Увеличить количество: ${item.title}`);

    decreaseButton.addEventListener("click", () => {
      const updatedCart = getCart();
      const product = updatedCart.find((product) => product.id === item.id);

      if (product.quantity > 1) {
        product.quantity -= 1;
      } else {
        const index = updatedCart.findIndex(
          (product) => product.id === item.id
        );
        updatedCart.splice(index, 1);
      }

      saveCart(updatedCart);
      renderCart();
    });

    increaseButton.addEventListener("click", () => {
      const updatedCart = getCart();
      const product = updatedCart.find((product) => product.id === item.id);

      product.quantity += 1;

      saveCart(updatedCart);
      renderCart();
    });

    quantityColumn.append(
      decreaseButton,
      quantity,
      increaseButton
    );

    const totalColumn = document.createElement("div");
    totalColumn.className = "col-6 col-md-3 text-md-end";

    const itemPrice = document.createElement("p");
    itemPrice.className = "fw-bold mb-2";
    itemPrice.textContent = `${itemTotal} ₽`;

    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-outline-danger btn-sm";
    removeButton.textContent = "Удалить";

    removeButton.addEventListener("click", () => {
      const updatedCart = getCart().filter(
        (product) => product.id !== item.id
      );

      saveCart(updatedCart);
      renderCart();
    });

    totalColumn.append(itemPrice, removeButton);

    row.append(
      imageColumn,
      infoColumn,
      quantityColumn,
      totalColumn
    );

    body.append(row);
    card.append(body);
    cartItems.append(card);
  });

  // Обновляем итоговую сумму и состояние корзины
  cartTotal.textContent = total.toLocaleString("ru-RU");
  cartEmpty.hidden = cart.length > 0;
  cartSummary.hidden = cart.length === 0;
}

// Очищаем корзину целиком
clearCartButton.addEventListener("click", () => {
  saveCart([]);
  renderCart();
});

// Показываем корзину при открытии страницы
renderCart();



const orderForm = document.querySelector("#order-form");
const orderMessage = document.querySelector("#order-message");

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const cart = getCart();

  if (cart.length === 0) {
    orderMessage.textContent = "Добавьте товары в корзину.";
    return;
  }

  if (!orderForm.checkValidity()) {
    orderForm.reportValidity();
    return;
  }

  const customerName = document
    .querySelector("#customer-name")
    .value
    .trim();

  orderMessage.textContent =
    `Спасибо, ${customerName}! Заказ успешно оформлен.`;

  saveCart([]);
  renderCart();
  orderForm.reset();
});

