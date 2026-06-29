const products = {
  large: {
    title: "Large Chicken Pickle",
    price: "$25.00",
    image: "assets/chicken-pickle-large.png",
    description: "400g of our signature Chicken Pickle in a glass jar."
  },
  small: {
    title: "Small Chicken Pickle",
    price: "$14.00",
    image: "assets/chicken-pickle-small.png",
    description: "A smaller jar of our signature Chicken Pickle for first tastes and weeknight meals."
  }
};

const body = document.body;
const mobileMenu = document.querySelector("[data-mobile-menu]");
const cartDrawer = document.querySelector("[data-cart-drawer]");
const contactDrawer = document.querySelector("[data-contact-drawer]");
const productModal = document.querySelector("[data-product-modal]");
const formStatus = document.querySelector("[data-form-status]");

function setOpen(element, open) {
  element.classList.toggle("is-open", open);
  element.setAttribute("aria-hidden", String(!open));
  const anyOpen = [mobileMenu, cartDrawer, contactDrawer, productModal].some((item) => item.classList.contains("is-open"));
  body.classList.toggle("is-locked", anyOpen);
}

function closeAll() {
  [mobileMenu, cartDrawer, contactDrawer, productModal].forEach((element) => setOpen(element, false));
}

document.querySelectorAll("[data-menu-open]").forEach((button) => {
  button.addEventListener("click", () => setOpen(mobileMenu, true));
});

document.querySelectorAll("[data-menu-close], .mobile-menu a").forEach((control) => {
  control.addEventListener("click", () => setOpen(mobileMenu, false));
});

document.querySelectorAll("[data-cart-open]").forEach((button) => {
  button.addEventListener("click", () => setOpen(cartDrawer, true));
});

document.querySelectorAll("[data-cart-close]").forEach((button) => {
  button.addEventListener("click", () => setOpen(cartDrawer, false));
});

document.querySelectorAll("[data-contact-open]").forEach((button) => {
  button.addEventListener("click", () => setOpen(contactDrawer, true));
});

document.querySelectorAll("[data-contact-close]").forEach((button) => {
  button.addEventListener("click", () => setOpen(contactDrawer, false));
});

document.querySelectorAll("[data-product]").forEach((button) => {
  button.addEventListener("click", () => {
    const product = products[button.dataset.product];
    document.querySelector("[data-modal-title]").textContent = product.title;
    document.querySelector("[data-modal-price]").textContent = product.price;
    document.querySelector("[data-modal-description]").textContent = product.description;
    const image = document.querySelector("[data-modal-image]");
    image.src = product.image;
    image.alt = `Placeholder image for ${product.title}`;
    setOpen(productModal, true);
  });
});

document.querySelectorAll("[data-modal-close]").forEach((control) => {
  control.addEventListener("click", () => setOpen(productModal, false));
});

document.querySelector("[data-contact-form]").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  formStatus.textContent = name
    ? `Thanks, ${name}. This prototype saved your note locally.`
    : "Thanks. This prototype saved your note locally.";
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAll();
  }
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    if (mobileMenu.classList.contains("is-open")) {
      setOpen(mobileMenu, false);
    }
  });
});
