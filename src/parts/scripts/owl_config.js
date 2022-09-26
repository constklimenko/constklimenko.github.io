jQuery(
    function($) {
        $(document).ready(function() {
            $('.owl').owlCarousel({
                loop: true, //Зацикливаем слайдер
                margin: 0, //Отступ от элемента справа
                nav: true, // навигация
                autoplay: false, //Автозапуск слайдера
                dots: false,
                lazyLoad: false,
               // navContainer: '.glide__arrows',
                responsive: { //Адаптивность. Кол-во выводимых элементов при определенной ширине.
                    0: {
                        items: 1
                    },
                    1000: {
                        items: 3
                    },


                }
            });
        });


    });