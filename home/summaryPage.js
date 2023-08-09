const summaryHtml = localStorage.getItem("summaryHtml");

const summaryContainer = document.getElementById("summaryContainer");
summaryContainer.innerHTML = summaryHtml;

const printButton = document.getElementById("printButton");
printButton.addEventListener("click", () => {
  window.print();
});
