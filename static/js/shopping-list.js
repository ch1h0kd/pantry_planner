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

var shoppingRef;

fetch('/getnickname')
  .then(response => response.json())
  .then(json => { username = json.nickname;
    shoppingRef = ref(db, username + "/shopping");
    get(shoppingRef).then((snapshot) => {
      shopHandler(snapshot)
    });
});


document.getElementById("sortByName").addEventListener("click", function() {
  sortBy("item", false);
}, false);
document.getElementById("RsortByName").addEventListener("click", function() {
  sortBy("item", true);
}, false);
document.getElementById("sortByAdded").addEventListener("click", function() {
  sortBy("latest", true);
}, false);
document.getElementById("RsortByAdded").addEventListener("click", function() {
  sortBy("latest", false);
}, false);

document.getElementById("shopping-list-input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addItemShop();
  }
});

export function sortBy(category, reverse){
  var sortedRef;
  if(category != "latest"){
    sortedRef = query(ref(db, username + '/shopping'), orderByChild(category))
  }
  else{
    sortedRef = ref(db, username + '/shopping')
  };
  get(sortedRef).then((snapshot) =>{
    let sortedList = [];
    let keyList = [];
    const list = document.getElementById("shopping-list");
    list.innerHTML = "";
    snapshot.forEach(element =>{
      sortedList.push(element.val())
      keyList.push(element.key)
    });
    if(reverse){
      sortedList.reverse();
      keyList.reverse();
    }
    listFiller(sortedList, keyList);
  });
}

function listFiller(items, keys){
  const list = document.getElementById("shopping-list");
  list.innerHTML = "";
  var i = 0;
  items.forEach(element => {        
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");
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
      listItem.appendChild(itemHeading);
      list.appendChild(listItem);
      i++;
  });
}



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


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



window.addItemShop = addItemShop;
window.dFunction = dFunction;