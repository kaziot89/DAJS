const $makeListButton = document.getElementById("make_l");
const $addProductButton = document.getElementById("add_p");
const $editPricesButton = document.getElementById("edit_p");
const $savedListsButton = document.getElementById("saved_l");

$makeListButton.addEventListener("click", createList);
$addProductButton.addEventListener("click", addProduct);
$editPricesButton.addEventListener("click", editPrices);
$savedListsButton.addEventListener("click", showSavedLists);

function createList() {
  localStorage.clear();
  window.location.href = "newList.html";
}

function addProduct() {
  window.location.href = "addProduct.html";
}

function editPrices() {
  window.location.href = "editProduct.html";
}

function showSavedLists() {
  console.log("Saved lists shown");
}
window.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button) => button.classList.add("visible"));
});
//ADD PRODUCT STUFF/ Not Working
// const $saveProduct = document.getElementById("save");
// const $goBack = document.getElementById("back");

// $saveProduct.addEventListener("click", add);
// $goBack.addEventListener("click", ret);

// function ret() {
//   console.log("adsdfasdf");
//   window.location.href = "index.html";
// }
// function add() {

// }
