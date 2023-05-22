import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, push, query, get, remove, orderByChild} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";


const api = '{{FIREBASEAPI}}';
const app = initializeApp({
  apiKey: api,
  authDomain: "pantryplannerfinal.firebaseapp.com",
  projectId: "pantryplannerfinal",
  storageBucket: "pantryplannerfinal.appspot.com",
  messagingSenderId: "150587264747",
  appId: "1:150587264747:web:1ef6199be3afe673fbf8ae",
  measurementId: "G-58F9K3EQJC"
});

const db = getDatabase(app);

let username = '{{ nickname }}'
username = fetch('/getnickname').then(response => username = response);
let shoppingRef = ref(db, username + "/shopping");
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
      itemHeading.appendChild(document.createTextNode(element.item));
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


export function buttonRemove(category, id){
  var toRemove = ref(db, username + category + id); 
  remove(toRemove);
  get(shoppingRef).then((snapshot) => {
    shopHandler(snapshot)
  });
  expHandler();
}

window.addItemShop = addItemShop;