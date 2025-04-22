// Get the elements we need
const dragZone = document.getElementById('items');
const dropZone = document.getElementById('outfit');
const squares = document.querySelectorAll('.item');

// Add drag events to our initial squares
squares.forEach(square => {
	// Give each square a unique ID if it doesn't have one
	if (!square.id) {
		square.id = 'square-' + Math.random().toString().slice(2, 8);
	}

	// Add drag event
	addDragEvents(square);
});

// Function to add drag events to any square
function addDragEvents(element) {
	element.addEventListener('dragstart', function (event) {
		// Remember which square we're dragging
		event.dataTransfer.setData('itemSource', this.src);
		event.dataTransfer.setData('squareId', this.id);
		event.dataTransfer.setData('squareClass', this.className);
		// Remember which zone it's coming from
		event.dataTransfer.setData('sourceZone', this.parentNode.id);
	});
}

// When dragging over the drop zone
dropZone.addEventListener('dragover', function (event) {
	// Allow dropping by preventing the default "no drop" behavior
	event.preventDefault();
});

// When dragging over the drag zone
dragZone.addEventListener('dragover', function (event) {
	// Allow dropping by preventing the default "no drop" behavior
	event.preventDefault();
});

// When dropping on the drop zone
dropZone.addEventListener('drop', function (event) {
	// Prevent any default browser behavior
	event.preventDefault();

	// Get information about the source
	const sourceZone = event.dataTransfer.getData('sourceZone');
	console.log(sourceZone);
	// If it's coming from the drag zone, handle it normally
	if (sourceZone === 'items') {
		const dropRect = dropZone.getBoundingClientRect();
		const mouseX = event.clientX - dropRect.left;
		const mouseY = event.clientY - dropRect.top;

		// Get information about the square that was dragged
		const itemSource = event.dataTransfer.getData('itemSource');
		const squareClass = event.dataTransfer.getData('squareClass');
		const squareId = event.dataTransfer.getData('squareId');


		// Create a new square in the drop zone
		const newSquare = document.createElement('img');
		newSquare.src = itemSource;
		newSquare.className = squareClass;
		newSquare.style.position = 'absolute';

		// Add square to drop zone temporarily to measure its size
		newSquare.style.visibility = 'hidden';
		dropZone.appendChild(newSquare);

		// Get the width and height of our new square
		const width = newSquare.offsetWidth;
		console.log(width);
		const height = newSquare.offsetHeight;
		console.log(height);

		// Position the square so its center is at the mouse position
		newSquare.style.left = (mouseX - width / 2) + 'px';
		newSquare.style.top = (mouseY - height / 2) + 'px';
		newSquare.style.visibility = 'visible';

		// Make the new square draggable
		newSquare.draggable = true;
		newSquare.id = squareId + "-dropped";
		addDragEvents(newSquare);
	}

	// Delete the original square
	const originalId = event.dataTransfer.getData('squareId');
	const originalSquare = document.getElementById(originalId);
	if (originalSquare) {
		originalSquare.remove();
	}
});

// When dropping on the drag zone
dragZone.addEventListener('drop', function (event) {
	// Prevent any default browser behavior
	event.preventDefault();

	// Get information about the source
	const sourceZone = event.dataTransfer.getData('sourceZone');

	// We only care about squares coming from the drop zone
	if (sourceZone === 'outfit') {
		// Get information about the square that was dragged
		const itemSource = event.dataTransfer.getData('itemSource');
		const squareClass = event.dataTransfer.getData('squareClass');

		// Create a new square in the drag zone
		const newSquare = document.createElement('img');
		newSquare.className = squareClass;
		newSquare.src = itemSource;
		newSquare.draggable = true;
		newSquare.id = 'square-' + Math.random().toString().slice(2, 8);
		dragZone.appendChild(newSquare);

		// Add drag events to the new square
		addDragEvents(newSquare);
	}

	// Delete the original square
	const originalId = event.dataTransfer.getData('squareId');
	const originalSquare = document.getElementById(originalId);
	if (originalSquare) {
		originalSquare.remove();
	}
});