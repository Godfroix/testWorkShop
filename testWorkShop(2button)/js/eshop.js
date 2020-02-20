var cart = {}; //моя корзина

$('document').ready(function(){
    loadGoods();
    checkCart();
    showMiniCart();
});

function loadGoods() {
    //загружаю товары на страницу
    $.getJSON('goods.json', function (data) {
        //console.log(data);
        var out = '';
        for (var key in data){
            out+='<div class="single-goods">';
            out+='<h3>'+data[key]['name']+'</h3>';
            out+='<p>Цена: '+data[key]['cost']+'</p>';
            out+='<img src="'+data[key].image+'">';
            out+='<button class="add-to-cart" data-art="'+key+'">Купить</button>';
            out+='<button class="delete-to-cart" data-art="'+key+'">Удалить из корзины</button>';
            out+='</div>';
        }
        $('#goods').html(out);
        $('button.add-to-cart').on('click', addToCart);
        $('button.delete-to-cart').on('click', deleteCart)
    });
}

function addToCart() {
    //добавляем товар в корзину
    var articul = $(this).attr('data-art');
    if (cart[articul]!=undefined) {
        cart[articul]++;
    }
    else {
        cart[articul] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart) );
    //console.log(cart);
    showMiniCart();
    console.log('Добавлено:' + cart[articul])
}

function checkCart(){
    //проверяю наличие корзины в localStorage;
    if ( localStorage.getItem('cart') != null) {
        cart = JSON.parse (localStorage.getItem('cart'));
    }
}

function deleteCart() {
    var articul = $(this).attr('data-art');
    if (cart[articul]>1) {
        cart[articul]--;
    }
    else {
        delete cart[articul];
    }

    
    console.log('Осталось:' + cart[articul])
    
    localStorage.setItem('cart', JSON.stringify(cart) );
    showMiniCart();
        // $(".single-goods").click(function() {
        //     $(this).toggleClass("active");
        //     $("delete-to-cart").toggleClass("active");
        // }); 
    
}

function showMiniCart(){
    //показываю содержимое корзины
    var out ='';
    var counter = 0;
    for (var w in cart){
        counter += cart[w]; '<br>';
    }
    $('.test__cart span').html(counter);
}

