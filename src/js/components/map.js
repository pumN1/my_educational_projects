// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);

function init() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [55.758909732007275, 37.60774175737452],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 13
  });

  var myPlacemark = new ymaps.Placemark([55.769383, 37.638521], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/sprite.svg#marker',
    iconImageSize: [12, 12],
    iconImageOffset: [-12, -12]
  });

  // Размещение геообъекта на карте.
  myMap.geoObjects.add(myPlacemark);
}
