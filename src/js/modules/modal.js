// Создаем переменную модалбного окна с фунцией и ее свойствами
const modals = () => {
     let btnPressed = false; // Проверяем была ли нажата хоть какая то кнопка

    function bindModal(
         triggerSelector,
         modalSelector,
         closeSelector,
         destroy = false
    ) {
         const trigger = document.querySelectorAll(triggerSelector),
             modal = document.querySelector(modalSelector),
             close = document.querySelector(closeSelector),
             windows = document.querySelectorAll('[data-modal]'),
             scroll = calcScroll();
// Открытие всех модальных окон
         trigger.forEach(item => {
              item.addEventListener('click', (e) => {
              if (e.target) {
                   e.preventDefault();
              }

              btnPressed = true; // Пользователь клинкул хоть на одну кнопку

// Если тригер подарка true, то мы его удаляем со страницы
              if (destroy){
               item.remove();
              }

              windows.forEach(item => {
                   item.style.display = 'none';
                   item.classList.add('animated', 'fadeIn'); //Анимация для модального окна
              });

              modal.style.display = "block";
              document.body.style.overflow = "hidden";
// Относится к коду "Убирает скачек сайта"
              document.body.style.marginRight = `${scroll}px`;
              });
         });
// Закрытие модального окна, клик по крестику
              close.addEventListener('click', () => {
                   windows.forEach(item => {
                   item.style.display = 'none';
                   });

                   modal.style.display = "none";
                   document.body.style.overflow = "";
// Относится к коду "Убирает скачек сайта"
                   document.body.style.marginRight = `0px`;
              });
// Закрытие модального окна, клик по подложке
         modal.addEventListener('click', (e) => {
              if (e.target === modal) {
                   windows.forEach(item => {
                        item.style.display = 'none';
                   });

                   modal.style.display = "none";
                   document.body.style.overflow = ""; 
                   
// Относится к коду "Убирает скачек сайта"
                   document.body.style.marginRight = `0px`;
                   // document.body.classList.remove('modal-open');
                   }
              });
         }
// Показывает модальное окно после определенного времени
              function showModalByTime(selector, time) {
                   setTimeout(function() {
                    let display;
// Получаем все стили всех модалных окон и вычисляем, показывается в данный момент модалка или нет.
                    document.querySelectorAll('[data-modal]').forEach(item => {
                         if (getComputedStyle(item).display !== 'none'){
                              display = 'block';
                         }
                    });
                    if (!display){
                         document.querySelector(selector).style.display = 'block';
                         document.body.style.overflow = "hidden";
                         let scroll = calcScroll();
                         document.body.style.marginRight = `${scroll}px`;
                    }
                   
               }, time);
          }
// Убирает скачек сайта при открытии модального окна за счет скрытия скролаа
              function calcScroll() {
                   let div = document.createElement('div');
           
                   div.style.width = '0px';
                   div.style.height = '0px';
                   div.style.overflowY = 'scroll';
                   div.style.visibility = 'hidden';
           
                   document.body.appendChild(div);
                   let scrollWidth = div.offsetWidth - div.clientWidth;
                   div.remove();
           
                   return scrollWidth;
               }

               function openByScroll(selector) {
                    window.addEventListener('scroll', () => {
                        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            
                        if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
                            document.querySelector(selector).click();
                        }
                    });
                }

// Вызов функций
    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');
//     showModalByTime('.popup-consultation', 5000);
};
// Экспорт модального окна по дефолту
export default modals;