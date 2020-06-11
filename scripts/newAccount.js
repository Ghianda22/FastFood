/* -- CUSTOMER SECTION -- */

    // CLASS
        class Customer{
            constructor(name, surname, phone, email, psw, address, ad){
                this.name = name;
                this.surname = surname;
                this.phone = phone;
                this.email = email;
                this.psw = psw;
                this.address = address;
                this.therms = true;
                this.privacy = true;
                this.ad = ad;
                this.orderNum = [];
            }
        }
        


    // CHECKS
        function pswCheckC(){
            if(document.getElementById("newAcc-c-psw").value == document.getElementById("newAcc-c-pswOk").value){
                accountCreationC();
                alert("Registrazione avvenuta con successo, clicca ok per continuare");
            }else{
                //document.getElementById("psw-c-alert").style.display = "block";
                alert("cogliona");
            }
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
            let ad = document.getElementById("newAcc-c-ad").checked;

            let customer = new Customer (name, surname, phone, email, psw, address, ad);
            
            let cArray = JSON.parse(localStorage.getItem("customer"));
            cArray.push(customer);
            localStorage.setItem("customer", JSON.stringify(cArray));
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
            }
        }

    
    // CHECKS
        function pswCheckR(){
            if(document.getElementById("newAcc-r-psw") == document.getElementById("newAcc-r-pswOk")){
                accountCreationR();
                alert("Registrazione avvenuta con successo, clicca ok per continuare");
            }else{
                //document.getElementById("psw-r-alert").style.display = "block";
            }    
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
            let vatNum = document.getElementById("newAcc-r-vatNum").checked;
            let payment = [ document.getElementById("newAcc-r-payment-paypal").checked,
                document.getElementById("newAcc-r-payment-prepaid").checked,
                document.getElementById("newAcc-r-payment-card").checked,
                document.getElementById("newAcc-r-payment-cash").checked ];
            
            let restaurateur = new Restaurateur (businessName, email, phone, psw, address, vatNum, payment);
            
            let rArray = JSON.parse(localStorage.getItem("restaurateur"));
            rArray.push(restaurateur);
            localStorage.setItem("restaurateur", JSON.stringify(rArray));
        }

