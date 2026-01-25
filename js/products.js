const product_list = document.querySelector("#products");
let cart = [];
let i = 0;

// JSON faylni fetch qilish
fetch("db/data.json")
  .then((res) => res.json())
  .then((data) => {
    // Barcha kategoriyalardan mahsulotlarni tekislashtirish
    const products = data.categories.flatMap((cat) =>
      cat.products.map((p) => ({
        name: p.name,
        brand: p.brand,
        price: p.price,
        images: p.img,
      })),
    );

    renderProducts(products);
  })
  .catch((err) => console.error("JSON yuklashda xatolik:", err));

function renderProducts(products) {
  products.forEach((prod, index) => {
    let html = `
            <div class="product-card">
                <div class="product-card-img">
                    <img src="${prod.images[0]}" alt="">
                    <img src="${prod.images[1] || prod.images[0]}" alt="">
                </div>
                <div class="product-card-info">
                    <div class="product-card-name">${prod.name}</div>
                    <div class="product-card-price">$${prod.price}</div>
                    <button 
                        class="btn-flat btn-hover add-to-cart-btn"
                        data-name="${prod.name}"
                        data-price="${prod.price}"
                        data-image="${prod.images[0]}"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    product_list.insertAdjacentHTML("beforeend", html);
  });

  setupCartButtons();
}

function addToCart(name, price, image, btn) {
  cart.push({ name, price, image });
  displayCart();
  showModal();
  // Tugma effekt
  const oldText = btn.innerText;
  btn.innerText = "Added ✅";
  btn.disabled = true;
  btn.style.backgroundColor = "#4CAF50";

  setTimeout(() => {
    btn.innerText = oldText;
    btn.disabled = false;
    btn.style.backgroundColor = "";
  }, 1500);
}

function displayCart() {
  let cartHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    cartHTML += `
            <div class="cart-item">
                <img src="${item.image}" width="50">
                <span>${item.name} - $${item.price}</span>
                <button onclick="removeFromCart(${index})">X</button>
            </div>
        `;
  });
  document.getElementById("cartItem").innerHTML =
    cartHTML || "Your cart is empty";
  document.getElementById("count").innerText = cart.length;
  document.getElementById("total").innerText = `$${total}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  displayCart();
}

function setupCartButtons() {
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const name = this.dataset.name;
      const price = Number(this.dataset.price);
      const image = this.dataset.image;

      addToCart(name, price, image, this);
    });
  });
}
const modal = document.getElementById("addModal");
const closeModal = document.getElementById("closeModal");

function showModal() {
  modal.style.display = "flex";

  // 2 sekunddan keyin o‘zi yopiladi
  setTimeout(() => {
    modal.style.display = "none";
  }, 2000);
}

// Yopish tugmasi
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
