let user = JSON.parse(sessionStorage.getItem("logged"));
let users = JSON.parse(localStorage.getItem("customers"));
let corresp;
for (let j = 0; j < users.length; j++) {
    if(users[j].email == user.email){
        corresp = j;
    }
}
function updateUser(){
    sessionStorage.setItem("logged",JSON.stringify(user));
    users[corresp] = user;
    localStorage.setItem("customers",JSON.stringify(users));
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


class Address{
        constructor(name, street, civN, zip, city, province){
            this.owner = name;
            this.street = street;
            this.civN = civN;
            this.zip = zip;
            this.city = city;
            this.province = province;
            this.default = false;
            this.other = false;
        }
}


/* -- PERSONAL DATA -- */
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
        document.getElementById("pArea-pData-show-name-p").innerHTML = user.name;
        document.getElementById("pArea-pData-show-surname-p").innerHTML = user.surname;
        document.getElementById("pArea-pData-show-phone-p").innerHTML = user.phone;
        document.getElementById("pArea-pData-show-email-p").innerHTML = user.email;
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
    function address(){
        for(let i = 0; i<user.address.length; i++){
            if(document.getElementById("pArea-address-show-"+i) == null){
                let fullStar = document.createElement("i");
                fullStar.className = "fas fa-star";
                let emptyStar = document.createElement("i");
                emptyStar.className = "far fa-star";
                let modify = document.createElement("i");
                modify.className = "fas fa-edit";
                let check = document.createElement("i");
                check.className = "fas fa-check";        
                let trashcan = document.createElement("i");
                trashcan.className = "fas fa-trash-alt";
                //data
                {
                    modify.setAttribute("onclick","addressModifier("+i+")");
                    trashcan.setAttribute("onclick","addressRemover("+i+")");
                    
                    let line0 = document.createElement("p");
                    let content0 = document.createTextNode(user.address[i].owner);
                    line0.id = "pArea-address-show-" + i + "-owner";
                    line0.appendChild(content0);
                    //class name for css

                    let line1 = document.createElement("p");
                    let content1 = document.createTextNode(user.address[i].street +" "+ user.address[i].civN);
                    line1.id = "pArea-address-show-" + i + "-line1";
                    line1.appendChild(content1);
                    //class name

                    let line2 = document.createElement("p");
                    let content2 = document.createTextNode(user.address[i].zip + ", " + user.address[i].city + " (" + user.address[i].province + ")");
                    line2.id = "pArea-address-show-" + i + "-line2";
                    line2.appendChild(content2);
                    //class name

                    let container = document.createElement("div");
                    container.id = "pArea-address-show-" + i;
                    container.className = "data";
                    if(user.address[i].default == true){
                        let fullStar = document.createElement("i");
                        fullStar.className = "fas fa-star";
                        container.appendChild(fullStar);
                    }else{
                        let emptyStar = document.createElement("i");
                        emptyStar.className = "far fa-star";
                        emptyStar.setAttribute("onclick","setDefault("+i+")");
                        container.appendChild(emptyStar);
                    }
                    container.appendChild(line0);
                    container.appendChild(line1);
                    container.appendChild(line2);
                    if(user.address[i].other != false){
                        let line3 = document.createElement("p");
                        let content3 = document.createTextNode(user.address[i].other);
                        line3.id = "pArea-address-show-" + i + "-line3";
                        line3.appendChild(content3);
                        //class name
                        container.appendChild(line3);
                    }
                    container.appendChild(modify);
                    container.appendChild(trashcan);
                    document.getElementById("pArea-address-show").insertBefore(container,(document.getElementById("pArea-address-show-add")));
                }
                //mod
                {
                    check.setAttribute("onclick","addressOk("+i+")");

                    let line0mod = createAddressInput(i,'owner');
                    line0mod.placeholder = "Nome sul citofono";
                    
                    let line1mod = document.createElement("p");
                    let line1modStreet = createAddressInput(i,'street');
                    line1modStreet.placeholder = "Via/Piazza";
                    let line1modCivN = createAddressInput(i,'civN');
                    line1modCivN.placeholder = "Civico";
                    line1mod.appendChild(line1modStreet);
                    line1mod.appendChild(line1modCivN);
                    
                    let line2mod = document.createElement("p");
                    let line2modZip = createAddressInput(i,'zip');
                    line2modZip.placeholder = "CAP";
                    let line2modCity = createAddressInput(i,'city');
                    line2modCity.placeholder = "Citt&aacute;";
                    let line2modProvince = createAddressInput(i,'province');
                    line2modProvince.placeholder = "Provincia (sigla)";
                    line2modProvince.pattern = "[A-Z]{2}";
                    line2mod.appendChild(line2modZip);
                    line2mod.appendChild(line2modCity);
                    line2mod.appendChild(line2modProvince);

                    let line3mod = createAddressInput(i,'other');
                    line3mod.placeholder = "Consigli per la consegna";
                    line3mod.required = false;
                    
                    let containerMod = document.createElement("div");
                    containerMod.id = "pArea-address-mod-" + i;
                    containerMod.className = "mod hidden";
                    if(user.address[i].default == true){
                        containerMod.appendChild(fullStar);
                    }else{
                        emptyStar.setAttribute("onclick","setDefault("+i+")");
                        containerMod.appendChild(emptyStar);
                    }
                    containerMod.appendChild(line0mod);
                    containerMod.appendChild(line1mod);
                    containerMod.appendChild(line2mod);
                    containerMod.appendChild(line3mod);
                    containerMod.appendChild(check);
                    document.getElementById("pArea-address-show").insertBefore(containerMod,(document.getElementById("pArea-address-show-add")));
                    
                }
            }
        }
    }
    function createAddressInput(i, x){
        let input = document.createElement("input");
        input.id = "pArea-address-mod-" + i + "-" + x;
        input.required = true;
        if(user.address[i] != undefined && (user.address[i])[x] != false){
            input.value = (user.address[i])[x];
        }
        return input;
    }
    function cleanAddress(){
        for (let i = 0; i < user.address.length; i++) {
            document.getElementById("pArea-address-show-"+i).remove();            
            document.getElementById("pArea-address-mod-"+i).remove();            
        }
    }
    
    //show
    function showAddressData(){
        address();
        showData('address');
    }

    //modify
    function setDefault(i){
        for (let x of user.address) {
            x.default = false;
        }   
        user.address[i].default = true;
        updateUser();
        cleanAddress();
        address();
    }
    function addressModifier(i){
        document.getElementById("pArea-address-mod-"+i).style.display = "block";        
        document.getElementById("pArea-address-show-"+i).style.display = "none";
    }
    
    //ok
    function addressOk(i){
        ok(i,'owner');
        ok(i,'street');
        ok(i,'civN');
        ok(i,'zip');
        ok(i,'city');
        ok(i,'province');
        ok(i,'other');
        cleanAddress();
        address();
        document.getElementById("pArea-address-show-add").style.display = "inline";
        document.getElementById("pArea-address-show-"+i).style.display = "block";
        updateUser();
    }
    function ok(i,x){
        (user.address[i])[x] = document.getElementById("pArea-address-mod-" + i + "-" + x).value;
    }

    //new
    function addressAdder(){
        document.getElementById("pArea-address-show-add").style.display = "none";
        document.getElementById("pArea-address-mod-new").style.display = "block";
    }
    function addressNew(){
        let addressPart = ['owner','street','civN','zip','city','province','other'];
        let i = user.address.length;
        user.address[i] = new Address("","","","","","");
        addressPart.forEach(part => {
            (user.address[i])[part] = document.getElementById("pArea-address-mod-new-" + part).value;
        });
        document.getElementById("pArea-address-mod-new").style.display = "none";
        address();
        updateUser();
    }
    
    //delete
    function addressRemover(i){
        if(user.address.length - 1 > 0){
            if(user.address[i].default == false){
                cleanAddress();
                let temp = user.address[0];
                user.address[0] = user.address[i];
                user.address[i] = temp;
                (user.address).shift();
                address();
                updateUser();
            }else{
                alert("Scegli un altro indirizzo predefinito prima di cancellare quello attuale");
            }
        }else{
            alert("Non puoi cancellare l'unico indirizzo presente. Creane prima un altro con cui sostituirlo");
        }
    }
}


/* -- ADS -- */
{
    //show
    function showAdsData(){
        showData('ads');
        document.getElementById("pArea-ads-show-pref-newsletter").checked = user.ads;
    }

    //popup
    function popup(data){
        document.getElementById("pArea-ads-show-"+data+"-text").style.display = "block";
    }
    function closePopup(data){
        document.getElementById("pArea-ads-show-"+data+"-text").style.display = "none";
    }

    //modify
    function adsModifier(){
        if(document.getElementById("pArea-ads-show-pref-newsletter").checked == true){
            user.ads = true;
        }else{
            user.ads = false;
        }
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
        localStorage.setItem("customers",JSON.stringify(users));
        sessionStorage.clear();
        document.location.href = "../index.html";
    }

    function userSave(){
        document.getElementById("pArea-deleteUser").style.display = "none";
    }
}