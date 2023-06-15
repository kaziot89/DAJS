// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6Zdxa3qzO7ajpAGrmPoEhUKNafZk0aC8",
  authDomain: "dajs-3305a.firebaseapp.com",
  databaseURL:
    "https://dajs-3305a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dajs-3305a",
  storageBucket: "dajs-3305a.appspot.com",
  messagingSenderId: "612494531179",
  appId: "1:612494531179:web:6f019de1900a608d162f2e",
  measurementId: "G-PFEWSEME51",
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

// let name = document.getElementById("prodName");
// let price1 = document.getElementById("shop1");
// let price2 = document.getElementById("shop2");
// let price3 = document.getElementById("shop3");

let saveBtn = document.getElementById("save");
let returnBtn = document.getElementById("back");

const db = getDatabase();
const productsRef = ref(db, "products/");

function add() {
  let name = document.getElementById("prodName").value;
  let price1 = document.getElementById("shop1").value;
  let price2 = document.getElementById("shop2").value;
  let price3 = document.getElementById("shop3").value;

  if (name !== "" && (price1 !== "" || price2 !== "" || price3 !== "")) {
    const newProductRef = push(productsRef);
    const newProductId = newProductRef.key;

    const productData = {
      Product_name: name,
      Makro: price1 !== "" ? price1 : null,

      Farutex: price2 !== "" ? price2 : null,
      Kuchnie_świata: price3 !== "" ? price3 : null,
    };

    set(ref(db, `products/${name}`), productData);
    alert("Dodałeś produkt do bazy danych.");
  } else {
    console.log("Please fill in the name and provide only one price.");
  }
}

saveBtn.addEventListener("click", add);
returnBtn = addEventListener("click", function () {});
