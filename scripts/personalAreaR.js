let user = JSON.parse(sessionStorage.getItem("logged"));
let users = JSON.parse(localStorage.getItem("restaurateurs"));
let corresp;
for (let j = 0; j < users.length; j++) {
    if(users[j].email == user.email){
        corresp = j;
    }
}

let payArr = ["Paypal", "Prepagata", "Carta di credito", "Contanti"]

function updateUser(){
    sessionStorage.setItem("logged",JSON.stringify(user));
    users[corresp] = user;
    localStorage.setItem("restaurateurs",JSON.stringify(users));
}
function toPArea(data,option){
    sessionStorage.setItem("pArea-data", JSON.stringify(data));
    let user = JSON.parse(sessionStorage.getItem("logged"));
    if(user.vatNum == null){
        document.getElementById(option + "userArea-logged-pArea-" + data).href = "personalAreaC.html";
    }
    else{
        document.getElementById(option + "userArea-logged-pArea-" + data).href = "personalAreaR.html";
    }
}
function logout(){
    sessionStorage.removeItem("logged");
    document.getElementById("logout").href = "../index.html";
    document.getElementById("logout-mob").href = "../index.html";
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
    paymentOk();
}

function pswCheck(){
        if(document.getElementById("pArea-pData-mod-psw-input").value != document.getElementById("pArea-pData-mod-pswOk-input").value){
            //warning
            document.getElementById("psw-warning").style.display = "inline";
            return false;
        }else{
            document.getElementById("psw-warning").style.display = "none";
            return true;
        }
}

function checkShowData(){
    let data = JSON.parse(sessionStorage.getItem("pArea-data"));
    if(data == "pdata"){
        document.getElementById("datiPersonali").style.display = "block";
    }else if(data == "payment"){
        document.getElementById("pArea-payment-show").style.display = "block";
    }else if(data == "privacy"){
        document.getElementById("privacy").style.display = "block";
    }
    sessionStorage.removeItem("pArea-data");
}



/* -- SHOW -- */
{
    function insertData(){
        checkShowData();
        showPersonalData();        
        showPayment();
        showAddress();  
    }

    function showPersonalData(){
        document.getElementById("pArea-pData-show-businessName-p").innerHTML = user.businessName;
        document.getElementById("pArea-pData-show-phone-p").innerHTML = user.phone;
        document.getElementById("pArea-pData-show-email-p").innerHTML = user.email;
        document.getElementById("pArea-pData-show-vatNum-p").innerHTML = user.vatNum;
        if(user.img != ""){
            document.getElementById("pArea-pData-show-img-view").src = ("../" + user.img);
        }
        if(user.banner != ""){
            document.getElementById("pArea-pData-show-banner-view").src = user.banner;
        }
    }
    function showPayment(){
        for (let i = 0; i < user.payment.length; i++) {
            if(user.payment[i] == true){
                let p = document.createElement("p");
                p.id = "pArea-payment-show-all-" + payArr[i];
                p.innerHTML = payArr[i];
                p.className = "w-100 my-1 text-left";
                (document.getElementById("pArea-payment-show-all")).appendChild(p);
            }
        }
    }
    function resetPayment(){
        while((document.getElementById("pArea-payment-show-all")).childElementCount != 0){
            document.getElementById("pArea-payment-show-all").firstChild.remove();
        }
    }

    function showAddress(){
        document.getElementById("pArea-address-show-line0").innerHTML = user.address.owner;
        document.getElementById("pArea-address-show-line1").innerHTML = user.address.street +" "+ user.address.civN;
        document.getElementById("pArea-address-show-line2").innerHTML = user.address.zip + ", " + user.address.city + " (" + user.address.province + ")";
        if(user.address.other == false){
            document.getElementById(id="pArea-address-show-line3").style.display = "none";
        }else{
            document.getElementById("pArea-address-show-line3").innerHTML = user.address.other;
        }
    }
}


/* -- FUNCTIONING -- */   
{
    //commercial data
    function pDataModifier(data){
        document.getElementById("pArea-pData-show-"+data).style.display="none";
        document.getElementById("pArea-pData-mod-"+data).style.display="block";
    }
    function pDataOk(data){
        if(document.getElementById("pArea-pData-mod-"+data+"-input").value != ""){
            user[data] = document.getElementById("pArea-pData-mod-"+data+"-input").value;
            updateUser()
        }
        document.getElementById("pArea-pData-mod-"+data).style.display="none";
        document.getElementById("pArea-pData-mod-"+data+"-input").value = "";
        document.getElementById("pArea-pData-show-"+data+"-p").innerHTML = user[data];
        document.getElementById("pArea-pData-show-"+data).style.display = "block";
    }
    function pswOk(){
        if(pswCheck()){
            user.psw = document.getElementById("pArea-pData-mod-psw-input").value;
            document.getElementById("pArea-pData-mod-psw").style.display="none";
            document.getElementById("pArea-pData-mod-psw-input").value = "";
            document.getElementById("pArea-pData-show-psw").style.display="block";
            updateUser();
        }
    }
    function showImg(input){
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("pArea-pData-show-img-view").src = e.target.result;
                user.img = e.target.result;
                updateUser();
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    function showBanner(input){
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("pArea-pData-show-banner-view").src = e.target.result;
                user.img = e.target.result;
                updateUser();
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    //payment
    //[paypal, prepagata, carta di credito, contanti]
    function paymentModifier(){     //prev +
        for (let i = 0; i < payArr.length; i++){
            let tag = document.getElementById("pArea-payment-show-" + i);
            let prev = tag.previousElementSibling;
            if(user.payment[i] == true){
                prev.style.display = "none";
                prev.previousElementSibling.style.display = "inline";
            }else{
                prev.style.display = "inline";
                prev.previousElementSibling.style.display = "none";
            }
            tag.style.display = "block";
        }
        document.getElementById("pArea-payment-mod").style.display = "block";
        document.getElementById("pArea-payment-show-all").style.display = "none";
        document.getElementById("pArea-payment-show-ok").style.display = "block";
        document.getElementById("pArea-payment-show-mod").style.display = "none";
    }
    function paymentAdder(p){
        user.payment[p] = true;
        let prev = document.getElementById("pArea-payment-show-"+p).previousElementSibling;
        prev.previousElementSibling.style.display = "inline";
        prev.style.display = "none";
        updateUser();
    }
    function paymentRemover(p){
        user.payment[p] = false;
        let prev = document.getElementById("pArea-payment-show-"+p).previousElementSibling;
        prev.style.display = "inline";
        prev.previousElementSibling.style.display = "none";
        updateUser();
    }
    function paymentOk(){
        resetPayment();
        showPayment();
        document.getElementById("pArea-payment-show-all").style.display = "block";
        document.getElementById("pArea-payment-mod").style.display = "none";
        document.getElementById("pArea-payment-show-ok").style.display = "none";
        document.getElementById("pArea-payment-show-mod").style.display = "block";
    }
}


/* -- ADDRESS -- */

    //modify
    function addressModifier(){
        document.getElementById("pArea-address-show-venue").style.display="none";
        let addressPart = ['owner','street','civN','zip','city','province','other'];
        addressPart.forEach(part => {
            document.getElementById("pArea-address-mod-venue-" + part).value = user.address[part];
        });
        if(user.address.other == false){
            document.getElementById(id="pArea-address-mod-venue-other").value = "";
        }
        document.getElementById("pArea-address-mod-venue").style.display="block";
    }

    //ok
    function addressOk(){
        let addressPart = ['owner','street','civN','zip','city','province','other'];
        addressPart.forEach(part => {
            user.address[part] = document.getElementById("pArea-address-mod-venue-" + part).value;
        });
        if(user.address.other == false){
            document.getElementById(id="pArea-address-show-line3").style.display = "none";
        }
        document.getElementById("pArea-address-show-venue").style.display="block";
        document.getElementById("pArea-address-mod-venue").style.display="none";
    }




/* -- ELIMINA -- */
{
    function areYouSure(){
        document.getElementById("pArea-deleteUser").style.display = "block";
    }

    function deleteUser(){
        let temp = users[0];
        users[0] = users[corresp];
        users[corresp] = temp;
        users.shift();
        localStorage.setItem("restaurateurs",JSON.stringify(users));
        sessionStorage.clear();
        document.location.href = "../index.html";
    }

    function userSave(){
        document.getElementById("pArea-deleteUser").style.display = "none";
    }
}