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

let rList = JSON.parse(localStorage.getItem("restaurateurs"));
window.onbeforeunload = sessionStorage.setItem("prev", document.URL);

function detectUser(){
    if(sessionStorage.getItem("logged") != null){
        document.getElementById("userArea-login").style.display = "none";
        document.getElementById("mobile-userArea-login").style.display = "none";
        document.getElementById("userArea-logged").style.display = "block";
        document.getElementById("mobile-userArea-logged").style.display = "block";
        
        let user = JSON.parse(sessionStorage.getItem("logged"));
        //customer mode
        if(user.vatNum == null){
            document.getElementById("userArea-logged-pArea").href = "pages/personalAreaC.html";
            document.getElementById("mobile-userArea-logged-pArea").href = "pages/personalAreaC.html";
            document.getElementById("userArea-logged-orders").href = "pages/ordersC.html";
            document.getElementById("mobile-userArea-logged-orders").href = "pages/ordersC.html";
            document.getElementById("menuIcon").style.display = "none";
            document.getElementById("mobile-menuIcon").style.display = "none";
            document.getElementById("cartIcon").style.display = "inline";
            document.getElementById("mobile-cartIcon").style.display = "inline";
        }else{
            //restaurateur mode
            document.getElementById("userArea-logged-pArea").href = "pages/personalAreaR.html";
            document.getElementById("mobile-userArea-logged-pArea").href = "pages/personalAreaR.html";
            document.getElementById("userArea-logged-orders").href = "pages/ordersR.html";
            document.getElementById("mobile-userArea-logged-orders").href = "pages/ordersR.html";
            document.getElementById("menuIcon").style.display = "inline";
            document.getElementById("mobile-menuIcon").style.display = "inline";
            document.getElementById("cartIcon").style.display = "none";
            document.getElementById("mobile-cartIcon").style.display = "none";

        }
    }
}
function logout(){
    sessionStorage.removeItem("logged");
    sessionStorage.removeItem("cart");
    location.reload();
}

function resPage(res, tagId){
    sessionStorage.setItem("res", JSON.stringify(res));
    document.getElementById(tagId).href = "pages/restaurant.html";
}

function pForShowingData(obj, data){
    let p = document.createElement("p");
    p.innerHTML = obj[data];
    p.className = "my-2 text-center";
    return p;
}
function showRestaurants(){
    for(let res of rList){
        let liRes = document.createElement("li");
        liRes.id = "main-list-" + res.email;
        liRes.className = "list-group-item my-4 mx-3 p-0 shadow";
        let a = document.createElement("a");
        a.id ="main-list-" + res.email + "link";
        a.setAttribute("onclick", "resPage('" + res.email + "', '" + a.id + "')");
        
        let image = new Image();
        image.src = res.img;
        let infoDiv = document.createElement("div");
        infoDiv.className = "container";
        let name = pForShowingData(res,'businessName');
        name.className = "pTitle my-2 text-center";
        let price = pForShowingData(res, 'averagePrice');
        price.innerHTML += " €";

        let rating = document.createElement("p");
        rating.className = "my-3 text-center";
        
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
        rating.innerHTML += res.rating;

        infoDiv.appendChild(name);
        infoDiv.appendChild(price);
        infoDiv.appendChild(rating);
        a.appendChild(image);
        a.appendChild(infoDiv);
        liRes.appendChild(a);
        
        document.getElementById("main-list").appendChild(liRes);
    }
}

function toPArea(data){
    sessionStorage.setItem("pArea-data", JSON.stringify(data));
    document.getElementById("userArea-logged-pArea-" + data).href = "pages/personalAreaC.html";
}