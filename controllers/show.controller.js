import { productServices } from "../services/product-services.js";

const url = new URL(window.location);
const admin = url.searchParams.get("user");

const createCard = (imagen, nombre, precio, id) => {
    const card = document.createElement("div");
    card.classList.add("products__card");
    if(admin === null) {
        let content = `
            <img class="products__image" src="${imagen}" alt="Producto Imagen">
            <h3 class="products__name">${nombre}</h3>
            <p class="products__price">${precio}</p>
            <a href="../screens/producto.html?id=${id}" class="products__option">Ver producto</a>`;
        
        card.innerHTML = content;
            
    } else if (admin == "admin") {
        let content = `
            <img class="products__image" src="${imagen}" alt="Producto Imagen">
            <h3 class="products__name">${nombre}</h3>
            <p class="products__price">${precio}</p>
            <div class="products__option___box">
                <a href="../screens/producto.html?id=${id}&user=admin" class="products__option">Ver producto</a>
                <div class="products__icons___box">
                    <a href="../screens/producto_editar.html?id=${id}&user=admin" class="products__option" data-edit><i class="fa-solid fa-pen-to-square"></i></a>
                    <a id="${id}" class="products__option" data-del><i class="fa-solid fa-trash-can"></i></a>
                </div>
            </div>`;
        card.innerHTML = content;
        const btnDel = card.querySelector("[data-del]");
        btnDel.addEventListener("click", () => {
            const id = btnDel.id;
            try {
                document.querySelector(".nav__load").classList.add("show");
                Swal.fire({
                    title: 'Estas seguro que desea eliminar este producto?',
                    text: "Esta accion no se puede revertir!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, eliminar producto!',
                    cancelButtonText: 'Cancelar'
                  }).then( async (result) => {
                    if (result.isConfirmed) {
                        const res = await productServices.eliminarProducto(id);
                        if(res.ok) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Producto eliminado con éxito',
                                text: 'Presiona ok para continuar',
                                confirmButtonColor: '#2A7AE4',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                allowEnterKey: false,
                              }).then(result => {
                                if(result.isConfirmed){
                                  location.reload();
                                }
                              })
                        } else {
                            document.querySelector(".nav__load").classList.remove("show");
                            throw new Error();
                        }
                    }
                })
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
    }
    
    return card
}

export const showCard = {
    createCard
}