
function detectUser(){
    if(sessionStorage.getItem("logged") != null){
        let user = JSON.parse(sessionStorage.getItem("logged"));
        if(user.vatNum == null){
            //customer mode
            document.getElementById("userIcon").href = "pages/personalAreaC.html";

        }else{
            //restaurateur mode
            document.getElementById("userIcon").href = "pages/personalAreaR.html";

        }
    }
}