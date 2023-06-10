function filterProducts(products, letter) {
  return products.filter(
    (product) => product.charAt(0).toLowerCase() === letter.toLowerCase()
  );
}

const products = [
  "jabłko",
  "banan",
  "gruszka",
  "wołowina",
  "dorsz",
  "kawior",
  "indyk",
  "cukier drobny",
  "mąka orkiszowa",
  "mąka żytnia",
  "mąka pszenna",
];
function displayFilteredProducts(letter) {
  const filteredProducts = filterProducts(products, letter);
  const sortedProducts = filteredProducts.sort();
  const nameContainer = document.getElementById("nameContainer");
  nameContainer.innerHTML = sortedProducts
    .map((product) => `<p>${product}</p>`)
    .join("");
}

document.addEventListener("DOMContentLoaded", function () {
  const letterButtons = document.getElementsByClassName("letterButton");
  for (let i = 0; i < letterButtons.length; i++) {
    letterButtons[i].addEventListener("click", function () {
      const letter = letterButtons[i].id;
      displayFilteredProducts(letter);
    });
  }
});

const $returnHomeButton = document.getElementById("returnToHome");
$returnHomeButton.addEventListener("click", returnToHome);

function returnToHome() {
  window.location.href = "index.html";
}
