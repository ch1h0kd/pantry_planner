
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

function addItemExp() {
        const itemInput = document.getElementById("item-input");
        const expInput = document.getElementById("exp-input");
        const item = itemInput.value;
        const exp = expInput.value;
        itemInput.value = "";
        expInput.value = "";
        const list = document.getElementById("expList");
        const listItem = document.createElement("li");
        const itemHeading = document.createElement("h2");
        itemHeading.appendChild(document.createTextNode(item));
        const expPara = document.createElement("p");
        expPara.appendChild(document.createTextNode(exp));
        listItem.appendChild(itemHeading);
        listItem.appendChild(expPara);
        list.appendChild(listItem);
      }

function addItemShop() {
        const itemInput = document.getElementById("shop-input");
        const item = itemInput.value;
        itemInput.value = "";
        const list = document.getElementById("shopList");
        const listItem = document.createElement("li");
        const itemHeading = document.createElement("h2");
        itemHeading.appendChild(document.createTextNode(item));
        listItem.appendChild(itemHeading);
        list.appendChild(listItem);
      }

      




