import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, query, onValue, get, orderByChild } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

var i = 0;
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
var username = '{{ nickname }}';
var foodRef = ref(db, username + "/food");
var from = 0;
var keyword = "";
var storedSnapshot;

//get my food data from firebase
fetch('/getnickname')
  .then(response => response.json())
  .then(json => { username = json.nickname;
    foodRef = ref(db, username + "/food");
    console.log(username);
    console.log(get(foodRef));
    get(foodRef).then((snapshot) => {
      storedSnapshot = snapshot; 
      foodHandler(snapshot)
      });
  });

//if Use_expiring_soon was clicked, show expiring
document.getElementById("Use_expiring_soon").addEventListener("click", function() {
  var sortedRef = query(ref(db, username + '/food'), orderByChild("exp"));
  get(sortedRef).then((snapshot) =>{
    let sortedList = [];
    let keyList = [];
    snapshot.forEach(element =>{
      var today = new Date();
      var expDate = new Date(element.val().exp)
      //console.log("working: ", element.val().exp)

      //if element expires in three days;
      //console.log(expDate - today < 259200000, expDate - today)
      if(expDate - today < 259200000){
        sortedList.push(element.val())//{exp: '2023-05-28', item: 'milk'}
        keyList.push(element.key)// -NV0x9xV8KKgAGfbjuYN
      }
    });

    if(sortedList.length == 0){//show no results
      var data = [];
      show(data)
    }
    else {
      const itemArray = []; //create a list of items in my food
      sortedList.forEach(element => {  
        itemArray.push(element.item);      
        i++;
      });
      //console.log(sortedList, keyList);
      from = 0;
      console.log("itemArray", itemArray)

      // Choose 3 ingredients from my food randomly
      if (itemArray.length < 3) {
        var keyword = itemArray.join(' ');
      } 
      else {
        var randomIndices = [];
        while (randomIndices.length < 3) {
          var randomIndex = Math.floor(Math.random() * itemArray.length);
          if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
          }
        }
        var randomItems = randomIndices.map(function(index) {
          return itemArray[index];
        });
        var keyword = randomItems.join(' ');
      }
      console.log("keyword ", keyword);
      sendParam(keyword, from);
    }
  });
});

function foodHandler(snapshot){
  //getData(); //display recipes when first visit the page

  //when use my food button is clicked
  document.getElementById("useMyFood").addEventListener("click", function() {
    if(snapshot.val() == null){ // when there is no my food, show "No data"
      var data = [];
      show(data);
    }
    else{
      const trip = Object.values(snapshot.val()); // array(size)
      var i = 0;
      const itemArray = []; //create a list of items in my food
      trip.forEach(element => {  
        itemArray.push(element.item);      
        i++;
      });
      from = 0;
      console.log("itemArray", itemArray)

      // Choose 3 ingredients from my food randomly
      if (itemArray.length < 3) {
        var keyword = itemArray.join(' ');
      } 
      else {
        var randomIndices = [];
        while (randomIndices.length < 3) {
          var randomIndex = Math.floor(Math.random() * itemArray.length);
          if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
          }
        }
        var randomItems = randomIndices.map(function(index) {
          return itemArray[index];
        });
        var keyword = randomItems.join(' ');
      }
      if(keyword == "LOG IN TO VIEW FOOD"){
        var data = [];
        show(data);
      }
      //console.log("keyword = ", keyword);
      else sendParam(keyword, from);
    }
  });
}

//when search button is clicked
document.getElementById("submit").addEventListener("click", function() {
  const searchTerm = document.getElementById("name").value.trim();
  from = 0;
  keyword = searchTerm
  sendParam(keyword, from);
});

function sendParam(searchTerm, range){
  const request = new XMLHttpRequest()

  if(searchTerm.startsWith('"') == true){
    const converted = searchTerm.slice(1, -1);
    var data = { searchTerm: converted, from: range };
  }
  else {
    var data = { searchTerm: searchTerm, from: range };
  }

  request.open('POST', `/searchTerm/${JSON.stringify(data)}`)
  request.onload = () => {
    const flastMessage = request.responseText
    console.log(flastMessage)
  }
  request.send();
  setTimeout(getData, 500); // Execute getData() after 0.5 seconds
}

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
// display previous/next buttons on the bottom
const next = document.getElementById("next");
const previous = document.getElementById("previous");

const nextTx = document.createTextNode("Next≫");
const prevTx = document.createTextNode("≪Previous");

console.log("just once")
next.appendChild(nextTx);
previous.appendChild(prevTx);

var storedKeyword;
var storedFrom;

function show(data) {
  console.log(data.result);
  const list = document.getElementById("recipes-list");
  list.innerHTML = "";

  //when there is no data to display, show "No results"
  if(data.count == 0 || data.result == null || data.result.results.length == 0){
    const para = document.createElement('h1');
    var keywordRes = data.keyword
    const keywordd = document.getElementById("keyword");
    
    if(keywordRes != null && keywordRes.startsWith('"') == false){
      var keywordRes = `"`+keywordRes+`"`;
    }
    para.textContent = 'No results';
    keywordd.innerHTML = 0+" results with keyword "+ keywordRes;
    list.appendChild(para);
  }

  else{
    const keywordRes = data.keyword
  
    const keywordd = document.getElementById("keyword");
    if(keywordRes.startsWith('"') == false){
      var newKeywordRes = `"`+keywordRes+`"`;
    }
    keywordd.innerHTML = data.result.count+" results with keyword "+ newKeywordRes;
  
    const result = data.result.results
    for(let i = 0; i < result.length; i++) {
      const listItem = document.createElement("section");
      const nameLI = document.createElement('h2');
      const link = document.createElement('a')
      nameLI.setAttribute("id", "fullRecipe");

      nameLI.innerHTML = result[i].name; //get name of a recipe
      if (result[i].name.length > 40){
        nameLI.style.fontSize = '18px';
      }

      // store the pair of name and index for later use
      hashmap[result[i].name] = i;

      // display images
      const src = result[i].thumbnail_url;
      let imgTag = document.createElement('img');
      imgTag.setAttribute("id", "image")
      imgTag.src = src;
    
      // append description list to nameLI
      list.appendChild(listItem);
      listItem.appendChild(nameLI);
      listItem.appendChild(imgTag);

      // when a name is clicked, display its full recipes
      nameLI.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the link from navigating to the URL
        const popupBox = document.getElementById("recipesPop");
        popupBox.classList.add("show");
        fullRecipes(data.result, result[i].name);
      });
    }

    //show next button
    if(data.result.count > 40 && data.from+40 < data.result.count){
      next.style.display = "block";
    }
    else next.style.display = "none";

    //On the first page, don't show previous button
    if(data.from >= 40){
      previous.style.display = "block";
    }
    else previous.style.display = "none";

    storedKeyword = newKeywordRes;
    storedFrom = data.from;
  }
}
// end of show ------------------------------------------------


//when previous button is clicked
document.getElementById("previous").addEventListener("click", clickPrevious);
function clickPrevious(event){
  console.log("from before from-40 = ", storedFrom);
  sendParam(storedKeyword, storedFrom-40);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//when next button is clicked
document.getElementById("next").addEventListener("click", clickNext);
function clickNext(event){
  sendParam(storedKeyword, storedFrom+40);
  // When the user clicks on the button, scroll to the top of the document
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function fullRecipes(data, name){
  const recipeBox = document.getElementById("recipesPop");
  recipeBox.innerHTML = "";
  const closeButton = document.createElement("button"); //close button
  const text = document.createTextNode("X");
  closeButton.setAttribute("id", "close2");
  const index = hashmap[name];
  const recipeName = document.createElement("h1"); //recipeName
  //const seeFull = document.createElement("h2"); // see full recipe nav
  const tastyLink = document.createElement("p"); //link to tasty    
  tastyLink.setAttribute("id", "openLink");
  const image = document.createElement("image");
  image.setAttribute("id", "linkIcon");


  //if(data.results[index].description != null){
    const description = document.createElement('p');
    description.innerHTML = data.results[index].description; //get description of a recipe
    description.setAttribute("id", "description");
  //}
  
  // Create the text node for anchor element
  const linkText = document.createTextNode("Open Tasty to see full recipe");

  // Set the title
  tastyLink.title = "Open Tasty"; 

  // when "open tasty" is clicked
  tastyLink.addEventListener("click", function () {
    if(data.results[index].hasOwnProperty('compilations')){// if the recipe is recipe
      var slug = data.results[index].slug;
      window.open(
        'https://tasty.co/recipe/'+slug, "_blank");
    }
    else{ // if the recipe is compilation
      var slug = data.results[index].slug;
      window.open(
        'https://tasty.co/compilation/'+slug, "_blank");
    }
  });

  recipeName.innerHTML = data.results[index].name;


  // display images
  const src = data.results[index].thumbnail_url;
  let img = document.createElement('img');
  img.setAttribute("id", "image2")
  img.src = src;

  img.style.position = "relative";
  img.style.height = 'auto';
  img.style.width = '250px';
  img.style.marginLeft = '30%';
  img.style.marginBottom = '30px';

  recipeBox.appendChild(closeButton);
  closeButton.appendChild(text);
  recipeBox.appendChild(recipeName);
  closeButton.appendChild(text);
  recipeBox.appendChild(img);
  closeButton.appendChild(text);
  recipeBox.appendChild(description);
  recipeBox.appendChild(tastyLink); 
  //seeFull.appendChild(linkText); 
  //seeFull.appendChild(); 
  tastyLink.appendChild(linkText); 
  tastyLink.appendChild(image);

   // close full recipe pop-up
  closeButton.addEventListener("click", function () {
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
}
 

  


// //need to store the api response on firebase?
// export function sortBy(category, reverse, json){
//   var sortedData;
//   if(category == "sortByRatings" || category == "RsortByRatings"){
//     sortedData = json.results.child(category).orderByChild("score");
//   }
//   else if(category == "sortByCalories" || category == "RsortByCalories" ){
//     sortedData = json.results.child(category).orderByChild("calories");
//   }
//   else{
//     sortedData = json.results.orderByChild("name");
//   };

//   //get(sortedRef).then((snapshot) =>{
//     let sortedList = [];
//     let keyList = [];
//     const list = document.getElementById("expList");
//     list.innerHTML = "";
//     sortedData.forEach(element =>{
//       sortedList.push(element.val())
//       console.log("element.val ",element.val())
//       console.log("element.key ", element.key)
//       keyList.push(element.key)
//     });
//     if(reverse){
//       sortedList.reverse();
//       keyList.reverse();
//     }
//     console.log(sortedList);
//     listShow(sortedList);
//   //});
// }

// const hashmap2 = {};
//   function listShow(dataList) {
//     console.log("in list show");
//     const list = document.getElementById("recipes-list");
//     list.innerHTML = "";
    
//     const trip = Object.values(dataList); //[object Object],[object Object],[object Object]
//     const keys = Object.keys(dataList);//
//     console.log("trip "+trip);
//     console.log("keys "+keys);

//     trip.forEach(element => {
//       console.log("element "+element);
//       const listItem = document.createElement("section");
//       const nameLI = document.createElement('h2');

//       nameLI.setAttribute("id", "fullRecipe");
//       nameLI.innerHTML = element.name; //get name of a recipe
//       if (element.name.length > 40){
//         nameLI.style.fontSize = '18px';
//       }

//       // store the pair of name and index for later use
//       hashmap2[element.name] = i;

//       // when a name is clicked, display its full recipes
//       nameLI.addEventListener("click", (event) => {
//         event.preventDefault(); // Prevent the link from navigating to the URL
//         const popupBox = document.getElementById("recipesPop");
//         popupBox.classList.add("show");
//         fullRecipes(data, element.name);
//       });

//       // display images
//       const src = element.thumbnail_url;
//       let imgTag = document.createElement('img');
//       imgTag.src = src;
    
//       // append description list to nameLI
//       nameLI.appendChild(imgTag);
//       listItem.appendChild(nameLI);
//       list.appendChild(listItem);
//       i++;
//     });
//   }
window.foodHandler = foodHandler; //changes the scope!!! most important line, makes global
window.getData = getData;
