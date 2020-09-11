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
let rList = JSON.parse(localStorage.getItem("restaurateurs"));
let ordersList = JSON.parse(localStorage.getItem("orderList"));
//userOrders = list with order details
//user.order = array with all orders ids

let userOrders = [];
for(let i = 0; i < user.orders.length; i++){
    for(const order of ordersList){
        if(user.orders[i] == order.id){
            userOrders.push(order);
        }
    }
}

function identifyRes(resMail){
    let res = {};
    for(let j = 0; j < rList.length; j++) {
        if(rList[j].email == resMail){
            res = rList[j];
        }
    }
    return res;
}
function updateRes(res){
    for(let j = 0; j < rList.length; j++) {
        if(rList[j].email == res.email){
           rList[j] = res;
        }
    }
    localStorage.setItem("restaurateurs",JSON.stringify(rList));
}

//SHOW

//needed
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
function pForShowingData(id, dish, data){
    let p = document.createElement("p");
    p.id = id + "-" + data;
    if(typeof(dish[data]) == "object"){
        let list = "";
        for (let elem of dish[data]) {
            list += elem + ", ";
        }
        list = list.substring(0,list.length-2);
        p.innerHTML += list;
    }else{
        p.innerHTML += dish[data];
    }
    
    return p;
}
function showDish(id, dish){
    let liDish = document.createElement("li");
    liDish.id = id + "-" + dish.id;

    let divImg = document.createElement("div");
    divImg.id = liDish.id + "-img";
    let img = document.createElement("img");
    img.src = dish.img;
    divImg.appendChild((img));
    
    let divData = document.createElement("div");
    divData.id = liDish.id + "-data";
    let pName = pForShowingData(divData.id,dish, 'name');
    let pPrice = pForShowingData(divData.id,dish, 'price');
    pPrice.innerHTML += " €";
    let pIngredients = pForShowingData(divData.id,dish, 'ingredients');
    let pQuantity = document.createElement("p");
    pQuantity.id = divData.id + "-quantity";
    let spanDescr = document.createElement("span");
    spanDescr.id = pQuantity.id + "-spanDescr";
    let spanQ = document.createElement("span");
    spanQ.id = pQuantity.id + "-spanQ";
    spanQ.innerHTML = 1;
    pQuantity.appendChild(spanDescr);
    pQuantity.appendChild(spanQ);

    divData.appendChild(pName);
    divData.appendChild(pIngredients);
    divData.appendChild(pPrice);
    divData.appendChild(pQuantity);

    liDish.appendChild(divImg);
    liDish.appendChild(divData);
    document.getElementById(id).appendChild(liDish);
}
function showOrdersDishes(orderId){
    document.getElementById("orderList-container-ul-" + orderId + "-orderDishes").style.display = "block";
    document.getElementById("orderList-container-ul-" + orderId + "-orderInfo-footer-expOption-expand").style.display = "none";
    document.getElementById("orderList-container-ul-" + orderId + "-orderInfo-footer-expOption-hide").style.display = "block";
}
function hideOrdersDishes(orderId){
    document.getElementById("orderList-container-ul-" + orderId + "-orderDishes").style.display = "none";
    document.getElementById("orderList-container-ul-" + orderId + "-orderInfo-footer-expOption-expand").style.display = "block";
    document.getElementById("orderList-container-ul-" + orderId + "-orderInfo-footer-expOption-hide").style.display = "none";
}
//main
function showOrders(){
    for(const order of userOrders){
        let li = document.createElement("li");
        li.id = "orderList-container-ul-" + order.id;
        li.style.border = "1px solid black";
        let divOrder = document.createElement("div");
        divOrder.id = li.id + "-orderInfo";
        let divDishes = document.createElement("div");
        divDishes.id = li.id + "-orderDishes";
        divDishes.className = "hidden";
        /* ORDER INFO */
        {   
            //find restaurateur
            let res = identifyRes(order.res);
            
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
            let spanStatus = document.createElement("span");
            spanStatus.id = divStatus.id + "-value";
            spanStatus.innerHTML = order.status;
            let divRefresh = document.createElement("div");
            divRefresh.id = divStatus.id + "-refresh";
            let refreshIcon = document.createElement("i");
            refreshIcon.id = divRefresh.id + "-icon";
            refreshIcon.className = "fas fa-sync";
            refreshIcon.setAttribute("onclick", "statusRefresh('" + order.id + "')");
            let spanDate = document.createElement("span");
            spanDate.id = divRefresh.id + "-date";
            spanDate.className = "hidden";
            let thatDate = new Date(order.date);
            spanDate.innerHTML = thatDate.getDate() + "/" + thatDate.getMonth();
            if(order.status == "Completato" | order.status == "Annullato"){
                spanDate.style.display = "inline";
                refreshIcon.style.display = "none";
            }

            divRefresh.appendChild(refreshIcon);
            divRefresh.appendChild(spanDate);
            divStatus.appendChild(spanStatus);
            divStatus.appendChild(divRefresh);

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
            let tot = infoLiElements(ulInfoList.id, "Totale: ", order.cost);
            tot.innerHTML += " €";
            ulInfoList.appendChild(tot);
            ulInfoList.appendChild(infoLiElements(ulInfoList.id, "Pagamento: ", order.payment));
            ulInfoList.appendChild(infoLiElements(ulInfoList.id, "Tempo di preparazione: ", order.prepTime));
            //rating
            let liRating = document.createElement("li");
            liRating.id = ulInfoList.id + "-rating";
            let descr = document.createElement("span");
            descr.innerHTML = "Valutazione: ";
            let value = document.createElement("span");
            value.id = liRating.id + "-stars";
            ratingStarSystem(value,order);
            liRating.appendChild(descr);
            liRating.appendChild(value);
            ulInfoList.appendChild(liRating);
            
            divInfo.appendChild(ulInfoList);
            
            divMain.appendChild(divPhoto);
            divMain.appendChild(divInfo);

            /* FOOTER */
            //address
            let divAddress = document.createElement("div");
            divAddress.id = divFooter.id + "-address";
            let line0 = document.createElement("p");
            let content0 = document.createTextNode("Indirizzo di ritiro: ");
            line0.id = divAddress.id + "-line0";
            line0.appendChild(content0);
            let line1 = document.createElement("p");
            let content1 = document.createTextNode(res.address.street +" "+ res.address.civN);
            line1.id = divAddress.id + "-line1";
            line1.appendChild(content1);
            //class name
            let line2 = document.createElement("p");
            let content2 = document.createTextNode(res.address.zip + ", " + res.address.city + " (" + res.address.province + ")");
            line2.id = divAddress.id + "-line2";
            line2.appendChild(content2);
            //class name
            divAddress.appendChild(line0);
            divAddress.appendChild(line1);
            divAddress.appendChild(line2);

            //dish option expand
            let divExpOption = document.createElement("div");
            divExpOption.id = divFooter.id + "-expOption";

            let divExpand = document.createElement("div");
            divExpand.id = divExpOption.id + "-expand";
            divExpand.setAttribute("onclick", "showOrdersDishes('"+ order.id + "')");
            let divMsg = document.createElement("div");
            divMsg.id = divExpand.id + "-msg";
            let spanMsg = document.createElement("span");
            spanMsg.innerHTML = "Visualizza il contenuto dell'ordine";
            divMsg.appendChild(spanMsg);
            let divIcon = document.createElement("div");
            divIcon.id = divExpand.id + "-icon";
            let expArrow = document.createElement("i");
            expArrow.className = "fas fa-chevron-down";
            divIcon.appendChild(expArrow);
            divExpand.appendChild(divMsg);
            divExpand.appendChild(expArrow);
            //dish option hide
            let divHide = document.createElement("div");
            divHide.id = divExpOption.id + "-hide";
            divHide.className = "hidden";
            divHide.setAttribute("onclick", "hideOrdersDishes('"+ order.id + "')");
            let divHideMsg = document.createElement("div");
            divHideMsg.id = divHide.id + "-msg";
            let spanHideMsg = document.createElement("span");
            spanHideMsg.innerHTML = "Nascondi il contenuto dell'ordine";
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

            divFooter.appendChild(divAddress);
            divFooter.appendChild(divExpOption);
            

            divOrder.appendChild(divHeader);
            divOrder.appendChild(divMain);
            divOrder.appendChild(divFooter);

            li.appendChild(divOrder);
            li.appendChild(divDishes);
            document.getElementById("orderList-container-ul").appendChild(li);
        }
        /* DISHES INFO */
        {
            for(const id of order.dishIds){
                for(const dish of dishes){
                    if(id == dish.id){
                        if(document.getElementById(divDishes.id + "-" + dish.id) == null){
                            showDish(divDishes.id,dish);
                        }else{
                            let c = document.getElementById(divDishes.id + "-" + dish.id + "-data-quantity-spanQ").innerHTML;
                            c++;
                            document.getElementById(divDishes.id + "-" + dish.id + "-data-quantity-spanQ").innerHTML = c;
                        }
                    }
                }
            }
        }
    }
}


function rateOrder(orderId, ratingValue){
    for(const order of ordersList){
        if(order.id == orderId){
            if(order.status == "Completato"){
                let target = document.getElementById("orderList-container-ul-"+ order.id + "-orderInfo-main-info-ul-rating-stars");
                order.rating = ratingValue;
                eraseRatingStars(target);
                ratingStarSystem(target, order);
                updateRes(identifyRes(order.res));
            }else{
                alert("Puoi valutare solamente gli ordini completati");
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
            emptyStar.setAttribute("onclick", "rateOrder('" + order.id + "'," + i + ")");
            tag.appendChild(emptyStar);
        }
    }else{
        //if rated, as many stars as the rating value
        for(let i = 1; i <= order.rating; i++){
            let fullStar = document.createElement("i");
            fullStar.className =  "fas fa-star";
            fullStar.setAttribute("onclick", "rateOrder('" + order.id + "'," + i + ")");
            tag.appendChild(fullStar);
        }
        for(let i = order.rating+1; i <= 5; i++){
            let emptyStar = document.createElement("i");
            emptyStar.className =  "far fa-star";
            emptyStar.setAttribute("onclick", "rateOrder('" + order.id + "'," + i + ")");
            tag.appendChild(emptyStar);
        }
    }
}
function eraseRatingStars(tag){
    while(tag.childElementCount != 0){
        tag.firstChild.remove();
    }
}

function statusRefresh(orderId){
    let ordersList = JSON.parse(localStorage.getItem("orderList"));
    for(let order of ordersList){
        if(order.id == orderId){
            document.getElementById("orderList-container-ul-" + orderId + "-orderInfo-title-status-value").innerHTML = order.status;
            if(order.status == "Completato" || order.status == "Annullato"){
                document.getElementById("orderList-container-ul-" + orderId + "-orderInfo-title-status-refresh-date").style.display = "inline";
                document.getElementById("orderList-container-ul-" + orderId + "-orderInfo-title-status-refresh-icon").style.display = "none";
            }
        }
    }
    
}