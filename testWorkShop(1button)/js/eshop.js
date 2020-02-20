var cart = {};


$('document').ready(function () {
    loadGoods();
    checkCart();
    showMiniCart();
});

function loadGoods() {
    $.getJSON('goods.json', function (data) {
        var out = '';
        for (var key in data) {
            out += '<div class="single-goods">';
            out += '<h3>' + data[key]['name'] + '</h3>';
            out += '<p>Цена: ' + data[key]['cost'] + '</p>';
            out += '<img src="' + data[key].image + '">';
            out += '<button  class="" data-art="' + key + '">Добавить в корзину</button>';
            out += '<span class="number__test" data-art="' + key + '"></span>'
            out += '</div>';
        }
        $('#goods').html(out);


        $(".single-goods button").click(fname);



    });
}




function fname() {
    $(this).toggleClass('add-to-cart')
    if ($(this).hasClass('add-to-cart')) {
        localStorage.setItem('add-to-cart', 'Удалить из корзины');
        $(this).text(localStorage.getItem('add-to-cart'));
        $(this).on('click',  deleteCart);
        
    } else {
        localStorage.setItem('add-to-cart', 'Добавить в корзину');
        $(this).text(localStorage.getItem('add-to-cart'));
        $(this).on('click', addToCart);
        
    }
}

function addToCart() {
    var articul = $(this).attr('data-art');
    if (cart[articul] != undefined) {
        cart[articul]++;
    }
    else {
        cart[articul] = 1;
    }



    localStorage.setItem('cart', JSON.stringify(cart)); // добавляем в локальное хранилище браузера
    showMiniCart();
}

function checkCart() {
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart')); // получаем из JSON элементы записанные в локальном хранилище
    }
}



function deleteCart() {
    var articul = $(this).attr('data-art');
    if (cart[articul] > 1) {
        cart[articul]--;
    }
    else {
        delete cart[articul];
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showMiniCart();

}

function showMiniCart() {
    var counter = 0;
    for (var w in cart) {
        counter += cart[w];
    }
    $('.test__cart span').html(counter);
}








// задача со звездочкой

// function storageAvailable(type) {
// 	try {
// 		var storage = window[type],
// 			x = '__storage_test__';
// 		storage.setItem(x, x);
// 		storage.removeItem(x);
// 		return true;
// 	}
// 	catch(e) {
// 		return false;
// 	}
// }

// if(!localStorage.getItem('bgcolor')) {
//     populateStorage();
//   } else {
//     setStyles();
//   }
// window.addEventListener('message', function(event) {
//   if (event.origin != 'http://javascript.ru') {
//     return;
//   }

//   console.log(event.data);
// });
