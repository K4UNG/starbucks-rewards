const menuBtn = document.querySelector('.menu-toggle');
const menu = document.querySelector('nav');
const menuIcon = document.querySelector('.menu');

const filter = document.querySelector('.filter');


// ==========Menu button========
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

// ===============overlay background=========
filter.onclick = () => {
    menu.classList.toggle('shown');
    menuIcon.classList.toggle('burger');
    document.body.classList.toggle('stop-scroll');
    
    filter.style.opacity = '0';
    filter.style['pointer-events'] = 'none';
}

// =============tabs=============

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

window.onresize = changeIndicator; // adjust on screen resize

// ============popups==============

const images = document.querySelectorAll('.extra-btn'); // images
const closeBtns = document.querySelectorAll('.close'); // close btn
const learn = document.querySelectorAll('.extra-text button'); // Learn more button

// modals
const modals = {
    0: document.getElementById('modal-1'),
    1: document.getElementById('modal-2'),
    2: document.getElementById('modal-3')
}

// show/hide modal

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
        // hide modal and move back to first slider element
        close.parentElement.parentElement.classList.remove('modal-shown');
        document.body.classList.remove('stop-scroll');
        close.parentElement.parentElement.addEventListener('transitionend', () => {
            reset(close);
        }, {once: true})
        
        removeDot();
        dots.forEach(dot => {
            if (dot.dataset.img == 0) {
                dot.classList.add('active-btn');
            }
        })
        close.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.firstChild.classList.add('active-btn');
    }
})

document.querySelectorAll('.ok').forEach(ok => {
    ok.onclick = () => {
        // hide modal and move back to first slider element
        ok.parentElement.parentElement.classList.remove('modal-shown');
        document.body.classList.remove('stop-scroll');
        ok.parentElement.parentElement.addEventListener('transitionend', () => {
            reset(ok.parentElement.querySelector('.close'));
        }, {once: true})
        
        removeDot();
        dots.forEach(dot => {
            if (dot.dataset.img == 0) {
                dot.classList.add('active-btn');
            }
        })
        ok.previousElementSibling.querySelector('.slider-nav button:first-child').classList.add('active-btn');
    }
})

// slider nav buttons
const dots = document.querySelectorAll('.slider-nav button');

dots.forEach(dot => {
    dot.onclick = () => {
        removeDot();
        dot.classList.add('active-btn');
        moveSlider(dot.parentElement.parentElement.previousElementSibling, dot.dataset.img);
        checkArrow(dot.parentElement, dot.dataset.img);
    }
})

// remove active for all nav buttons
function removeDot() {
    dots.forEach(dot => {
        dot.classList.remove('active-btn');
    })
}

// slider mover
function moveSlider(slider, dis) {
    slider.style.transform = `translateX(-${100 * dis}%)`;
}

const leftBtns = document.querySelectorAll('.left');
const rightBtns = document.querySelectorAll('.right');


// -----left and right button / hide and show depending on position and move the slider
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


// decide if the left/right button should be visible or not
function checkArrow(parent, active) {
    if (active == (parent.parentElement.previousElementSibling.childElementCount - 1)) {
        parent.nextElementSibling.style.opacity = '0'
        parent.previousElementSibling.style.opacity = '1';

        parent.nextElementSibling.style['pointer-events'] = 'none'
        parent.previousElementSibling.style['pointer-events'] = 'all';
        parent.closest('.modal-container').querySelector('.ok').style.display = 'unset';
        
    } else if (active == 0) {
        parent.previousElementSibling.style.opacity = '0';
        parent.nextElementSibling.style.opacity = '1';

        parent.nextElementSibling.style['pointer-events'] = 'all'
        parent.previousElementSibling.style['pointer-events'] = 'none';
        parent.closest('.modal-container').querySelector('.ok').style.display = 'none';
    } else {
        parent.previousElementSibling.style.opacity = '1';
        parent.nextElementSibling.style.opacity = '1';

        parent.nextElementSibling.style['pointer-events'] = 'all'
        parent.previousElementSibling.style['pointer-events'] = 'all';
        parent.closest('.modal-container').querySelector('.ok').style.display = 'none';
    }
}

// reset left and right buttons to default state on close
function reset(close) {
    document.querySelectorAll('.ok').forEach(ok => { ok.style.display = 'none'});
    close.nextElementSibling.style.transform = 'translateX(0)';
    close.nextElementSibling.nextElementSibling.querySelector('.left').style.opacity = '0';
    close.nextElementSibling.nextElementSibling.querySelector('.left').style['pointer-events'] = 'none';
    close.nextElementSibling.nextElementSibling.querySelector('.right').style.opacity = '1';
    close.nextElementSibling.nextElementSibling.querySelector('.right').style['pointer-events'] = 'all';
}

// hide left button on load
(function() {
    leftBtns.forEach(left => {
        left.style.opacity = '0';
        left.style['pointer-events'] = 'none';
    })
})();


// =============== code input ============

const input = document.querySelector('.input input');
const inputContainer = document.querySelector('.input');

input.onfocus = () => {
    inputContainer.classList.add('moved');
}

input.addEventListener('focusout', () => {
    if (!input.value) {
        inputContainer.classList.remove('moved');
        input.style['border-color'] = 'red';
        inputContainer.style.color = 'red';
        warning.style.height = '15px';
    }
});

const warning = document.querySelector('.warn');

input.onkeyup = () => {
    if (input.value) {
        input.style['border-color'] = 'var(--green)';
        inputContainer.style.color = 'var(--green)';
        warning.style.height = '0';
    } else {
        input.style['border-color'] = 'red';
        inputContainer.style.color = 'red';
        warning.style.height = '1em';
    }
}

const pulseWrapper = document.querySelector('.pulse-wrapper');

inputContainer.onclick = (e) => {
    let xPos = e.clientX - inputContainer.offsetLeft;
    let yPos = e.pageY - inputContainer.offsetTop;
    let pulse = document.createElement('span');
    pulse.style.left = xPos + 'px';
    pulse.style.top = yPos + 'px';
    pulse.classList.add('pulse');
    pulseWrapper.append(pulse);
    setTimeout(() => { pulseWrapper.removeChild(pulse)}, 500)
}

inputContainer.closest('form').onsubmit = () => {
    return false;
}

// dropdowns

const dropdownBtns = document.querySelectorAll('.dropdown-head');

dropdownBtns.forEach(btn => {
    btn.onclick = () => {
        btn.querySelector('button').classList.toggle('spin');
        if (btn.querySelector('button').classList.contains('spin')) {
            btn.nextElementSibling.style.height = btn.nextElementSibling.querySelector('ul').offsetHeight + 'px';
        } else {
            btn.nextElementSibling.style.height = '0px';
        }
    }
})

function changeText() {
    const link = document.querySelector('.hero a');
    const startedOne = document.querySelector('.container-started');
    if (document.body.clientWidth >= '770') {
        link.textContent = 'Join in the app'
        startedOne.querySelector('h3').textContent = 'Create an account'
        startedOne.querySelector('p').innerHTML = `To get started, <a href='#'>join now.</a> You can also <a href='#'>join in the app</a> to get access to the full range of Starbucks® Rewards benefits.`;
    } else  {
        link.textContent = 'Or join online'
        startedOne.querySelector('h3').textContent = 'Download the Starbucks® app';
        startedOne.querySelector('p').innerHTML = `<a href='#'>Join in the app</a> to get access to the full range of Starbucks® Rewards benefits. 
        You can also <a href='#'>join online</a>.`;
    }
}

changeText();
window.onresize = changeText;

function setNavIndicator() {
    const active = document.querySelector('.top-nav ul li:nth-child(2)');
    const indicator = document.querySelector('.nav-indicator');
    indicator.style.left = active.offsetLeft + 'px';
    indicator.style.width = active.offsetWidth + 'px';
}

setNavIndicator();
window.onresize = setNavIndicator;