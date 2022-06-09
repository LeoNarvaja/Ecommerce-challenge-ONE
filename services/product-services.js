
const buscarProductos = (query) => fetch(`http://localhost:3000/productos?q=${query}`).then(res => res.json());

export const productServices = {
    buscarProductos,
}