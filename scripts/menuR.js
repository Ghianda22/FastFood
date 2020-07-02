let user = JSON.parse(sessionStorage.getItem("logged"));
let dishes = JSON.parse(localStorage.getItem("dishes"));
let users = JSON.parse(localStorage.getItem("customers"));
let corresp;
for (let j = 0; j < users.length; j++) {
    if(users[j].email == user.email){
        corresp = j;
    }
}
function updateUser(){
    sessionStorage.setItem("logged",JSON.stringify(user));
    users[corresp] = user;
    localStorage.setItem("customers",JSON.stringify(users));
}


function showMenu(){
    let menu = user.menu;
    for(let el of menu) {
        for (let dish of dishes) {
            if(el == dish.id){
                let li = document.createElement("li");
                li.id = "yourMenu-list-" + dish.id;
                let img = document.createElement("img");
                img.src = dish.img;
                let pName = document.createElement("P");
                pName.innerHTML = dish.name
                let pPrice = document.createElement("P");
                pPrice.innerHTML = dish.price;
                let pIngredients = document.createElement("P");
                let ingr = "";
                for (let elem of dish.ingredients) {
                    ingr += elem + ", ";
                }
                ingr = ingr.substring(0,ingr.length-2);
                pIngredients.innerHTML = ingr;
                let pCuisine = document.createElement("p");
                pCuisine.innerHTML = dish.cuisine;
                let pCategories = document.createElement("P");
                pCategories.innerHTML = dish.category;
                
                let div = document.createElement("div");
                div.id = "yourMenu-list-" + dish.id + "-data";
                div.appendChild(pName);
                div.appendChild(pPrice);
                div.appendChild(pIngredients);
                div.appendChild(pCuisine);
                div.appendChild(pCategories);
                li.appendChild(img);
                li.appendChild(div);
                document.getElementById("yourMenu-list").appendChild(li);
            }
        }
    }
}
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
function showDishes(){
    document.getElementById("yourMenu").style.display = "none";
    document.getElementById("setMenu").style.display = "block";
    for (let dish of dishes) {
        let li = document.createElement("li");
        li.id = "setMenu-list-" + dish.id;
        let img = document.createElement("img");
        img.src = dish.img;

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
        minus.class = "fas fa-minus hidden";
        minus.id = "setMenu-list-" + dish.id + "-minus";
        let plus = document.createElement("i");
        plus.class = "fas fa-plus hidden";
        minus.id = "setMenu-list-" + dish.id + "-plus";
        minus.setAttribute("onclick",removeDish(dish.id));
        plus.setAttribute("onclick",addDish(dish.id));

        
        li.appendChild(img);
        li.appendChild(div);
        li.appendChild(minus);
        li.appendChild(plus);
        document.getElementById("setMenu-list").appendChild(li);

        for (const el of user.menu) {
            if(el == dish.id){
                
                document.getElementById("setMenu-list-" + dish.id + "-minus").style.display = "inline";
                document.getElementById("setMenu-list-" + dish.id + "-plus").style.display = "none";
            }else{
                
                document.getElementById("setMenu-list-" + dish.id + "-plus").style.display = "inline";
                document.getElementById("setMenu-list-" + dish.id + "-minus").style.display = "none";
            }
        }
        
    }
}

function addDish(id){
    (user.menu).puscoh(id);
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

function changeMenu(){
    showMenu();
    document.getElementById("yourMenu").style.display = "block";
    document.getElementById("setMenu").style.display = "none";
    updateUser();
}