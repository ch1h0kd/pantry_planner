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
var username = '{{ nickname }}';
var foodRef = ref(db, username + "/food");
var snapshot2 = "";
//get my food data from database
get(foodRef).then((snapshot) => {
  if (snapshot != null){
    snapshot2 = snapshot;
  }
  initialize(snapshot)
  foodHandler(snapshot)
});

function initialize(snapshot){

}
function foodHandler(snapshot){
  console.log("snapshot ", snapshot);
  // const list = document.getElementById("expList"); // how to get expList in homepage.html
  if (snapshot == null) {
    snapshot = snapshot2;
  }

  const trip = Object.values(snapshot.val()); // array(size)

  //when use my food button is clicked
  document.getElementById("useMyFood").addEventListener("click", function() {
    console.log("use my food button is clicked")
    var i = 0;
    const itemArray = []; //create a list of items in my food
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
    request.send();
    setTimeout(getData, 500); // Execute getData() after 0.5 seconds
    
  });
}

//when search button is clicked
document.getElementById("submit").addEventListener("click", function() {
  console.log("search button is clicked")
  const searchTerm = document.getElementById("name").value.trim();
  const request = new XMLHttpRequest()
  request.open('POST', `/searchTerm/${JSON.stringify(searchTerm)}`)
  request.onload = () => {
    const flastMessage = request.responseText
    console.log(flastMessage)
  }
  request.send();
  setTimeout(getData, 500); // Execute getData() after 0.5 seconds
});

function getData(){
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

    // if no results much, display the message
    if(data.count == 0){
      const para = document.createElement('h1');
      para.textContent = 'No results';
      list.appendChild(para);
    }

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
      imgTag.setAttribute("id", "image")
      imgTag.src = src;
    
      // append description list to nameLI
      nameLI.appendChild(imgTag);
      listItem.appendChild(nameLI);
      list.appendChild(listItem);
    }
    // when sorting button is clicked
    document.getElementById("sortApply").addEventListener("click", function() {
      console.log("sorting button is clicked")
      var e = document.getElementById("sortRecipes");
      var id = e.id;
      console.log("id is " + id);
      sortBy(id, false, data);
    }, false);
  }
    // document.getElementById("RsortByNameRec").addEventListener("click", function() {
    //   sortBy("name", true, data);
    // }, false);
    // document.getElementById("sortByRatings").addEventListener("click", function() {
    //   sortBy("user_ratings", false, data);
    // }, false);
    // document.getElementById("RsortByRatings").addEventListener("click", function() {
    //   sortBy("user_ratings", true, data);
    // }, false);
    // document.getElementById("sortByCalories").addEventListener("click", function() {
    //   sortBy("nutrition", false, data);
    // }, false);
    // document.getElementById("RsortByCalories").addEventListener("click", function() {
    //   sortBy("nutrition", true, data);
    //   console.log("clicked");
    // }, false);
  
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


// //need to store the api response on firebase?
export function sortBy(category, reverse, json){
  var sortedData;
  if(category == "sortsortByRatingsByNameRec" || category == "RsortByRatings"){
    sortedData = json.results.child(category).orderByChild("score");
  }
  else if(category == "sortByCalories" || category == "RsortByCalories" ){
    sortedData = json.results.child(category).orderByChild("calories");
  }
  else{
    sortedData = json.results.orderByChild("name");
  };

  //get(sortedRef).then((snapshot) =>{
    let sortedList = [];
    let keyList = [];
    const list = document.getElementById("expList");
    list.innerHTML = "";
    sortedData.forEach(element =>{
      sortedList.push(element.val())
      keyList.push(element.key)
    });
    if(reverse){
      sortedList.reverse();
      keyList.reverse();
    }
    console.log(sortedList);
    listShow(sortedList);
  //});
}

const hashmap2 = {};
  function listShow(dataList) {
    console.log("in list show");
    const list = document.getElementById("recipes-list");
    list.innerHTML = "";
    
    const trip = Object.values(dataList); //[object Object],[object Object],[object Object]
    const keys = Object.keys(dataList);//
    console.log("trip "+trip);
    console.log("keys "+keys);

    trip.forEach(element => {
      console.log("element "+element);
      const listItem = document.createElement("section");
      const nameLI = document.createElement('h2');

      nameLI.setAttribute("id", "fullRecipe");
      nameLI.innerHTML = element.name; //get name of a recipe
      if (element.name.length > 40){
        nameLI.style.fontSize = '18px';
      }

      // store the pair of name and index for later use
      hashmap2[element.name] = i;

      // when a name is clicked, display its full recipes
      nameLI.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the link from navigating to the URL
        const popupBox = document.getElementById("recipesPop");
        popupBox.classList.add("show");
        fullRecipes(data, element.name);
      });

      // display images
      const src = element.thumbnail_url;
      let imgTag = document.createElement('img');
      imgTag.src = src;
    
      // append description list to nameLI
      nameLI.appendChild(imgTag);
      listItem.appendChild(nameLI);
      list.appendChild(listItem);
      i++;
    });
  }
window.foodHandler = foodHandler; //changes the scope!!! most important line, makes global
window.getData = getData;
