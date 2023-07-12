import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCbDhDiJsCSPGt4a30j5rQRQUjPmaxEZ_M",
  authDomain: "donutappjs-dcc83.firebaseapp.com",
  databaseURL:
    "https://donutappjs-dcc83-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "donutappjs-dcc83",
  storageBucket: "donutappjs-dcc83.appspot.com",
  messagingSenderId: "107684649248",
  appId: "1:107684649248:web:1f0e5d69a2165cf86b9f45",
  measurementId: "G-P2DWVH99KP",
};

const app = initializeApp(firebaseConfig);

// Access the Firebase database
const database = getDatabase(app);

const dataRef = ref(database, "products");
get(dataRef)
  .then((snapshot) => {
    const data = snapshot.val();
    displayData(data);
  })
  .catch((error) => {
    console.error("Error retrieving data:", error);
  });

function displayData(data) {
  const dataContainer = document.getElementById("nameContainer");
  const counterContainer1 = document.getElementById("nameContainer2");
  const counterContainer2 = document.getElementById("nameContainer3");
  const counterContainer3 = document.getElementById("nameContainer4");
  let html = "";
  let counter = 1;

  function getLowestPrice(item) {
    const prices = [item.Farutex, item.Kuchnie_świata, item.Makro];
    const priceLabels = ["Farutex", "Kuchnie_świata", "Makro"];
    let lowestPrice = Infinity;
    let lowestPriceIndex = -1;

    for (let i = 0; i < prices.length; i++) {
      if (prices[i] !== undefined && prices[i] < lowestPrice) {
        lowestPrice = prices[i];
        lowestPriceIndex = i;
      }
    }

    if (lowestPriceIndex !== -1) {
      if (lowestPriceIndex === 0) {
        return {
          container: counterContainer1,
        };
      } else if (lowestPriceIndex === 1) {
        return {
          container: counterContainer3,
        };
      } else if (lowestPriceIndex === 2) {
        return {
          container: counterContainer2,
        };
      }
    }

    return {
      container: null,
    };
  }

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const item = data[key];
      if (item.AAProduct_name) {
        const { message, container } = getLowestPrice(item);

        html += `<div id="${counter}" class="${item.Category}" style="margin: 5px; border-bottom: solid 1px lightgrey; display: flex; justify-content: space-between ">
                <span id="item-${key}" " >${item.AAProduct_name}</span>
                
                <div id="buttons" style="display: flex; justify-content: right">
                  <button id="minus-${counter}" style="background-color: pink; border-radius: 5px; width: 32px; height:32px; margin: 0 2px" class="itemButton-" data-key="${key}">-</button>
                  <button id="plus-${counter}" style="background-color: pink; border-radius: 5px; width: 32px; height:32px; margin: 0 2px" class="itemButton+" data-key="${key}">+</button>
                  <button id="plus5-${counter}" style="background-color: pink; border-radius: 5px; width: 32px; height:32px; margin: 0 2px" class="itemButton+" data-key="${key}">+5</button>
                  <button id="clear-${counter}" style="background-color: pink; border-radius: 5px; width: 32px; height:32px; margin: 0 2px" class="itemButton+" data-key="${key}"><img src="trashIcon.png" style="max-height: 18px;  "alt=""></button>
                </div>
              </div>`;
        counter++;
      }
    }
  }

  dataContainer.innerHTML = html;

  const itemCounts = {};

  function addButtonListeners(
    buttonPlus,
    buttonPlus5,
    buttonMinus,
    buttonClear,
    itemName
  ) {
    buttonPlus.addEventListener("click", function () {
      if (!itemCounts[itemName]) {
        itemCounts[itemName] = 1;
        const counterContainer = getLowestPrice(data[itemName]).container;
        if (counterContainer) {
          counterContainer.innerHTML += `<div style="margin: 10px 0 0 0; width: 100%" id="counter-${itemName}">${itemName} <span style="float:right">${itemCounts[itemName]} kg</span></div>`;
        }
      } else {
        itemCounts[itemName]++;
        const counterToUpdate = document.getElementById(`counter-${itemName}`);
        counterToUpdate.innerHTML = `${itemName} <span style="float:right">${itemCounts[itemName]} kg</span>`;
      }
    });

    buttonPlus5.addEventListener("click", function () {
      if (!itemCounts[itemName]) {
        // If the item has not been added before, initialize the count to 5
        itemCounts[itemName] = 5;
        const counterContainer = getLowestPrice(data[itemName]).container;
        if (counterContainer) {
          counterContainer.innerHTML += `<div style="margin: 10px 0 0 0; width: 100%" id="counter-${itemName}">${itemName} <span style="float:right">${itemCounts[itemName]} kg</span></div>`;
        }
      } else {
        // If the item has been added before, increment the count by 5
        itemCounts[itemName] += 5;
        const counterToUpdate = document.getElementById(`counter-${itemName}`);
        counterToUpdate.innerHTML = `${itemName} <span style="float:right">${itemCounts[itemName]} kg</span>`;
      }
    });

    buttonMinus.addEventListener("click", function () {
      if (!itemCounts[itemName]) {
        itemCounts[itemName] = 0;
      }

      if (itemCounts[itemName] > 0) {
        itemCounts[itemName]--;

        const counterToUpdate = document.getElementById(`counter-${itemName}`);
        counterToUpdate.innerHTML = `${itemName} <span style="float:right">${itemCounts[itemName]} kg</span>`;
        if (itemCounts[itemName] === 0) {
          counterToUpdate.remove();
        }
      }
    });

    buttonClear.addEventListener("click", function () {
      if (itemCounts[itemName] > 0) {
        itemCounts[itemName] = 0;

        const counterToUpdate = document.getElementById(`counter-${itemName}`);
        counterToUpdate.remove();
      }
    });
  }

  for (let i = 1; i < counter; i++) {
    const buttonPlus = document.getElementById(`plus-${i}`);
    const buttonPlus5 = document.getElementById(`plus5-${i}`);
    const buttonMinus = document.getElementById(`minus-${i}`);
    const buttonClear = document.getElementById(`clear-${i}`);
    const itemName = buttonPlus.getAttribute("data-key");

    addButtonListeners(
      buttonPlus,
      buttonPlus5,
      buttonMinus,
      buttonClear,
      itemName
    );
  }

  const $returnHomeButton = document.getElementById("returnToHome");
  $returnHomeButton.addEventListener("click", returnToHome);

  function returnToHome() {
    window.location.href = "index.html";
  }
}

const buttonAllProducts = document.getElementById("allProducts");
const buttonMeat = document.getElementById("meat");
const buttonVegetables = document.getElementById("vegetables");
const buttonDairy = document.getElementById("dairy");

const toggleAll = function () {
  let container = document.getElementById("nameContainer");
  let elements = container.children;

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (!element.classList.contains("fuck")) {
      element.style.display = "flex";
    } else {
      element.style.display = "block";
    }
  }
};

const toggleMeat = function () {
  let container = document.getElementById("nameContainer");
  let elements = container.children;

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (!element.classList.contains("mięso")) {
      element.style.display = "none";
    } else {
      element.style.display = "flex";
    }
  }
};
const toggleDairy = function () {
  let container = document.getElementById("nameContainer");
  let elements = container.children;

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (!element.classList.contains("nabiał")) {
      element.style.display = "none";
    } else {
      element.style.display = "flex";
    }
  }
};

const toggleVegetables = function () {
  let container = document.getElementById("nameContainer");
  let elements = container.children;

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (!element.classList.contains("warzywa")) {
      element.style.display = "none";
    } else {
      element.style.display = "flex";
    }
  }
};
buttonAllProducts.addEventListener("click", toggleAll);
buttonMeat.addEventListener("click", toggleMeat);
buttonVegetables.addEventListener("click", toggleVegetables);
buttonDairy.addEventListener("click", toggleDairy);

// const buttonMeat = document.getElementById("meat");
// const meat = function () {
//   let container = document.getElementById("nameContainer");
//   let elementsToHide = container.querySelectorAll(":scope > :not(.mięso)");

//   elementsToHide.forEach(function (element) {
//     element.style.display = "none";
//   });
// };
// buttonMeat.addEventListener("click", meat);

// const buttonWegetables = document.getElementById("wegetables");
// const wegetables = function () {
//   let container = document.getElementById("nameContainer");
//   let elementsToHide = container.querySelectorAll(":scope > :not(.warzywa)");

//   elementsToHide.forEach(function (element) {
//     element.style.display = "none";
//   });
// };
// buttonWegetables.addEventListener("click", wegetables);

//////////////////////////// nowe ale i tak nie diała dobrze //////////////
// const buttonMeat = document.getElementById("meat");
// const buttonWegetables = document.getElementById("wegetables");

// const handleButtonClick = function (event) {
//   const buttonId = event.target.id;
//   let container = document.getElementById("nameContainer");
//   let elementsToHide;

//   if (buttonId === "meat") {
//     elementsToHide = container.querySelectorAll(":scope > :not(.mięso)");
//   } else if (buttonId === "wegetables") {
//     elementsToHide = container.querySelectorAll(":scope > :not(.warzywa)");
//   }

//   elementsToHide.forEach(function (element) {
//     element.style.display = "none";
//   });
// };

// buttonMeat.addEventListener("click", handleButtonClick);
// buttonWegetables.addEventListener("click", handleButtonClick);
//////////////////////////////////////////////////////////////////////////////
