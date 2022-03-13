const menuBtn = document.querySelector('.menu-toggle');
const menu = document.querySelector('nav');
const menuIcon = document.querySelector('.menu');

menuBtn.onclick = () => {
    menu.classList.toggle('shown');
    menuIcon.classList.toggle('burger');
    document.body.classList.toggle('stop-scroll');
}

const buttons = document.querySelectorAll('.rewards button');
const indicator = document.querySelector('.indicator');

const tabs = document.querySelectorAll('.container-reward')

buttons.forEach(button => {
    button.onclick = () => {
        removeActive();
        button.classList.add('active');
        changeIndicator();
        tabs[button.dataset.dis].classList.add('active-tab');
    }
})

function removeActive() {
    buttons.forEach(button => {
        button.classList.remove('active');
    })
    tabs.forEach(tab => {
        tab.classList.remove('active-tab');
    })
}

function changeIndicator() {
    buttons.forEach(button => {
        if (button.classList.contains('active')) {
            indicator.style.transform = `translateX(${button.dataset.dis * button.offsetWidth}px)`;
            indicator.style.width = button.offsetWidth + 'px';
            return;
        }
    })
}

changeIndicator();

window.onresize = changeIndicator;