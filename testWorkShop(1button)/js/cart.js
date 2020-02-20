var cart = {}; 


$.getJSON('goods.json', function (data) {
    var goods = data; 
    checkCart();
    showCart(); 

    function showCart() {
        var out = '';
        for (var key in cart) {
            out += '<div class="box-good">';
            out += '<button class="delete" data-art="' + key + '" >x</button>';
            out += '<img src="' + goods[key].image + '" width="48">';
            out += '<span>' + goods[key].name + '</span>';
            out += '<button class="minus" data-art="' + key + '">-</button>';
            out += cart[key];
            out += '<button class="plus" data-art="' + key + '">+</button>';
            out += '<div>Итого: ' + cart[key] * goods[key].cost + '</div>';
            out += '</div>';
        }
        $('#my-cart').html(out);
        $('.plus').on('click', addGoods);
        $('.minus').on('click', removeGoods);
        $('.delete').on('click', removeAllGoods);
    } // отрисовка товаров и действия над ними

    function addGoods() {
        var articul = $(this).attr('data-art');
        cart[articul]++;
        saveCartToLS();
        showCart();
    }

    function removeGoods() {
        var articul = $(this).attr('data-art');
        if (cart[articul] > 1) {
            cart[articul]--;
        }
        else {
            delete cart[articul];
        }
        saveCartToLS();
        showCart();
    }

    function removeAllGoods() {
        var articul = $(this).attr('data-art');
        delete cart[articul];
        saveCartToLS(); 
        showCart();
    }


});

function checkCart() {
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function saveCartToLS() {
    localStorage.setItem('cart', JSON.stringify(cart)); // сохранение в локальное хранилище
}