
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

/* SHOW */
    function showPersonalData(){
        document.getElementById("pArea-pData-show-name-p").innerHTML = user.name;
        document.getElementById("pArea-pData-show-surname-p").innerHTML = user.surname;
        document.getElementById("pArea-pData-show-phone-p").innerHTML = user.phone;
        document.getElementById("pArea-pData-show-email-p").innerHTML = user.email;
        document.getElementById("pArea-pData-show").style.display = "block";
        document.getElementById("pArea-pData-down").style.display = "none";
        document.getElementById("pArea-pData-up").style.display = "inline";
    }
    function showPaymentData(){
        document.getElementById("pArea-payment-show").style.display = "block";
        document.getElementById("pArea-payment-down").style.display = "none";
        document.getElementById("pArea-payment-up").style.display = "inline";
        document.getElementById("pArea-payment-show-name-p").innerHTML = user.name;
        document.getElementById("pArea-payment-show-surname-p").innerHTML = user.surname;
        document.getElementById("pArea-payment-show-phone-p").innerHTML = user.phone;
        document.getElementById("pArea-payment-show-email-p").innerHTML = user.email;
    }
    


/* HIDE */
    function hidePersonalData(){
        document.getElementById("pArea-pData-show").style.display = "none";
        document.getElementById("pArea-pData-down").style.display = "inline";
        document.getElementById("pArea-pData-up").style.display = "none";
        sessionStorage.setItem("logged",JSON.stringify(user));
    }
    function hidePaymentData(){
    }

/* MODIFY */
    
    // MODIFY
        function nameModifier(){
            document.getElementById("pArea-pData-show-name").style.display="none";
            document.getElementById("pArea-pData-mod-name").style.display="block";
        }
        function surnameModifier(){
            document.getElementById("pArea-pData-show-surname").style.display="none";
            document.getElementById("pArea-pData-mod-surname").style.display="block";
        }
        function phoneModifier(){
            document.getElementById("pArea-pData-show-phone").style.display="none";
            document.getElementById("pArea-pData-mod-phone").style.display="block"; 
        }        
        function emailModifier(){
            document.getElementById("pArea-pData-show-email").style.display="none";
            document.getElementById("pArea-pData-mod-email").style.display="block";
        }
        function pswModifier(){
            document.getElementById("pArea-pData-show-psw").style.display="none";
            document.getElementById("pArea-pData-mod-psw").style.display="block";
        }


    // OK - CONFIRM MODIFICATION
        function nameOk(){
            user.name = document.getElementById("pArea-pData-mod-name-input").value;
            document.getElementById("pArea-pData-mod-name").style.display="none";
            document.getElementById("pArea-pData-mod-name-input").value = "";
            document.getElementById("pArea-pData-show-name-p").innerHTML = user.name;
            document.getElementById("pArea-pData-show-name").style.display="block";
        }
        function surnameOk(){
            user.surname = document.getElementById("pArea-pData-mod-surname-input").value;
            document.getElementById("pArea-pData-mod-surname").style.display="none";
            document.getElementById("pArea-pData-mod-surname-input").value = "";
            document.getElementById("pArea-pData-show-surname-p").innerHTML = user.surname;
            document.getElementById("pArea-pData-show-surname").style.display="block";
        }
        function phoneOk(){
            user.phone = document.getElementById("pArea-pData-mod-phone-input").value;
            document.getElementById("pArea-pData-mod-phone").style.display="none";
            document.getElementById("pArea-pData-mod-phone-input").value = "";
            document.getElementById("pArea-pData-show-phone-p").innerHTML = user.phone;
            document.getElementById("pArea-pData-show-phone").style.display="block";
        }
        function emailOk(){
            user.email = document.getElementById("pArea-pData-mod-email-input").value;
            document.getElementById("pArea-pData-mod-email").style.display="none";
            document.getElementById("pArea-pData-mod-email-input").value = "";
            document.getElementById("pArea-pData-show-email-p").innerHTML = user.email;
            document.getElementById("pArea-pData-show-email").style.display="block";
        }
        function pswOk(){
            if(pswCheck){
                user.psw = document.getElementById("pArea-pData-mod-psw-input").value;
                document.getElementById("pArea-pData-mod-psw").style.display="none";
                document.getElementById("pArea-pData-mod-psw-input").value = "";
                document.getElementById("pArea-pData-show-psw").style.display="block";
            }
        }


        function pswCheck(){
            if(document.getElementById("pArea-pData-mod-psw-input").value != document.getElementById("pArea-pData-mod-pswOk-input").value){
                //warning
                document.getElementById("psw-warning").style.display = "inline";
                return false;
            }else{
                return true;
            }
        }