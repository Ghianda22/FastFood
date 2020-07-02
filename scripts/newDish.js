let user = JSON.parse(sessionStorage.getItem("logged"));
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


class Dish{
    constructor(name, img, ingredients, price, cuisine, owner, category){
        this.id = uuidv4();
        this.name = name;
        this.img = img;
        this.ingredients = ingredients;
        this.price = price;
        this.cuisine = cuisine;
        this.owner = owner;
        this.category = category;
    }
}

function newDish(type){
    let dish = new Dish()
}

function showForm(type){
    let forms = document.getElementsByTagName("form");
    for (let form of forms) {
        form.style.display = "none";
    }
    document.getElementById("newDish").style.display = "block";
    document.getElementById("new"+type).style.display = "block";
}

function listDisplay(type,id,list,displayed){
    for (let i = 0; i < list.length; i++) {
        let p = document.createElement("p");
        let input = document.createElement("input");
        input.type = type;
        input.name = id;
        input.id = id +"-"+ list[i];
        input.value = displayed[i];
        let label = document.createElement("label");
        label.for = id + "-" + list[i];
        label.innerHTML = (displayed[i].charAt(0).toUpperCase());
        p.appendChild(input);
        p.appendChild(label);
        document.getElementById(id).appendChild(p);
    }
}
/*function dishDataDisplay(type){
    let p = document.createElement("p");
    let input = document.createElement("input");
    input.type = "text";
    input.name = input.id = "new" + type + "data-name";
}*/
function showImg(input, id){
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById(id).src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

/* -- PIZZA -- */
{
    function pizzaIngredients(){
        let dough = ['classic','wholemeal','kamut','glutenfree'];
        let doughName = ['classico','integrale','kamut','senza glutine'];
        let sauce = ['tomato','pesto','none'];
        let sauceName = ['pomodoro','pesto','nessuna(bianca)'];
        let cheese = ['mozzarella','buffalo','lactosefree','none'];
        let cheeseName = ['mozzarella','bufala','senza lattosio','nessuna'];
        let dressing = ['olives',
                'backedHam',
                'rowHam',
                'cherryTomatoes',
                'mushrooms',
                'anchovies',
                'capers',
                'artichokes',
                'potatoes',
                'sausage',
                'friarielli',
                'pepperoni',
                'peppers',
                'eggplant',
                'frankfurter',
                'fries',
                'zucchini',
                'zola',
                'basil',
                'shrimps',
                'seafood',
                'salmon'
            ];
        let dressingName = ['olive',
                'cotto',
                'crudo',
                'pomodorini',
                'funghi',
                'acciughe',
                'capperi',
                'carciofi',
                'patate',
                'salsiccia',
                'friarielli',
                'salame piccante',
                'peperoni',
                'melanzane',
                'wurstel',
                'patatine',
                'zucchine',
                'zola',
                'basilico',
                'gamberetti',
                'frutti di mare',
                'salmone'
            ];
        listDisplay("radio","newPizza-ingredients-dough",dough,doughName);
        listDisplay("radio","newPizza-ingredients-sauce",sauce,sauceName);
        listDisplay("radio","newPizza-ingredients-cheese",cheese,cheeseName);
        listDisplay("checklist","newPizza-ingredients-dressing",dressing,dressingName);
    }

    function readIngredients(){
        let dishIngredient = [];

        let dressing = document.getElementsByName("newPizza-ingredients-dressing-checklist");
        dressing.forEach(ingredient => {
            if(ingredient.checked == true){
                dishIngredient.push(ingredient.value);
            }
        });
    }
}