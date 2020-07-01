class Restaurateur{
    constructor(businessName, email, psw, address, vatNum, payment, therms){
        this.businessName = businessName,
        this.email = email;
        this.psw = psw;
        this.address = address;
        this.vatNum = vatNum;
        this.payment = payment;
        this.therms = therms;
        this.rating = null;
        this.orderNum = [];
        this.img = "";
    }
}

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