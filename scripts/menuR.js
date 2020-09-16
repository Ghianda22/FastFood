/* -- USER -- */
let user = JSON.parse(sessionStorage.getItem("logged"));
let dishes = JSON.parse(localStorage.getItem("dishes"));
let users = JSON.parse(localStorage.getItem("restaurateurs"));
let corresp;
for (let j = 0; j < users.length; j++) {
    if(users[j].email == user.email){
        corresp = j;
    }
}
//update
function updateUser(){
    sessionStorage.setItem("logged",JSON.stringify(user));
    users[corresp] = user;
    localStorage.setItem("restaurateurs",JSON.stringify(users));
}
function updateAveragePrice(){
    let tot = 0;
    for(let el of user.menu){
        for(let dish of dishes){
            if(el == dish.id){
                tot += dish.price;
            }
        }
    }
    user.averagePrice = (tot / user.menu.length).toFixed(2);
}


/* -- SHOW -- */
{
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


    //show
    function showMenu(){
        resetShowDishes();
        let menu = user.menu;
        document.getElementById("yourMenu-averagePrice").innerHTML += user.averagePrice;
        for(let el of menu) {
            for (let dish of dishes) {
                if(el == dish.id){
                    let li = document.createElement("li");
                    li.id = "yourMenu-list-" + dish.id;
                    li.className ="list-group-item my-4 mx-3 shadow";
                    let img = document.createElement("img");
                    img.src = dish.img;
                    let divImg = document.createElement("div");
                    divImg.appendChild(img);
                    divImg.className="divImg";

                    let pName = pForShowingData(dish, 'name', 'Nome');
                    let pPrice = pForShowingData(dish, 'price', 'Prezzo');
                    let pIngredients = pForShowingData(dish, 'ingredients', 'Ingredienti');
                    let pCuisine = pForShowingData(dish, 'cuisine', 'Tipo di cucina');
                    let pCategories = pForShowingData(dish, 'category', 'Categorie');
                

                    let div = document.createElement("div");
                    div.id = "yourMenu-list-" + dish.id + "-data";
                    div.appendChild(pName);
                    div.appendChild(pPrice);
                    div.appendChild(pIngredients);
                    div.appendChild(pCuisine);
                    div.appendChild(pCategories);
                    div.className = "";
                    li.appendChild(divImg);
                    li.appendChild(div);
                    document.getElementById("yourMenu-list").appendChild(li);
                }
            }
        }
    }
    function showDishes(){
        resetShowMenu();
        document.getElementById("yourMenu").style.display = "none";
        document.getElementById("setMenu").style.display = "block";
        for (let dish of dishes) {
            let li = document.createElement("li");
            li.id = "setMenu-list-" + dish.id;
            let img = document.createElement("img");
            img.src = dish.img;
            li.className ="list-group-item my-4 mx-3 shadow";
            let divImg = document.createElement("div");
            divImg.appendChild(img);
            divImg.className="divImg";

            let pName = pForShowingData(dish, 'name', 'Nome');
            let pPrice = pForShowingData(dish, 'price', 'Prezzo');
            let pIngredients = pForShowingData(dish, 'ingredients', 'Ingredienti');
            let pCuisine = pForShowingData(dish, 'cuisine', 'Tipo di cucina');
            let pCategories = pForShowingData(dish, 'category', 'Categorie');

            let div = document.createElement("div");
            div.id = "setMenu-list-" + dish.id + "-data";
            div.appendChild(pName);
            div.appendChild(pPrice);
            div.appendChild(pIngredients);
            div.appendChild(pCuisine);
            div.appendChild(pCategories);
            
            let minus = document.createElement("i");
            minus.className = "fas fa-minus hidden";
            minus.id = "setMenu-list-" + dish.id + "-minus";
            minus.setAttribute("onclick","removeDish(" + dish.id + ")");
            let plus = document.createElement("i");
            plus.className = "fas fa-plus hidden";
            plus.id = "setMenu-list-" + dish.id + "-plus";
            plus.setAttribute("onclick","addDish(" + dish.id + ")");
            
            li.appendChild(divImg);
            li.appendChild(div);
            li.appendChild(minus);
            li.appendChild(plus);
            document.getElementById("setMenu-list").appendChild(li);

            if(user.menu != "" ){    
                for (let el of user.menu) {
                    if(el == dish.id){                
                        document.getElementById("setMenu-list-" + dish.id + "-minus").style.display = "inline";
                        document.getElementById("setMenu-list-" + dish.id + "-plus").style.display = "none";
                        break;
                    }else{                
                        document.getElementById("setMenu-list-" + dish.id + "-plus").style.display = "inline";
                        document.getElementById("setMenu-list-" + dish.id + "-minus").style.display = "none";
                    }
                }
            }else{
                document.getElementById("setMenu-list-" + dish.id + "-plus").style.display = "inline";
                document.getElementById("setMenu-list-" + dish.id + "-minus").style.display = "none";
            }
        }
    }

    //reset
    function resetShowMenu(){
        for(let i = 0; i< user.menu.length; i++){
            document.getElementById("yourMenu-list-" + user.menu[i]).remove();
        }
    }
    function resetShowDishes(){
        if(document.getElementById("setMenu-list").childElementCount != 0){
            for(let i = 0; i< dishes.length; i++){
                document.getElementById("setMenu-list-" + dishes[i].id).remove();
            }
        }
    }
}


/* -- CHANGE -- */
{
    //icons
    function addDish(id){
        (user.menu).push(id);
        document.getElementById("setMenu-list-" + id + "-minus").style.display = "inline";
        document.getElementById("setMenu-list-" + id + "-plus").style.display = "none";
    }
    function removeDish(id){
        let target = null;
        for(let i = 0; i < user.menu.length; i++){
            if(user.menu[i] == id){
                target = i;
            }
        }
        let temp = user.menu[0];
        user.menu[0] = user.menu[target];
        user.menu[target] = temp;
        user.menu.shift();
        document.getElementById("setMenu-list-" + id + "-minus").style.display = "none";
        document.getElementById("setMenu-list-" + id + "-plus").style.display = "inline";
    }

    //buttons
    function changeMenu(){
        updateAveragePrice();
        showMenu();
        document.getElementById("yourMenu").style.display = "block";
        document.getElementById("setMenu").style.display = "none";
        updateUser();
    }
    function resetMenu(){
        user.menu = [];
        resetShowDishes();
        showDishes();
    }
    function backMenu(){
        user = JSON.parse(sessionStorage.getItem("logged"));
        showMenu();
        document.getElementById("yourMenu").style.display = "block";
        document.getElementById("setMenu").style.display = "none";

    }
}