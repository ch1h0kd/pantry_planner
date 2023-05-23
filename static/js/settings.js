const lgb = document.getElementById("logout_button");

if (lgb){
lgb.addEventListener("click", function() {
    window.location.href = "/logout";
  }, false);
}