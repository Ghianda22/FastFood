if(localStorage.getItem("customers")==null){
    localStorage.setItem("customers",JSON.stringify(customers));
}
if(localStorage.getItem("restaurateurs")==null){
    localStorage.setItem("restaurateurs", JSON.stringify(restaurateurs));
}
if(localStorage.getItem("dishes")==null){
    localStorage.setItem("dishes", JSON.stringify(dishes));
}
let rList = JSON.parse(localStorage.getItem("restaurateurs"));

function detectUser(){
    if(sessionStorage.getItem("logged") != null){
        let user = JSON.parse(sessionStorage.getItem("logged"));
        if(user.vatNum == null){
            //customer mode
            document.getElementById("userArea-login").style.display = "none";
            document.getElementById("userArea-logged").style.display = "inline";
            document.getElementById("userArea-logged-pArea").href = "pages/personalAreaC.html";
            document.getElementById("menuIcon").style.display = "none";
            document.getElementById("cartIcon").style.display = "inline";
        }else{
            //restaurateur mode
            document.getElementById("userArea-login").style.display = "none";
            document.getElementById("userArea-logged").style.display = "block";
            document.getElementById("userArea-logged-pArea").href = "pages/personalAreaR.html";
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


function pForShowingData(obj, data){
    let p = document.createElement("p");
        p.innerHTML = obj[data];
    return p;
}
function showRestaurants(){
    for(let res of rList){
        let div = document.createElement("div");
        div.id = "main-list-" + res.email;
        let a = document.createElement("a");
        a.id ="main-list-" + res.email + "link";
        a.onclick = sessionStorage.setItem("res", JSON.stringify(res));
        a.onclick = a.setAttribute("href","pages/restaurant.html");
        
        let image = new Image();
        image.src = res.img;
        let name = pForShowingData(res,'businessName');
        let price = pForShowingData(res, 'averagePrice');
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
        div.appendChild(a)
        div.appendChild(price);
        div.appendChild(rating);
        
        document.getElementById("main-list").appendChild(div);
    }
}

//filters