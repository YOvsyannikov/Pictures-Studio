const sliders = (slides, dir, prev, next) => {
let slideIndex = 1,
    paused = false;
const items = document.querySelectorAll(slides);
// Функция отвечает за перемещение слайдера (индекс)
    function showSlides(n) {
        if (n > items.length) {   // Если количество слайдов больше длинны всех слайдов, возвращаем в начало
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = items.length;  // Если количество слайдов меньше длинны всех слайдов, возвращаем в конец
        }

        items.forEach(item => {
            item.classList.add('animated');
            item.style.display = 'none';   //Если показывается определенный слайд, остальные скрыты
        });  
        items[slideIndex - 1].style.display = 'block';
    }

    showSlides(slideIndex);

    function changeSlides(n) {
        showSlides(slideIndex += n);
    }
// Функция кнопок в слайдере
    try {
        const prevBtn = document.querySelector(prev),
            nextBtn = document.querySelector(next);

        prevBtn.addEventListener('click', () => {
            changeSlides(-1);
            items[slideIndex - 1].classList.remove('backInLeft');
            items[slideIndex - 1].classList.add('backInRight');
        });

        nextBtn.addEventListener('click', () => {
            changeSlides(1);
            items[slideIndex - 1].classList.remove('backInRight');
            items[slideIndex - 1].classList.add('backInLeft');
        });
    } catch(e){}
// Условия выполнения в автоматическом режиме для вертикального слайдера
    function activateAnimation() {
        if (dir === 'vertical') {
            paused = setInterval(function() {
                changeSlides(1);
                items[slideIndex - 1].classList.add('backInDown');
            }, 3000);
// Условия выполнения в автоматическом режиме для горизонтального слайдера            
        } else {
            paused = setInterval(function() {
                changeSlides(1);
                items[slideIndex - 1].classList.remove('backInRight');
                items[slideIndex - 1].classList.add('backInLeft');
            }, 3000);
        }
    }
    activateAnimation();
// При наведении мышккой на слайдер, слайдер останавливается
items[0].parentNode.addEventListener('mouseenter', () => {
    clearInterval(paused);
});
//Когда мышку забираем сщ слайдера, слайдер продолжает работать
items[0].parentNode.addEventListener('mouseleave', () => {
    activateAnimation();
});

};

export default sliders;