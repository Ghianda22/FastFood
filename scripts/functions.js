// DEFAULT DATA CHECK
{
    if(localStorage.getItem("customers")==null){
        localStorage.setItem("customers",JSON.stringify(customers));
    }
    if(localStorage.getItem("restaurateurs")==null){
        localStorage.setItem("restaurateurs", JSON.stringify(restaurateurs));
    }
}
//DETECT USER
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
//LOCATE LOGGED USER
{
    let user = JSON.parse(sessionStorage.getItem("logged"));
    let users = JSON.parse(localStorage.getItem("customers"));
    let corresp;
    for (let j = 0; j < users.length; j++) {
        if(users[j].email == user.email){
            corresp = j;
        }
    }
}
//UPDATE LOGGED USER
{
    
    function updateUser(){
        sessionStorage.setItem("logged",JSON.stringify(user));
        users[corresp] = user;
        localStorage.setItem("customers",JSON.stringify(users));
    }

}

//IMG SHOW + SAVE
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
