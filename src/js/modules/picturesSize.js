const picturesSize = (imgSelector) => {
    const blocks = document.querySelectorAll(imgSelector);
// Показывает картинки. Заменяет картинки через src. 
//Скрывает не нужные параграфы в нутри
    function showImg (block) {
        const img = block.querySelector('img');
        // something.png => something-1.png
        img.src = img.src.slice(0, -4) + '-1.png';
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'none';
        });
    }
// Скрывает картинки. Заменяет картинки через src. 
////Скрывает не нужные параграфы в нутри
    function hideImg (block) {
        const img = block.querySelector('img');
        // something-1.png => something.png
        img.src = img.src.slice(0, -6) + '.png';
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
            p.style.display = 'block';
        });
    }
// Функция - наводи мышь, показывается картинка. 
//Убираем мышь, картинка прячется.
    blocks.forEach(block => {
        block.addEventListener('mouseover', () => {
            showImg(block);
        });
        block.addEventListener('mouseout', () => {
            hideImg(block);
        });
    });
};

export default picturesSize;