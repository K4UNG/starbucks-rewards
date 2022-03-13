const menuBtn = document.querySelector('.menu-toggle');
const menu = document.querySelector('nav');

menuBtn.onclick = () => {
    menu.classList.toggle('shown');
}