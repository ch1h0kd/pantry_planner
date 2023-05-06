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
  //foodHandler(snapshot)
  initialize(snapshot)
});


function initialize(snapshot){
  const searchTerm = document.getElementById("searchMyf");
  // no search has been made yet
  let lastSearch = '';
  // finalGroup will contain the products that need to be displayed after the searching has been done.
  // Set an empty array that is returned later
  let finalGroup;

  finalGroup = Object.values(snapshot.val()); // show all items in my food as default
  console.log("final group1 " + finalGroup);
  console.log("snapshot " + snapshot);
  showDisplay();
  
  console.log("snapshot " + typeof snapshot);

  finalGroup = [];

  document.getElementById("searchMyfB").addEventListener("click", selectItems);

  function selectItems(e){
    e.preventDefault();
    // if the category and search term are the same as they were the last time a search was run, the results will be the same
    if (searchTerm.value.trim() === lastSearch) {
      return;
    } else {
      // update the record of search term
      lastSearch = searchTerm.value.trim();
    }
    
    // Make sure the search term is converted to lower case before comparison.
    const lowerCaseSearchTerm = searchTerm.value.trim().toLowerCase();
    
    // Filter finalGroup to contain only products whose name includes the search term
    finalGroup = Object.values(snapshot.val()).filter( element => element.item.includes(lowerCaseSearchTerm));
    // Once we have the final group, update the display
    showDisplay();
  }

  function showDisplay(){
    const list = document.getElementById("expList");
    list.innerHTML = "";

    // if no products match the search term, display a "No results" message
    if (finalGroup.length === 0) {
      const para = document.createElement('h1');
      para.textContent = 'No results';
      list.appendChild(para);
    }

    const trip = Object.values(finalGroup); //[object Object],[object Object],[object Object]
    //console.log("Object.values(snapshot.val()) " + trip);
    const keys = Object.keys(finalGroup); //-NUSIz-AfjvoCJ7y0Htb,-NUSJ16BoyBtw933wrZs,-NUSJ2f6u2gvIT8KgOKc
    //console.log("Object.keys(snapshot.val()) " + keys);
    //keys[0]: -NUSIz-AfjvoCJ7y0Htb
    var i = 0;
    trip.forEach(element => {
        //element.item: beans
        //element.exp: 2023-05-31
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
}

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
    //foodHandler(snapshot)
    initialize(snapshot)
  });
}

export function addItemExp() {   
    const itemInput = document.getElementById("item-input-pop");
    const expInput = document.getElementById("exp-input-pop");
    const tagInput = document.querySelector("#tag");
    const item = itemInput.value;
    const exp = expInput.value;
    //console.log(tagInput);
    if(item != "" && exp != "" && tag != ""){
      itemInput.value = "";
      expInput.value = "";
      tagInput.value = ""; //modify the rule on firebase
      push(foodRef, {
        item: item,
        exp: exp,
        tag: tagInput
      });
    }
    get(foodRef).then((snapshot) => {
      //foodHandler(snapshot)
      initialize(snapshot)
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
    //foodHandler(snapshot)
    initialize(snapshot)
  });
}

window.addItemExp = addItemExp; //changes the scope!!! most important line, makes global
window.changeUser = changeUser;