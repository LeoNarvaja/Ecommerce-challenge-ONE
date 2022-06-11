const buscarProductos = (query) => fetch(`https://app-products-alurageek.herokuapp.com/productos?q=${query}`).then(res => res);

const listaProductos = () => fetch(`https://app-products-alurageek.herokuapp.com/productos`).then(res => res);

const crearProducto = (nombre, precio) => {
    return fetch(`https://app-products-alurageek.herokuapp.com/productos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({imagen: 'Skill_1.png', nombre, precio, id: uuid.v4()})
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

const actualizarProducto = (nombre, precio, id) => {
    return fetch(`https://app-products-alurageek.herokuapp.com/productos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nombre, precio})
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