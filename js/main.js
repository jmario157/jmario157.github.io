let products = [];

fetch("./js/products.json")
    .then(response => response.json())
    .then(data => {
        products = data;
        loadProducts(products);
    })

const containerProducts = document.querySelector("#container-products");
const btnCategories = document.querySelectorAll(".btn-links");
const mainTitle = document.querySelector("#main-title");
let aggBtn = document.querySelectorAll(".btn-agg");
const number = document.querySelector("#number");


function loadProducts(chooseProduct){

    containerProducts.innerHTML = "";

    chooseProduct.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <img class="product-img" src="${product.img}" alt="${product.title}">
            <div class="detail-product">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">Lps.${product.price}</p>
                <button class="btn-agg" id="${product.id}">Agregar</button>
            </div>
        `;

        containerProducts.append(div);
    })
    updateBtnAgg();
}

btnCategories.forEach(btn => {
    btn.addEventListener("click", (e) =>{
        btnCategories.forEach(btn => btn.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "All"){
            const categoryProduct = products.find(product => product.categoria.id === e.currentTarget.id);
            mainTitle.innerText = categoryProduct.categoria.id;
            const productBtn = products.filter(product => product.categoria.id === e.currentTarget.id);
            loadProducts(productBtn);
        }
        else{
            mainTitle.innerText = "Todos los Productos";
            loadProducts(products)
        }
    })
});

function updateBtnAgg(){
    aggBtn = document.querySelectorAll(".btn-agg");

    aggBtn.forEach(btn => {
        btn.addEventListener("click", addToCar);
    });
}

let productsInCar
let productsInCartLS = localStorage.getItem("Productos-Carrito");

if (productsInCartLS){
    productsInCar =  JSON.parse(productsInCartLS);
    updateNumber();
}
else{
    productsInCar = [];   //array vacio de objetos
}


function addToCar(e){
    Toastify({
        text: "Agregado",
        duration: 1500,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: "linear-gradient(to right, #432818, #99582a)",
        borderRadius: "2rem",
        textTransform: "uppercase",
        fontSize: ".75rem",
        },
        onClick: function(){} // Callback after click
    }).showToast();

    const idBtn =e.currentTarget.id;
    const aggProduct = products.find(product => product.id === idBtn);

    if(productsInCar.some(product => product.id === idBtn)){
        const index = productsInCar.findIndex(product => product.id === idBtn);
        productsInCar[index].amount++;
    }
    else{
        aggProduct.amount = 1;
        productsInCar.push(aggProduct);
    }
    updateNumber();

    localStorage.setItem("Productos-Carrito", JSON.stringify(productsInCar));
}

function updateNumber(){
    let newNumber = productsInCar.reduce((acc, product) => acc + product.amount, 0);
    number.innerText = newNumber;
}