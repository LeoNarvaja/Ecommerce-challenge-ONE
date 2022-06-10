
const buscarProductos = (query) => fetch(`https://app-products-alurageek.herokuapp.com/productos?q=${query}`).then(res => res.json());

export const productServices = {
    buscarProductos,
}