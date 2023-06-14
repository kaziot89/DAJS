// const $saveProduct = document.getElementById("save");
// const $goBack = document.getElementById("back");

// // $saveProduct.addEventListener("click", add);
// $goBack.addEventListener("click", ret);

// function ret() {
//   window.location.href = "index.html";
// }
const sqlite3 = require("sqlite3").verbose();

// Łączenie z bazą danych
const db = new sqlite3.Database("./products.db", (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log("Połączono z bazą danych SQLite.");
});

// Dodawanie nowego rekordu do tabeli Produkty
const newProduct = {
  name: "Nowy produkt",
  price1: 12,
  price2: 14,
  price3: 16,
};

const sql = `INSERT INTO Produkty (name, price1, price2, price3) VALUES (?, ?, ?, ?)`;

db.run(
  sql,
  [newProduct.name, newProduct.price1, newProduct.price2, newProduct.price3],
  function (err) {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log(`Dodano nowy rekord do tabeli Produkty: ${this.lastID}`);
  }
);

// Zamykanie połączenia z bazą danych
db.close((err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log("Zamknięto połączenie z bazą danych SQLite.");
});

// function add() {
//   let nameInput = document.getElementById("prodName");
//   let prodName = nameInput.value;

//   let db = new SQL.Database();
//   db.run("CREATE TABLE IF NOT EXISTS Dane (id INTEGER PRIMARY KEY, name TEXT)");
//   db.run("INSERT INTO Dane (name) VALUES (?)", [prodName]);
//   let dbData = db.export();
//   let blob = new Blob([dbData], { type: "application/octet-stream" });
//   saveAs(blob, "bazadanych.db");
// }
