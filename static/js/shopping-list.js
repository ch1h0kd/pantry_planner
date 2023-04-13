
var sidebar_pantry_planner = document.getElementById("pantry_planner");
var sidebar_my_food = document.getElementById("my_food");
var sidebar_recipes = document.getElementById("recipes");
var sidebar_settings = document.getElementById("settings");
var sidebar_shopping_list = document.getElementById("shopping_list");
var ourURL = 'https://airfishi-bug-free-space-lamp-pgwj4rjxwrpf5vq-5000.preview.app.github.dev';

sidebar_pantry_planner.addEventListener("click", function() {
  window.location.href = ourURL + "/pantry_planner";
});

sidebar_my_food.addEventListener("click", function() {
    window.location.href = ourURL + "/my_food"
});

sidebar_recipes.addEventListener("click", function() {
    window.location.href = ourURL + "/recipes"
});

sidebar_settings.addEventListener("click", function() {
  window.location.href = ourURL + "/settings"
});

sidebar_shopping_list.addEventListener("click", function() {
  window.location.href = ourURL + "/shopping_list"
});

document.getElementById("shopping-list-input").addEventListener("keypress", function(event) {
  console.log("pickels");
  if (event.key === "Enter") {
    event.preventDefault();
    addItem();
  }
});

function addItem() {
    //create item from the search bar
    const itemInput = document.getElementById("shopping-list-input");
    const list = document.getElementById("shopList");
    const item = itemInput.value;
    itemInput.value = "";
    const listItem = document.createElement("li");
    const itemHeading = document.createElement("h2");
    //add item to the list
    itemHeading.appendChild(document.createTextNode(item));
    listItem.appendChild(itemHeading);
    list.appendChild(listItem);
  }