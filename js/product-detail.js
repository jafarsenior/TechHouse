const mainImg = document.getElementById("main-img")
const thumbList = document.getElementById("thumb-list")
const nameEl = document.getElementById("product-name")
const brandEl = document.getElementById("product-brand")
const descEl = document.getElementById("product-desc")
const priceEl = document.getElementById("product-price")

const qtyEl = document.getElementById("product-qty")
const minusBtn = document.getElementById("qty-minus")
const plusBtn = document.getElementById("qty-plus")

// URL dan ID olish
const params = new URLSearchParams(window.location.search)
const productId = params.get("id")

let quantity = 1

// Quantity control
minusBtn.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--
    qtyEl.textContent = quantity
  }
})

plusBtn.addEventListener("click", () => {
  quantity++
  qtyEl.textContent = quantity
})

// JSON dan product olish
fetch("../db/data.json")
  .then(res => res.json())
  .then(data => {
    let found = null

    data.categories.forEach(cat => {
      cat.products.forEach(p => {
        if (p.id == productId) {
          found = p
        }
      })
    })

    if (!found) {
      document.querySelector(".product-row").innerHTML =
        "<h2>Product topilmadi ❌</h2>"
      return
    }

    // Textlarni joylash
    nameEl.textContent = found.name
    brandEl.textContent = found.brand
    descEl.textContent = found.description || "No description available"
    priceEl.textContent = `$${found.price}`

    // Asosiy rasm
    mainImg.src = found.img[0]

    // Thumbnails yaratish
    thumbList.innerHTML = ""
    found.img.forEach((src, index) => {
      const div = document.createElement("div")
      div.className = "product-img-item"
      div.innerHTML = `<img src="${src}" alt="">`

      div.addEventListener("click", () => {
        mainImg.src = src
      })

      thumbList.appendChild(div)
    })
  })
  .catch(err => console.log("Detail JSON xatolik:", err))
