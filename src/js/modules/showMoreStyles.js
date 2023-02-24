import { getResource } from "../services/request";

const showMoreStyles = (trigger, wrapper) => {
    const btn = document.querySelector(trigger);
        //   =============================
// // Перебираем все карточки и добавляем стили
//     cards.forEach(card => {
//         card.classList.add('animated', 'fadeInUp');
//     });
// // При нажатии на кнопку "показать еще" удаляем стили и добавляем нужные.
// // Удаляем кнопку после показа дополнительных карточек.
//     btn.addEventListener('click', () => {
//         cards.forEach(card => {
//             card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
//             card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
//         });
//         // btn.style.display = 'none';
//         btn.remove();
//     });
    //   =============================
// --------------Получение данных с json server.-----------
    
const message = {
    failure: "Что-то пошло не так...",
    fail: 'assets/img/fail.png'
};
// При нажатии на кнопку "показать еще" создаем карточки со стилями с базы данных. Если что-то не так, выводим ошибку.
btn.addEventListener('click', function() {
    getResource('assets/db.json')
        .then(res => createCards(res.styles))
        .catch(() => {
            let statusMessage = document.createElement('div');
               statusMessage.classList.add('status');
               statusMessage.textContent = message.failure;

               let statusImg = document.createElement('img');
               statusImg.setAttribute('src', message.fail);
               statusImg.classList.add('animated', 'flash');
               document.querySelector(wrapper).appendChild(statusMessage).appendChild(statusImg);
            });
        this.remove();
    });
// Создаем карточки со стилями перебирая каждую из них
function createCards(response) {
    response.forEach(({src, title, link}) => {
        let card = document.createElement('div');

        card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
// Создаем разметку в JS и вставляем полученные данные с сервера.
        card.innerHTML = `
                <div class="styles-block">
                    <img src=${src} alt="style">
                    <h4>${title}</h4>
                    <a href=${link}>Подробнее</a>
                </div>
            `;

            document.querySelector(wrapper).appendChild(card);
        });
    }
};

export default showMoreStyles;