function handleDragStart(e) {
	e.dataTransfer.setData("text/plain", this.id);
	this.style.opacity = '0.4';
}

function handleDragEnd(e) {
	this.style.opacity = '1';
}

let items = document.querySelectorAll('.item');
items.forEach(function (item) {
	item.addEventListener('dragstart', handleDragStart);
	item.addEventListener('dragend', handleDragEnd);
});

const itemsContainer = document.getElementById("items");
const outfitContainer = document.getElementById("outfit");
const mannequinImg = document.querySelector(".mannequin img");

mannequinImg.addEventListener("dragover", event => {
	event.preventDefault();
});

document.querySelectorAll(".item").forEach(item => {
	item.addEventListener('dragstart', handleDragStart);
	item.addEventListener('dragend', handleDragEnd);
});

mannequinImg.addEventListener("drop", e => {
	e.preventDefault();
	const id = e.dataTransfer.getData("text/plain");
	const originalElement = document.getElementById(id);

	console.log(id);
	console.log(originalElement);

	const newItem = originalElement.cloneNode(true);
	console.log(newItem);
	newItem.id = id + "-dropped";

	newItem.style.position = "absolute";

	// Accurate drop: relative to mannequin image
	const rect = mannequinImg.getBoundingClientRect();
	const x = e.clientX - rect.left - e.target.offsetWidth / 4;
	const y = e.clientY - rect.top;
	newItem.style.left = `${x}px`;
	newItem.style.top = `${y}px`;

	// Enlarge dropped item a bit (e.g., 1.2x)
	const scale = 1;

	newItem.style.opacity = "1";

	newItem.addEventListener("dragstart", handleDragStart);
	newItem.addEventListener("dragend", handleDragEnd);
	newItem.addEventListener("click", removeItem);

	mannequinImg.parentElement.appendChild(newItem);
});


function removeItem(e) {
	console.log(this);
	this.remove();

}

