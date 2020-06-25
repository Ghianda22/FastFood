let user = JSON.parse(sessionStorage.getItem("logged"));

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

function hideData(data){
    document.getElementById("pArea-"+data+"-show").style.display = "none";
    document.getElementById("pArea-"+data+"-down").style.display = "inline";
    document.getElementById("pArea-"+data+"-up").style.display = "none";
    sessionStorage.setItem("logged",JSON.stringify(user));
}

//necessary classes to handle addresses
class Customer{
        constructor(name, surname, phone, email, psw, address, ad){
            this.name = name;
            this.surname = surname;
            this.phone = phone;
            this.email = email;
            this.psw = psw;
            this.address = [address];
            this.therms = true;
            this.privacy = true;
            this.ad = ad;
            this.orderNum = [];
        }

        defaultAddress(addressIndex) {
            let def = 0;
            for (let x in this.address) {
                if (x.default == true) {
                    def++;
                }
            }
            if(def == 0){
                this.address[addressIndex].default = true;
            }else{
                for (let x in this.address) {
                    if (x.default == true) {
                        x.default = false;
                    }
                }
                this.address[addressIndex].default = true;
            }
        }
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
        document.getElementById("pArea-pData-show").style.display = "block";
        document.getElementById("pArea-pData-down").style.display = "none";
        document.getElementById("pArea-pData-up").style.display = "inline";
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
        document.getElementById("pArea-payment-show").style.display = "block";
        document.getElementById("pArea-payment-down").style.display = "none";
        document.getElementById("pArea-payment-up").style.display = "inline";
        payment();
    }

    //modify
    function paymentModifier(){
        for (const tag of document.getElementById("pArea-payment-show-all").getElementsByTagName("p")){
            let prev = tag.previousElementSibling;
            if(tag.style.display == "block"){
                prev.style.display = "none";
                prev.previousElementSibling.style.display = "inline";
            }else{
                prev.style.display = "inline";
                prev.previousElementSibling.style.display = "non";
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
    }
    function paymentRemover(p){
        user.payment[p] = false;
        let prev = document.getElementById("pArea-payment-show-"+p).previousElementSibling;
        prev.style.display = "inline";
        prev.previousElementSibling.style.display = "none";
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
    //icons
    let fullStar = document.createElement("i");
    fullStar.className = "fas fa-star";
    let emptyStar = document.createElement("i");
    emptyStar.className = "far fa-star";
    let modify = document.createElement("i");
    modify.className = "fas fa-edit";
    let check = document.createElement("i");
    check.className = "fas fa-check";

    function address(){
        for(let i = 0; i<user.address.length; i++){
            if(document.getElementById("pArea-address-show-"+i) == null){
                //data
                {
                    modify.setAttribute("onclick","addressModifier("+i+")");
                    
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
        document.getElementById("pArea-address-show").style.display = "block";
        document.getElementById("pArea-address-down").style.display = "none";
        document.getElementById("pArea-address-up").style.display = "inline";
    }

    //modify
    function setDefault(i){
        user.defaultAddress(i);
        cleanAddress();
        address();
    }
    function addressModifier(i){
        document.getElementById("pArea-address-mod-"+i).style.display = "block";        
        document.getElementById("pArea-address-show-"+i).style.display = "none";
    }
    function addressAdder(){
        let i = user.address.length;
        check.setAttribute("onclick","addressOk("+i+")");

        let line0new = createAddressInput(i,'owner');
        line0new.placeholder = "Nome sul citofono";
        
        let line1new = document.createElement("p");
        let line1newStreet = createAddressInput(i,'street');
        line1newStreet.placeholder = "Via/Piazza";
        let line1newCivN = createAddressInput(i,'civN');
        line1newCivN.placeholder = "Civico";
        line1new.appendChild(line1newStreet);
        line1new.appendChild(line1newCivN);
        
        let line2new = document.createElement("p");
        let line2newZip = createAddressInput(i,'zip');
        line2newZip.placeholder = "CAP";
        let line2newCity = createAddressInput(i,'city');
        line2newCity.placeholder = "Citt&aacute;";
        let line2newProvince = createAddressInput(i,'province');
        line2newProvince.placeholder = "Provincia (sigla)";
        line2newProvince.pattern = "[A-Z]{2}";
        line2new.appendChild(line2newZip);
        line2new.appendChild(line2newCity);
        line2new.appendChild(line2newProvince);

        let line3new = createAddressInput(i,'other');
        line3new.placeholder = "Consigli per la consegna";
        
        let containerNew = document.createElement("div");
        containerNew.id = "pArea-address-mod-" + i;
        containerNew.appendChild(line0new);
        containerNew.appendChild(line1new);
        containerNew.appendChild(line2new);
        containerNew.appendChild(line3new);
        containerNew.appendChild(check);
        document.getElementById("pArea-address-show-add").style.display = "none";
        document.getElementById("pArea-address-show").appendChild(containerNew);
    }

    //ok
    function addressOk(i){
        if(user.address[i] == undefined){
            let address = new Address("", "", "", "", "", "");
            (user.address).push(address);
        }
        ok(i,'owner');
        ok(i,'street');
        ok(i,'civN');
        ok(i,'zip');
        ok(i,'city');
        ok(i,'province');
        ok(i,'other');
        address();
        cleanAddress();
        address();
        document.getElementById("pArea-address-show-"+i).style.display = "block";        
        document.getElementById("pArea-address-mod-"+i).style.display = "none";
    }

    function ok(i,x){
        (user.address[i])[x] = document.getElementById("pArea-address-mod-" + i + "-" + x).value;
    }
    

}