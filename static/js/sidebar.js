var sidebar_pantry_planner = document.getElementById("pantry_planner");
var sidebar_my_food = document.getElementById("my_food");
var sidebar_recipes = document.getElementById("recipes");
var sidebar_settings = document.getElementById("settings");
var sidebar_shopping_list = document.getElementById("shopping_list");
var sidebar_shopping_list = document.getElementById("login");
//need to fix the url here for other people to be able to use the login button

sidebar_pantry_planner.addEventListener("click", function() {
  window.location.href = "www.cooklog.nl" + "/pantry_planner";
});

sidebar_my_food.addEventListener("click", function() {
    window.location.href = "www.cooklog.nl" + "/my_food"
});

sidebar_recipes.addEventListener("click", function() {
    window.location.href = "www.cooklog.nl" + "/recipes"
});

sidebar_settings.addEventListener("click", function() {
  window.location.href = "www.cooklog.nl" + "/settings"
});

sidebar_shopping_list.addEventListener("click", function() {
  window.location.href = "www.cooklog.nl" + "/shopping_list"
});

login.addEventListener("click", function() {
  window.location.href = "www.cooklog.nl" + "/login";
});