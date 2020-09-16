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

function logout(){
    sessionStorage.removeItem("logged");
    sessionStorage.removeItem("cart");
    document.getElementById("logout").href = "../index.html";
    document.getElementById("logout-mob").href = "../index.html";
}
function toPArea(data,option){
    sessionStorage.setItem("pArea-data", JSON.stringify(data));
    let user = JSON.parse(sessionStorage.getItem("logged"));
    if(user.vatNum == null){
        document.getElementById(option + "userArea-logged-pArea-" + data).href = "personalAreaC.html";
    }
    else{
        document.getElementById(option + "userArea-logged-pArea-" + data).href = "personalAreaR.html";
    }
}

function detectUser(){
    if(sessionStorage.getItem("logged") != null){
        document.getElementById("userArea-login").style.display = "none";
        document.getElementById("userArea-logged").style.display = "block";
        
        let user = JSON.parse(sessionStorage.getItem("logged"));
        //customer mode
        if(user.vatNum == null){
            document.getElementById("userArea-logged-pArea").href = "personalAreaC.html";
            document.getElementById("userArea-logged-orders").href = "ordersC.html";
            document.getElementById("menuIcon").style.display = "none";
            document.getElementById("cartIcon").style.display = "inline";
        }else{
            //restaurateur mode
            document.getElementById("userArea-logged-pArea").href = "personalAreaR.html";
            document.getElementById("userArea-logged-orders").href = "ordersR.html";
            document.getElementById("menuIcon").style.display = "inline";
            document.getElementById("cartIcon").style.display = "none";

        }
    }
}

window.onbeforeunload = sessionStorage.setItem("prev", document.URL);

/* -- INITIALIZATION -- */
let resEmail = JSON.parse(sessionStorage.getItem("res"));
let rList = JSON.parse(localStorage.getItem("restaurateurs"));
let correspR;
let res = {};
for(let j = 0; j < rList.length; j++) {
    if(rList[j].email == resEmail){
        correspR = j;
        res = rList[j];
    }
}
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
    document.getElementById("img-banner").src = res.banner;
    document.getElementById("img-banner").style.maxHeight = ((window.innerHeight)*0.6) + "px";
    showFilterTags();
    showAllDishes();
    showInfo();
}


/* -- SHOW -- */
{
    //create dishes
    function pForShowingData(dish, data){
        let p = document.createElement("p");
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
        p.className = "my-2 text-center";
        
        return p;
    }
    function showDish(dish){
        let li = document.createElement("li");
        li.id = "allMenu-list-" + dish.id;
        li.className = "list-group-item my-4 mx-3 p-0 shadow";
        let img = document.createElement("img");
        img.src = dish.img;
        img.className = "master-Card";
        
        let pName = pForShowingData(dish, 'name');
        pName.className = "pTitle my-2 text-center";
        let pPrice = pForShowingData(dish, 'price');
        pPrice.innerHTML += " €";
        let pIngredients = pForShowingData(dish, 'ingredients');
        
        let infoDiv = document.createElement("div");
        infoDiv.id = li.id + "-data";
        infoDiv.className = "container fit-content my-auto";

        infoDiv.appendChild(pName);
        infoDiv.appendChild(pIngredients);
        infoDiv.appendChild(pPrice);

        let cartIcon = document.createElement("i");
        cartIcon.className = "fas fa-cart-arrow-down";
        let pAdd = document.createElement("span");
        pAdd.innerHTML = "Aggiungi al carrello";
        pAdd.className = "my-3 text-center";
        let divAdd = document.createElement("div");
        divAdd.className = "container fit-content my-2";
        divAdd.setAttribute("onclick","addToCart(" + dish.id + ")");
        divAdd.appendChild(pAdd);
        divAdd.appendChild(cartIcon);

        li.appendChild(img);
        li.appendChild(infoDiv);
        li.appendChild(divAdd);
        document.getElementById("allMenu-list").appendChild(li);
    }
    function showAllDishes(){
        for (const dish of menu) {
            showDish(dish);
        }
    }
    function resetDishes(){
        while(document.getElementById("allMenu-list").childElementCount != 0){
            document.getElementById("allMenu-list").firstChild.remove();
        }
    }

   
    function showInfo(){
        document.getElementById("info-business-name").innerHTML += (res.businessName).toUpperCase();
        document.getElementById("info-business-phone").innerHTML += res.phone;
        document.getElementById("info-business-email").innerHTML += res.email;

        document.getElementById("info-address-line1").innerHTML = res.address.street +" "+ res.address.civN;
        document.getElementById("info-address-line2").innerHTML = res.address.zip + ", " + res.address.city + " (" + res.address.province + ")";
    }
}

/* -- FILTERS -- */
{
    function showFilterMenu(){
        document.getElementById("dropdownFilters-down").style.display = "none";
        document.getElementById("dropdownFilters-up").style.display = "inline";
        document.getElementById("dropdownFilters-menu").style.display = "block";
    }
    function hideFilterMenu(){
        document.getElementById("dropdownFilters-down").style.display = "inline";
        document.getElementById("dropdownFilters-up").style.display = "none";
        document.getElementById("dropdownFilters-menu").style.display = "none";
    }
    function showFilterTags(){
        let dishList = JSON.parse(localStorage.getItem("dishes"));
        for(const dish of dishList){
            //dish cuisine
            if(document.getElementById("dropdownFilters-menu-cuisine-" + dish.cuisine) == null){
                let a = document.createElement("a");
                a.id = "dropdownFilters-menu-cuisine-" + dish.cuisine;
                a.className = "dropdown-item";
                a.innerHTML = dish.cuisine;
                a.setAttribute("onclick", "applyFilter('cuisine','" + dish.cuisine + "')");
                (document.getElementById("dropdownFilters-menu-cuisine")).appendChild(a);
            }
            //dish category
            if(document.getElementById("dropdownFilters-menu-category-" + dish.category) == null){
                let a = document.createElement("a");
                a.id = "dropdownFilters-menu-category-" + dish.category ;
                a.className = "dropdown-item";
                a.innerHTML = dish.category;
                a.setAttribute("onclick", "applyFilter('category','" + dish.category + "')");
                (document.getElementById("dropdownFilters-menu-category")).appendChild(a);
            }
        }
    }
    function showAppliedFilters(filter){
        if(document.getElementById("desktopFilterNav-appliedFilters-" + filter) == null){
            if(window.screen.width > 576){
                let li = document.createElement("li");
                li.id = "desktopFilterNav-appliedFilters-" + filter;
                li.className = "nav-item fit-content mx-1 my-auto";
    
                let p = document.createElement("p");
                p.innerHTML = filter;
                p.className = "filter-button p-2 px-3 my-1";
                li.appendChild(p);
                (document.getElementById("desktopFilterNav-appliedFilters-ul")).appendChild(li);
            }else{
                let li = document.createElement("li");
                li.id = "desktopFilterNav-appliedFilters-" + filter;
                li.className = "nav-item fit-content mx-1 my-auto";
    
                let p = document.createElement("p");
                p.innerHTML = filter;
                p.className = "p-2 px-3 my-auto";
                li.appendChild(p);
                (document.getElementById("desktopFilterNav-appliedFilters-ul")).appendChild(li);
    
            }
        }
    }
    
    function searchBar(){
        let input = (document.getElementById("desktopFilterNav-search-input").value).toLowerCase();
        resetDishes();
        for(const dish of menu){
            let stringDish = "";
            for(const key in dish){
                if(key == "name" || key == "ingredients" || key == "cuisine" || key == "category"){
                    stringDish += dish[key];
                }
            }
            stringDish = stringDish.replace(/ /g, "");
            stringDish = stringDish.replace(/,/g, "");
            stringDish = stringDish.toLowerCase();
            console.log(stringDish);
            if(stringDish.indexOf(input) != -1){
                if(document.getElementById("allMenu-list-" + dish.id) == null){
                    showDish(dish);
                }
            }
        }
        if(document.getElementById("allMenu-list").childElementCount == 0){
            let divPopUp = document.createElement("div");
            divPopUp.className = "popup";
            let p = document.createElement("p");
            p.innerHTML = "Non ci sono elementi che corrispondono alla tua ricerca";
            divPopUp.appendChild(p);
            (document.getElementById("allMenu-list")).appendChild(divPopUp);
        }    
    }
    
    function applyFilter(filter, value){
        let dishDisplayed = [];
        for (const dish of menu) {
            if(document.getElementById("allMenu-list-" + dish.id) != null){
                dishDisplayed.push(dish);
            }
        }
        resetDishes();
        for(const dish of dishDisplayed){
            if(dish[filter] == value){
                if(document.getElementById("allMenu-list-" + dish.id) == null){
                        showDish(dish);
                }
            }
        }
        showAppliedFilters(value);
        if(document.getElementById("allMenu-list").childElementCount == 0){
            let divPopUp = document.createElement("div");
            divPopUp.className = "popup";
            let p = document.createElement("p");
            p.innerHTML = "Non ci sono elementi che corrispondono alla tua ricerca";
            divPopUp.appendChild(p);
            (document.getElementById("allMenu-list")).appendChild(divPopUp);
        } 
    
    }
    function removeFilters(){
        resetDishes();
        showAllDishes();
        while(document.getElementById("desktopFilterNav-appliedFilters-ul").childElementCount != 0){
            document.getElementById("desktopFilterNav-appliedFilters-ul").firstChild.remove();
        }
        let li = document.createElement("li");
        li.className = "nav-item fit-content mx-1 my-auto";
        let p = document.createElement("p");
        p.innerHTML = "Filtri attivi:";
        p.className = "p-2 px-3 my-auto bold";
        li.appendChild(p);
        (document.getElementById("desktopFilterNav-appliedFilters-ul")).appendChild(li);
    }
}



/* -- CART -- */
{
    function addToCart(dishId){
        if(sessionStorage.getItem("logged") == null){
            alert("Devi essere loggato per poter aggiungere elementi al carrello");
        }else{
            let cart = JSON.parse(sessionStorage.getItem("cart"));
            if(cart[0] == null || cart[0] == res.email){
                cart[0] = res.email;
                cart.push(dishId);
                sessionStorage.setItem("cart", JSON.stringify(cart));
                alert("L'elemento è stato aggiunto al carrello");
            }else{
                alert("Puoi ordinare da un solo ristorante per volta.\nCompleta l'ordine o svuota il carrello per acquistare da questo ristorante");
            }
            
        }
    }
}