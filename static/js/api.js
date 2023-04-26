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
//get(shoppingRef).then((snapshot) => {
//  shopHandler(snapshot)
//});
get(foodRef).then((snapshot) => {
  foodHandler(snapshot)
});


function getMyFood(){
  // get all ingredients from the database
  get(shoppingRef).then((snapshot) => {
    shopHandler(snapshot)
  });
  get(foodRef).then((snapshot) => {
    foodHandler(snapshot)
  });
  // pass them in the parameter
  // print the responses
}

function foodHandler(snapshot){
  const list = document.getElementById("expList");
  if (list == null) {
    console.log("Element with ID 'expList' not found");
    return;
  }
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
}

// my part ------------------------------------------

function getData(){
    var name = document.getElementById('name').value;
    console.log(name);
    fetch('/api-endpoint')
    .then((response) =>  {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE NOT OK");
      }
    })
    .then((data) => {
      console.log(data); 
      show(data);
    })
    .catch((error) => {
      console.log('error: ' + error);
    });
  }
  
  function show(data) {
    const list = document.getElementById("recipes-list");
    list.innerHTML = "";
    for(let i = 0; i < data.results.length; i++) {
      const listItem = document.createElement("li");
      const nameLI = document.createElement('h2');
      nameLI.innerHTML = data.results[i].name;
    
      // create list for description
      const descriptionLI = document.createElement('p');
      descriptionLI.innerHTML = data.results[i].description;
    
      // append description list to nameLI
      nameLI.appendChild(descriptionLI);
      // append mainUL to body
      listItem.appendChild(nameLI);
      list.appendChild(listItem);
    }
  }

  //window.addItemExp = addItemExp; //changes the scope!!! most important line, makes global