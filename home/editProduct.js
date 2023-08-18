import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getDatabase,
  push,
  get,
  ref,
  set,
  child,
  update,
  remove,
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
  const dataContainer = document.getElementById("productList");
  let html = "";

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const item = data[key];
      if (item.AAProduct_name) {
        const itemName =
          item.AAProduct_name.charAt(0).toUpperCase() +
          item.AAProduct_name.slice(1);

        html += `
        
        <div id="g" class="${
          item.Category
        }" style="margin: 10px 0 0 0;  display: flex; justify-content: space-between;">
            <span id="item-${key}" style="width:40%; border-bottom: 1px grey solid; font-family:arial; margin-bottom: 3px">
              <span >${itemName.charAt(0)}</span>${itemName.slice(1)}
            </span>
            
            <div id="buttons" style="display: flex; justify-content: right">
              <input id="inputPrice1-${key}" style="background-color: white; border-radius: 5px; width: 48px; height:24px; margin: 0 5px" class="inputShop1" data-key="${key}" value="${
          item.Farutex !== undefined ? item.Farutex : ""
        }">
              <input id="inputPrice2-${key}" style="background-color: white; border-radius: 5px; width: 48px; height:24px; margin: 0 5px" class="inputShop2" data-key="${key}" value="${
          item.Makro !== undefined ? item.Makro : ""
        }">
              <input id="inputPrice3-${key}" style="background-color: white; border-radius: 5px; width: 48px; height:24px; margin: 0 5px; " class="inputShop3" data-key="${key}" value="${
          item.Kuchnie_świata !== undefined ? item.Kuchnie_świata : ""
        }">
              <button id="saveButton-${key}" style="background-color: #f8d62d; border-radius: 5px; width: 70px; height:24px; margin: 0 2px 0 10px" class="itemButton+" data-key="${key}">Zapisz</button><button  style="background-color: pink; border-radius: 5px; width: 32px; height:24px; margin: 0 5px" class="itemButton+" data-key="${key}"><img src="trashIcon.png" style="max-height: 18px;  "alt=""></button>
              
            </div>
          </div>`;
      }
    }
  }

  dataContainer.innerHTML = html;

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const saveButton = document.getElementById(`saveButton-${key}`);
      saveButton.addEventListener("click", (event) => {
        const clickedKey = event.target.getAttribute("data-key");
        handleSaveButtonClick(clickedKey);
      });
    }
  }
}

function handleSaveButtonClick(key, event) {
  const saveButton = document.getElementById(`saveButton-${key}`);

  // Save the original button text and background color
  const originalButtonText = saveButton.textContent;
  const originalButtonBackgroundColor = saveButton.style.backgroundColor;

  // Change the button text to "Zapisano" and set the background color
  saveButton.textContent = "Zapisano";
  saveButton.style.backgroundColor = "rgb(113, 209, 114)";
  saveButton.style.transition = "background-color 0.5s ease";
  //   saveButton.style.color = "black";

  const inputPrice1 = parseFloat(
    document.getElementById(`inputPrice1-${key}`).value
  );
  const inputPrice2 = parseFloat(
    document.getElementById(`inputPrice2-${key}`).value
  );
  const inputPrice3 = parseFloat(
    document.getElementById(`inputPrice3-${key}`).value
  );
  const updatedPrices = {};
  if (!isNaN(inputPrice1)) {
    updatedPrices.Farutex = inputPrice1;
  } else {
    updatedPrices.Farutex = null; // Set to null if empty
  }
  if (!isNaN(inputPrice2)) {
    updatedPrices.Makro = inputPrice2;
  } else {
    updatedPrices.Makro = null; // Set to null if empty
  }
  if (!isNaN(inputPrice3)) {
    updatedPrices.Kuchnie_świata = inputPrice3;
  } else {
    updatedPrices.Kuchnie_świata = null; // Set to null if empty
  }

  const productRef = ref(database, `products/${key}`);
  update(productRef, updatedPrices, {
    Farutex: inputPrice1,
    Makro: inputPrice2,
    Kuchnie_świata: inputPrice3,
  })
    .then(() => {
      refreshData();
      // Set a timeout to revert the button text and background color after 2 seconds
      setTimeout(() => {
        saveButton.textContent = originalButtonText;
        saveButton.style.backgroundColor = originalButtonBackgroundColor;
        saveButton.style.color = ""; // Reset color to default
      }, 2000);
    })
    .catch((error) => {
      // ... (similar code for error handling)
    });
}
function refreshData() {
  const dataRef = ref(database, "products");
  get(dataRef)
    .then((snapshot) => {
      const data = snapshot.val();
      displayData(data);
    })
    .catch((error) => {
      console.error("Error refreshing data:", error);
    });
}
const $returnHomeButton = document.getElementById("returnButton");
$returnHomeButton.addEventListener("click", returnToHome);

function returnToHome() {
  window.location.href = "index.html";
}

const $newListButton = document.getElementById("newList");
$newListButton.addEventListener("click", newList);

function newList() {
  window.location.href = "newList.html";
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
  let dataContainer = document.getElementById("productList");
  let elements = dataContainer.children;

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
  let dataContainer = document.getElementById("productList");
  let elements = dataContainer.children;

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
  let dataContainer = document.getElementById("productList");
  let elements = dataContainer.children;

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
  let dataContainer = document.getElementById("productList");
  let elements = dataContainer.children;

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
  let dataContainer = document.getElementById("productList");
  let elements = dataContainer.children;

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
  let dataContainer = document.getElementById("productList");
  let elements = dataContainer.children;

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
  let dataContainer = document.getElementById("productList");
  let elements = dataContainer.children;

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
  let dataContainer = document.getElementById("productList");
  let elements = dataContainer.children;

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
