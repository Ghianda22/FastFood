// DEFAULT DATA CHECK
if(localStorage.getItem("customers")==null){
    localStorage.setItem("customers",JSON.stringify(customers));
}
if(localStorage.getItem("restaurateurs")==null){
    localStorage.setItem("restaurateurs", JSON.stringify(restaurateurs));
}
if(localStorage.getItem("dishes")==null){
    localStorage.setItem("dishes", JSON.stringify(dishes));
}

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