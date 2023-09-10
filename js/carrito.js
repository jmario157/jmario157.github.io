let productsInCart = localStorage.getItem("Productos-Carrito");
productsInCart = JSON.parse(productsInCart);

const emptyCarContainer = document.querySelector("#empty-car");
const productssCarContainer = document.querySelector("#productss-car");
const actionCarContainer = document.querySelector("#actions-car");
const fullCarContainer = document.querySelector("#full-car");
let deleteBtn = document.querySelector(".dlt-product-car");
const emptyBtn = document.querySelector("#dlt-actions-car");
const totalContainer = document.querySelector("#total");
const buyBtn = document.querySelector("#buy-actions-car")

function loadProductsCar(){
    if (productsInCart && productsInCart.length > 0) {

        emptyCarContainer.classList.add("disabled");
        productssCarContainer.classList.remove("disabled");
        actionCarContainer.classList.remove("disabled");
        fullCarContainer.classList.add("disabled");
    
        productssCarContainer.innerHTML = "";
    
        productsInCart.forEach(product => {
            const div = document.createElement("div");
            div.classList.add("product-car");
            div.innerHTML = `
                <img class="product-img-car" src="${product.img}" alt="${product.title}">
                <div class="title-product-car">
                    <small>Titulo</small>
                    <h3>${product.title}</h3>
                </div>
                <div class="cant-product-car">
                    <small>Cantidad</small>
                    <p>${product.amount}</p>
                </div>
                <div class="price-product-car">
                    <small>Precio</small>
                    <p>${product.price}</p>
                </div>
                <div class="sub-product-car">
                    <small>Subtotal</small>
                    <p>${product.price * product.amount}</p>
                </div>
                <button class="dlt-product-car" id="${product.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            productssCarContainer.append(div);
        });
    } else {
        emptyCarContainer.classList.remove("disabled");
        productssCarContainer.classList.add("disabled");
        actionCarContainer.classList.add("disabled");
        fullCarContainer.classList.add("disabled");
    }

    updateBtnDelete();
    updateTotal();
}

loadProductsCar();

function updateBtnDelete(){
    deleteBtn = document.querySelectorAll(".dlt-product-car");

    deleteBtn.forEach(btn => {
        btn.addEventListener("click", deleteFromCar);
    });
}

function deleteFromCar(e){
    Toastify({
        text: "Eliminado",
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

    const idBtn = e.currentTarget.id;
    const index = productsInCart.findIndex(product => product.id === idBtn);
    productsInCart.splice(index, 1);
    loadProductsCar();
    localStorage.setItem("Productos-Carrito", JSON.stringify(productsInCart));
}

emptyBtn.addEventListener("click", emptyCart);

function emptyCart(){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
    })
    swalWithBootstrapButtons.fire({
        title: 'Estas Seguro?',
        text: `Se eliminaran ${productsInCart.reduce((acc, product) => acc + product.amount, 0)} productos`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            productsInCart.length = 0;
            localStorage.setItem("Productos-Carrito", JSON.stringify(productsInCart));
            loadProductsCar();
            swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Tus productos se eliminaron del carrito',
            'success'
            )
        } else if (
          /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
            'Cancelado',
            'No se borraron tus productos :)',
            'error'
            )
        }
    })
}

function updateTotal(){
    const totalCalculate = productsInCart.reduce((acc, product) => acc + (product.price * product.amount), 0);
    total.innerText = `Lps.${totalCalculate}`;
}

buyBtn.addEventListener("click", buyCart);

function buyCart(){
    productsInCart.length = 0;
    localStorage.setItem("Productos-Carrito", JSON.stringify(productsInCart));
    
    emptyCarContainer.classList.add("disabled");
    productssCarContainer.classList.add("disabled");
    actionCarContainer.classList.add("disabled");
    fullCarContainer.classList.remove("disabled");
}