import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, push, onValue, get, remove } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";


var i = 0;
const app = initializeApp({
    apiKey: "AIzaSyB2DuI-rqRSZYiiEzvBasH4CUeppxX_FoY",
    authDomain: "pantryplanner-5d480.firebaseapp.com",
    databaseURL: "https://pantryplanner-5d480-default-rtdb.firebaseio.com",
    projectId: "pantryplanner-5d480",
    storageBucket: "pantryplanner-5d480.appspot.com",
    messagingSenderId: "407621335990",
    appId: "1:407621335990:web:c6ef5ac9f60b5ba09e9f17",
    measurementId: "G-56LV409GVC"
});

const db = getDatabase(app);
var username = "defualt-user";
var foodRef = ref(db, username + "/food");
var shoppingRef = ref(db, username + "/shopping");
get(shoppingRef).then((snapshot) => {
  shopHandler(snapshot)
});
get(foodRef).then((snapshot) => {
  foodHandler(snapshot)
});


export function changeUser(){
  const userInput = document.getElementById("user-input-pop");
  const promt = document.getElementById("user-promt-pop");
  const but = document.getElementById("add-to-list");
  const newUser = userInput.value;
  if(newUser != ""){
    promt.remove();
    userInput.remove();
    but.remove();
    username = newUser;
    foodRef = ref(db, username + "/food");
    shoppingRef = ref(db, username + "/shopping");
    userInput.value = "";
  }
  get(shoppingRef).then((snapshot) => {
    shopHandler(snapshot)
  });
  get(foodRef).then((snapshot) => {
    foodHandler(snapshot)
  });
}

export function popUp() {
    var popup = document.getElementById("Popup");
    if (!popup.classList.contains("show")) {
      popup.classList.toggle("show");
    }
  }

export function closePopUp(){
    console.log("closePopUp");
    popup.classList.toggle("show");
}

export function addItemExp() {   
    console.log("addItemExp"); 
    const itemInput = document.getElementById("item-input-pop");
    const expInput = document.getElementById("exp-input-pop");
    const item = itemInput.value;
    const exp = expInput.value;
    if(item != "" && exp != ""){
      itemInput.value = "";
      expInput.value = "";
      push(foodRef, {
        item: item,
        exp: exp
      });
    }
    get(foodRef).then((snapshot) => {
      foodHandler(snapshot)
    });
}

export function addItemShop() {    
  const itemInput = document.getElementById("shop-input");
  const item = itemInput.value;
  if(item != ""){
    itemInput.value = "";
    push(shoppingRef, {
      item: item
    });
  }
  get(shoppingRef).then((snapshot) => {
    shopHandler(snapshot)
  });
}
  
  /*
  get(foodRef).then((snapshot) => {
    in case I need it again the code to get food ref once
*/

export function buttonRemove(category, id){
  var toRemove = ref(db, username + category + id); 
  remove(toRemove);
  get(shoppingRef).then((snapshot) => {
    shopHandler(snapshot)
  });
  get(foodRef).then((snapshot) => {
    foodHandler(snapshot)
  });
}
/*  
onValue(foodRef, (snapshot) => { //update the list whenever a new food is added 
  const list = document.getElementById("expList");
  list.innerHTML = "";
  const trip = Object.values(snapshot.val());
  const keys = Object.keys(snapshot.val());
  var i = 0;
  trip.forEach(element => {        
      const listItem = document.createElement("li");
      const itemHeading = document.createElement("h2");
      var button = document.createElement("button");
      button.innerHTML = "remove item";
      button.value = (keys[i]);
      listItem.appendChild(button);
      button.style["float"] = "right";
      button.addEventListener("click", function(){
        buttonRemove("/food/", button.value);
      });
      itemHeading.appendChild(document.createTextNode(element.item));
      const expPara = document.createElement("p");
      expPara.appendChild(document.createTextNode(element.exp));
      listItem.appendChild(itemHeading);
      listItem.appendChild(expPara);
      list.appendChild(listItem);
      i++;
  });
}); 
*/

function foodHandler(snapshot){
  const list = document.getElementById("expList");
  list.innerHTML = "";
  const trip = Object.values(snapshot.val());
  const keys = Object.keys(snapshot.val());
  var i = 0;
  trip.forEach(element => {        
      const listItem = document.createElement("li");
      const itemHeading = document.createElement("h3");
      var button = document.createElement("button");
      button.innerHTML = "remove item";
      button.value = (keys[i]);
      listItem.appendChild(button);
      button.style["float"] = "right";
      button.addEventListener("click", function(){
        buttonRemove("/food/", button.value);
      });
      itemHeading.appendChild(document.createTextNode(element.item));
      const expPara = document.createElement("p");
      expPara.appendChild(document.createTextNode(element.exp));
      listItem.appendChild(itemHeading);
      listItem.appendChild(expPara);
      list.appendChild(listItem);
      i++;
  });
}

/*
onValue(shoppingRef, (snapshot) => { //update the list whenever a new food is added 
  const list = document.getElementById("shopList");
  list.innerHTML = "";
  const trip = Object.values(snapshot.val());
  const keys = Object.keys(snapshot.val());
  var i = 0;
  trip.forEach(element => {        
      const listItem = document.createElement("li");
      const itemHeading = document.createElement("h2");
      var button = document.createElement("button");
      button.innerHTML = "remove item";
      button.value = (keys[i]);
      listItem.appendChild(button);
      button.style["float"] = "right";
      button.addEventListener("click", function(){
        buttonRemove("/shopping/", button.value);
      });
      itemHeading.appendChild(document.createTextNode(element.item));
      listItem.appendChild(itemHeading);
      list.appendChild(listItem);
      i++;
  });
});
*/
function shopHandler(snapshot){
  const list = document.getElementById("shopList");
  list.innerHTML = "";
  const trip = Object.values(snapshot.val());
  const keys = Object.keys(snapshot.val());
  var i = 0;
  trip.forEach(element => {        
      const listItem = document.createElement("li");
      const itemHeading = document.createElement("h2");
      var button = document.createElement("button");
      button.innerHTML = "remove item";
      button.value = (keys[i]);
      listItem.appendChild(button);
      button.style["float"] = "right";
      button.addEventListener("click", function(){
        buttonRemove("/shopping/", button.value);
      });
      itemHeading.appendChild(document.createTextNode(element.item));
      listItem.appendChild(itemHeading);
      list.appendChild(listItem);
      i++;
    });
}

  
window.addItemExp = addItemExp; //changes the scope!!! most important line, makes global
window.addItemShop = addItemShop;
window.buttonRemove = buttonRemove;
  window.changeUser = changeUser;
  window.closePopUp = closePopUp;
  window.popUp = popUp;