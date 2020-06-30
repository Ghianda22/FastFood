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


/* -- BUSINESS DATA -- */
{
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

    //show
    function showPersonalData(){
        document.getElementById("pArea-pData-show-businessName-p").innerHTML = user.businessName;
        document.getElementById("pArea-pData-show-phone-p").innerHTML = user.phone;
        document.getElementById("pArea-pData-show-email-p").innerHTML = user.email;
        document.getElementById("pArea-pData-show-vatNum-p").innerHTML = user.vatNum;
        showData('pData');
    }

    //modify
    function pDataModifier(data){
        document.getElementById("pArea-pData-show-"+data).style.display="none";
        document.getElementById("pArea-pData-mod-"+data).style.display="block";
    }

    //ok
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
    
}


/* -- PAYMENT -- */   
//[paypal, prepagata, carta di credito, contanti]
{
    function payment(){
        for (let i = 0; i < user.payment.length; i++) {
            if(user.payment[i] != false){
                document.getElementById("pArea-payment-show-"+i).style.display = "block";
            }else{
                document.getElementById("pArea-payment-show-"+i).style.display = "none";
            }
        }
    }

    //show
    function showPaymentData(){     
        showData('payment');
        payment();
    }

    //modify
    function paymentModifier(){     //prev +
        for (const tag of document.getElementById("pArea-payment-show-all").getElementsByTagName("p")){
            let prev = tag.previousElementSibling;
            if(tag.style.display == "block"){
                prev.style.display = "none";
                prev.previousElementSibling.style.display = "inline";
            }else{
                prev.style.display = "inline";
                prev.previousElementSibling.style.display = "none";
            }
            tag.style.display = "block";
        }
        document.getElementById("pArea-payment-show").firstChild.innerHTML = "Aggiungi(+) o rimuovi(-) i metodi di pagamento";
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

    //ok
    function paymentOk(){
        payment();
        for (const i of document.getElementById("pArea-payment-show-all").getElementsByTagName("i")){
            i.style.display = "none";
        }
        document.getElementById("pArea-payment-show").firstChild.innerHTML = "Metodi di pagamento attivi:";
        document.getElementById("pArea-payment-show-ok").style.display = "none";
        document.getElementById("pArea-payment-show-mod").style.display = "inline";
    }
}


/* -- ADDRESS -- */
{
    //show
    function showAddressData(){
        document.getElementById("pArea-address-show-line0").innerHTML = user.address.owner;
        document.getElementById("pArea-address-show-line1").innerHTML = user.address.street +" "+ user.address.civN;
        document.getElementById("pArea-address-show-line2").innerHTML = user.address.zip + ", " + user.address.city + " (" + user.address.province + ")";
        if(user.address.other == false){
            document.getElementById(id="pArea-address-show-line3").style.display = "none";
        }else{
            document.getElementById("pArea-address-show-line3").innerHTML = user.address.other;
        }
        showData('address');
    }

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
}


/* -- ADS -- */
{
    //popup
    function popup(data){
        document.getElementById("pArea-ads-show-"+data+"-text").style.display = "block";
    }
    function closePopup(data){
        document.getElementById("pArea-ads-show-"+data+"-text").style.display = "none";
    }
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