let user = JSON.parse(sessionStorage.getItem("logged"));
let users = JSON.parse(localStorage.getItem("restaurateurs"));
let corresp;
for (let j = 0; j < users.length; j++) {
    if(users[j].email == user.email){
        corresp = j;
    }
}
function updateUser(){
    sessionStorage.setItem("logged",JSON.stringify(user));
    users[corresp] = user;
    localStorage.setItem("restaurateurs",JSON.stringify(users));
}

function exitModify(){
    let data = document.getElementsByClassName("data");
    let mod = document.getElementsByClassName("mod");
    for (const div of data) {
        div.style.display = "block";
    }
    for (const div of mod) {
        div.style.display = "none";
    }
    document.getElementById("pArea-address-show-add").style.display = "inline";

}
function showData(data){
    document.getElementById("pArea-"+data+"-show").style.display = "block";
    document.getElementById("pArea-"+data+"-down").style.display = "none";
    document.getElementById("pArea-"+data+"-up").style.display = "inline";

}
function hideData(data){
    document.getElementById("pArea-"+data+"-show").style.display = "none";
    document.getElementById("pArea-"+data+"-down").style.display = "inline";
    document.getElementById("pArea-"+data+"-up").style.display = "none";
}

