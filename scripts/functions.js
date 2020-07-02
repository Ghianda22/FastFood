// DEFAULT DATA CHECK
{
    if(localStorage.getItem("customers")==null){
        let request = new XMLHttpRequest();
        request.open('GET', "../data/customers.json", true);
        request.onreadystatechange = function(){
            if(this.status == 200 && this.readyState == 4){
                localStorage.setItem("customers", request.response);
            }
        }
        request.send();
    }
    if(localStorage.getItem("restaurateurs")==null){
        let request = new XMLHttpRequest();
        request.open('GET', "../data/restaurateurs.json", true);
        request.onreadystatechange = function(){
            if(this.status == 200 && this.readyState == 4){
                localStorage.setItem("restaurateurs", request.response);
            }
        }
        request.send();
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
