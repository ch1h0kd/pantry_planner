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
var snapshot2 = "";

get(foodRef).then((snapshot) => {
  if (snapshot != null){
    snapshot2 = snapshot;
  }
  foodHandler(snapshot)
});

function foodHandler(snapshot){
  // const list = document.getElementById("expList"); // how to get expList in homepage.html
  if (snapshot == null) {
    snapshot = snapshot2;
  }

  const trip = Object.values(snapshot.val()); // array(size)

  var i = 0;
  const itemArray = [];
  trip.forEach(element => {  
    itemArray.push(element.item);      
    i++;
  });
  const request = new XMLHttpRequest()
  request.open('POST', `/myFoodArray/${JSON.stringify(itemArray)}`)
  request.onload = () => {
    const flastMessage = request.responseText
    console.log(flastMessage)
  }

  //when use my food button is clicked
  document.getElementById("useMyFood").addEventListener("click", function() {
    request.send();
    getData();
  });
}

function getData(){
    var name = document.getElementById('name').value;
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
  
  const hashmap = {};
  function show(data) {
    const list = document.getElementById("recipes-list");
    list.innerHTML = "";
    for(let i = 0; i < data.results.length; i++) {
      const listItem = document.createElement("section");
      const nameLI = document.createElement('h2');
      nameLI.setAttribute("id", "fullRecipe");
      nameLI.innerHTML = data.results[i].name; //get name of a recipe
      if (data.results[i].name.length > 40){
        nameLI.style.fontSize = '18px';
      }

      // store the pair of name and index for later use
      hashmap[data.results[i].name] = i;

      // when a name is clicked, display its full recipes
      nameLI.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the link from navigating to the URL
        const popupBox = document.getElementById("recipesPop");
        popupBox.classList.add("show");
        fullRecipes(data, data.results[i].name);
      });

      // display images
      const src = data.results[i].thumbnail_url;
      let imgTag = document.createElement('img');
      imgTag.src = src;
    
      // append description list to nameLI
      nameLI.appendChild(imgTag);
      // append mainUL to body
      listItem.appendChild(nameLI);
      list.appendChild(listItem);
    }
    console.log(hashmap);
  }
  
  // close full recipe pop-up
  close2.addEventListener("click", function () {
    const popupBox = document.getElementById("recipesPop");
    popupBox.classList.remove("show");
  });
  
  // Add event listener to window for click events
  window.addEventListener("click", function (event) {
    if (event.target == recipesPop) {
    const popupBox = document.getElementById("recipesPop");
    popupBox.classList.remove("show");
    }
  });

  function fullRecipes(data, name){
    // console.log(name);
    // const recipeBox = document.getElementById("fullRecipe");
    // recipeBox.innerHTML = "";
    // const index = hashmap[name] 
    // const title = document.getElementById("h1");
    // title.innerHTML = data.results[index].name;

    // // const descriptionLI = document.createElement('p');
    // // descriptionLI.innerHTML = data.results[index].description;
    // recipeBox.appendChild(title);
  }
  
window.foodHandler = foodHandler; //changes the scope!!! most important line, makes global
window.getData = getData;
