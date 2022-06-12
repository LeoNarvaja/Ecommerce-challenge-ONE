import { productServices } from "../services/product-services.js";

const url = new URL(window.location);
const admin = url.searchParams.get("user");

const createCard = (imagen, nombre, precio, id) => {
    const card = document.createElement("div");
    card.classList.add("products__card");
    if(admin === null) {
        let content = `
            <img class="products__image" src="../assets/img/${imagen}" alt="${imagen}">
            <h3 class="products__name">${nombre}</h3>
            <p class="products__price">${precio}</p>
            <a href="../screens/producto.html?id=${id}" class="products__option">Ver producto</a>`
        
        card.innerHTML = content
            
    } else if (admin == "admin") {
        let content = `
            <img class="products__image" src="../assets/img/${imagen}" alt="${imagen}">
            <h3 class="products__name">${nombre}</h3>
            <p class="products__price">${precio}</p>
            <div class="products__option___box">
                <a href="../screens/producto.html?id=${id}&user=admin" class="products__option">Ver producto</a>
                <div class="products__icons___box">
                    <a href="../screens/producto_editar.html?id=${id}&user=admin" class="products__option" data-edit><i class="fa-solid fa-pen-to-square"></i></a>
                    <a id="${id}" class="products__option" data-del><i class="fa-solid fa-trash-can"></i></a>
                </div>
            </div>`    
        card.innerHTML = content
        const btnDel = card.querySelector("[data-del]");
        btnDel.addEventListener("click", async () => {
            const id = btnDel.id
            try {
                const res = await productServices.eliminarProducto(id);
                if(res.ok){
                    let timerInterval
                    Swal.fire({
                        title: 'Producto Eliminado!!',
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            },
                            illClose: () => {
                            clearInterval(timerInterval)
                        }
                        }).then((result) => {
                        /* Read more about handling dismissals below */
                         if (result.dismiss === Swal.DismissReason.timer) {
                            location.reload();
                        }
                    })
                } else {
                    throw new Error();
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'An error has occurred!!',
                    footer: 'Please, try again later'
                });
            }
        })
    }
    
    return card
}

export const showCard = {
    createCard
}