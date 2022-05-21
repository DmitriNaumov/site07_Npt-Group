ymaps.ready(init);
function init() {
    var myMap = new ymaps.Map("yandex-map", {
        center: [44.75434267847602, 37.72530097457453],
        zoom: 17,
        controls: ["zoomControl"]
    });

    myMap.controls.add('fullscreenControl', { float: 'left' });
    myMap.behaviors.disable('scrollZoom');
    // Создаем геообъект с типом геометрии "Точка".
    myGeoObject = new ymaps.GeoObject();
    myMap.geoObjects
        .add(new ymaps.Placemark([44.75537853734035, 37.725279516902376], {
            hintContent: 'Администрация приморского района',
            balloonContent: 'Россия, Краснодарский край, Новороссийск, село Цемдолина, улица Чкалова, 12'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/map-marcer.svg',
            // Размеры метки.
            iconImageSize: [57, 78],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-25, -58]
        }));
};