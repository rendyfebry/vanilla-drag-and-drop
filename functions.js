function enableDragSort(draggableClass) {
  const draggableList = document.getElementsByClassName(draggableClass);

  Array.prototype.map.call(draggableList, item => {
    enableDragItem(item);
  });
}

// function enableDragItem(item) {
//   item.setAttribute("draggable", true);
//   item.ondrag = handleDrag;
//   item.ondragend = handleDrop;
// }

// function handleDrag(item) {
//   const selectedItem = item.target;
//   const list = selectedItem.parentNode;
//   const x = event.clientX;
//   const y = event.clientY;

//   console.log(list);

//   selectedItem.classList.add("drag-sort-active");
//   let swapItem =
//     document.elementFromPoint(x, y) === null
//       ? selectedItem
//       : document.elementFromPoint(x, y);

//   if (list === swapItem.parentNode) {
//     swapItem =
//       swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
//     list.insertBefore(selectedItem, swapItem);
//   }
// }

// function handleDrop(item) {
//   item.target.classList.remove("drag-sort-active");
// }

function enableDragItem(item) {
  item.setAttribute("draggable", true);
  item.ondragstart = onDragStart;
  item.ondragend = onDragEnd;

  item.ondragover = handleDragOver;
  item.ondragleave = handleDragLeave;
}

function onDragStart() {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.currentTarget.classList.add("onMove");
}

function handleDragOver() {
  event.target.classList.add("onHover");
}

function handleDragLeave() {
  event.target.classList.remove("onHover");
}

function onDragEnd(event) {
  event.currentTarget.classList.remove("onMove");
}

function onDragOver(event) {
  event.preventDefault();
}

function onDrop(event) {
  const id = event.dataTransfer.getData("text");

  const draggableElement = document.getElementById(id);
  const dropzone = event.target;

  dropzone.classList.remove("onHover");

  if (dropzone.classList.contains("dropable")) {
    dropzone.appendChild(draggableElement);
  } else {
    const parentNode = dropzone.parentNode;

    if (parentNode.classList.contains("dropable")) {
      parentNode.insertBefore(draggableElement, dropzone);
    }
  }

  event.dataTransfer.clearData();
}
