var cart = {}; //корзина


$.getJSON('goods.json', function (data) {
    var goods = data; //все товары в массиве
    // console.log(goods);
    checkCart();
    //console.log(cart);
    showCart(); //вывожу товары на страницуz

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
        $('.plus').on('click', plusGoods);
        $('.minus').on('click', minusGoods);
        $('.delete').on('click', deleteGoods);
    }

    function plusGoods() {
        var articul = $(this).attr('data-art');
        cart[articul]++;
        saveCartToLS(); //сохраняю корзину в localStorage
        showCart();
    }

    function minusGoods() {
        var articul = $(this).attr('data-art');
        if (cart[articul] > 1) {
            cart[articul]--;
        }
        else {
            delete cart[articul];
        }
        saveCartToLS(); //сохраняю корзину в localStorage
        showCart();
    }

    function deleteGoods() {
        var articul = $(this).attr('data-art');
        delete cart[articul];
        saveCartToLS(); //сохраняю корзину в localStorage
        showCart();
    }


});

function checkCart() {
    //проверяю наличие корзины в localStorage;
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function saveCartToLS() {
    localStorage.setItem('cart', JSON.stringify(cart));
}