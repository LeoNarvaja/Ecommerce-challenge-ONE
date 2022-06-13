
// Resultados de busqueda de productos desde la barra de busqueda.
const buscarProductos = (query) => fetch(`https://app-products-alurageek.herokuapp.com/productos?q=${query}`).then(res => res);

// CRUD, Accediendo a la lista de productos de la tienda.
const listaProductos = () => fetch(`https://app-products-alurageek.herokuapp.com/productos`).then(res => res);

// CRUD, Creado un nuevo producto para la tienda.
const crearProducto = (imagen, nombre, precio, descripcion, categoria) => {
    return fetch(`https://app-products-alurageek.herokuapp.com/productos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({imagen , nombre, precio, descripcion, id: uuid.v4(), categoria})
    });
};

// CRUD, Eliminado un producto existente en la tienda.
const eliminarProducto = (id) => {
    return fetch(`https://app-products-alurageek.herokuapp.com/productos/${id}`, {
        method: "DELETE"
    });
};

// CRUD, Accediendo a todos los detalles de los productos de la tienda.
const detalleProducto = (id) => {
    return fetch(`https://app-products-alurageek.herokuapp.com/productos/${id}`).then(res => res)
}

// CRUD, Actualizando datos de un producto de la tienda.
const actualizarProducto = (imagen, nombre, precio, id, descripcion, categoria) => {
    return fetch(`https://app-products-alurageek.herokuapp.com/productos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({imagen, nombre, precio, descripcion, categoria})
    })
}

// Exportar las funciones para utilizarlas en las respectivas consultas.
export const productServices = {
    buscarProductos,
    crearProducto,
    eliminarProducto,
    detalleProducto,
    actualizarProducto,
    listaProductos
}