function getData(){
    var name = document.getElementById('name').value;
    console.log(name);
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
  
  function show(data) {
    const list = document.getElementById("recipes-list");
    list.innerHTML = "";
    for(let i = 0; i < data.results.length; i++) {
      const listItem = document.createElement("li");
      const nameLI = document.createElement('h2');
      nameLI.innerHTML = data.results[i].name;
    
      // create list for description
      const descriptionLI = document.createElement('p');
      descriptionLI.innerHTML = data.results[i].description;
    
      // append description list to nameLI
      nameLI.appendChild(descriptionLI);
      // append mainUL to body
      listItem.appendChild(nameLI);
      list.appendChild(listItem);
    }
  }