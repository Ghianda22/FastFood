/* -- DEFAULT -- */
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
        document.getElementById(option + "userArea-logged-pArea-" + data).href = "pages/personalAreaC.html";
    }
    else{
        document.getElementById(option + "userArea-logged-pArea-" + data).href = "pages/personalAreaR.html";
    }
}


function detectUser(){
    if(sessionStorage.getItem("logged") != null){
        document.getElementById("userArea-login").style.display = "none";
        document.getElementById("userArea-logged").style.display = "block";
        
        let user = JSON.parse(sessionStorage.getItem("logged"));
        //customer mode
        if(user.vatNum == null){
            document.getElementById("userArea-logged-pArea").href = "pages/personalAreaC.html";
            document.getElementById("userArea-logged-orders").href = "pages/ordersC.html";
            document.getElementById("menuIcon").style.display = "none";
            document.getElementById("cartIcon").style.display = "inline";
        }else{
            //restaurateur mode
            document.getElementById("userArea-logged-pArea").href = "pages/personalAreaR.html";
            document.getElementById("userArea-logged-orders").href = "pages/ordersR.html";
            document.getElementById("menuIcon").style.display = "inline";
            document.getElementById("cartIcon").style.display = "none";

        }
    }
}


let rList = JSON.parse(localStorage.getItem("restaurateurs"));
window.onbeforeunload = sessionStorage.setItem("prev", document.URL);

function resPage(res, tagId){
    sessionStorage.setItem("res", JSON.stringify(res));
    document.getElementById(tagId).href = "pages/restaurant.html";
}

function loadPage(){
    detectUser();
    showRestaurants();
    showFilterTags();
    for(const tag of document.getElementById("carousel").getElementsByClassName("img-carousel")){
        tag.style.height = ((window.innerHeight)*0.6) + "px";
    }
}


/* -- SHOW -- */
{
    //restaurants
    function pForShowingData(obj, data){
    let p = document.createElement("p");
    p.innerHTML = obj[data];
    p.className = "my-2 text-center";
    return p;
    }
    function showResCard(res){
    let liRes = document.createElement("li");
    liRes.id = "main-list-" + res.email;
    liRes.className = "list-group-item my-4 mx-3 p-0 shadow";
    let a = document.createElement("a");
    a.id ="main-list-" + res.email + "link";
    a.setAttribute("onclick", "resPage('" + res.email + "', '" + a.id + "')");
    
    let image = new Image();
    image.src = res.img;
    image.className = "master-Card";
    let infoDiv = document.createElement("div");
    infoDiv.className = "container fit-content my-auto";
    let name = pForShowingData(res,'businessName');
    name.className = "pTitle my-2 text-center";
    let price = pForShowingData(res, 'averagePrice');
    price.innerHTML += " €";

    let rating = document.createElement("p");
    rating.className = "my-3 text-center";
    rating.innerHTML = res.rating;

    for(let i = Math.ceil(res.rating); i > 0; i--){
        let fullStar = document.createElement("i");
        fullStar.className = "fas fa-star";
        rating.appendChild(fullStar);
    }
    for(let i = 5 - Math.ceil(res.rating); i > 0; i--){
        let emptyStar = document.createElement("i");
        emptyStar.className = "far fa-star";
        rating.appendChild(emptyStar);
    }
    
    

    infoDiv.appendChild(name);
    infoDiv.appendChild(price);
    infoDiv.appendChild(rating);
    a.appendChild(image);
    a.appendChild(infoDiv);
    liRes.appendChild(a);
    
    document.getElementById("main-list").appendChild(liRes);
    }
    function showRestaurants(){
    for(let res of rList){
        showResCard(res);
    }
    }
    function resetRestaurants(){
        while(document.getElementById("main-list").childElementCount != 0){
            document.getElementById("main-list").firstChild.remove();
        }
    }

    //filters
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
}



/* -- FILTER & SEARCH -- */

function searchBar(){
    let resDisplayed = [];
    let stringDish = "";
    let input = (document.getElementById("desktopFilterNav-search-input").value).toLowerCase();
    for (const res of rList) {
        if(document.getElementById("main-list-" + res.email) != null){
            resDisplayed.push(res);
        }
    }
    resetRestaurants();
    for(const res of resDisplayed){
        stringDish += (res.businessName).toLowerCase();
        for(const dishMenu of res.menu){
            for(const dish of dishes){
                if(dishMenu == dish.id){
                    for(const key in dish){
                        if(key == "name" || key == "ingredients" || key == "cuisine" || key == "category"){
                            stringDish += dish[key];
                        }
                    }
                    stringDish = stringDish.replace(/ /g, "");
                    stringDish = stringDish.replace(/,/g, "");
                    stringDish = stringDish.toLowerCase();
                    if(stringDish.indexOf(input) != -1){
                        if(document.getElementById("main-list-" + res.email) == null){
                            showResCard(res);
                        }
                    }
                }
            }
        }
    }
    if(document.getElementById("main-list").childElementCount == 0){
        let divPopUp = document.createElement("div");
        divPopUp.className = "popup";
        let p = document.createElement("p");
        p.innerHTML = "Non ci sono elementi che corrispondono alla tua ricerca";
        divPopUp.appendChild(p);
        (document.getElementById("main-list")).appendChild(divPopUp);
    }    
}

function applyFilter(filter, value){
    let resDisplayed = [];
    for (const res of rList) {
        if(document.getElementById("main-list-" + res.email) != null){
            resDisplayed.push(res);
        }
    }
    resetRestaurants();
    for(const res of resDisplayed){
        for(const dishMenu of res.menu){
            for(const dish of dishes){
                if(dishMenu == dish.id){
                    if(dish[filter] == value){
                        if(document.getElementById("main-list-" + res.email) == null){
                                showResCard(res);
                        }
                    }
                }
            }
        }
    }
    showAppliedFilters(value);
    if(document.getElementById("main-list").childElementCount == 0){
        let divPopUp = document.createElement("div");
        divPopUp.className = "popup";
        let p = document.createElement("p");
        p.innerHTML = "Non ci sono elementi che corrispondono alla tua ricerca";
        divPopUp.appendChild(p);
        (document.getElementById("main-list")).appendChild(divPopUp);
    } 

}
function removeFilters(){
    resetRestaurants();
    showRestaurants();
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