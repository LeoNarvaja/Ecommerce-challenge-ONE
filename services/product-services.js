const buscarProductos = (query) => fetch(`https://app-products-alurageek.herokuapp.com/productos?q=${query}`).then(res => res);

const listaProductos = () => fetch(`https://app-products-alurageek.herokuapp.com/productos`).then(res => res);

const crearProducto = (imagen, nombre, precio, descripcion, categoria) => {
    return fetch(`https://app-products-alurageek.herokuapp.com/productos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({imagen , nombre, precio, descripcion, id: uuid.v4(), categoria})
    });
};

const eliminarProducto = (id) => {
    return fetch(`https://app-products-alurageek.herokuapp.com/productos/${id}`, {
        method: "DELETE"
    });
};

const detalleProducto = (id) => {
    return fetch(`https://app-products-alurageek.herokuapp.com/productos/${id}`).then(res => res)
}

const actualizarProducto = (imagen, nombre, precio, id, descripcion, categoria) => {
    return fetch(`https://app-products-alurageek.herokuapp.com/productos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({imagen, nombre, precio, descripcion, categoria})
    })
}

export const productServices = {
    buscarProductos,
    crearProducto,
    eliminarProducto,
    detalleProducto,
    actualizarProducto,
    listaProductos
}