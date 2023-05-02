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
get(foodRef).then((snapshot) => {
  foodHandler(snapshot)
});


export function changeUser(){
  const userInput = document.getElementById("user-input-pop");
  //const promt = document.getElementById("user-promt-pop");
  const but = document.getElementById("expList");
  const newUser = userInput.value;
  if(newUser != ""){
    //promt.remove();
    //userInput.remove();
    but.innerHTML = ""; // clear the contents
    username = newUser;
    foodRef = ref(db, username + "/food");
    userInput.value = "";
  }
  get(foodRef).then((snapshot) => {
    foodHandler(snapshot)
  });
}

export function addItemExp() {   
    console.log("addItemExp"); 
    const itemInput = document.getElementById("item-input-pop");
    const expInput = document.getElementById("exp-input-pop");
    const tagInput = document.querySelector("#tag");
    const item = itemInput.value;
    const exp = expInput.value;
    console.log(tagInput);
    if(item != "" && exp != "" && tag != ""){
      itemInput.value = "";
      expInput.value = "";
      tag.value = "";
      push(foodRef, {
        item: item,
        exp: exp,
        tag: tagInput
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

function foodHandler(snapshot){
  const list = document.getElementById("expList");
  list.innerHTML = "";
  const trip = Object.values(snapshot.val());
  const keys = Object.keys(snapshot.val());
  var i = 0;
  trip.forEach(element => {        
      const listItem = document.createElement("section");
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
  
window.addItemExp = addItemExp; //changes the scope!!! most important line, makes global
window.changeUser = changeUser;