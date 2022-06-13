import { productServices } from "../services/product-services.js";

const form = document.querySelector("[data-form]");

const searchBtn = document.querySelector("[data-search]");
const delBtn = document.querySelector(".newproduct__btn___del");
const actImg = document.querySelector("[data-img]");
const newImg = document.querySelector("[data-new]");
const box = document.querySelector("[data-hola]");
const text = document.querySelector(".newproduct__newtext");
let imgExist = false;

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
    })
})

box.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if(imgExist){
        newImg.classList.remove("show");
    }
    actImg.classList.add("hidden");
    text.classList.add("show");
})

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
        img = event.target.result;
    })
})

delBtn.addEventListener("click", (event) => {
    event.preventDefault();
    newImg.classList.remove("show");
    text.classList.remove("show");
    actImg.classList.remove("hidden");
    delBtn.classList.remove("show");
    imgExist = false;
})

form.addEventListener("click", async (event) => {
    event.preventDefault();
    let imagen = ""
    if(newImg.classList.contains("show")) {
        imagen = newImg.getAttribute("src");
    }
    let categoria = "";
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const descripcion = document.querySelector("[data-descr]").value;
    const options = document.getElementsByName("option");
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
})