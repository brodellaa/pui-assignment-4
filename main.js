$(document).ready(doAllThis)
storage = window.localStorage; 
if (storage.getItem("cart") == null){
    storage.setItem("cart",JSON.stringify([])); //create cart list
}

var currColor = "";
var currSize = "";

function doAllThis(){
    $("#counter span").text(sumCart()); //override html
    
    currColor = $(".colors .selected").attr("color");
    currSize = $(".sizes .selected").text();
    //selecting a size
    $(".sizes div").click(function(){
        currSize = $(this).text();
        console.log(currSize);
        $(".sizes div").removeClass("selected");
        $(this).addClass("selected");
    });
    
    //selecting a color
    $(".colors div").click(function(){
        $(".pdpItem").css("background-image","none");
        currColor = $(this).attr("color");
        $(".colors div").removeClass("selected");
        $(this).addClass("selected");
        var newLink = "url(images/"+currColor+".jpg)";
        $("#colorName").text(currColor.split(/(?=[A-Z])/).join(" "));
        $(".pdpItem").css("background-image", newLink);
         console.log("/color " + currColor + " /new link " + newLink);
    });

    //adding to cart
    $("#addToCart").click(function(){
        cart = JSON.parse(storage.getItem("cart"));
        var product = {}; //create product object
        product.title = $(".pdpDetail h1").text();
        product.price = $(".pdpDetail h2").text();
        product.size = currSize;
        product.color = currColor;
        product.quantity = parseInt($("#quantity").val());
        console.log(product);
        
        //add new attributes to the product
        cart.push(product);
        storage.setItem("cart",JSON.stringify(cart));
        
        //update item quantity
        $("#counter span").text(sumCart());    
    });
}

//sum of item quantity in cart
function sumCart(){
    sum = 0; //item quantity
    cart = JSON.parse(storage.getItem("cart")) // []
    for(var i = 0; i < cart.length; i++){
        sum += cart[i].quantity;
    }
    return sum;
}

