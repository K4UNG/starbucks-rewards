const menuBtn = document.querySelector('.menu-toggle');
const menu = document.querySelector('nav');
const menuIcon = document.querySelector('.menu');

const filter = document.querySelector('.filter');

menuBtn.onclick = () => {
    menu.classList.toggle('shown');
    menuIcon.classList.toggle('burger');
    document.body.classList.toggle('stop-scroll');

    if (menu.classList.contains('shown')) {
        filter.style.opacity = '1';
        filter.style['pointer-events'] = 'all';
    } else {
        filter.style.opacity = '0';
        filter.style['pointer-events'] = 'none';
    }
}

filter.onclick = () => {
    menu.classList.toggle('shown');
    menuIcon.classList.toggle('burger');
    document.body.classList.toggle('stop-scroll');
    
    filter.style.opacity = '0';
    filter.style['pointer-events'] = 'none';
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
        let left = 0;
        if (button.classList.contains('active')) {
            for (let i = 0; i < button.dataset.dis; i++) {
                left += buttons[i].offsetWidth
            }
            indicator.style.transform = `translateX(${left}px)`;
            indicator.style.width = button.offsetWidth + 'px';
            return;
        }
    })
}

changeIndicator();

window.onresize = changeIndicator;

const images = document.querySelectorAll('.extra-btn');
const closeBtns = document.querySelectorAll('.close');
const learn = document.querySelectorAll('.extra-text button');

const modals = {
    0: document.getElementById('modal-1'),
    1: document.getElementById('modal-2'),
    2: document.getElementById('modal-3')
}

images.forEach(image => {
    image.onclick = () => {
        modals[image.dataset.index].classList.toggle('modal-shown');
        document.body.classList.add('stop-scroll');
    }
})

learn.forEach(lrn => {
    lrn.onclick = () => {
        modals[lrn.dataset.index].classList.toggle('modal-shown');
        document.body.classList.add('stop-scroll');
    }
})

closeBtns.forEach(close => {
    close.onclick = () => {
        close.parentElement.parentElement.classList.remove('modal-shown');
        document.body.classList.remove('stop-scroll');
        close.nextElementSibling.style.transform = 'translateX(0)';
        close.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.style.opacity = '0';
        close.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.style['pointer-events'] = 'none';
        close.nextElementSibling.nextElementSibling.lastChild.previousElementSibling.style.opacity = '1';
        close.nextElementSibling.nextElementSibling.lastChild.previousElementSibling.style['pointer-events'] = 'all';
        
        removeDot();
        dots.forEach(dot => {
            if (dot.dataset.img == 0) {
                dot.classList.add('active-btn');
            }
        })
        close.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.firstChild.classList.add('active-btn');
    }
})

const dots = document.querySelectorAll('.slider-nav button');

dots.forEach(dot => {
    dot.onclick = () => {
        removeDot();
        dot.classList.add('active-btn');
        moveSlider(dot.parentElement.parentElement.previousElementSibling, dot.dataset.img);
        checkArrow(dot.parentElement, dot.dataset.img);
    }
})

function removeDot() {
    dots.forEach(dot => {
        dot.classList.remove('active-btn');
    })
}

function moveSlider(slider, dis) {
    slider.style.transform = `translateX(-${100 * dis}%)`;
}

const leftBtns = document.querySelectorAll('.left');
const rightBtns = document.querySelectorAll('.right');

leftBtns.forEach(left => {
    left.onclick = () => {
        let dis;
        dots.forEach(dot => {
            if (dot.classList.contains('active-btn')) {
                removeDot();
                dot.previousElementSibling.classList.add('active-btn');
                dis = dot.previousElementSibling.dataset.img;
            }
        })
        moveSlider(left.parentElement.previousElementSibling, dis);
        checkArrow(left.nextElementSibling, dis);
    }
})

rightBtns.forEach(right => {
    right.onclick = () => {
        let dis;
        let first = true;
        dots.forEach(dot => {
            if (dot.classList.contains('active-btn') && first && dot.parentElement.nextElementSibling == right) {
                removeDot();
                dot.nextElementSibling.classList.add('active-btn');
                dis = dot.nextElementSibling.dataset.img;
                first = false;
            }
        })
        moveSlider(right.parentElement.previousElementSibling, dis);
        checkArrow(right.previousElementSibling, dis);
    }
})

function checkArrow(parent, active) {
    if (active == (parent.parentElement.previousElementSibling.childElementCount - 1)) {
        parent.nextElementSibling.style.opacity = '0'
        parent.previousElementSibling.style.opacity = '1';

        parent.nextElementSibling.style['pointer-events'] = 'none'
        parent.previousElementSibling.style['pointer-events'] = 'all';
        
    } else if (active == 0) {
        parent.previousElementSibling.style.opacity = '0';
        parent.nextElementSibling.style.opacity = '1';

        parent.nextElementSibling.style['pointer-events'] = 'all'
        parent.previousElementSibling.style['pointer-events'] = 'none';
    } else {
        parent.previousElementSibling.style.opacity = '1';
        parent.nextElementSibling.style.opacity = '1';

        parent.nextElementSibling.style['pointer-events'] = 'all'
        parent.previousElementSibling.style['pointer-events'] = 'all';
    }
}

function hideLeft() {
    leftBtns.forEach(left => {
        left.style.opacity = '0';
        left.style['pointer-events'] = 'none';
    })
}

hideLeft();