// DEFAULT DATA CHECK
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

//saves the previous page
if(document.referrer.indexOf("login.html") == -1 ){
    sessionStorage.setItem("temp", document.referrer);
}

function login(){
    let type;
    let email = document.getElementById("logPage-form-email").value;
    let psw = document.getElementById("logPage-form-psw").value;
    let cArray = JSON.parse(localStorage.getItem("customers"));
    let rArray = JSON.parse(localStorage.getItem("restaurateurs"));
    for (let c of cArray) {
        if(email == c.email){
            type = "c";
            if(psw == c.psw){
                sessionStorage.setItem("logged",JSON.stringify(c));
                if(sessionStorage.getItem("cart")==null){
                    sessionStorage.setItem("cart","[]");
                }
                document.getElementById("logPage-form").action = sessionStorage.getItem("temp");
                break;
            }else{
                console.log("password sbagliata");
                //warning: la password non è corretta
            }
        }
    }
    for(let r of rArray){
        if(email == r.email){
            type="r";
            if(psw == r.psw){
                sessionStorage.setItem("logged",JSON.stringify(r));
                //caricare qui gli ordini in corso/passati)
                document.getElementById("logPage-form").action = sessionStorage.getItem("temp");
                break;
            }else{
                console.log("password sbagliata");
                //warning: la password non è corretta
            }
        }
    }
    if(type != "c" && type!="r"){
        alert("Non c'� nessun account registrato con questa email");
    }

}