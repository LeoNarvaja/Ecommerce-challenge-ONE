import { productServices } from "../services/product-services.js";

const sendBtn = document.querySelector("[data-form]"),
      searchBtn = document.querySelector("[data-search]"),
      delBtn = document.querySelector("[data-delete]"),
      actImg = document.querySelector("[data-img]"),
      newImg = document.querySelector("[data-new]"),
      box = document.querySelector("[data-cont]"),
      text = document.querySelector("[data-text]");

let imgExist = false;

// Seleccionar imagen desde el boton.
searchBtn.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", (event) => {
        actImg.classList.add("hidden");
        newImg.classList.add("show");
        newImg.setAttribute("src", event.target.result);
        imgExist = true;
        delBtn.classList.add("show");
        inputs.imagen = true;
    })
})

// Determinar zona de arrastre para agregar imagen.
box.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if(imgExist){
        newImg.classList.remove("show");
    }
    actImg.classList.add("hidden");
    text.classList.add("show");
})

// Determinar cuando se abandona la zona de arrastre para agregar imagen.
box.addEventListener("dragleave", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if(imgExist){
        newImg.classList.add("show");
    } else {
        actImg.classList.remove("hidden"); 
    }
    text.classList.remove("show");
})

// Soltar archivo para agregar imagen.
box.addEventListener("drop", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", (event) => {
        text.classList.remove("show");
        newImg.classList.add("show");
        newImg.setAttribute("src", event.target.result);
        delBtn.classList.add("show");
        imgExist = true;
        inputs.imagen = true;
    })
})

// Eliminar imagen elegida de la zona de arrastre.
delBtn.addEventListener("click", (event) => {
    event.preventDefault();
    newImg.classList.remove("show");
    text.classList.remove("show");
    actImg.classList.remove("hidden");
    delBtn.classList.remove("show");
    imgExist = false;
    inputs.imagen = false;
})

sendBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    if(inputs.imagen && inputs.nombre && inputs.precio && inputs.descripcion) {
        let imagen = "",
        categoria = "";

        if(newImg.classList.contains("show")) {
            imagen = newImg.getAttribute("src");
        }

        const nombre = document.querySelector("[data-nombre]").value,
            precio = document.querySelector("[data-precio]").value,
            descripcion = document.querySelector("[data-descr]").value,
            options = document.getElementsByName("option");
            
        options.forEach(opc => {
            if(opc.checked) {
                categoria = opc.value;
            }
        });
        
        try {
            document.querySelector(".nav__load").classList.add("show");
            const res = await productServices.crearProducto(imagen, nombre, precio, descripcion, categoria);
            if(res.ok){
                Swal.fire({
                    icon: 'success',
                    title: 'Producto agregado con éxito',
                    text: 'Presiona ok para continuar',
                    confirmButtonColor: '#2A7AE4',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                }).then(result => {
                    if(result.isConfirmed){
                    window.location.href = `/screens/productos.html?user=admin`;
                    }
                })
            } else {
                document.querySelector(".nav__load").classList.remove("show");
                throw new Error();
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Ocurrio un error',
                text: 'Presiona ok para continuar',
                footer: '<p>Intentelo de nuevo más tarde</p>',
                confirmButtonColor: '#2A7AE4',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
            }).then(result => {
                if(result.isConfirmed){
                location.reload();
                }
            })
        }
        document.querySelector(".nav__load").classList.remove("show");
    } else {
        prodNuevo.forEach(input => {
            if(input.dataset.name == "imagen") {
                if(inputs[input.dataset.name] == false) {
                    input.parentElement.classList.add("error");
                    input.parentElement.querySelector(".contact__error").innerHTML = "Debe agregar una imagen para el producto";
                } else {
                    input.parentElement.classList.remove("error");
                    input.parentElement.querySelector(".contact__error").innerHTML = "";
                }
            } else if (inputs[input.dataset.name] == false) {
                input.parentElement.classList.add("error");
                input.parentElement.querySelector(".contact__error").innerHTML = mostrarMensaje(input.dataset.name, input)
            } 
        })
    }
})