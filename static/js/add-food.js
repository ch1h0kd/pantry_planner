import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, push, query, get, remove, orderByChild}  from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
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
var username = '{{ nickname }}';
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
  display();

  finalGroup = [];

  // when search go is clicked
  document.getElementById("searchMyfB").addEventListener("click", selectItems);

  // when sort apply is clicked
  document.getElementById("sortApply").addEventListener("click", preSortBy);
  
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
    display();
  }

  function preSortBy(){
    const byWhat = document.querySelector("#sortRecipes").value; // Name A-Z
    console.log("by what ", byWhat);
    if(byWhat == "Expiring sooner"){
      sortBy("exp", false);
    }
    else if(byWhat == "Expiring later"){
      sortBy("exp", true);
    }
    else if(byWhat == "Name A-Z"){
      sortBy("item", false);
    }
    else if(byWhat == "Name Z-A"){
      sortBy("item", true);
    }
    else if(byWhat == "Recently added"){
      sortBy("latest", true);
    }
    else if(byWhat == "First added"){
      sortBy("latest", false);
    }
  }
  
  function sortBy(category, reverse){
    var sortedRef;
    if(category != "latest"){
      sortedRef = query(ref(db, username + '/food'), orderByChild(category))
    }
    else{
      sortedRef = ref(db, username + '/food')
    };
    get(sortedRef).then((snapshot) =>{
      let sortedList = [];
      let keyList = [];
      const list = document.getElementById("expList");
      list.innerHTML = "";
      snapshot.forEach(element =>{
        sortedList.push(element.val())//{exp: '2023-05-28', item: 'milk'}
        keyList.push(element.key)// -NV0x9xV8KKgAGfbjuYN
      });
      if(reverse){
        sortedList.reverse();//0: {exp: '2023-05-10', item: 'rice'} 1: {exp: '2023-05-17', item: 'bread'}
        keyList.reverse(); //['-NV0x9xV8KKgAGfbjuYN', '-NV0WeJ0D4iECibm6h6E']
      }
      finalGroup = sortedList;
      display();
    });
  }

  function display(){
    const list = document.getElementById("expList");
    list.innerHTML = "";

    // if no products match the search term, display a "No results" message
    if (finalGroup.length === 0) {
      const para = document.createElement('h1');
      para.textContent = 'No results';
      list.appendChild(para);
    }

    const trip = Object.values(finalGroup); //[object Object],[object Object],[object Object]
    const keys = Object.keys(finalGroup); //-NUSIz-AfjvoCJ7y0Htb,-NUSJ16BoyBtw933wrZs,-NUSJ2f6u2gvIT8KgOKc
    //keys[0]: -NUSIz-AfjvoCJ7y0Htb
    var i = 0;
    trip.forEach(element => {
        //element.item: beans
        //element.exp: 2023-05-31
        const listItem = document.createElement("section");
        const itemHeading = document.createElement("h3");
        const button = document.createElement("button");
        const expPara = document.createElement("p");
        const tag = document.createElement("p")

        button.innerHTML = "remove item";
        button.value = (keys[i]);
        button.style["float"] = "right";
        button.addEventListener("click", function(){
          buttonRemove("/food/", button.value);
        });
        //console.log(element.tag);
        itemHeading.appendChild(document.createTextNode(element.item));
        expPara.appendChild(document.createTextNode(element.exp));
        if(element.tag == undefined){
          tag.appendChild(document.createTextNode("Other"));
        } else{
          tag.appendChild(document.createTextNode(element.tag));
        }
        listItem.appendChild(button);
        listItem.appendChild(itemHeading);
        listItem.appendChild(expPara);
        listItem.appendChild(tag);
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


// document.getElementById("sortByExp").addEventListener("click", function() {
//   sortBy("exp", false);
// }, false);

// document.getElementById("RsortByExp").addEventListener("click", function() {
//   sortBy("exp", true);
// }, false);
// document.getElementById("sortByName").addEventListener("click", function() {
//   sortBy("item", false);
// }, false);
// document.getElementById("RsortByName").addEventListener("click", function() {
//   sortBy("item", true);
// }, false);
// document.getElementById("sortByAdded").addEventListener("click", function() {
//   sortBy("latest", true);
// }, false);
// document.getElementById("RsortByAdded").addEventListener("click", function() {
//   sortBy("latest", false);
// }, false);


export function addItemExp() {   
    const itemInput = document.getElementById("item-input-pop");
    const expInput = document.getElementById("exp-input-pop");
    const tagInput = document.querySelector("#tag");
    const item = itemInput.value;
    const exp = expInput.value;
    const tag = tagInput.value;
    console.log(tagInput.value);
    if(item != "" && exp != "" && tag != ""){
      itemInput.value = "";
      expInput.value = "";
      tagInput.value = ""; //modify the rule on firebase
      push(foodRef, {
        item: item,
        exp: exp,
        tag: tag
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
window.preSortBy = preSortBy;