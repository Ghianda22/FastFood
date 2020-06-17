function back(){
            if(document.referrer.indexOf("login.html") == -1 ){     //la pagina precedente non � login
                window.history.goBack(-2);
            }else{
                window.history.back();
            }
}

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



/* -- CUSTOMER SECTION -- */

    // CLASS
        class Customer{
            constructor(name, surname, phone, email, psw, address, payment, ad){
                this.name = name;
                this.surname = surname;
                this.phone = phone;
                this.email = email;
                this.psw = psw;
                this.address = [address];
                this.payment = payment;
                this.therms = true;
                this.privacy = true;
                this.ad = ad;
                this.orderNum = [];
            }
        }
        


    // CHECKS
        function pswCheckC(){
            if(document.getElementById("newAcc-c-psw").value == document.getElementById("newAcc-c-pswOk").value){
                return true;
            }else{
                //mostra simbolo di errore rosso
                return false;
            }
        }

        function noDoubleC(){
            let email = document.getElementById("newAcc-c-email").value;
            let cArray = JSON.parse(localStorage.getItem("customers"));
            for(let i of cArray){
                if(email == i.email){
                    alert("C'è già un account collegato a questa email.\nHai dimenticato la password? Recuperala qui");
                    return false;
                }
            };
            return true;
        }

        function paymentC(){
            //dev'esserci almeno una spunta nei check
        }


    // FUNCTIONS
        function accountCreationC(){
            let name = document.getElementById("newAcc-c-name").value;
            let surname = document.getElementById("newAcc-c-surname").value;
            let phone = document.getElementById("newAcc-c-phone").value;
            let email = document.getElementById("newAcc-c-email").value;
            let psw = document.getElementById("newAcc-c-psw").value;
            let address = document.getElementById("newAcc-c-address-street").value+" "+
                document.getElementById("newAcc-c-address-civN").value+" "+
                document.getElementById("newAcc-c-address-zip").value+" "+
                document.getElementById("newAcc-c-address-city").value+" "+
                document.getElementById("newAcc-c-address-province").value;
            let payment = [document.getElementById("newAcc-c-payment-paypal").checked,
                document.getElementById("newAcc-c-payment-prepaid").checked,
                document.getElementById("newAcc-c-payment-card").checked,
                document.getElementById("newAcc-c-payment-cash").checked];
            let ad = document.getElementById("newAcc-c-ad").checked;

            let customer = new Customer (name, surname, phone, email, psw, address, payment, ad);
            
            let cArray = JSON.parse(localStorage.getItem("customers"));
            cArray.push(customer);
            localStorage.setItem("customers", JSON.stringify(cArray));
        }

        function checksC(){
            if(pswCheckC()==true && noDoubleC()==true){
                accountCreationC();
                back();
                alert("Registrazione avvenuta con successo!");
            }else{
                console.log("Si sono verificati degli errori");
            }
        }

        

        function cMode(){
            document.getElementById("newAcc-c").style.display = "block";
            document.getElementById("newAcc-r").style.display = "none";
        }






/* -- RESTAURATEUR SECTION -- */
    
    

    // CLASS
        class Restaurateur{
            constructor(businessName, email, phone, psw, address, vatNum, payment){
                this.businessName = businessName,
                this.email = email;
                this.phone = phone;
                this.psw = psw;
                this.address = address;
                this.vatNum = vatNum;
                this.payment = payment;
                this.therms = true;
                this.rating = null;
                this.orderNum = [];
                this.menu = [];
            }
        }

    
    // CHECKS
        function pswCheckR(){
            if(document.getElementById("newAcc-r-psw").value == document.getElementById("newAcc-r-pswOk").value){
                return true;
            }else{
                //mostra simbolo di errore rosso
                return false;
            }
        }

        function noDoubleR(){
            let email = document.getElementById("newAcc-r-email").value;
            let rArray = JSON.parse(localStorage.getItem("restaurateurs"));
            for(let i of rArray){
                if(email == i.email){
                    alert("C'è già un account collegato a questa email.\nHai dimenticato la password? Recuperala qui");
                    return false;
                }
            };
            return true;
        }


    // FUNCTIONS
        function accountCreationR(){
            let businessName = document.getElementById("newAcc-r-businessName").value;
            let email = document.getElementById("newAcc-r-email").value;
            let phone = document.getElementById("newAcc-r-phone").value;
            let psw = document.getElementById("newAcc-r-psw").value;
            let address = document.getElementById("newAcc-r-address-street").value+" "+
                document.getElementById("newAcc-r-address-civN").value+" "+
                document.getElementById("newAcc-r-address-zip").value+" "+
                document.getElementById("newAcc-r-address-city").value+" "+
                document.getElementById("newAcc-r-address-province").value;
            let vatNum = document.getElementById("newAcc-r-vatNum").value;
            let payment = [document.getElementById("newAcc-r-payment-paypal").checked,
                document.getElementById("newAcc-r-payment-prepaid").checked,
                document.getElementById("newAcc-r-payment-card").checked,
                document.getElementById("newAcc-r-payment-cash").checked];
            
            let restaurateur = new Restaurateur (businessName, email, phone, psw, address, vatNum, payment);
            
            let rArray = JSON.parse(localStorage.getItem("restaurateurs"));
            rArray.push(restaurateur);
            localStorage.setItem("restaurateurs", JSON.stringify(rArray));
        }

        function checksR(){
            if(pswCheckR()==true && noDoubleR()==true){
                accountCreationR();
                back();
                alert("Registrazione avvenuta con successo!");
            }else{
                console.log("Si sono verificati degli errori");
            }
        }

        function rMode(){
            document.getElementById("newAcc-r").style.display = "block";
            document.getElementById("newAcc-c").style.display = "none";
        }
