const accordion = (triggerSelector) => {
     const btns = document.querySelectorAll(triggerSelector);

     btns.forEach((btn) => {
          btn.addEventListener("click", function () {
               btns.forEach((btn) => {
                    if (!this.classList.contains("active-style")) {
                         btn.classList.remove("active-style");
                         btn.nextElementSibling.classList.remove("active-content");
                         btn.nextElementSibling.style.maxHeight = 0 + "px";
                    }
               });
               this.classList.toggle("active-style");
               this.nextElementSibling.classList.toggle("active-content");
               if (this.classList.contains("active-style")) {
                    this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + "px";
               } else {
                    this.nextElementSibling.style.maxHeight = "0px";
               }
          });
     });
     // ======================================================

     // Вариант когда все сразу, по одной можно открыть и закрыть
     // btns.forEach(btn => {
     //     btn.addEventListener('click', function() {
     //         this.classList.toggle('active-style');
     //         this.nextElementSibling.classList.toggle('active-content');

     //         if (this.classList.contains('active-style')) {
     //             this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + "px";
     //         } else {
     //             this.nextElementSibling.style.maxHeight = '0px';
     //         }
     //     });
     // });
     // ======================================================
     //         blocks = document.querySelectorAll(itemsSelector);
     // // Добавили к контенту анимации
     //     blocks.forEach(block => {
     //         block.classList.add('animated', 'fadeInDown');
     //     });
     // // Тригеры на которые мы нажимаем и добовляем классы активности
     //     btns.forEach(btn => {
     //         btn.addEventListener('click', function() {
     //             if (!this.classList.contains('active')){
     //                 btns.forEach(btn => {
     //                     btn.classList.remove('active', 'active-style');
     //                 });
     //                 this.classList.add('active', 'active-style');
     //             }
     //         });
     //     });
     // ======================================================
};

export default accordion;
