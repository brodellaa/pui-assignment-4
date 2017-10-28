$(document).ready(function(){
   cart = JSON.parse(window.localStorage.getItem("cart"));
    $("#sumItems span").text(sumCart());
    $("#sumPrice").text("$"+sumCartPrice());
    if(cart.length != 0){
        $("#cart").text("");
    }
    
   for(var i = 0; i < cart.length;i++){
       curProduct = cart[i];
       product = "<div class='cart-background'>"
       product += `<img src='images/`+curProduct.color+`.jpg'>`;
       product += `<div class="details"><h2>`+curProduct.title+`</h2>`;
       product += "<div>Size: "+curProduct.size+"</div>";
       product += `<div class='color'>Color: `+curProduct.color.split(/(?=[A-Z])/).join(" ")+"</div>";
       product += `<div class = "price">`+curProduct.price+"</div></div>";
       product += `<div class="quantityCol"><div>Quantity: `+curProduct.quantity+"</div></div>";
       product += `<div class="clear"><a class="cancelButton" id=`+i+`></div>`;
       $("#cart").append(product);
   }
    
   $(".cancelButton").click(function(){
       $(this).parent().parent().hide();
       id = parseInt($(this).attr("id"));
       cart.splice(id,1);
       cart = (window.localStorage.setItem("cart",JSON.stringify(cart)));
       $("#sumItems span").text(sumCart());
       $("#sumPrice").text("$"+sumCartPrice());
       $("#counter span").text(sumCart());
   })
});


function sumCart(){
    sum = 0; //item quantity
    cart = JSON.parse(storage.getItem("cart")) // []
    for(var i = 0; i < cart.length; i++){
        sum += cart[i].quantity;
    }
    cartSum = sum;
    return sum;
}

function sumCartPrice(){
    sum = 0; //item quantity
    cart = JSON.parse(storage.getItem("cart")) // []
    for(var i = 0; i < cart.length; i++){
        price = cart[i].price.slice(1); //taking out the $ sign
        sum += (parseFloat(price).toFixed(2))*cart[i].quantity;
    }
    cartSum = sum;
    return sum;
}