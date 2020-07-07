/* -- DATA e USER -- */
if(localStorage.getItem("customers")==null){
    localStorage.setItem("customers",JSON.stringify(customers));
}
if(localStorage.getItem("restaurateurs")==null){
    localStorage.setItem("restaurateurs", JSON.stringify(restaurateurs));
}
if(localStorage.getItem("dishes")==null){
    localStorage.setItem("dishes", JSON.stringify(dishes));
}
function detectUser(){
    if(sessionStorage.getItem("logged") != null){
        let user = JSON.parse(sessionStorage.getItem("logged"));
        if(user.vatNum == null){
            //customer mode
            document.getElementById("userArea-login").style.display = "none";
            document.getElementById("userArea-logged").style.display = "inline";
            document.getElementById("userArea-logged-pArea").href = "personalAreaC.html";
            document.getElementById("menuIcon").style.display = "none";
            document.getElementById("cartIcon").style.display = "inline";
        }else{
            //restaurateur mode
            document.getElementById("userArea-login").style.display = "none";
            document.getElementById("userArea-logged").style.display = "block";
            document.getElementById("userArea-logged-pArea").href = "personalAreaR.html";
            document.getElementById("menuIcon").style.display = "inline";
            document.getElementById("cartIcon").style.display = "none";
        }
    }
}
function areYouSure(){
    document.getElementById("userArea-logged-logout").style.display = "block";
}
function logout(){
    sessionStorage.clear();
    location.reload();
}
function stay(){
    document.getElementById("userArea-logged-logout").style.display = "none";
}


/* -- INITIALIZATION -- */
let res = JSON.parse(sessionStorage.getItem("res"));
let menu = [];
for(let el of res.menu) {
    for (let dish of dishes){
        if(el == dish.id){
            menu.push(dish);
        }
    }
}
document.title = res.businessName + " - FastFood";

function loadPage(){
    showFilters();
    createFilterResult();
    showMain();
    showInfo();
}


/* -- SHOW -- */
{
    //create dishes
    function pForShowingData(dish, data, dataName){
        let p = document.createElement("p");
        let span = document.createElement("span");
        span.innerHTML = dataName + ": ";
        p.appendChild(span);
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
        
        let pName = pForShowingData(dish, 'name', 'Nome');
        let pPrice = pForShowingData(dish, 'price', 'Prezzo');
        let pIngredients = pForShowingData(dish, 'ingredients', 'Ingredienti');
        
        let div = document.createElement("div");
        div.id = id + "-" + dish.id + "-data";
        div.appendChild(pName);
        div.appendChild(pPrice);
        div.appendChild(pIngredients);

        let cartIcon = document.createElement("i");
        cartIcon.className = "fas fa-cart-arrow-down";
        let span = document.createElement("span");
        span.innerHTML = "Aggiungi al carrello";
        let p = document.createElement("p");
        p.setAttribute("onclick","addToCart(" + dish.id + ")");
        p.appendChild(span);
        p.appendChild(cartIcon);

        li.appendChild(img);
        li.appendChild(div);
        li.appendChild(p);
        document.getElementById(id).appendChild(li);
    }
    
    //create lists
    function showMain(){
        for (const dish of menu) {
            showDish("allMenu-list", dish);
        }
        document.getElementById("banner-data-name").innerHTML = res.businessName;
        let rating = document.getElementById("banner-data-rating");
        rating.innerHTML += res.rating;
        for(let i = res.rating; i > 0; i--){
            let fullStar = document.createElement("i");
            fullStar.className = "fas fa-star";
            rating.appendChild(fullStar);
        }
        for(let i = 5 - res.rating; i > 0; i--){
            let emptyStar = document.createElement("i");
            emptyStar.className = "far fa-star";
            rating.appendChild(emptyStar);
        }
    }
    function createFilterResult(){
        let filter = document.getElementsByClassName("filter");
        for (const f of filter) {
            for (const dish of menu) {
                if(dish.category == f.innerHTML){
                    showDish(("filter-" + dish.category + "-list"), dish);
                }
            }
        }
    }
    function showFilters(){
        for (const dish of menu) {
            if(document.getElementById("filter-" + dish.category) == null){
                //nav button
                let li = document.createElement("li");
                li.id = "navbar-el-filter-" + dish.category;
                li.className = "filter"
                li.setAttribute("onclick", "filter('" + dish.category + "')");
                li.innerHTML = dish.category;
                document.getElementById("navbar-el-filter").appendChild(li);

                //main div
                let div = document.createElement("div");
                div.id = "filter-" + dish.category;
                div.className = "hidden";
                let ul = document.createElement("ul");
                ul.id = div.id + "-list";
                div.appendChild(ul);
                document.getElementById("main").appendChild(div);
            }
        }
    }
    function showInfo(){
        document.getElementById("info-business-name").innerHTML = res.businessName;
        document.getElementById("info-business-phone").innerHTML = res.phone;
        document.getElementById("info-business-email").innerHTML = res.email;

        document.getElementById("info-address-line0").innerHTML = res.address.owner;
        document.getElementById("info-address-line1").innerHTML = res.address.street +" "+ res.address.civN;
        document.getElementById("info-address-line2").innerHTML = res.address.zip + ", " + res.address.city + " (" + res.address.province + ")";

    }

    //switch filter
    function filter(category){
        let views = document.getElementById("main").children;
        for (const v of views) {
            v.style.display = "none";
        }
        document.getElementById("filter-" + category).style.display = "block";
    }
    function toMenu(){
        let views = document.getElementById("main").children;
        for (const v of views) {
            v.style.display = "none";
        }
        document.getElementById("allMenu").style.display = "block";
    }
    function toInfo(){
        let views = document.getElementById("main").children;
        for (const v of views) {
            v.style.display = "none";
        }
        document.getElementById("info").style.display = "block";
    }
}

/* -- CART -- */
{
    function addToCart(dishId){
        if(sessionStorage.getItem("logged") == null){
            alert("Devi essere loggato per poter aggiungere elementi al carrello");
        }else{
            let cart = JSON.parse(sessionStorage.getItem("cart"));
            cart.push(dishId);
            sessionStorage.setItem("cart", JSON.stringify(cart));
        }
    }
}