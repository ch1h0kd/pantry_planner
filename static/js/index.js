import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";


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
  

  onValue(foodRef, (snapshot) => {
    const trip = Object.values(snapshot.val())
      trip.forEach(element => {



        
      const list = document.getElementById("expList");
      const listItem = document.createElement("li");
      const itemHeading = document.createElement("h2");
      itemHeading.appendChild(document.createTextNode(element.item));
      const expPara = document.createElement("p");
      expPara.appendChild(document.createTextNode(element.exp));
      listItem.appendChild(itemHeading);
      listItem.appendChild(expPara);
      list.appendChild(listItem);
    });

  }); 
  
  window.addItemExp = addItemExp; //changes the scope!!! most important line, makes global