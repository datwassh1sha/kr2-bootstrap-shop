const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const product = products[productId];

const productDetails = document.querySelector("#product-details");
const productSpecifications = document.querySelector(
  "#product-specifications",
);
const productNotFound = document.querySelector("#product-not-found");

if (!product) {
  productDetails.classList.add("d-none");
  productSpecifications.classList.add("d-none");
  productNotFound.classList.remove("d-none");

  document.querySelector("#breadcrumb-product").textContent =
    "Товар не найден";

  document.title = "Товар не найден | Hot Wheels Deals";
} else {
  // Название и изображение
  document.querySelector("#product-title").textContent = product.title;

  const image = document.querySelector("#product-image");
  image.src = product.image;
  image.alt = product.imageAlt;

  // Описание и цена
  document.querySelector("#product-short-description").textContent =
    product.shortDescription;

  document.querySelector("#product-description").textContent =
    product.description;

  document.querySelector("#product-price").textContent =
    `${product.price.toLocaleString("ru-RU")} ₽`;

  // Хлебные крошки и заголовок вкладки
  document.querySelector("#breadcrumb-product").textContent = product.title;
  document.title = `${product.title} | Hot Wheels Deals`;

  // Характеристики
  document.querySelector("#product-manufacturer").textContent =
    product.manufacturer;

  document.querySelector("#product-scale").textContent = product.scale;
  document.querySelector("#product-material").textContent = product.material;
  document.querySelector("#product-series").textContent = product.series;

// Бейдж товара
const badge = document.querySelector("#product-badge");

badge.textContent = product.badge || "";
badge.hidden = !product.badge;

badge.classList.remove(
  "product-badge--new",
  "product-badge--limited",
  "product-badge--hit",
);

if (product.badge === "Новинка") {
  badge.classList.add("product-card__badge--new");
} else if (product.badge === "Лимитка") {
  badge.classList.add("product-card__badge--limited");
} else if (product.badge === "Хит") {
  badge.classList.add("product-card__badge--hit");
}

  // Наличие
  const status = document.querySelector("#product-status");

  if (product.available) {
    status.className = "product-status product-status--available";
    status.textContent = "● В наличии";
  } else {
    status.className = "product-status product-status--unavailable";
    status.textContent = "● Нет в наличии";
  }
}
