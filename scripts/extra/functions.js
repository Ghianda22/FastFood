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
{
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
}
//detect logged user
{
    function detectUser(){
        if(sessionStorage.getItem("logged") != null){
            let user = JSON.parse(sessionStorage.getItem("logged"));
            if(user.vatNum == null){
                //customer mode
                document.getElementById("userArea-login").style.display = "none";
                document.getElementById("userArea-logged").style.display = "inline";
                document.getElementById("userArea-logged").href = "pages/personalAreaC.html";
    
            }else{
                //restaurateur mode
                document.getElementById("userArea-login").style.display = "none";
                document.getElementById("userArea-logged").style.display = "inline";
                document.getElementById("userArea-logged").href = "pages/personalAreaR.html";
    
            }
        }
    }
}
//find&update user (c)
{
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
}
//find&update user (r)
{
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
}
//save the previous page to retun there after login


/* -- HTML ELEMENTS IN JS -- */
//resetting/eliminate a part of html code
{
    function resetShowOrder(){
        while(document.getElementById(/*id*/).childElementCount != 0){
            document.getElementById("orderView-items-list").firstChild.remove();
        }
    }
}
//html creation
{
    function pForShowingData(obj, data, dataName){
        let p = document.createElement("p");
        let span = document.createElement("span");
        span.innerHTML = dataName + ": ";
        p.appendChild(span);
        if(typeof(obj[data]) == "object"){
            let list = "";
            for (let elem of obj[data]) {
                list += elem + ", ";
            }
            list = list.substring(0,list.length-2);
            p.innerHTML += list;
        }else{
            p.innerHTML += obj[data];
        }
        
        return p;
    }
    
}


/* -- IMG SHOW + SAVE -- */
{
    function showImg(input,id){
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById(id).src = e.target.result;
                user.img = e.target.result;
                updateUser();
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
}

//ELIMINATE ELEMENTS FROM ARRAY
{
    let temp = array[0];
    array[0] = array[eliminate];
    array[eliminate] = temp;
    array.shift();
}

