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
const username = "garrett";
const foodRef = ref(db, username + "/food");


export function addItemExp() {    
    const itemInput = document.getElementById("item-input");
    const expInput = document.getElementById("exp-input");
    const item = itemInput.value;
    const exp = expInput.value;
    itemInput.value = "";
    expInput.value = "";

    //implementation that just throws it in the html
    //const list = document.getElementById("expList");
    //const listItem = document.createElement("li");
    //const itemHeading = document.createElement("h2");
    //itemHeading.appendChild(document.createTextNode(item));
    //const expPara = document.createElement("p");
    //expPara.appendChild(document.createTextNode(exp));
    //listItem.appendChild(itemHeading);
    //listItem.appendChild(expPara);
    //list.appendChild(listItem);

    
    push(foodRef, {
        item: item,
        exp: exp
      });
  }
  
  /*
  get(foodRef).then((snapshot) => {

    const trip = Object.values(snapshot.val());
    const keys = Object.keys(snapshot.val());
    var i = 0;
      trip.forEach(element => {    
        const list = document.getElementById("expList");
        const listItem = document.createElement("li");
        const itemHeading = document.createElement("h2");
        var button = document.createElement("button");
        button.innerHTML = "remove item";
        button.value = (keys[i]);
        listItem.appendChild(button);

        button.addEventListener("click", function(){
          buttonRemove(button.value);
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

export function buttonRemove(id){
  var toRemove = ref(db, username + "/food/" +id); 
  console.log(toRemove);
  remove(toRemove);
}
  
  onValue(foodRef, (snapshot) => { //update the list whenever a new food is added 
    const list = document.getElementById("expList");
    list.innerHTML = "";
    const trip = Object.values(snapshot.val());
    const keys = Object.keys(snapshot.val());
    var i = 0;
    //const element = trip[trip.length -1];
      trip.forEach(element => {        
        const listItem = document.createElement("li");
        const itemHeading = document.createElement("h2");
        var button = document.createElement("button");
        button.innerHTML = "remove item";
        button.value = (keys[i]);
        listItem.appendChild(button);

        button.addEventListener("click", function(){
          buttonRemove(button.value);
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
  
  window.addItemExp = addItemExp; //changes the scope!!! most important line, makes global
  window.buttonRemove = buttonRemove;