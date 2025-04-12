// This is where you should write all JavaScript
// for your project. Remember a few things as you start!
// - Use let or const for all variables
// - Do not use jQuery - use JavaScript instead
// - Do not use onclick - use addEventListener instead
// - Run npm run test regularly to check autograding
// - You'll need to link this file to your HTML :)

function handleDragStart(e) {
	this.style.opacity = '0.4';
}

function handleDragEnd(e) {
	this.style.opacity = '1';
}


let items = document.querySelectorAll('.container .box');
items.forEach(function (item) {
	item.addEventListener('dragstart', handleDragStart);
	item.addEventListener('dragend', handleDragEnd);
});

const itemsContainer = document.getElementById("items");
const outfitContainer = document.getElementById("outfit");

outfitContainer.addEventListener("dragover", event => {
	event.preventDefault();
});

document.querySelectorAll(".item").forEach(item => {
	item.addEventListener("dragstart", e => {
		e.dataTransfer.setData("text/plain", e.target.src);
	});
});

outfitContainer.addEventListener("drop", e => {
	e.preventDefault();
	const src = e.dataTransfer.getData("text/plain");
	const newItem = document.createElement("img");
	newItem.src = src;
	newItem.className = "item";
	newItem.draggable = true;

	newItem.addEventListener("dragstart", e => {
		e.dataTransfer.setData("text/plain", e.target.src);
		outfitContainer.removeChild(e.target);
	});

	outfitContainer.appendChild(newItem);
});