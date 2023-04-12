var sidebar_pantry_planner = document.getElementById("pantry_planner");
var sidebar_my_food = document.getElementById("my_food");
var sidebar_recipes = document.getElementById("recipes");
var sidebar_settings = document.getElementById("settings");
var sidebar_shopping_list = document.getElementById("shopping_list");

var ourURL = '127.0.0.1:5000';

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