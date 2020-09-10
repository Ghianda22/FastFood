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
if(localStorage.getItem("orderList")==null){
    localStorage.setItem("orderList", JSON.stringify(orderList));
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

//find&update user (c)
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

let cart = JSON.parse(sessionStorage.getItem("cart"));
//find&update user (r)
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


//order initialization
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
}

function loadPage(){
    if((JSON.parse(sessionStorage.getItem("cart"))).length == 0){
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
    function resetShowOrder(){
        while(document.getElementById("orderView-items-list").childElementCount != 0){
            document.getElementById("orderView-items-list").firstChild.remove();
        }
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
}

/* -- FUNCTIONS -- */
{
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
        updateCart();
        resetShowOrder();
        loadPage();
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
        updateCart();
        resetShowOrder();
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
        updateCart();
        resetShowOrder()
        loadPage();
    }
    function emptyCart(){
        order = [];
        updateCart();
        loadPage();
    }
    
    //order confirmation
    class Order{
        constructor(resEmail, dishIds, cost, address, payment){
            this.id = uuidv4();
            this.res = resEmail;
            this.dishIds = dishIds;
            this.cost = cost;
            this.prepTime = 3 * dishIds.length;
            this.address = address;
            this.status = "In attesa";
            this.payment = payment;
            this.date = new Date();
            this.rating = null;
        }
    }
    
    function orderOk(){
        let payment = ["Paypal", "Prepagata", "Carta di credito", "Contanti"];
        console.log("Carrello: " + cart);
        updateCart();
        let tot = 0;
        for (const d of order) {
            tot += d.price;
        }
        for(let i = 0; i < 4; i++){
            if(document.getElementById("orderView-payment-mode-" + i + "-r").checked){
                payment = payment[i];
            }
        }
        
        let finalOrder = new Order(cart[0], cart.slice(1), tot, defAddress, payment);
        (res.orders).push(finalOrder.id);
        (user.orders).push(finalOrder.id);
        updateUserC();
        updateUserR();
        let orderList = JSON.parse(localStorage.getItem("orderList"));
        orderList.push(finalOrder);
        localStorage.setItem("orderList",JSON.stringify(orderList));
        console.log("Ordine: " + finalOrder);
        console.log("Lista ordini: " + orderList);
        alert("Il tuo ordine � stato effettuato correttamente\nPuoi monitorare lo stato dell'ordine nella sezione 'I tuoi ordini' ");
        document.getElementById("orderView-payment-mode-form").action = "ordersC.html";
    }
} 

/* NOTES:
cart has only dishes ids, order has all dishes details
*/