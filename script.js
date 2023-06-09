// Get the container elements
const container1 = document.getElementById("container1");
const container2 = document.getElementById("container2");

// Add event listeners for drag and drop events
container1.addEventListener("dragstart", dragStart);
container2.addEventListener("dragover", dragOver);
container2.addEventListener("drop", drop);

// Drag and Drop Event Handlers
function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  // event.target.style.opacity = "0.5";
  event.dataTransfer.dropEffect = "move";
  event.target.classList.add("dragging");
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const itemId = event.dataTransfer.getData("text/plain");
  const item = document.getElementById(itemId).cloneNode(true);

  // Check if the item is already in container2
  const existingItem = container2.querySelector(`#${itemId}`);
  if (existingItem) {
    showSuccessMessage("Item Already Exists!");
    return; // Item already exists, exit the function
  }

  container2.appendChild(item);
  // item.style.opacity = "1";
  item.classList.remove("dragging");
  showSuccessMessage("Item dropped successfully!");
}

// Reset button event handler
const resetButton = document.getElementById("resetBtn");
resetButton.addEventListener("click", resetContainers);

// Reset function
function resetContainers() {
  container1.innerHTML = `
  <div class="item" draggable="true">Item 1</div>
  <div class="item" draggable="true">Item 2</div>
  <div class="item" draggable="true">Item 3</div>
  <div class="item" draggable="true">Item 4</div>
`;
  container2.innerHTML = "";
  showSuccessMessage("Containers reset successfully!");
}

// Success message function
function showSuccessMessage(message) {
  const successMessage = document.createElement("div");
  successMessage.classList.add("success-message");
  successMessage.innerText = message;
  container2.appendChild(successMessage);
  setTimeout(() => {
    successMessage.remove();
  }, 2000);
}
