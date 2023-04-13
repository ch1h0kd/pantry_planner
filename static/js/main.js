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

      




