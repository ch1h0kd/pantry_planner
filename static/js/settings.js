var logout_button = document.getElementById("logout_button");

var ourURL = 'https://airfishi-bug-free-space-lamp-pgwj4rjxwrpf5vq-5000.preview.app.github.dev';

logout_button.addEventListener("click", function() {
    window.location.href = ourURL + "/logout";
});

fetch('/getnickname')
  .then(response => response.json())
  .then(data => {
    alert("this is running")
    console.log("This ran?")
    console.log(data.data); // logs "Hello from Python!" to the console
  });