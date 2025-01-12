import data from "./database.js";

const productsList = document.querySelector('.products-list');

function createProductCard(product) {
    const li = document.createElement("li");
    li.classList.add("product-card");

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = "Imagem do produto";

    const div = document.createElement("div");
    div.classList.add("product-card-text");

    const category = document.createElement("span");
    category.classList.add("category");
    category.innerText = product.category;

    const name = document.createElement("h2");
    name.innerText = product.name;

    const description = document.createElement("p");
    description.innerText = product.description;

    const price = document.createElement("span");
    price.innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price);

    const addToCartBtn = document.createElement("button");
    addToCartBtn.innerText = "Adicionar ao carrinho";

    div.append(category, name, description, price, addToCartBtn);

    li.append(img, div);

    return li;
}

function init() {
    data.forEach((product) => {
        const li = createProductCard(product);
        productsList.appendChild(li);
    });
}

init();
