
let user = JSON.parse(sessionStorage.getItem("logged"));

/* CUSTOMER */

    // SHOW
        function showPData(){
            let name = user.name;
            let surname = user.surname;
            let phone = user.phone;
            let email = user.email;
            document.getElementById("pArea-pData-show-name-p").innerHTML = name;
            document.getElementById("pArea-pData-show-surname-p").innerHTML = surname;
            document.getElementById("pArea-pData-show-phone-p").innerHTML = phone;
            document.getElementById("pArea-pData-show-email-p").innerHTML = email;
        }

        function showPaymentData(){

        }
    
    // HIDE
        function hidePData(){

        }

    // MODIFY
        function nameModifier(){
            document.getElementById("pArea-pData-show-name").style.display="none";
            document.getElementById("pArea-pData-mod-name").style.display="block";
        }
        function nameOk(){
            user.name = document.getElementById("pArea-pData-mod-name-input").value;
            document.getElementById("pArea-pData-mod-name").style.display="none";
            document.getElementById("pArea-pData-mod-name-input").value = "";
            document.getElementById("pArea-pData-show-name-p").innerHTML = name;
            document.getElementById("pArea-pData-show-name").style.display="block";
        }

        //function phoneAdder()
