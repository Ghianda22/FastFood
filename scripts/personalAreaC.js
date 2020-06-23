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

{   
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
    //show
    function showAddressData(){
        let i=0;
        for(let address of user.address){
            i++;
            let line0 = document.createElement("span").id = "pArea-address-show-" + i + "-owner";
            let content0 = document.createTextNode(address.owner);
            let line1 = document.createElement("p").innerHTML = address.street +" "+ address.civN;
            let line2 = document.createElement("P").innerHTML = address.zip + ", " + address.city + "(" + address.province + ")";
            let container = document.createElement("div").id = "pArea-address-show-" + i;
            document.getElementById("pArea-address-show").appendChild(line0);
            container.appendChild(line0);
            line0.appendChild(content0);
            
        }
        
    }
    //modify
}