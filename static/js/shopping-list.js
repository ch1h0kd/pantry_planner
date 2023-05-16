import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, push, query, get, remove, orderByChild} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

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

var shoppingRef;
var username = '{{ nickname }}'
//var username = fetch('/getnickname').then(response => username = response);
var shoppingRef = ref(db, username + "/shopping");
      get(shoppingRef).then((snapshot) => {
        shopHandler(snapshot)
      });


document.getElementById("shopping-list-input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addItemShop();
  }
});


export function addItemShop() {    
  const itemInput = document.getElementById("shopping-list-input");
  const item = itemInput.value;
  const invalid = document.getElementById("invalid-input-shop");
  if(item != ""){
    push(shoppingRef, {
    item: item
    }).then(() => {
      invalid.style.display = "none";
      itemInput.value = "";
      get(shoppingRef).then((snapshot) => {
        shopHandler(snapshot)
      });
    })
    .catch((error) => {
      console.log("Write operation denied: " + error.message);
      invalid.style.display = "block";
    });
  }
}

function shopHandler(snapshot){
  const list = document.getElementById("shopping-list");
  list.innerHTML = "";
  const trip = Object.values(snapshot.val());
  const keys = Object.keys(snapshot.val());
  var i = 0;
  trip.forEach(element => {        
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");
      const itemHeading = document.createElement("h2");
      var button = document.createElement("button");
      button.innerHTML = "remove item";
      button.value = (keys[i]);
      listItem.appendChild(button);
      button.style["float"] = "right";
      button.addEventListener("click", function(){
        buttonRemove("/shopping/", button.value);
      });
      
      listItem.appendChild(itemHeading);
      list.appendChild(listItem);
      i++;
  });
}

window.addItemShop = addItemShop;