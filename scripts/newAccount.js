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
    }s
}

// DEFAULT DATA CHECK
if(localStorage.getItem("customers")==null){
    localStorage.setItem("customers",JSON.stringify(customers));
}
if(localStorage.getItem("restaurateurs")==null){
    localStorage.setItem("restaurateurs", JSON.stringify(restaurateurs));
}



/* -- CUSTOMER SECTION -- */
{   
    // CLASS
        class Customer{
            constructor(name, surname, phone, email, psw, payment, ads){ //+address,
                this.name = name;
                this.surname = surname;
                this.phone = phone;
                this.email = email;
                this.psw = psw;
                //address.default = true;
                //this.address = [address];
                this.payment = payment;
                this.therms = true;
                this.privacy = true;
                this.ads = ads;
                this.orders = [];
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
            /*let address = new Address ((name+" "+surname),
                document.getElementById("newAcc-c-address-street").value,
                document.getElementById("newAcc-c-address-civN").value,
                document.getElementById("newAcc-c-address-zip").value,
                document.getElementById("newAcc-c-address-city").value,
                document.getElementById("newAcc-c-address-province").value);*/
            let payment = [document.getElementById("newAcc-c-payment-paypal").checked,
                document.getElementById("newAcc-c-payment-prepaid").checked,
                document.getElementById("newAcc-c-payment-card").checked,
                document.getElementById("newAcc-c-payment-cash").checked];
            let ads = document.getElementById("newAcc-c-ads").checked;

            let customer = new Customer (name, surname, phone, email, psw, payment, ads); //+address

            let cArray = JSON.parse(localStorage.getItem("customers"));
            cArray.push(customer);
            localStorage.setItem("customers", JSON.stringify(cArray));
        }

        function checksC(){
            if(pswCheckC()==true && noDoubleC()==true){
                accountCreationC();
                document.getElementById("newAcc-c-form").action = sessionStorage.getItem("prev");
                alert("Registrazione avvenuta con successo!");
            }
        }

        function cMode(){
            document.getElementById("newAcc-c").style.display = "block";
            document.getElementById("newAcc-r").style.display = "none";
        }
}






/* -- RESTAURATEUR SECTION -- */
{
    // CLASS
        class Restaurateur{
            constructor(businessName, email, phone, psw, address, vatNum, payment){
                this.businessName = businessName,
                this.email = email;
                this.phone = phone;
                this.psw = psw;
                address.default = true;
                this.address = address;
                this.vatNum = vatNum;
                this.payment = payment;
                this.therms = true;
                this.rating = null;
                this.orders = [];
                this.averagePrice = 0;
                this.menu = [];
                this.img = "";
                this.banner = "";
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
            let address = new Address (businessName,
                document.getElementById("newAcc-r-address-street").value,
                document.getElementById("newAcc-r-address-civN").value,
                document.getElementById("newAcc-r-address-zip").value,
                document.getElementById("newAcc-r-address-city").value,
                document.getElementById("newAcc-r-address-province").value);
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
                document.getElementById("newAcc-r-form").action = sessionStorage.getItem("prev");
                alert("Registrazione avvenuta con successo!");
            }
        }

        function rMode(){
            document.getElementById("newAcc-r").style.display = "block";
            document.getElementById("newAcc-c").style.display = "none";
        }
}
