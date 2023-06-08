const $returnHomeButton = document.getElementById("returnToHome");

$returnHomeButton.addEventListener("click", returnToHome);

function returnToHome() {
  window.location.href = "index.html";
}
