/* -- DEFAULT -- */
//check&recharge data
{
    if(localStorage.getItem("customers")==null){
        localStorage.setItem("customers",JSON.stringify(customers));
    }
    if(localStorage.getItem("restaurateurs")==null){
        localStorage.setItem("restaurateurs", JSON.stringify(restaurateurs));
    }
    if(localStorage.getItem("dishes")==null){
        localStorage.setItem("dishes", JSON.stringify(dishes));
    }
    if(localStorage.getItem("orderList")==null){
        localStorage.setItem("orderList", JSON.stringify(orderList));
    }
}
function logout(){
    sessionStorage.removeItem("logged");
    sessionStorage.removeItem("cart");
    document.getElementById("logout").href = "../index.html";
    document.getElementById("logout-mob").href = "../index.html";
}
function toPArea(data){
    sessionStorage.setItem("pArea-data", JSON.stringify(data));
    document.getElementById("userArea-logged-pArea-" + data).href = "pages/personalAreaR.html";
}
/* -- END DEFAULT -- */


function toPArea(data,option){
    sessionStorage.setItem("pArea-data", JSON.stringify(data));
    let user = JSON.parse(sessionStorage.getItem("logged"));
    if(user.vatNum == null){
        document.getElementById(option + "userArea-logged-pArea-" + data).href = "personalAreaC.html";
    }
    else{
        document.getElementById(option + "userArea-logged-pArea-" + data).href = "personalAreaR.html";
    }
}

let res = JSON.parse(sessionStorage.getItem("logged"));
let ordersList = JSON.parse(localStorage.getItem("orderList"));
//resOrders = list with order details
//res.orders = array with all orders ids

function identifyCustomer(cusMail){
    let customers = JSON.parse(localStorage.getItem("customers"));
    let customer = null;
    for(const cust of customers){
        if(cust.email == cusMail){
            customer = cust;
        }
    }
    return customer;
}


let statusArray = ["In attesa", "In preparazione", "Pronto per la consegna", "Completato"];


/* -- SHOW -- */
function infoPElement(id, content, contentValue){
    let p = document.createElement("p");
    p.id = id + "-" + contentValue;
    let descr = document.createElement("span");
    descr.innerHTML = content;
    let value = document.createElement("span");
    value.innerHTML = contentValue;

    p.appendChild(descr);
    p.appendChild(value);

    return p;
}
function showDish(idQ, idN, dish){
    let liQuantity = document.createElement("li");
    liQuantity.id = idQ + "-" + dish.id;
    let liName = document.createElement("li");
    liName.id = idN + "-" + dish.id;
   
    let pName =document.createElement("p");
    pName.id = liName.id + "-name";
    pName.innerHTML = dish.name;

    let pQuantity = document.createElement("p");
    pQuantity.id = liQuantity.id + "-quantity";
    pQuantity.innerHTML = 1;

    liQuantity.appendChild(pQuantity);
    liName.appendChild(pName);
    document.getElementById(idQ).appendChild(liQuantity);
    document.getElementById(idN).appendChild(liName);
}
function showOrdersData(orderId){
    document.getElementById("orderList-container-ul-" + orderId + "-orderData").style.display = "block";
    document.getElementById("orderList-container-ul-" + orderId + "-orderInfo-footer-expOption-expand").style.display = "none";
    document.getElementById("orderList-container-ul-" + orderId + "-orderInfo-footer-expOption-hide").style.display = "block";
}
function hideOrdersData(orderId){
    document.getElementById("orderList-container-ul-" + orderId + "-orderData").style.display = "none";
    document.getElementById("orderList-container-ul-" + orderId + "-orderInfo-footer-expOption-expand").style.display = "block";
    document.getElementById("orderList-container-ul-" + orderId + "-orderInfo-footer-expOption-hide").style.display = "none";
}
//main
function showOrders(){
    for(const order of ordersList){
        if(res.email == order.res){
            let li = document.createElement("li");
            li.id = "orderList-container-ul-" + order.id;
            li.style.border = "1px solid black";
            let divOrder = document.createElement("div");
            divOrder.id = li.id + "-orderInfo";
            let divData = document.createElement("div");
            divData.id = li.id + "-orderData";
            divData.className = "hidden";
            /* ORDER DISHES */
            
                let divHeader = document.createElement("div");
                divHeader.id = divOrder.id + "-title";
                let divMain = document.createElement("div");
                divMain.id = divOrder.id + "-main";
                let divFooter = document.createElement("div");
                divFooter.id = divOrder.id + "-footer";

                /* HEADER */
                {
                //order status
                let divStatus = document.createElement("div");
                divStatus.id = divHeader.id + "-status";
                let spanStatus = document.createElement("span");
                spanStatus.id = divStatus.id + "-value";
                spanStatus.innerHTML = order.status;

                //button area
                let divProgress = document.createElement("div");
                divProgress.id = divStatus.id + "-progress";
                let progressButton = document.createElement("button");
                progressButton.id = divProgress.id + "-button";
                progressButton.className = "btn-warning";
                for (let i = 0; i < statusArray.length; i++) {
                    if(order.status == statusArray[i]){
                        progressButton.innerHTML = statusArray[i+1];
                    }
                }
                progressButton.setAttribute("onclick", "updateOrderStatus('" + order.id + "')");

                //order date
                let spanDate = document.createElement("span");
                spanDate.id = divProgress.id + "-date";
                spanDate.className = "hidden";
                let thatDate = new Date(order.date);
                spanDate.innerHTML = thatDate.getDate() + "/" + thatDate.getMonth();
                if(order.status == "Completato"){
                    spanDate.style.display = "inline";
                    progressButton.style.display = "none";
                }

                divProgress.appendChild(progressButton);
                divProgress.appendChild(spanDate);
                divStatus.appendChild(spanStatus);

                divHeader.appendChild(divStatus);
                divHeader.appendChild(divProgress);
                }


                /* MAIN */
                let divQuantity = document.createElement("div");
                divQuantity.id = divMain.id + "-quantity";
                let divDishName = document.createElement("div");
                divDishName.id = divMain.id + "-dishName";
                let quantityUl = document.createElement("ul");
                quantityUl.id = divQuantity.id + "-ul";
                let dishNameUl = document.createElement("ul");
                dishNameUl.id = divQuantity.id + "-ul";

                divQuantity.appendChild(quantityUl);
                divDishName.appendChild(dishNameUl);
                divMain.appendChild(divQuantity);
                divMain.appendChild(divDishName);

                /* FOOTER */
                {
                //order option expand
                let divExpOption = document.createElement("div");
                divExpOption.id = divFooter.id + "-expOption";
                let divExpand = document.createElement("div");
                divExpand.id = divExpOption.id + "-expand";
                divExpand.setAttribute("onclick", "showOrdersData('"+ order.id + "')");
                let divMsg = document.createElement("div");
                divMsg.id = divExpand.id + "-msg";
                let spanMsg = document.createElement("span");
                spanMsg.innerHTML = "Visualizza i dati dell'ordine";
                divMsg.appendChild(spanMsg);
                let divIcon = document.createElement("div");
                divIcon.id = divExpand.id + "-icon";
                let expArrow = document.createElement("i");
                expArrow.className = "fas fa-chevron-down";
                divIcon.appendChild(expArrow);
                divExpand.appendChild(divMsg);
                divExpand.appendChild(expArrow);
                //order option hide
                let divHide = document.createElement("div");
                divHide.id = divExpOption.id + "-hide";
                divHide.className = "hidden";
                divHide.setAttribute("onclick", "hideOrdersData('"+ order.id + "')");
                let divHideMsg = document.createElement("div");
                divHideMsg.id = divHide.id + "-msg";
                let spanHideMsg = document.createElement("span");
                spanHideMsg.innerHTML = "Nascondi i dati dell'ordine";
                divHideMsg.appendChild(spanHideMsg);
                let divHideIcon = document.createElement("div");
                divHideIcon.id = divHide.id + "-icon";
                let hideArrow = document.createElement("i");
                hideArrow.className = "fas fa-chevron-up";
                divIcon.appendChild(hideArrow);
                divHide.appendChild(divHideMsg);
                divHide.appendChild(hideArrow);

                divExpOption.appendChild(divExpand);
                divExpOption.appendChild(divHide);

                divFooter.appendChild(divExpOption);
                }

                divOrder.appendChild(divHeader);
                divOrder.appendChild(divMain);
                divOrder.appendChild(divFooter);
            

            /* -- ORDER DATA -- */
            {
                let cusInfo = document.createElement("div");
                cusInfo.id = divData.id + "-customer";
                let orderInfo = document.createElement("div");
                orderInfo.id = divData.id + "-order";

                let customer = identifyCustomer(order.cus);
                let nameSurname = customer.name + " " + customer.surname;
                let cusName = infoPElement(divData.id, "Cliente: ", nameSurname);
                let cusTel = infoPElement(divData.id, "Tel: ", customer.phone);
                cusInfo.appendChild(cusName);
                cusInfo.appendChild(cusTel);

                let tot = infoPElement(divData.id, "Totale: ", order.cost);
                tot.innerHTML += " €";
                orderInfo.appendChild(tot);
                orderInfo.appendChild(infoPElement(divData.id, "Pagamento: ", order.payment));

                //rating
                let rating = document.createElement("li");
                rating.id = orderInfo.id + "-rating";
                let descr = document.createElement("span");
                descr.innerHTML = "Valutazione: ";
                let value = document.createElement("span");
                ratingStarSystem(value, order);

                rating.appendChild(descr);
                rating.appendChild(value);
                orderInfo.appendChild(rating);

                divData.appendChild(cusInfo);
                divData.appendChild(orderInfo);
            }

            li.appendChild(divOrder);
            li.appendChild(divData);
            document.getElementById("orderList-container-ul").appendChild(li);

            //dish info
            {
                for(const id of order.dishIds){
                    for(const dish of dishes){
                        if(id == dish.id){
                            if(document.getElementById(dishNameUl.id + "-" + dish.id) == null){
                                showDish(quantityUl.id, dishNameUl.id, dish);
                            }else{
                                let c = document.getElementById(quantityUl.id + "-" + dish.id + "-quantity").innerHTML;
                                c++;
                                document.getElementById(quantityUl.id + "-" + dish.id + "-quantity").innerHTML = c;
                            }
                        }
                    }
                }
            }
        }
    }
}

function ratingStarSystem(tag, order){
    //if not rated yet, all empty stars
    if(order.rating == null){
        for(let i = 1; i <= 5; i++){
            let emptyStar = document.createElement("i");
            emptyStar.className =  "far fa-star";
            tag.appendChild(emptyStar);
        }
    }else{
        //if rated, as many stars as the rating value
        for(let i = 1; i <= order.rating; i++){
            let fullStar = document.createElement("i");
            fullStar.className =  "fas fa-star";
            tag.appendChild(fullStar);
        }
        for(let i = order.rating+1; i <= 5; i++){
            let emptyStar = document.createElement("i");
            emptyStar.className =  "far fa-star";
            tag.appendChild(emptyStar);
        }
    }
}
function updateOrderStatus(orderId){
    for (let j = 0; j < ordersList.length; j++){
        if(ordersList[j].id == orderId){
            for (let i = 0; i < statusArray.length; i++) {
                if(ordersList[j].status == statusArray[i]){
                    ordersList[j].status = statusArray[i+1];
                    document.getElementById("orderList-container-ul-" + orderId + "-orderInfo-title-status-value").innerHTML = ordersList[j].status;

                    if(ordersList[j].status == "Completato"){
                        document.getElementById("orderList-container-ul-" + orderId + "-orderInfo-title-status-progress-button").style.display = "none";
                        document.getElementById("orderList-container-ul-" + orderId + "-orderInfo-title-status-progress-date").style.display = "inline";
                    }else{
                        document.getElementById("orderList-container-ul-" + orderId + "-orderInfo-title-status-progress-button").innerHTML = statusArray[i+2];
                    }
                    localStorage.setItem("orderList",JSON.stringify(ordersList));
                    break;
                }
                
            }
            
        }
    }
}