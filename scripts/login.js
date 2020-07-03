if(localStorage.getItem("customers")==null){
    localStorage.setItem("customers",JSON.stringify(customers));
}
if(localStorage.getItem("restaurateurs")==null){
    localStorage.setItem("restaurateurs", JSON.stringify(restaurateurs));
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
                document.getElementById("logPage-form").action = "../index.html";
                break;
            }else{
                alert("password sbagliata");
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
                document.getElementById("logPage-form").action = "../index.html";
                break;
            }else{
                alert("password sbagliata");
                //warning: la password non è corretta
            }
        }
    }
    if(type != "c" && type!="r"){
        alert("Non c'� nessun account registrato con questa email");
    }
    return false;
}
