const drop = () => {
    // drag *
    // dragend *
    // dragenter - объект над dropArea
    // dragexit *
    // dragleave - объект за пределами dropArea
    // dragover - объект зависает над dropArea
    // dragstart *
    // drop - объект отправлен в dropArea

    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });
// Снимает стандартное поведение браузера
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
// Визуальное оповещение drag&drop area
    function highlight(item) {
        item.closest('.file_upload').style.border = "5px solid yellow";
        item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0, .7)";
    }

    function unhighlight(item) {
        item.closest('.file_upload').style.border = "none";
        item.closest('.file_upload').style.backgroundColor = "transparent";
    }
// Навешиваем обработчик события на все drag&drop area
    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });
// Снимаем обработчик события со всех drag&drop area
    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });
// Обрабатываем то когда пользователь скидывает фото в drag&drop area
    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
// Показывает название скинутого файла
            let dots;
                const arr = input.files[0].name.split('.');

                arr[0].length > 6 ? dots = "..." : dots = '.';
                const name = arr[0].substring(0, 6) + dots + arr[1];
                input.previousElementSibling.textContent = name;
        });
    });
};

export default drop;