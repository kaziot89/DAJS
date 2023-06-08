const $makeListButton = document.getElementById("make_l");
const $addProductButton = document.getElementById("add_p");
const $editPricesButton = document.getElementById("edit_p");
const $savedListsButton = document.getElementById("saved_l");

$makeListButton.addEventListener("click", createList);
$addProductButton.addEventListener("click", addProduct);
$editPricesButton.addEventListener("click", editPrices);
$savedListsButton.addEventListener("click", showSavedLists);

function createList() {
  console.log("List created");
}

function addProduct() {
  console.log("Product added");
}

function editPrices() {
  window.location.href = "/addProduct/addProduct.html";
}

function showSavedLists() {
  console.log("Saved lists shown");
}
