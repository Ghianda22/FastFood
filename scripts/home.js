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
        let user = JSON.parse(sessionStorage.getItem("logged"));
        if(user.vatNum == null){
            //customer mode
            document.getElementById("userArea-login").style.display = "none";
            document.getElementById("userArea-logged").style.display = "inline";
            document.getElementById("userArea-logged-pArea").href = "pages/personalAreaC.html";
            document.getElementById("userArea-logged-orders").href = "pages/ordersC.html";
            document.getElementById("menuIcon").style.display = "none";
            document.getElementById("cartIcon").style.display = "inline";
        }else{
            //restaurateur mode
            document.getElementById("userArea-login").style.display = "none";
            document.getElementById("userArea-logged").style.display = "block";
            document.getElementById("userArea-logged-pArea").href = "pages/personalAreaR.html";
            document.getElementById("userArea-logged-orders").href = "pages/ordersR.html";
            document.getElementById("menuIcon").style.display = "inline";
            document.getElementById("cartIcon").style.display = "none";

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
    return p;
}
function showRestaurants(){
    for(let res of rList){
        let liRes = document.createElement("li");
        liRes.id = "main-list-" + res.email;
        let a = document.createElement("a");
        a.id ="main-list-" + res.email + "link";
        a.setAttribute("onclick", "resPage('" + res.email + "', '" + a.id + "')");
        liRes.className = "list-group-item";
        
        let image = new Image();
        image.src = res.img;
        let name = pForShowingData(res,'businessName');
        let price = pForShowingData(res, 'averagePrice');
        price.innerHTML += " €";

        let rating = document.createElement("p");
        
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

        a.appendChild(image);
        a.appendChild(name);
        liRes.appendChild(a)
        liRes.appendChild(price);
        liRes.appendChild(rating);
        
        document.getElementById("main-list").appendChild(liRes);
    }
}

function showData(data){
    sessionStorage.setItem("pArea-data", JSON.stringify(data));
    document.getElementById("userArea-logged-pArea-" + data).href = "pages/personalAreaC.html";
}