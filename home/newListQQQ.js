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
let totalSum1 = 0;
let totalSum2 = 0;
let totalSum3 = 0;
let totalSum4 = 0;
let totalSum5 = 0;
let totalSum6 = 0;
let totalCost = 0;
const shopPrices = {
  Farutex: 0,
  Makro: 0,
  Kuchnie_świata: 0,
  Chefs_culinar: 0,
  Apc: 0,
  Selgros: 0,
};
const selectedProducts = {
  Farutex: [],
  Makro: [],
  Kuchnie_świata: [],
  Chefs_culinar: [],
  Apc: [],
  Selgros: [],
};
const storedSelectedProducts = localStorage.getItem("selectedProducts");
if (storedSelectedProducts) {
  Object.assign(selectedProducts, JSON.parse(storedSelectedProducts));
}
function displayData(data) {
  const dataContainer = document.getElementById("nameContainer");
  const counterContainer1 = document.getElementById("nameContainer2");
  const counterContainer2 = document.getElementById("nameContainer3");
  const counterContainer3 = document.getElementById("nameContainer4");
  const counterContainer4 = document.getElementById("nameContainer5");
  const counterContainer5 = document.getElementById("nameContainer6");
  const counterContainer6 = document.getElementById("nameContainer7");
  const priceContainer1 = document.getElementById("price_paragraph1");
  const priceContainer2 = document.getElementById("price_paragraph2");
  const priceContainer3 = document.getElementById("price_paragraph3");
  const priceContainer4 = document.getElementById("price_paragraph4");
  const priceContainer5 = document.getElementById("price_paragraph5");
  const priceContainer6 = document.getElementById("price_paragraph6");
  let html = "";
  let counter = 1;
  let lowestPriceIndex = -1;

  function getLowestPrice(item) {
    const prices = [
      item.Farutex,
      item.Kuchnie_świata,
      item.Makro,
      item.Chefs_culinar,
      item.Apc,
      item.Selgros,
    ];
    const priceLabels = [
      "Farutex",
      "Kuchnie_świata",
      "Makro",
      "Chefs_culinar",
      "Apc",
      "Selgros",
    ];
    let lowestPrice = Infinity;
    let lowestPriceIndex = -1;

    for (let i = 0; i < prices.length; i++) {
      if (prices[i] !== undefined && parseFloat(prices[i]) < lowestPrice) {
        lowestPrice = parseFloat(prices[i]);
        lowestPriceIndex = i;
      }
    }

    if (lowestPriceIndex !== -1) {
      const shopName = priceLabels[lowestPriceIndex];
      if (lowestPriceIndex === 0) {
        return {
          container: counterContainer1,
          price: priceContainer1,
          lowestPrice: lowestPrice,
          lowestPriceIndex: lowestPriceIndex,
          shopName: shopName,
        };
      } else if (lowestPriceIndex === 1) {
        return {
          container: counterContainer3,
          price: priceContainer3,
          lowestPrice: lowestPrice,
          lowestPriceIndex: lowestPriceIndex,
          shopName: shopName,
        };
      } else if (lowestPriceIndex === 2) {
        return {
          container: counterContainer2,
          price: priceContainer2,
          lowestPrice: lowestPrice,
          lowestPriceIndex: lowestPriceIndex,
          shopName: shopName,
        };
      } else if (lowestPriceIndex === 3) {
        return {
          container: counterContainer4,
          price: priceContainer4,
          lowestPrice: lowestPrice,
          lowestPriceIndex: lowestPriceIndex,
          shopName: shopName,
        };
      } else if (lowestPriceIndex === 4) {
        return {
          container: counterContainer5,
          price: priceContainer5,
          lowestPrice: lowestPrice,
          lowestPriceIndex: lowestPriceIndex,
          shopName: shopName,
        };
      } else if (lowestPriceIndex === 5) {
        return {
          container: counterContainer6,
          price: priceContainer6,
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
        const { shopName } = getLowestPrice(item);
        // const { message, container } = getLowestPrice(item);

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
      } else {
        itemCounts[itemName]++;
      }

      const { container, price, lowestPrice } = getLowestPrice(data[itemName]);

      if (container) {
        const counterElement = document.getElementById(`counter-${itemName}`);
        if (counterElement) {
          counterElement.innerHTML = `
            ${itemName} <span style="float:right">${itemCounts[itemName]} kg</span>`;
        } else {
          container.innerHTML += `
            <div style="margin: 10px 0 0 0; width: 100%" id="counter-${itemName}">
              ${itemName} <span style="float:right">${itemCounts[itemName]} kg</span>
            </div>`;
        }

        const itemPrice = lowestPrice * itemCounts[itemName];
        console.log(itemPrice);

        price.innerHTML = itemPrice;
      }
      if (container === counterContainer1) {
        totalSum1 = selectedProducts.Farutex.reduce((sum, itemName) => {
          const item = data[itemName];
          const { lowestPrice } = getLowestPrice(item);
          return sum + lowestPrice * itemCounts[itemName];
        }, 0);
        priceContainer1.innerHTML = totalSum1;
      } else if (container === counterContainer2) {
        totalSum2 = selectedProducts.Makro.reduce((sum, itemName) => {
          const item = data[itemName];
          const { lowestPrice } = getLowestPrice(item);
          return sum + lowestPrice * itemCounts[itemName];
        }, 0);
        priceContainer2.innerHTML = totalSum2;
      } else if (container === counterContainer3) {
        totalSum3 = selectedProducts.Kuchnie_świata.reduce((sum, itemName) => {
          const item = data[itemName];
          const { lowestPrice } = getLowestPrice(item);
          return sum + lowestPrice * itemCounts[itemName];
        }, 0);
        priceContainer3.innerHTML = totalSum3;
      } else if (container === counterContainer4) {
        totalSum4 = selectedProducts.Chefs_culinar.reduce((sum, itemName) => {
          const item = data[itemName];
          const { lowestPrice } = getLowestPrice(item);
          return sum + lowestPrice * itemCounts[itemName];
        }, 0);
        priceContainer4.innerHTML = totalSum4;
      } else if (container === counterContainer3) {
        totalSum5 = selectedProducts.Apc.reduce((sum, itemName) => {
          const item = data[itemName];
          const { lowestPrice } = getLowestPrice(item);
          return sum + lowestPrice * itemCounts[itemName];
        }, 0);
        priceContainer5.innerHTML = totalSum5;
      } else if (container === counterContainer3) {
        totalSum6 = selectedProducts.Selgros.reduce((sum, itemName) => {
          const item = data[itemName];
          const { lowestPrice } = getLowestPrice(item);
          return sum + lowestPrice * itemCounts[itemName];
        }, 0);
        priceContainer6.innerHTML = totalSum6;
      }

      const lowestPriceElement = getLowestPriceElement(lowestPriceIndex);
      if (lowestPriceElement) {
        lowestPriceElement.textContent = `${itemPrice} zł`;
      }

      updateSelectedProducts(itemName);
    });

    buttonPlus5.addEventListener("click", function () {
      if (!itemCounts[itemName]) {
        itemCounts[itemName] = 1 * 5;
        console.log(itemCounts);
        const { container, price, lowestPrice } = getLowestPrice(
          data[itemName]
        );
        if (container) {
          container.innerHTML += `<div style="margin: 10px 0 0 0; width: 100%" id="counter-${itemName}">${itemName} <span style="float:right">${itemCounts[itemName]} kg</span></div>`;
          price.innerHTML += lowestPrice * itemCounts[itemName];
        }

        const lowestPriceElement = getLowestPriceElement(lowestPriceIndex);
        if (lowestPriceElement) {
          lowestPriceElement.textContent = `${
            lowestPrice * itemCounts[itemName]
          } zł`;
        }
      } else {
        itemCounts[itemName] += 5;
        const counterToUpdate = document.getElementById(`counter-${itemName}`);
        counterToUpdate.innerHTML = `${itemName} <span style="float:right">${itemCounts[itemName]} kg</span>`;

        const { price, lowestPrice } = getLowestPrice(data[itemName]);
        price.innerHTML = lowestPrice * itemCounts[itemName];

        const lowestPriceElement = getLowestPriceElement(lowestPriceIndex);
        if (lowestPriceElement) {
          lowestPriceElement.textContent = `${
            lowestPrice * itemCounts[itemName]
          } zł`;
        }
      }
      updateSelectedProducts(itemName);
    });
    buttonClear.addEventListener("click", function () {
      if (itemCounts[itemName] > 0) {
        const counterToUpdate = document.getElementById(`counter-${itemName}`);
        const { price, lowestPrice } = getLowestPrice(data[itemName]);

        if (selectedProducts.Farutex.includes(itemName)) {
          totalSum1 -= lowestPrice * itemCounts[itemName];
        } else if (selectedProducts.Makro.includes(itemName)) {
          totalSum2 -= lowestPrice * itemCounts[itemName];
        } else if (selectedProducts.Kuchnie_świata.includes(itemName)) {
          totalSum3 -= lowestPrice * itemCounts[itemName];
        } else if (selectedProducts.Chefs_culinar.includes(itemName)) {
          totalSum4 -= lowestPrice * itemCounts[itemName];
        } else if (selectedProducts.Apc.includes(itemName)) {
          totalSum5 -= lowestPrice * itemCounts[itemName];
        } else if (selectedProducts.Selgros.includes(itemName)) {
          totalSum6 -= lowestPrice * itemCounts[itemName];
        }

        itemCounts[itemName] = 0;
        counterToUpdate.remove();

        price.innerHTML = lowestPrice * itemCounts[itemName];
        const lowestPriceElement = getLowestPriceElement(lowestPriceIndex);
        if (lowestPriceElement) {
          lowestPriceElement.textContent = `${
            lowestPrice * itemCounts[itemName]
          } zł`;
        }

        updateSelectedProducts(itemName);
        localStorage.setItem("itemCounts", JSON.stringify(itemCounts));
      }
    });

    buttonMinus.addEventListener("click", function () {
      if (!itemCounts[itemName]) {
        itemCounts[itemName] = 0;
      }

      if (itemCounts[itemName] > 0) {
        const counterToUpdate = document.getElementById(`counter-${itemName}`);

        itemCounts[itemName]--;

        if (itemCounts[itemName] === 0) {
          counterToUpdate.remove();
        } else {
          counterToUpdate.innerHTML = `${itemName} <span style="float:right">${itemCounts[itemName]} kg</span>`;
        }

        const { price, lowestPrice } = getLowestPrice(data[itemName]);
        price.innerHTML = lowestPrice * itemCounts[itemName];

        const lowestPriceElement = getLowestPriceElement(lowestPriceIndex);
        if (lowestPriceElement) {
          lowestPriceElement.textContent = `${
            lowestPrice * itemCounts[itemName]
          } zł`;
        }
        updateSelectedProducts(itemName);
      }
      localStorage.removeItem("itemCounts");
    });
  }
  const selectedProducts = {
    Farutex: [],
    Makro: [],
    Kuchnie_świata: [],
    Chefs_culinar: [],
    Apc: [],
    Selgros: [],
  };

  function updateSelectedProducts(itemName) {
    const item = data[itemName];
    const { container, shopName } = getLowestPrice(item);

    if (shopName) {
      if (itemCounts[itemName] === 0) {
        const index = selectedProducts[shopName].indexOf(itemName);
        if (index !== -1) {
          selectedProducts[shopName].splice(index, 1);
        }
      } else if (!selectedProducts[shopName].includes(itemName)) {
        selectedProducts[shopName].push(itemName);
      }

      calculateTotalSums(selectedProducts);
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(selectedProducts)
      );
    }
  }

  function calculateTotalSums(selectedProducts) {
    totalSum1 = selectedProducts.Farutex.reduce((sum, itemName) => {
      const item = data[itemName];
      const { lowestPrice } = getLowestPrice(item);
      return sum + lowestPrice * itemCounts[itemName];
    }, 0);
    totalSum2 = selectedProducts.Makro.reduce((sum, itemName) => {
      const item = data[itemName];
      const { lowestPrice } = getLowestPrice(item);
      return sum + lowestPrice * itemCounts[itemName];
    }, 0);
    totalSum3 = selectedProducts.Kuchnie_świata.reduce((sum, itemName) => {
      const item = data[itemName];
      const { lowestPrice } = getLowestPrice(item);
      return sum + lowestPrice * itemCounts[itemName];
    }, 0);
    totalSum4 = selectedProducts.Chefs_culinar.reduce((sum, itemName) => {
      const item = data[itemName];
      const { lowestPrice } = getLowestPrice(item);
      return sum + lowestPrice * itemCounts[itemName];
    }, 0);
    totalSum5 = selectedProducts.Apc.reduce((sum, itemName) => {
      const item = data[itemName];
      const { lowestPrice } = getLowestPrice(item);
      return sum + lowestPrice * itemCounts[itemName];
    }, 0);
    totalSum6 = selectedProducts.Selgros.reduce((sum, itemName) => {
      const item = data[itemName];
      const { lowestPrice } = getLowestPrice(item);
      return sum + lowestPrice * itemCounts[itemName];
    }, 0);

    priceContainer1.innerHTML = totalSum1.toFixed(2);
    priceContainer2.innerHTML = totalSum2.toFixed(2);
    priceContainer3.innerHTML = totalSum3.toFixed(2);
    priceContainer4.innerHTML = totalSum4.toFixed(2);
    priceContainer5.innerHTML = totalSum5.toFixed(2);
    priceContainer6.innerHTML = totalSum6.toFixed(2);
  }
  function getLowestPriceElement(index) {
    if (index === 0) {
      return document.getElementById("price_paragraph1");
    } else if (index === 1) {
      return document.getElementById("price_paragraph2");
    } else if (index === 2) {
      return document.getElementById("price_paragraph3");
    } else if (index === 3) {
      return document.getElementById("price_paragraph4");
    } else if (index === 4) {
      return document.getElementById("price_paragraph5");
    } else if (index === 5) {
      return document.getElementById("price_paragraph6");
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

function getKeyForItemName(itemCounts, count) {
  for (const key in itemCounts) {
    if (itemCounts[key] === count) {
      return key;
    }
  }
  return null;
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
  const summaryContainer = document.getElementById("summaryContainer");
  let summaryHtml = "<h2>Podsumowanie:</h2>";

  const shopOrder = [
    "Farutex",
    "Kuchnie_świata",
    "Makro",
    "Chefs_culinar",
    "Apc",
    "Selgros",
  ];

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

  const priceContainer1 = document.getElementById("price_paragraph1");
  const priceContainer2 = document.getElementById("price_paragraph2");
  const priceContainer3 = document.getElementById("price_paragraph3");

  summaryHtml += `<p><strong>Farutex: ${totalSum1.toFixed(2)} zł</strong></p>`;
  summaryHtml += `<p><strong>Makro: ${totalSum2.toFixed(2)} zł</strong></p>`;
  summaryHtml += `<p><strong>Kuchnie świata: ${totalSum3.toFixed(
    2
  )} zł</strong></p>`;
  summaryHtml += `<p><strong>Chefs culinar: ${totalSum4.toFixed(
    2
  )} zł</strong></p>`;
  summaryHtml += `<p><strong>Apc: ${totalSum5.toFixed(2)} zł</strong></p>`;
  summaryHtml += `<p><strong>Selgros: ${totalSum6.toFixed(2)} zł</strong></p>`;

  localStorage.setItem("summaryHtml", summaryHtml);
  localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
  localStorage.setItem("totalSum1", totalSum1);
  localStorage.setItem("totalSum2", totalSum2);
  localStorage.setItem("totalSum3", totalSum3);
  localStorage.setItem("totalSum4", totalSum4);
  localStorage.setItem("totalSum5", totalSum5);
  localStorage.setItem("totalSum6", totalSum6);
  // Clear selectedProducts and itemCounts
  for (const shopName of shopOrder) {
    selectedProducts[shopName] = [];
  }
  // localStorage.removeItem("itemCounts");

  window.location.href = "summaryPage.html";
}
