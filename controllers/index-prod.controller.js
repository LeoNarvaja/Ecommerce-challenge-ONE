import { productServices } from "../services/product-services.js";
import { showCard } from "./show.controller.js";


const boxStarwars = document.querySelector("[data-box-star-wars]"),
      boxConsolas = document.querySelector("[data-box-consolas]"),
      boxDiversos = document.querySelector("[data-box-diversos]");

const showStart = async () => {
    try {
        document.querySelector(".nav__load").classList.add("show");
        const res = await productServices.listaProductos();
        const resJson = await res.json();    
        
        if(res.ok) {
                resJson.forEach(({imagen, nombre, precio, id, categoria}) => {
                    const card = showCard.createCard(imagen, nombre, precio, id, categoria);
                    switch (categoria){
                        case "Star wars":
                            boxStarwars.appendChild(card);
                            break;
                        case "Consolas":
                            boxConsolas.appendChild(card);
                            break;
                        case "Diversos":
                            boxDiversos.appendChild(card);
                            break;
                    }
            });
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
          })
    }
    document.querySelector(".nav__load").classList.remove("show");
}

showStart();