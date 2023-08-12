const summaryHtml = localStorage.getItem("summaryHtml");
const storedItemCounts = JSON.parse(localStorage.getItem("itemCounts"));

const summaryContainer = document.getElementById("summaryContainer");
summaryContainer.innerHTML = summaryHtml;

const printButton = document.getElementById("printButton");
printButton.addEventListener("click", () => {
  window.print();
});
