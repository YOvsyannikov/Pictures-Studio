const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector); // Работаем с элементов (стрелочка)

// Изначально элемент скрыт в css-opacity. 
// Элемент появляется и исчезает когда пользователь проскроливает контент на определенные пиксели.
    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1650) {
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    });
// ----------- Scrolling with request animation frame (raf)

// Получаем все ссылки по определенным селекторам
let links = document.querySelectorAll('[href^="#"]'),
// Скорость скролинга
        speed = 0.2;
// Перебираем все ссылки которые получили и навешиваем собития    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;

            requestAnimationFrame(step);
// Функция которая занимается анимацией
            function step(time) {
                if (start === null) { // Проверка, запускается ли эта операция первый раз.
                    start = time; // Запускается операция
                }

                let progress = time - start,
// Переменная отвечает за количество пикселей, 
//на которые нам необходимо пролестать в течении анимации
                    r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));

                    document.documentElement.scrollTo(0, r);

                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    });

// -------------- Pure JS scrolling ---------------

// // Реализация плавного скрола
//     const element = document.documentElement,
//         body = document.body;
// // Функция подсчета пролистывания и способ
//     const calcScroll = () => {
//         upElem.addEventListener('click', function(event) {
//             let scrollTop = Math.round(body.scrollTop || element.scrollTop);

//             if (this.hash !==""){
//                 event.preventDefault();
//                 let hashElement = document.querySelector(this.hash),
//                     hashElementTop = 0;

//                 while (hashElement.offsetParent) {
//                     hashElementTop += hashElement.offsetTop;
//                     hashElement = hashElement.offsetParent;
//                 }
//                 hashElementTop = Math.round(hashElementTop);
//                 smoothScroll(scrollTop, hashElementTop, this.hash);
//             }
//         });
//     };

//     const smoothScroll = (from, to, hash) => {
//         let timeInterval = 1,
//         prevScrollTop,
//         speed;

//         if (to > from) {
//             speed = 30;
//         } else {
//             speed = -30;
//         }

//         let move = setInterval(function() {
//             let scrollTop = Math.round(body.scrollTop || element.scrollTop);
// Услови гарантирует то что мы точно долестали до нужного момента
//             if (
//                 prevScrollTop === scrollTop ||
//                 (to > from && scrollTop >= to) ||
//                 (to < from && scrollTop <= to)
//             ) {
//                 clearInterval(move);
//                 history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
//             } else {
//                 body.scrollTop += speed;
//                 element.scrollTop += speed;
//                 prevScrollTop = scrollTop;
//             }
//         }, timeInterval);
//     };
//     calcScroll();
};

export default scrolling;