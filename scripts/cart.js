/* -- DATA e USER -- */
//check&recharge data
{
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
        //showAddress();
    }
}

/* -- SHOW -- */
{
    //order elements
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

    //form elements
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
    /*function showAddress(){
        for(let i = 0; i<user.address.length; i++){
            //radio button
            let radio = document.createElement("input");
            radio.name = "orderView-address-options-radio";
            radio.id = "orderView-address-options-radio-" + i;
            radio.type = "radio";
            radio.value = i;
            radio.required = true;
            if(user.address[i].default == true){
                radio.checked = true;
            }
            let radioDiv = document.createElement("div");
            radioDiv.appendChild(radio);

            //address related
            let line0 = document.createElement("p");
            let content0 = document.createTextNode(user.address[i].owner);
            line0.id = "orderView-address-options" + i + "-owner";
            line0.appendChild(content0);
            //class name for css
            let line1 = document.createElement("p");
            let content1 = document.createTextNode(user.address[i].street +" "+ user.address[i].civN);
            line1.id = "orderView-address-options" + i + "-line1";
            line1.appendChild(content1);
            //class name
            let line2 = document.createElement("p");
            let content2 = document.createTextNode(user.address[i].zip + ", " + user.address[i].city + " (" + user.address[i].province + ")");
            line2.id = "orderView-address-options" + i + "-line2";
            line2.appendChild(content2);
            //class name
            let container = document.createElement("div");
            container.id = "orderView-address-options" + i;
            container.appendChild(line0);
            container.appendChild(line1);
            container.appendChild(line2);
            if(user.address[i].other != false){
                let line3 = document.createElement("p");
                let content3 = document.createTextNode(user.address[i].other);
                line3.id = "orderView-address-options" + i + "-line3";
                line3.appendChild(content3);
                //class name
                container.appendChild(line3);
            }
            document.getElementById("orderView-address-options").appendChild(radioDiv);
            document.getElementById("orderView-address-options").appendChild(container);
        }
    }*/
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
        constructor(resEmail, cusEmail, dishIds, cost, queueLength, payment){ // + address
            this.id = uuidv4();
            this.res = resEmail;
            this.cus = cusEmail;
            this.dishIds = dishIds;
            this.cost = cost;
            this.prepTime = 3 * dishIds.length + 6 * queueLength;
            //this.address = address;
            this.status = "In attesa";
            this.payment = payment;
            this.date = new Date();
            this.rating = null;
        }
    }
    
    function orderOk(){
        let orderList = JSON.parse(localStorage.getItem("orderList"));
        let payment = ["Paypal", "Prepagata", "Carta di credito", "Contanti"];
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
        /*for(let i = 0; i < user.address.length; i++){
            if(document.getElementById("orderView-address-options-radio-" + i).checked){
                let dAddress = user.address[i];
            }
        }*/
        let queueLength = 0;
        for(let resOrder in res.orders){
            for (let order of orderList) {
                if(resOrder == order.id){
                    if(order.status == "In preparazione" || order.status == "In attesa"){
                        queueLength++;
                    }
                }
            }
        }
        let finalOrder = new Order(cart[0], user.email, cart.slice(1), tot, queueLength, payment);
        (res.orders).unshift(finalOrder.id);
        (user.orders).unshift(finalOrder.id);
        updateUserC();
        updateUserR();
        order = [];
        updateCart();
        orderList.unshift(finalOrder);
        localStorage.setItem("orderList",JSON.stringify(orderList));
        alert("Il tuo ordine � stato effettuato correttamente\nPuoi monitorare lo stato dell'ordine nella sezione 'I tuoi ordini' ");
        document.getElementById("orderView-form").action = "ordersC.html";
    }
} 

/* NOTES:
cart has only dishes ids, order has all dishes details
*/