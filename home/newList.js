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

// Initialize Firebase app
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
  let html = "";

  // Iterate through the retrieved data and build the HTML content

  let counter = 1;
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const item = data[key];
      if (item.AAProduct_name) {
        html += `<div id="${counter}" style="margin: 5px; border-bottom: solid 1px lightgrey; display: flex; justify-content: space-between "><span style=" " >${item.AAProduct_name}</span><div id="buttons"><button id="minus" style=" background-color: pink; border-radius: 5px; width: 30px; margin: 0 2px" class="itemButton-" data-key="${key}">-</button><button id="plus-${counter}" style=" background-color: pink; border-radius: 5px; width: 30px; margin: 0 2px" class="itemButton+" data-key="${key}">+</button></div></div>`;
        counter++;
      }
    }
  }

  // Set the HTML content of the dataContainer
  dataContainer.innerHTML = html;

  for (let i = 1; i < counter; i++) {
    const buttonPlus = document.getElementById(`plus-${i}`);
    buttonPlus.addEventListener("click", function () {
      const key = buttonPlus.getAttribute("data-key");
      document.getElementById("nameContainer2").innerHTML += `${key}`;
    });
  }
}

// let addToList = function () {};

//////////////////////////////////
//// dobre ale zakomentowane////
// function filterProducts(products, letter) {
//   return products.filter(
//     (product) => product.charAt(0).toLowerCase() === letter.toLowerCase()
//   );
// }

// function displayFilteredProducts(letter) {
//   const filteredProducts = filterProducts(products, letter);
//   const sortedProducts = filteredProducts.sort();
//   const nameContainer = document.getElementById("nameContainer");
//   nameContainer.innerHTML = sortedProducts
//     .map((product) => `<p>${product}</p>`)
//     .join("");
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const letterButtons = document.getElementsByClassName("letterButton");
//   for (let i = 0; i < letterButtons.length; i++) {
//     letterButtons[i].addEventListener("click", function () {
//       const letter = letterButtons[i].id;
//       displayFilteredProducts(letter);
//     });
//   }
// });

const $returnHomeButton = document.getElementById("returnToHome");
$returnHomeButton.addEventListener("click", returnToHome);

function returnToHome() {
  window.location.href = "index.html";
}
