const lgb = document.getElementById("logout_button");

if (lgb){
lgb.addEventListener("click", function() {
    window.location.href = "www.cooklog.nl" + "/logout";
  }, false);
}