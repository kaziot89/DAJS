const $saveProduct = document.getElementById("save");
const $goBack = document.getElementById("back");

$saveProduct.addEventListener("click", add);
$goBack.addEventListener("click", ret);

function ret() {
  window.location.href = "index.html";
}

function add() {
  let nameInput = document.getElementById("prodName");
  let prodName = nameInput.value;

  let db = new SQL.Database();
  db.run("CREATE TABLE IF NOT EXISTS Dane (id INTEGER PRIMARY KEY, name TEXT)");
  db.run("INSERT INTO Dane (name) VALUES (?)", [prodName]);
  let dbData = db.export();
  let blob = new Blob([dbData], { type: "application/octet-stream" });
  saveAs(blob, "bazadanych.sqlite");
}

// const $saveProduct = document.getElementById("save");
// const $goBack = document.getElementById("back");

// $saveProduct.addEventListener("click", add);
// $goBack.addEventListener("click", ret);

// function ret() {
//   window.location.href = "index.html";
// }
// function add() {
//   document
//     .getElementById("save")
//     .addEventListener("click", console.log("jsdkahsldf"), function (e) {
//       e.preventDefault();

//       var form = e.target;
//       var formData = new FormData(form);
//       var data = {};

//       // Konwertuj FormData na obiekt
//       for (var pair of formData.entries()) {
//         data[pair[0]] = pair[1];
//       }

//       // Zapisz dane do bazy danych (SQL.js)
//       var db = new SQL.Database();
//       db.run(
//         "CREATE TABLE IF NOT EXISTS Dane (id INTEGER PRIMARY KEY, name TEXT)"
//       );
//       db.run("INSERT INTO Dane (name) VALUES (?,)", [data.prodName]);

//       // Zapisz bazę danych do pliku
//       var data = new Uint8Array(db.export());
//       saveAs(new Blob([data]), "bazadanych.sqlite");
//       var file = new Blob([data], { type: "application/octet-stream" });
//       saveAs(file, "bazadanych.sqlite");
//     });
// }
