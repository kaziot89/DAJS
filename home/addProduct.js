// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
//************************ E-MAIL AND PASSWORD ******************/
// FIREBASE AND G-MAIL
// DonutAppJs - gmail.com
// DAJSDAJS - password
//***************************************************************/
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
  getDatabase,
  push,
  ref,
  set,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

let saveBtn = document.getElementById("save");
let returnBtn = document.getElementById("back");

const db = getDatabase();
const productsRef = ref(db, "products/");

function add() {
  let name = document.getElementById("prodName").value.toLowerCase();
  let price1 = document.getElementById("shop1").value;
  let price2 = document.getElementById("shop2").value;
  let price3 = document.getElementById("shop3").value;
  let price4 = document.getElementById("shop4").value;
  let price5 = document.getElementById("shop5").value;
  let price6 = document.getElementById("shop6").value;
  let category = document
    .getElementById("categorySelector")
    .value.toLowerCase();

  if (
    name !== "" &&
    (price1 !== "" ||
      price2 !== "" ||
      price3 !== "" ||
      price4 !== "" ||
      price5 !== "" ||
      price6 !== "")
  ) {
    const newProductRef = push(productsRef);
    const newProductId = newProductRef.key;

    const productData = {
      AAProduct_name: name,
      Makro: price1 !== "" ? price1 : null,
      Farutex: price2 !== "" ? price2 : null,
      Kuchnie_świata: price3 !== "" ? price3 : null,
      Chefs_c: price4 !== "" ? price4 : null,
      Apc: price5 !== "" ? price5 : null,
      Sell_gr: price6 !== "" ? price6 : null,
      Category: category,
    };

    set(ref(db, `products/${name}`), productData);
    alert(`Dodałeś "${name}" do bazy danych.`);
    let allInputs = document.querySelectorAll("input");
    allInputs.forEach((singleInput) => (singleInput.value = ""));
  } else {
    alert("Wprowadź nazwę produktu oraz cenę w przynajmniej jednym sklepie.");
  }
}

saveBtn.addEventListener("click", add);
returnBtn.addEventListener("click", function back() {
  window.location.href = "index.html";
});
const $newListButton = document.getElementById("newList");
$newListButton.addEventListener("click", newList);

function newList() {
  window.location.href = "newList.html";
}
const $editProducts = document.getElementById("editProducts");
$editProducts.addEventListener("click", editProducts);

function editProducts() {
  window.location.href = "editProduct.html";
}
