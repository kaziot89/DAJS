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
let totalCost = 0;
const shopPrices = {
  Farutex: 0,
  Makro: 0,
  Kuchnie_świata: 0,
};
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
      } else {
        itemCounts[itemName]++;
      }

      console.log(itemCounts);

      const { container, price, lowestPrice } = getLowestPrice(data[itemName]);

      if (container) {
        const counterElement = document.getElementById(`counter-${itemName}`);
        if (counterElement) {
          counterElement.innerHTML = `
            ${itemName} <span style="float:right; font-size:14px; font-family:arial">${itemCounts[itemName]} kg</span>`;
        } else {
          container.innerHTML += `
            <div style="margin: 10px 0 0 0; width: 100%; font-size:14px; font-family:arial" id="counter-${itemName}">
              ${itemName} <span style="float:right; font-size:14px; font-family:arial">${itemCounts[itemName]} kg</span>
            </div>`;
        }

        const itemPrice = lowestPrice * itemCounts[itemName];
        console.log(itemPrice);

        price.innerHTML = itemPrice;
      }
      // console.log("Clicked item:", itemName);
      // console.log("Container:", container);
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
          container.innerHTML += `<div style="margin: 10px 0 0 0; width: 100%; font-size:14px; font-family:arial" id="counter-${itemName}">${itemName} <span style="float:right">${itemCounts[itemName]} kg</span></div>`;
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
        counterToUpdate.innerHTML = `${itemName} <span style="float:right; font-size:14px; font-family:arial">${itemCounts[itemName]} kg</span>`;

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

    // buttonClear.addEventListener("click", function () {
    //   if (itemCounts[itemName] > 0) {
    //     const counterToUpdate = document.getElementById(`counter-${itemName}`);
    //     const { price, lowestPrice } = getLowestPrice(data[itemName]);

    //     totalCost -= lowestPrice * itemCounts[itemName];
    //     console.log(totalCost);
    //     totalSum -= lowestPrice * itemCounts[itemName];

    //     itemCounts[itemName] = 0;
    //     counterToUpdate.remove();

    //     price.innerHTML = lowestPrice * itemCounts[itemName];
    //     const lowestPriceElement = getLowestPriceElement(lowestPriceIndex);
    //     if (lowestPriceElement) {
    //       lowestPriceElement.textContent = `${
    //         lowestPrice * itemCounts[itemName]
    //       } zł`;
    //     }

    //     updateSelectedProducts(itemName);
    //     localStorage.removeItem("itemCounts");
    //   }
    // });

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

    priceContainer1.innerHTML = totalSum1.toFixed(2);
    priceContainer2.innerHTML = totalSum2.toFixed(2);
    priceContainer3.innerHTML = totalSum3.toFixed(2);
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
const $editProducts = document.getElementById("editProducts");
$editProducts.addEventListener("click", editProducts);

function editProducts() {
  window.location.href = "editProduct.html";
}

const $addProduct = document.getElementById("addProduct");
$addProduct.addEventListener("click", addProduct);

function addProduct() {
  window.location.href = "addProduct.html";
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

  summaryHtml += `<p><strong>Razem: ${totalSum1.toFixed(2)} zł</strong></p>`;
  summaryHtml += `<p><strong>Makro: ${totalSum2.toFixed(2)} zł</strong></p>`;
  summaryHtml += `<p><strong>Kuchnie świata: ${totalSum3.toFixed(
    2
  )} zł</strong></p>`;
  localStorage.setItem("summaryHtml", summaryHtml);
  for (const shopName of shopOrder) {
    selectedProducts[shopName] = [];
  }
  localStorage.removeItem("itemCounts");
  window.location.href = "summaryPage.html";
}
