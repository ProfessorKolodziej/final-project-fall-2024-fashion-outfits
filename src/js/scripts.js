function handleDragStart(e) {
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
	item.addEventListener("dragstart", e => {
		e.dataTransfer.setData("text/plain", e.target.src);
		e.dataTransfer.setData("width", e.target.offsetWidth);
		e.dataTransfer.setData("height", e.target.offsetHeight);
	});
});

mannequinImg.addEventListener("drop", e => {
	e.preventDefault();

	const src = e.dataTransfer.getData("text/plain");
	const originalWidth = parseFloat(e.dataTransfer.getData("width"));
	const originalHeight = parseFloat(e.dataTransfer.getData("height"));

	const newItem = document.createElement("img");
	newItem.src = src;
	newItem.className = "item";
	newItem.draggable = true;
	newItem.style.position = "absolute";

	// Accurate drop: relative to mannequin image
	const rect = mannequinImg.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;
	newItem.style.left = `${x}px`;
	newItem.style.top = `${y}px`;

	// Enlarge dropped item a bit (e.g., 1.2x)
	const scale = 1.8;
	newItem.style.width = `${originalWidth * scale}px`;
	newItem.style.height = `${originalHeight * scale}px`;

	newItem.addEventListener("dragstart", e => {
		e.dataTransfer.setData("text/plain", e.target.src);
		e.dataTransfer.setData("width", e.target.offsetWidth / scale); // return to original
		e.dataTransfer.setData("height", e.target.offsetHeight / scale);
		mannequinImg.parentElement.removeChild(e.target);
	});

	mannequinImg.parentElement.appendChild(newItem);
});
