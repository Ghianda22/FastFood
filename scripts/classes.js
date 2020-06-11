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
    }
}

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