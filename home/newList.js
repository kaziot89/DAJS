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
  const priceContainer1 = document.getElementById("price_paragraph1");
  const priceContainer2 = document.getElementById("price_paragraph2");
  const priceContainer3 = document.getElementById("price_paragraph3");
  let html = "";
  let counter = 1;
  let lowestPriceIndex = -1;

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
      const shopName = priceLabels[lowestPriceIndex];
      if (lowestPriceIndex === 0) {
        return {
          container: counterContainer1,
          lowestPrice: lowestPrice,
          lowestPriceIndex: lowestPriceIndex,
          shopName: shopName,
        };
      } else if (lowestPriceIndex === 1) {
        return {
          container: counterContainer3,
          lowestPrice: lowestPrice,
          lowestPriceIndex: lowestPriceIndex,
          shopName: shopName,
        };
      } else if (lowestPriceIndex === 2) {
        return {
          container: counterContainer2,
          lowestPrice: lowestPrice,
          lowestPriceIndex: lowestPriceIndex,
          shopName: shopName,
        };
      }
    }

    return {
      container: null,
      lowestPrice: lowestPrice,
      lowestPriceIndex: lowestPriceIndex,
      shopName: null,
    };
  }

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const item = data[key];
      if (item.AAProduct_name) {
        const itemName =
          item.AAProduct_name.charAt(0).toUpperCase() +
          item.AAProduct_name.slice(1);
        const { message, container } = getLowestPrice(item);

        html += `<div id="${counter}" class="${
          item.Category
        }" style="margin: 10px 0 0 0;  display: flex; justify-content: space-between;">
                  <span id="item-${key}" style="width:58%; border-bottom: 1px lightgrey solid; font-family:arial; margin-bottom: 3px">
                    <span >${itemName.charAt(0)}</span>${itemName.slice(1)}
                  </span>
                  
                  <div id="buttons" style="display: flex; justify-content: right">
                    <button id="minus-${counter}" style="background-color: pink; border-radius: 5px; width: 24px; height:24px; margin: 0 2px" class="itemButton-" data-key="${key}">-</button>
                    <button id="plus-${counter}" style="background-color: pink; border-radius: 5px; width: 24px; height:24px; margin: 0 2px" class="itemButton+" data-key="${key}">+</button>
                    <button id="plus5-${counter}" style="background-color: pink; border-radius: 5px; width: 32px; height:24px; margin: 0 2px; " class="itemButton+" data-key="${key}">+5</button>
                    <button id="clear-${counter}" style="background-color: pink; border-radius: 5px; width: 32px; height:24px; margin: 0 2px" class="itemButton+" data-key="${key}"><img src="trashIcon.png" style="max-height: 18px;  "alt=""></button>
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
        const { container, lowestPrice } = getLowestPrice(data[itemName]);
        if (container) {
          container.innerHTML += `<div style="margin: 10px 0 0 0; width: 100%" id="counter-${itemName}">${itemName} <span style="float:right">${itemCounts[itemName]} kg</span></div>`;
        }

        // Update the lowest price in the appropriate <span> element
        const lowestPriceElement = getLowestPriceElement(lowestPriceIndex);
        if (lowestPriceElement) {
          lowestPriceElement.textContent = `${lowestPrice} zł`;
        }
      } else {
        itemCounts[itemName]++;
        const counterToUpdate = document.getElementById(`counter-${itemName}`);
        counterToUpdate.innerHTML = `${itemName} <span style="float:right">${itemCounts[itemName]} kg</span>`;
      }
      updateSelectedProducts(itemName);
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
      updateSelectedProducts(itemName);
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
  const selectedProducts = {
    Farutex: [],
    Makro: [],
    Kuchnie_świata: [],
  };

  function updateSelectedProducts(itemName) {
    const item = data[itemName];
    const { container, shopName } = getLowestPrice(item);

    if (shopName) {
      if (itemCounts[itemName] === 0) {
        // Remove the item from selectedProducts if its count is zero
        const index = selectedProducts[shopName].indexOf(itemName);
        if (index !== -1) {
          selectedProducts[shopName].splice(index, 1);
          // Clear the counter div if it exists
          const counterToUpdate = document.getElementById(
            `counter-${itemName}`
          );
          if (counterToUpdate) {
            counterToUpdate.remove();
          }
        }
      } else if (!selectedProducts[shopName].includes(itemName)) {
        selectedProducts[shopName].push(itemName);
      }
    }
  }
  function getLowestPriceElement(index) {
    if (index === 0) {
      return document.getElementById("price_paragraph1");
    } else if (index === 1) {
      return document.getElementById("price_paragraph2");
    } else if (index === 2) {
      return document.getElementById("price_paragraph3");
    }
    return null;
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
  const buttonSummary = document.getElementById("ListSummary");
  buttonSummary.addEventListener("click", function () {
    generateSummary(selectedProducts);
  });
}

const $returnHomeButton = document.getElementById("returnToHome");
$returnHomeButton.addEventListener("click", returnToHome);

function returnToHome() {
  window.location.href = "index.html";
}

const buttonAllProducts = document.getElementById("allProducts");
const buttonMeat = document.getElementById("meat");
const buttonVegetables = document.getElementById("vegetables");
const buttonDairy = document.getElementById("dairy");
const buttonFruits = document.getElementById("fruits");
const buttonFish = document.getElementById("fish");
const buttonPreserves = document.getElementById("preserves");
const buttonLoose = document.getElementById("loose");
const buttonSummary = document.getElementById("ListSummary");

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
const toggleFruits = function () {
  let container = document.getElementById("nameContainer");
  let elements = container.children;

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (!element.classList.contains("owoce")) {
      element.style.display = "none";
    } else {
      element.style.display = "flex";
    }
  }
};
const toggleFish = function () {
  let container = document.getElementById("nameContainer");
  let elements = container.children;

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (!element.classList.contains("ryby")) {
      element.style.display = "none";
    } else {
      element.style.display = "flex";
    }
  }
};
const togglePreserves = function () {
  let container = document.getElementById("nameContainer");
  let elements = container.children;

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (!element.classList.contains("przetwory")) {
      element.style.display = "none";
    } else {
      element.style.display = "flex";
    }
  }
};
const toggleLoose = function () {
  let container = document.getElementById("nameContainer");
  let elements = container.children;

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (!element.classList.contains("sypkie")) {
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
buttonFruits.addEventListener("click", toggleFruits);
buttonFish.addEventListener("click", toggleFish);
buttonPreserves.addEventListener("click", togglePreserves);
buttonLoose.addEventListener("click", toggleLoose);

function generateSummary(selectedProducts) {
  // const summaryContainer = document.getElementById("summaryContainer");
  let summaryHtml = "<h2>Podsumowanie:</h2>";

  const shopOrder = ["Farutex", "Kuchnie_świata", "Makro"];

  for (const shopName of shopOrder) {
    const products = selectedProducts[shopName];
    if (products.length > 0) {
      summaryHtml += `<p><strong>${shopName}:</strong></p>`;
      products.forEach((product) => {
        summaryHtml += `<p>${product}</p>`;
      });
    }
  }

  if (summaryHtml === "<h2>Podsumowanie:</h2>") {
    summaryHtml += "<p>Nic nie wybrałeś.</p>";
  }
  localStorage.setItem("summaryHtml", summaryHtml);
  // summaryContainer.innerHTML = summaryHtml;

  // Clear the selectedProducts array to ensure only current selections are included
  for (const shopName of shopOrder) {
    selectedProducts[shopName] = [];
  }
  window.location.href = "summaryPage.html";
}

// function generateSummary(selectedProducts) {
//   const summaryContainer = document.getElementById("summaryContainer");
//   let summaryHtml = "<h2>Summary of Selected Products:</h2>";

//   const shopOrder = ["Farutex", "Kuchnie_świata", "Makro"];

//   for (const shopName of shopOrder) {
//     const products = selectedProducts[shopName];
//     if (products.length > 0) {
//       summaryHtml += `<p><strong>${shopName}:</strong></p>`;
//       products.forEach((product) => {
//         summaryHtml += `<p>${product}</p>`;
//       });
//     }
//   }

//   if (summaryHtml === "<h2>Summary of Selected Products:</h2>") {
//     summaryHtml += "<p>No products selected.</p>";
//   }

//   summaryContainer.innerHTML = summaryHtml;
// }

// buttonSummary.addEventListener("click", function () {
//   generateSummary(selectedProducts);
// });
