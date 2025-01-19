import data from "./database.js";

const categoriesFilters = document.querySelector("nav ul");
const emptyCart = document.querySelector(".empty-cart");
const fullCart = document.querySelector(".full-cart");
const cartProductsList = document.querySelector(".full-cart ul");
const productsList = document.querySelector('.products-list');
const emptyProductList = document.querySelector(".empty-product-list");
const searchForm = document.getElementById("search-form");
let cart = [];



/** essa função filtra os itens*/
function handleFilterCategory(event) {
    console.log(event.target);
    const category = event.target.dataset?.category;
    if (category) {

        const liSiblings = Array.from(event.target.parentElement.children);
        liSiblings.forEach((li) => li.classList.remove("active"));

        event.target.classList.add("active");
        
        if (category === "Todos") {
            listProducts(data);
            return;
        }

        const filteredData = data.filter((product) => product.category === category);
        listProducts(filteredData);
    }
}


/** essa função busca o produto para adicionar no carrinho e atualiza o array de produtos no carrinho. */

function handleAddToCart (event) {
    const productId = event.target.dataset.productId;
    const product = data.find((product) => product.id == productId);
    if (!cart.find((product) => product.id == productId)) {
        cart.push(product);
    }
    listCartProduct();
}

function handleRemoveFromCart(event) {
    const productId = event.target.dataset.productId;
    cart = cart.filter((product) => product.id != productId);
    listCartProduct()
}

/** essa função cria um elemento do produto no carrinho */

function createCartProduct(product) {
    const li = document.createElement("li");

    const divImgContainer = document.createElement("div");
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = "Imagem do produto";
    divImgContainer.appendChild(img);

    const divTextContatiner = document.createElement("div");
    const h4 = document.createElement("h4");
    h4.innerText = product.name;
    h4.classList.add("inter-title-4");
    
    const price = document.createElement("span");
    price.innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price);
    price.classList.add("price", "inter-body-semibold");

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Remover produto";
    removeBtn.classList.add("btn", "inter-body");
    removeBtn.dataset.productId = product.id;
    removeBtn.addEventListener("click", handleRemoveFromCart);

    divTextContatiner.append(h4, price, removeBtn);

    li.append(divImgContainer, divTextContatiner);
    return li;

}

/**
 * essa funcao recebe um produto (objeto) e cria um element li com as informacoes do produto.
 */
function createProductCard(product) {
    const li = document.createElement("li");
    li.classList.add("product-card");

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = "Imagem do produto";

    const div = document.createElement("div");
    div.classList.add("product-card-text");

    const category = document.createElement("span");
    category.classList.add("category", "inter-small");
    category.innerText = product.category;

    const name = document.createElement("h2");
    name.innerText = product.name;
    name.classList.add("inter-title-3");

    const description = document.createElement("p");
    description.innerText = product.description;
    description.classList.add("inter-body", "description");

    const price = document.createElement("span");
    price.innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price);
    price.classList.add("price", "inter-body-semibold");

    const addToCartBtn = document.createElement("button");
    addToCartBtn.innerText = "Adicionar ao carrinho";
    addToCartBtn.classList.add("btn", "inter-body-semibold");
    addToCartBtn.dataset.productId = product.id;
    addToCartBtn.addEventListener("click", handleAddToCart);

    div.append(category, name, description, price, addToCartBtn);

    li.append(img, div);

    return li;
}

/** essa função atualiza os totalizadores de quantidade e total do carrinho */

function updateTotalizers () {
    const quantity = cart.length;
    const total = cart.reduce((acc, current) => {
        return acc + current.price;
    }, 0);

    const cartAmount = document.querySelector(".cart-amount");
    const cartTotal = document.querySelector(".cart-total");

    cartAmount.innerText = quantity;
    cartTotal.innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total);

}

/** essa função atualiza a lista de produtos no carrinho */

function listCartProduct() {
    cartProductsList.innerHTML = "";

    if (cart.length === 0) {
        emptyCart.classList.remove("d-none");
        fullCart.classList.add("d-none");
        return;
    }

    emptyCart.classList.add("d-none");
    fullCart.classList.remove("d-none");


    cart.forEach((product) => {
        const li = createCartProduct(product);
        cartProductsList.appendChild(li);
    }); 

    updateTotalizers();

} 

/**
 * Essa funcao recebe uma lista de produtos, limpa o container dos produtos e usa a lista recebida para renderizar os produtos dela.
 */
function listProducts(products) {
    productsList.innerHTML = '';

    if (products.length === 0) {
        productsList.classList.add("d-none");
        emptyProductList.classList.remove("d-none");
        return;

    }

    productsList.classList.remove("d-none");
    emptyProductList.classList.add("d-none");

    products.forEach((product) => {
        const li = createProductCard(product);
        productsList.appendChild(li);
    });
}

/**
 * Callback function pro evento de submit do formulario de pesquisa de produtos.
 */
function handleSearchSubmit(event) {
    event.preventDefault();
    const searchText = event.target.search.value;

    const filteredData = data.filter((product) => (
        product.name.toLowerCase().includes(searchText) || 
        product.description.toLocaleLowerCase().includes(searchText) || 
        product.price.toString().includes(searchText) || 
        product.category.toLocaleLowerCase().includes(searchText)
    ));

    if (filteredData.length) {
        listProducts(filteredData);
    }
}

/**
 * Funcao para inicializar o carregamento dos produtos, adicionar event listener quando o script for carregado.
 */
function init() {
    listProducts(data);
    searchForm.addEventListener("submit", handleSearchSubmit);
    categoriesFilters.addEventListener("click", handleFilterCategory);
}

init();
