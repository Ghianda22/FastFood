/* -- DATA e USER -- */
//check&recharge data
if(localStorage.getItem("customers")==null){
    localStorage.setItem("customers",JSON.stringify(customers));
}
if(localStorage.getItem("restaurateurs")==null){
    localStorage.setItem("restaurateurs", JSON.stringify(restaurateurs));
}
if(localStorage.getItem("dishes")==null){
    localStorage.setItem("dishes", JSON.stringify(dishes));
}
//logout options
function areYouSure(){
    document.getElementById("userArea-logged-logout").style.display = "block";
}
function logout(){
    sessionStorage.removeItem("logged");
    sessionStorage.removeItem("cart");
    location.href = "../index.html";
}
function stay(){
    document.getElementById("userArea-logged-logout").style.display = "none";
}
//find&update user
let user = JSON.parse(sessionStorage.getItem("logged"));
let users = JSON.parse(localStorage.getItem("customers"));
let correspC;
for (let j = 0; j < users.length; j++) {
    if(users[j].email == user.email){
        correspC = j;
    }
}
function updateUserC(){
    sessionStorage.setItem("logged",JSON.stringify(user));
    users[correspC] = user;
    localStorage.setItem("customers",JSON.stringify(users));
}

//identify res  
let cart = JSON.parse(sessionStorage.getItem("cart"));
let rList = JSON.parse(localStorage.getItem("restaurateurs"));
let correspR;
let res = {};
for(let j = 0; j < rList.length; j++) {
    if(rList[j].email == cart[0]){
        correspR = j;
        res = rList[j];
    }
}
function updateUserR(){
    rList[correspR] = res;
    localStorage.setItem("restaurateurs",JSON.stringify(rList));
}

let order = [];
cart.shift();
for(let el of cart) {
    for (let dish of dishes){
        if(el == dish.id){
            order.push(dish);
        }
    }
}

function updateCart(){
    cart = [];
    for (let item of order){
        cart.push(item.id);
    }
    if(order.length != 0){
        cart.unshift(res.email);
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
}

function loadPage(){
    if(cart.length == 0){
        document.getElementById("fullCart").style.display = "none";
        document.getElementById("emptyCart").style.display = "block";
    }else{
        showOrder();
        showPayment();
        totOrder();
    }
}

/* -- SHOW -- */
{
    function pForShowingData(id, dish, data){
        let p = document.createElement("p");
        p.id = id + "-" + data;
        if(typeof(dish[data]) == "object"){
            let list = "";
            for (let elem of dish[data]) {
                list += elem + ", ";
            }
            list = list.substring(0,list.length-2);
            p.innerHTML += list;
        }else{
            p.innerHTML += dish[data];
        }
        
        return p;
    }
    function pForInfo(data){
        let p = document.createElement("p");
        p.id = "info-" + data;
        p.innerHTML = res[data];
    }
    function showDish(id, dish){
        let li = document.createElement("li");
        li.id = id + "-" + dish.id;
        let img = document.createElement("img");
        img.src = dish.img;
        
        let div = document.createElement("div");
        div.id = id + "-" + dish.id + "-data";
        let pName = pForShowingData(div.id,dish, 'name');
        let pPrice = pForShowingData(div.id,dish, 'price');
        pPrice.innerHTML += " €";
        let pIngredients = pForShowingData(div.id,dish, 'ingredients');
        div.appendChild(pName);
        div.appendChild(pPrice);
        div.appendChild(pIngredients);

        let plus = document.createElement("i");
        plus.className = "fas fa-plus";
        plus.setAttribute("onclick", "dishAdd('" + li.id + "')");
        let counter = document.createElement("span");
        counter.id = li.id + "-quantity-counter";
        counter.innerHTML = 1;
        let minus = document.createElement("i");
        minus.className = "fas fa-minus";
        minus.setAttribute("onclick", "dishRemove('" + li.id + "')");
        let pNum = document.createElement("p");
        pNum.id = li.id + "-quantity";
        pNum.appendChild(minus);
        pNum.appendChild(counter);
        pNum.appendChild(plus);

        let span = document.createElement("span");
        span.innerHTML = "rimuovi dal carrello";
        let xIcon = document.createElement("i");
        xIcon.className = "fas fa-times";
        let p = document.createElement("p");
        p.setAttribute("onclick","removeFromCart('" + li.id + "')");
        p.appendChild(span);
        p.appendChild(xIcon);

        li.appendChild(img);
        li.appendChild(div);
        li.appendChild(pNum);
        li.appendChild(p);
        document.getElementById(id).appendChild(li);
    }

    function showOrder(){
        for (const item of order) {
            if(document.getElementById("orderView-items-list-" + item.id) == null){
                showDish("orderView-items-list",item);
            }else{
                let c = document.getElementById("orderView-items-list-" + item.id + "-quantity-counter").innerHTML;
                c++;
                document.getElementById("orderView-items-list-" + item.id + "-quantity-counter").innerHTML = c;
            }
        }
    }
    function showPayment(){
        let def = document.getElementById("orderView-payment-mode-default");
        def.innerHTML = res.businessName + " accetta pagamenti con: ";
        let pay = ['PayPal','prepagata','carta di credito','contanti'];
        let list = "";
        for(let i = 0; i< res.payment.length; i++){
            if(res.payment[i] == true){
                list += pay[i] + ", "
            }
        }
        list = list.substring(0,list.length-2);
        def.innerHTML += list;
        def.innerHTML += "<br>Vai nell'area personale e aggiungi uno di questi metodi di pagamento per completare l'ordine presso " + res.businessName;
        for (let i = 0; i < res.payment.length; i++) {
            if(res.payment[i] == true && user.payment[i] == true){
                document.getElementById("orderView-payment-mode-default").style.display = "none";
                document.getElementById("orderView-payment-mode-" + i).style.display = "block";
            }
        }
    }
    function totOrder(){
        let tot = 0;
        for (const d of order) {
            tot += d.price;
        }
        document.getElementById("orderView-payment-tot").innerHTML = "Totale ordine: " + tot + " €";
    }

    function dishAdd(id){
        let c = document.getElementById(id + "-quantity-counter").innerHTML;
        c++;
        document.getElementById(id + "-quantity-counter").innerHTML = c;
        let dishId = id.slice(21);
        for(let dish of dishes){
            if(dishId == dish.id){
                order.push(dish);
            }
        }
        totOrder();
        updateCart();
    }   
    function dishRemove(id){
        let c = document.getElementById(id + "-quantity-counter").innerHTML;
        if(c > 1){
            c--;
            let dishId = id.slice(21);
            for(let i = 0; i < order.length; i++){
                if(order[i].id == dishId){
                    let temp = order[0];
                    order[0] = order[i];
                    order[i] = temp;
                    order.shift();
                    break;
                }
            }
        }
        document.getElementById(id + "-quantity-counter").innerHTML = c;
        totOrder();
        updateCart();
        loadPage();
    }

    

    function removeFromCart(id){
        let dishId = id.slice(21);
        function cleanOrder(id){
            for(let i = 0; i < order.length; i++){
                if(order[i].id == id){
                    delete order[i];
                    let temp = order[0];
                    order[0] = order[i];
                    order[i] = temp;
                    order.shift();
                    cleanOrder(id);
                }
            }
        }
        cleanOrder(dishId);
        document.getElementById(id).remove();
        totOrder();
        updateCart();
        showOrder();
    }
    /*function emptyCart(){
        let items = document.getElementById("orderView-items-list").children;
        for(let i of items) {
            let id = i.id;
            removeFromCart(id);
        }
    }*/

    function orderOk(){
        let orderContent = [];
        let orderItems = document.getElementById("orderView-items-list").children;
        for (const item of orderItems) {
            let id = (item.id).substring((item.id).lastIndexOf("-")+1,(item.id).length);
            let num = document.getElementById("orderView-items-list-" + id + "-quantity-counter").innerHTML;
            let price = document.getElementById("orderView-items-list-" + id + "-data-price").innerHTML;
            price = price.substring(0,price.length-1);
            let dish = {dishId:id, quantity:num, price: price};
            orderContent.push(dish);
        }

        (res.orders).push(finalOrder);
        (user.orders).push(finalOrder);
        updateUserC();
        updateUserR();
        alert("Il tuo ordine è stato inviato, lo puoi trovare nella sezione 'Ordini' dell'area personale.\nVerrai reindirizzato alla home");
        document.getElementById("orderView-payment-mode-form").action = "../index.html";
    }
} 
