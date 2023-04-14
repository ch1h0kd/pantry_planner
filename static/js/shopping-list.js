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
    const list = document.getElementById("shopping-list");
    const item = itemInput.value;
    itemInput.value = "";
    const listItem = document.createElement("li");
    const itemHeading = document.createElement("h2");
    //add item to the list
    itemHeading.appendChild(document.createTextNode(item));
    listItem.appendChild(itemHeading);
    list.appendChild(listItem);
  }