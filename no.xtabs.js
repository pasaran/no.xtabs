var no = no || {};

(function() {

var prefix = '__no.xtabs.';
var l_prefix = prefix.length;

var events = no.extend( {}, no.Events );

//  ---------------------------------------------------------------------------------------------------------------  //

no.xtabs = {};

no.xtabs.on = function(name, handler) {
    events.on(name, handler);
};

no.xtabs.off = function(name, handler) {
    events.off(name, handler);
};

no.xtabs.trigger = function(name, value) {
    trigger(name, value);
};

//  ---------------------------------------------------------------------------------------------------------------  //

$(window).on('storage', function(e) {
    e = e.originalEvent;

    var is_xtab_event = ( e && e.key && ( e.key.substr(0, l_prefix) === prefix ) );
    if ( is_xtab_event ) {
        //  Получаем реальное название события (выкидываем #event).
        var name = e.key.substr(l_prefix);
        //  Отрезаем от значения счетчик.
        var value = JSON.parse( /^\d+\.(.*?)$/.exec( e.newValue )[1] );

        //  Зовем "обработчик" события.
        events.trigger(name, value);
    }
});

function trigger(name, value) {
    //  Генерим ключ в localStorage для события name.
    var key = prefix + name;

    //  В старом значении (если есть) ищем текущее значение счетчика.
    var oldValue = localStorage.getItem(key);
    value = ( value === undefined ) ? '' : value;
    var counter = (oldValue) ? + /^\d+/.exec(oldValue) : 0;

    //  "Отправляем" значение с увеличенным счетчиком.
    var value = (counter + 1) + '.' + JSON.stringify(value);
    localStorage.setItem( key, value )
}

//  ---------------------------------------------------------------------------------------------------------------  //

})();

