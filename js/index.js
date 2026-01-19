let slide_index = 0;
let slide_play = true;
let slides = document.querySelectorAll(".slide");

hideAllSlide = () => {
  slides.forEach((e) => {
    e.classList.remove("active");
  });
};

showSlide = () => {
  hideAllSlide();
  slides[slide_index].classList.add("active");
};

nextSlide = () =>
  (slide_index = slide_index + 1 === slides.length ? 0 : slide_index + 1);
prevSlide = () =>
  (slide_index = slide_index - 1 < 0 ? slides.length - 1 : slide_index - 1);

document
  .querySelector(".slider")
  .addEventListener("mouseover", () => (slide_play = false));
document
  .querySelector(".slider")
  .addEventListener("mouseleave", () => (slide_play = true));

document.querySelector(".slide-next").addEventListener("click", () => {
  nextSlide();
  showSlide();
});

document.querySelector(".slide-prev").addEventListener("click", () => {
  prevSlide();
  showSlide();
});

const product_list = document.querySelector("#latest-products");

fetch("../db/data.json")
  .then((res) => res.json())
  .then((data) => {
    data.categories.forEach((category) => {
      category.products.forEach((p) => {
        let prod = `
          <div class="col-3 col-md-6 col-sm-12">
            <div class="product-card">
              <div class="product-card-img">
                <img src="${p.img[0]}" alt="">
                <img src="${p.img[1] || p.img[0]}" alt="">
              </div>

              <div class="product-card-info">
                <div class="product-btn">
                  <button class="btn-flat btn-hover btn-shop-now" data-id="${p.id}">shop now</button>
                  <button class="btn-flat btn-hover btn-cart-add" data-id="${p.id}">
                    <i class='bx bxs-cart-add'></i>
                  </button>
                  <button class="btn-flat btn-hover btn-cart-like">
                    <i class='bx bxs-heart'></i>
                  </button>
                </div>

                <div class="product-card-name">${p.name}</div>

                <div class="product-card-price">
                  <span>${p.brand}</span><br>
                  <span class="curr-price">$${p.price}</span>
                </div>
              </div>
            </div>
          </div>
        `;

        product_list.insertAdjacentHTML("beforeend", prod);
      });
    });
  })
  .catch((err) => console.log("JSON xatolik:", err));

// ======= Shop Now =======
product_list.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-shop-now")) {
    const id = e.target.dataset.id;
    window.location.href = `product-detail.html?id=${id}`;
  }

  // ======= Add to Cart =======
  const cartBtn = e.target.closest(".btn-cart-add");
  if (cartBtn) {
    const id = cartBtn.dataset.id;

    fetch("../db/data.json")
      .then((res) => res.json())
      .then((data) => {
        let product = null;
        data.categories.forEach((cat) => {
          cat.products.forEach((p) => {
            if (p.id == id) product = p;
          });
        });

        if (!product) return;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const exist = cart.find((item) => item.id == product.id);

        if (exist) {
          exist.qty += 1;
        } else {
          cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img[0],
            qty: 1,
          });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.href = "cartpage.html";
      });
  }
});



