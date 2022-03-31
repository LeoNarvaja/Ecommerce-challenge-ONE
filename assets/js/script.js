const button = document.querySelector("#toggle-search")
const navSearch = document.querySelector("#nav-search")

button.addEventListener("click", () => {
    navSearch.classList.toggle("show");
})