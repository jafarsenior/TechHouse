const cartRoot = document.querySelector("#root");
const totalEl = document.querySelector("#total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const renderCart = () => {
  if (cart.length === 0) {
    cartRoot.innerHTML = "<p>Your cart is empty</p>";
    totalEl.textContent = "$0";
    return;
  }

  let total = 0;
  cartRoot.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item">
      <div class="cart-img">
        <img src="${item.img}" alt="">
      </div>
      <div class="cart-info">
        <h4>${item.name}</h4>
        <p>$${item.price} x ${item.qty}</p>
        <div class="cart-btns">
          <button class="qty-btn minus" data-id="${item.id}">-</button>
          <button class="qty-btn plus" data-id="${item.id}">+</button>
          <button class="remove-btn" data-id="${item.id}">Remove</button>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  totalEl.textContent = "$" + total;
};

renderCart();

// ======= Cart Buttons =======
cartRoot.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (!id) return;

  if (e.target.classList.contains("plus")) {
    cart = cart.map((item) =>
      item.id == id ? { ...item, qty: item.qty + 1 } : item
    );
  } else if (e.target.classList.contains("minus")) {
    cart = cart.map((item) =>
      item.id == id ? { ...item, qty: Math.max(1, item.qty - 1) } : item
    );
  } else if (e.target.classList.contains("remove-btn")) {
    cart = cart.filter((item) => item.id != id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
});
