// import checkNumInputs from "./checkNumInputs";

// Создаем переменную с ее свойствами
import { postData } from "../services/request";

const forms = () => {
     const form = document.querySelectorAll('form'),
           inputs = document.querySelectorAll('input'),
           upload = document.querySelectorAll('[name="upload"]');

//Сообщения формы. Так же могут быть различные спинеры, картинки...
     const message = {
          loading: 'Загрузка...',
          success: 'Спасибо! Скоро мы с вами свяжемся',
          failure: 'Что-то пошло не так...',
          spinner: 'assets/img/spinner.gif',
          ok: 'assets/img/ok.png',
          fail: 'assets/img/fail.png'
     };
// Пути куда отправляются данные
     const path = {
          designer: 'assets/server.php',
          question: 'assets/question.php'
     };

// Функция которая очищает инпуты
     const clearInputs = () => {
          inputs.forEach(item => {
          item.value = '';
          });
          upload.forEach(item => {
          item.previousElementSibling.textContent = "Файл не выбран";
          });
     };
// Функция появления названия файла который загружается
          upload.forEach(item => {
               item.addEventListener('input', () => {
               console.log(item.files[0]);
               let dots;
               const arr = item.files[0].name.split('.');

               arr[0].length > 6 ? dots = "..." : dots = '.';
               const name = arr[0].substring(0, 6) + dots + arr[1];
               item.previousElementSibling.textContent = name;
               });
          });

// Отправление данных для каждой формы без перезагрузки страницы
          form.forEach(item => {
               item.addEventListener('submit', (e) => {
               e.preventDefault();
// Добавляем блок сообщений для пользователя
               let statusMessage = document.createElement('div');
               statusMessage.classList.add('status');
               item.parentNode.appendChild(statusMessage); // Добавляем в родителя
// Скрываем форму
               item.classList.add('animated', 'fadeOutUp');
               setTimeout(() => {
               item.style.display = 'none';
               }, 400);
// Помещаем спинер в форму
               let statusImg = document.createElement('img');
               statusImg.setAttribute('src', message.spinner);
               statusImg.classList.add('animated', 'fadeInUp');
               statusMessage.appendChild(statusImg);

               let textMessage = document.createElement('div');
               textMessage.textContent = message.loading;
               statusMessage.appendChild(textMessage);
//Сбор данныех которые есть в форме
               const formData = new FormData(item);
               let api;
               item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
               console.log(api);
// Отправляем собранные данные с формы на сервер и выводит сообщения
               postData(api, formData)
               .then(res => {
               console.log(res);
               statusImg.setAttribute('src', message.ok);
               textMessage.textContent = message.success;
               })
               .catch(() => {
               statusImg.setAttribute('src', message.fail);
               textMessage.textContent = message.failure;
               })
               .finally(() => {
               clearInputs();
               setTimeout(() => {
                    statusMessage.remove();
                    item.style.display = 'block';
                    item.classList.remove('fadeOutUp');
                    item.classList.add('fadeInUp');
               }, 5000);
               });
          });
     });
};

//Экспорт по умолчанию
export default forms;