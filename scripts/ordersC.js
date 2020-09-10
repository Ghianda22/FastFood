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

let user = JSON.parse(sessionStorage.getItem("logged"));

let orderListV = JSON.parse(localStorage.getItem("orderList"));
//userOrders = list with order details
//user.order = array with all orders ids

let userOrders = [];
for(let i = 0; i < user.orders.length; i++){
    for(const order of orderListV){
        if(user.orders[i] == order.id){
            userOrders.push(order);
        }
    }
}


//SHOW
function infoLiElements(id, content, contentValue){
    let li = document.createElement("li");
    li.id = id + "-" + contentValue;
    let descr = document.createElement("span");
    descr.innerHTML = content;
    let value = document.createElement("span");
    value.innerHTML = contentValue;

    li.appendChild(descr);
    li.appendChild(value);

    return li;
}
function showOrders(){
    for(const order of userOrders){
        //find restaurateur
        let rList = JSON.parse(localStorage.getItem("restaurateurs"));
        let res = {};
        for(let j = 0; j < rList.length; j++) {
            if(rList[j].email == order.res){
                res = rList[j];
            }
        }
        
        /* -- DIV CREATION -- */
        //ext div
        let li = document.createElement("li");
        li.id = "orderListV-container-ul-" + order.id;
        let divOrder = document.createElement("div");
        divOrder.id = li.id + "-orderInfo";
        let divDishes = document.createElement("div");
        divDishes.id = li.id + "-orderDishes";

        //int first division
        let divHeader = document.createElement("div");
        divHeader.id = divOrder.id + "-title";
        let divMain = document.createElement("div");
        divMain.id = divOrder.id + "-main";
        let divFooter = document.createElement("div");
        divFooter.id = divOrder.id + "-footer";

        /* HEADER */
        //restaurant name
        let divRes = document.createElement("div");
        divRes.id = divHeader.id + "-res";
        divRes.innerHTML = res.businessName;
        //order status
        let divStatus = document.createElement("div");
        divStatus.id = divHeader.id + "-status";
        divStatus.innerHTML = order.status;

        divHeader.appendChild(divRes);
        divHeader.appendChild(divStatus);

        /* MAIN */
        //restaurant img
        let divPhoto = document.createElement("div");
        divPhoto.id = divMain.id + "-resPhoto";
        let resImg = document.createElement("img");
        resImg.src = res.img;
        divPhoto.appendChild(resImg);
        //order info (cost, rating, payment type)
        let divInfo = document.createElement("div");
        divInfo.id = divMain.id + "-info";
        let ulInfoList = document.createElement("ul");
        ulInfoList.id = divInfo.id + "-ul";
        let currency = document.createElement("i");
        currency.className = "fas fa-euro-sign";
        ulInfoList.appendChild(infoLiElements(ulInfoList.id, "Totale: ", order.cost).appendChild(currency));
        ulInfoList.appendChild(infoLiElements(ulInfoList.id, "Pagamento: ", order.payment));
        ulInfoList.appendChild(infoLiElements(ulInfoList.id, "Tempo di preparazione: ", order.prepTime));
        //rating
        let liRating = document.createElement("li");
        liRating.id = ulInfoList.id + "-rating";
        let descr = document.createElement("span");
        descr.innerHTML = "Valutazione: ";
        let value = document.createElement("span");
        ratingStarSystem(value,order);        
        liRating.appendChild(descr);
        liRating.appendChild(value);
        ulInfoList.appendChild(liRating);
        
        divInfo.appendChild(ulInfoList);
        
        divMain.appendChild(divPhoto);
        divMain.appendChild(divInfo);


        divOrder.appendChild(divHeader);
        divOrder.appendChild(divMain);
        divOrder.appendChild(divFooter);

        li.appendChild(divOrder);
        li.appendChild(divDishes);
        document.getElementById("orderList-container-ul").appendChild(li);
    }
}

function rateOrder(orderId, ratingValue){
    
}

function ratingStarSystem(tag, order){
    //if not rated yet, all empty stars
    if(order.rating == null){
        for(let i = 1; i <= 5; i++){
            let emptyStar = document.createElement("i");
            emptyStar.className =  "far fa-star";
            emptyStar.setAttribute("onclick", "rateOrder(" + i + ")");
            tag.appendChild(emptyStar);
        }
    }else{
        //if rated, as many stars as the rating value
        for(let i = 1; i <= order.rating; i++){
            let fullStar = document.createElement("i");
            fullStar.className =  "fas fa-star";
            fullStar.setAttribute("onclick", "rateOrder(" + i + ")");
            tag.appendChild(fullStar);
        }
        for(let i = order.rating+1; i <= 5; i++){
            let emptyStar = document.createElement("i");
            emptyStar.className =  "far fa-star";
            emptyStar.setAttribute("onclick", "rateOrder(" + i + ")");
            tag.appendChild(emptyStar);
        }
    }
}