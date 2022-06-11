const search = document.querySelector("#search");

search.addEventListener("keypress", async (event) => {
    let text = event.target.value.toLowerCase();
    if(event.key == "Enter"){
        window.location.href = `../screens/busqueda.html?query=${text}`;
    }
})