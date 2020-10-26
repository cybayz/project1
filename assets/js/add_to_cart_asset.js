var ids=[];
(function () {
    var cart = document.getElementsByClassName("js-cd-cart");
    if (cart.length > 0) {
        var cartAddBtns = document.getElementsByClassName("js-cd-add-to-cart"),
            cartBody = cart[0].getElementsByClassName("cd-cart__body")[0],
            cartList = cartBody.getElementsByTagName("ul")[0],
            cartListItems = cartList.getElementsByClassName("cd-cart__product"),
            cartTotal = cart[0].getElementsByClassName("cd-cart__checkout")[0].getElementsByTagName("span")[0],
            cartCount = cart[0].getElementsByClassName("cd-cart__count")[0],
            cartCountItems = cartCount.getElementsByTagName("li"),
            cartUndo = cart[0].getElementsByClassName("cd-cart__undo")[0],
            productId = 0,
            cartTimeoutId = false,
            animatingQuantity = false;
        initCartEvents();
        function initCartEvents() {
            for (var i = 0; i < cartAddBtns.length; i++) {
                (function (i) {
                    cartAddBtns[i].addEventListener("click", addToCart);
                })(i);
            }
            cart[0].getElementsByClassName("cd-cart__trigger")[0].addEventListener("click", function (event) {
                event.preventDefault();
                toggleCart();
            });
            cart[0].addEventListener("click", function (event) {
                if (event.target == cart[0]) {
                    toggleCart(true);
                } else if (event.target.closest(".cd-cart__delete-item")) {
                    event.preventDefault();
                    removeProduct(event.target.closest(".cd-cart__product"));
                }
            });
            cart[0].addEventListener("focusout", function (event) {
                if (event.target.tagName.toLowerCase() == "input") {
                    console.log(event)
                    var qty=event.target.value
                    quickUpdateCart();

                }
            });
            cartUndo.addEventListener("click", function (event) {
                if (event.target.tagName.toLowerCase() == "a") {
                    event.preventDefault();
                    if (cartTimeoutId) clearInterval(cartTimeoutId);
                    var deletedProduct = cartList.getElementsByClassName("cd-cart__product--deleted")[0];
                    Util.addClass(deletedProduct, "cd-cart__product--undo");
                    deletedProduct.addEventListener("animationend", function cb() {
                        deletedProduct.removeEventListener("animationend", cb);
                        Util.removeClass(deletedProduct, "cd-cart__product--deleted cd-cart__product--undo");
                        deletedProduct.removeAttribute("style");
                        quickUpdateCart();
                    });
                    Util.removeClass(cartUndo, "cd-cart__undo--visible");
                }
            });
        }
        function addToCart(event) {
            event.preventDefault();
            if (animatingQuantity) return;
            animatingQuantity = true;
            var cartIsEmpty = Util.hasClass(cart[0], "cd-cart--empty");
            addProduct(this);
            updateCartCount(cartIsEmpty);
            updateCartTotal(this.getAttribute("data-price"), true);
            Util.removeClass(cart[0], "cd-cart--empty");
        }
        function toggleCart(bool) {
            var cartIsOpen = typeof bool === "undefined" ? Util.hasClass(cart[0], "cd-cart--open") : bool;
            if (cartIsOpen) {
                Util.removeClass(cart[0], "cd-cart--open");
                if (cartTimeoutId) clearInterval(cartTimeoutId);
                Util.removeClass(cartUndo, "cd-cart__undo--visible");
                removePreviousProduct();
                setTimeout(function () {
                    cartBody.scrollTop = 0;
                    if (Number(cartCountItems[0].innerText) == 0) Util.addClass(cart[0], "cd-cart--empty");
                }, 500);
            } else {
                Util.addClass(cart[0], "cd-cart--open");
            }
        }
        
        function storeId(id) {
            var ids = JSON.parse(localStorage.getItem('reportArray')) || [];
        
            if (ids.indexOf(id) === -1) {
                ids.push(id);
                localStorage.setItem('reportArray', JSON.stringify(ids));
            }
        
            return id;
        }
        
        function addProduct(target) {

            
            
            var  productId = target.getAttribute('data-pid');
            
            $('#cart_id_'+productId).html($('<i/>',{class:'fa fa-check'}));
            $('#cart_id_'+productId).addClass('disabled');
            $("#changeme").attr('data-progress','100');
            var pname=target.getAttribute('data_pname');
            var price=parseInt(target.getAttribute('data-price'));
            var Qty=1;
            ids.push(productId);console.log(ids);
            var onlypricechange=0;
            var updprice=0;
            if(Array.isArray(ids)){
                var counter = 0;
                for (let i = 0; i < ids.length; i++) {
                    if (ids[i] === productId) counter++;
                }
                if(counter>=2){
                    var updprice=price*counter
                    Qty=Qty*counter
                    onlypricechange=1;
                }

            }
            if(onlypricechange == '0'){
                var productAdded =
                '<li class="cd-cart__product"><input class="prod_id" type="hidden" id="prod_id" value="'+productId+'" /><div class="cd-cart__image"><a href="#0"><img src="assets/img/product-preview.png" alt="placeholder"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#0">'+pname+'</a></h3><span style="display:none;" id="cart_tot" class="cd-cart_price">'+price+'</span><span id="id_'+productId+'" class="cd-cart__price">'+price+'</span><div class="cd-cart__actions"><a href="#0" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="cd-product-' +
                productId +
                '">Qty</label><span class="cd-cart__select"><input type="text" de_id="id'+productId+'" class=" qty_box" id="qty_box_'+productId+'"  min="0" max="100" step="10"></input> X <span id="single_price"><strong>'+price+'</strong></span> </span></div></div></div></li>';
                cartList.insertAdjacentHTML("beforeend", productAdded);
                document.getElementById('qty_box_'+productId).value = Qty;
                
                 
            }else{
                 $('#id_'+productId).text(updprice)
                 $('#qty_box_'+productId).val(Qty)
            }
        }
        function removeProduct(product) {
            console.log(product);
            if (cartTimeoutId) clearInterval(cartTimeoutId);
            removePreviousProduct();
            var pr_id= product.getElementsByClassName("prod_id")[0].value;
            $('#cart_id_'+pr_id).html($('<span/>',{class:'lnr lnr-cart'}));
            $('#cart_id_'+pr_id).removeClass('disabled');
            $('input#qty_box_'+pr_id).removeAttr('id');
            $('span#id_'+pr_id).removeAttr('id');
            var topPosition = product.offsetTop,
                productQuantity = Number(product.getElementsByClassName("qty_box")[0].value),
                productTotPrice = Number(product.getElementsByClassName("cd-cart_price")[0].innerText.replace("$", "")) * productQuantity;
            product.style.top = topPosition + "px";
            let index = ids.indexOf(pr_id);
            if (index > -1) {
                ids.splice(index, pr_id);
            }
            
            Util.addClass(product, "cd-cart__product--deleted");
            updateCartTotal(productTotPrice, false);
            updateCartCount(true, -productQuantity);
            Util.addClass(cartUndo, "cd-cart__undo--visible");
            cartTimeoutId = setTimeout(function () {
                Util.removeClass(cartUndo, "cd-cart__undo--visible");
                removePreviousProduct();
            }, 8000);
        }
        function removePreviousProduct() {
            var deletedProduct = cartList.getElementsByClassName("cd-cart__product--deleted");
            if (deletedProduct.length > 0) deletedProduct[0].remove();
        }
        function updateCartCount(emptyCart, quantity) {
            if (typeof quantity === "undefined") {
                var actual = Number(cartCountItems[0].innerText) + 1;
                var next = actual + 1;
                if (emptyCart) {
                    cartCountItems[0].innerText = actual;
                    cartCountItems[1].innerText = next;
                    animatingQuantity = false;
                } else {
                    Util.addClass(cartCount, "cd-cart__count--update");
                    setTimeout(function () {
                        cartCountItems[0].innerText = actual;
                    }, 150);
                    setTimeout(function () {
                        Util.removeClass(cartCount, "cd-cart__count--update");
                    }, 200);
                    setTimeout(function () {
                        cartCountItems[1].innerText = next;
                        animatingQuantity = false;
                    }, 230);
                }
            } else {
                var actual = Number(cartCountItems[0].innerText) + quantity;
                var next = actual + 1;
                cartCountItems[0].innerText = actual;
                cartCountItems[1].innerText = next;
                animatingQuantity = false;
            }
        }
        function updateCartTotal(price, bool) {
            cartTotal.innerText = bool ? (Number(cartTotal.innerText) + Number(price)).toFixed(2) : (Number(cartTotal.innerText) - Number(price)).toFixed(2);
            var tett=$('#home_delivery_price').html();
            $("#takeaway_price").html(tett);
        }
        function quickUpdateCart() {
            var quantity = 0;
            var price = 0;
            
            for (var i = 0; i < cartListItems.length; i++) {
                if (!Util.hasClass(cartListItems[i], "cd-cart__product--deleted")) {
                    var singleQuantity = Number(cartListItems[i].getElementsByClassName("qty_box")[0].value);
                    quantity = quantity + singleQuantity;
                    price = price + singleQuantity * Number(cartListItems[i].getElementsByClassName("cd-cart_price")[0].innerText.replace("$", ""));
                    
                }
            }
            
            cartTotal.innerText = price.toFixed(2);
            cartCountItems[0].innerText = quantity;
            cartCountItems[1].innerText = quantity + 1;
        }
        var tett=$('#home_delivery_price').html();
        $("#takeaway_price").html(tett);
    }
})();
