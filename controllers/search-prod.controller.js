const search = document.querySelector("#search");

const url = new URL(window.location);
const admin = url.searchParams.get("user");

search.addEventListener("keypress", async (event) => {
    let text = event.target.value.toLowerCase();
    if(event.key == "Enter"){
        if(admin === null) {
            window.location.href = `../screens/busqueda.html?query=${text}`;
        } else if (admin == "admin") {
            window.location.href = `../screens/busqueda.html?query=${text}&user=admin`;
        };
    };
});