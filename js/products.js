const product_list = document.querySelector('#products');
let cart = [];
let i = 0;

// JSON faylni fetch qilish
fetch('db/data.json')
    .then(res => res.json())
    .then(data => {
        // Barcha kategoriyalardan mahsulotlarni tekislashtirish
        const products = data.categories.flatMap(cat => cat.products.map(p => ({
            name: p.name,
            brand: p.brand,
            price: p.price,
            images: p.img
        })));

        renderProducts(products);
    })
    .catch(err => console.error("JSON yuklashda xatolik:", err));

function renderProducts(products) {
    products.forEach(prod => {
        let html = `
            <div class="product-card">
                <div class="product-card-img">
                    <img src="${prod.images[0]}" alt="">
                    <img src="${prod.images[1] || prod.images[0]}" alt="">
                </div>
                <div class="product-card-info">
                    <div class="product-card-name">${prod.name}</div>
                    <div class="product-card-price">$${prod.price}</div>
                    <button class="btn-flat btn-hover" onclick="addToCart('${prod.name}', ${prod.price}, '${prod.images[0]}')">Add to Cart</button>
                </div>
            </div>
        `;
        product_list.insertAdjacentHTML('beforeend', html);
    });
}

function addToCart(name, price, image) {
    cart.push({name, price, image});
    displayCart();
}

function displayCart() {
    let cartHTML = '';
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
    document.getElementById('cartItem').innerHTML = cartHTML || "Your cart is empty";
    document.getElementById('count').innerText = cart.length;
    document.getElementById('total').innerText = `$${total}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}
