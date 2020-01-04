function enableDragSort(draggableClass) {
  const draggableList = document.getElementsByClassName(draggableClass);

  Array.prototype.map.call(draggableList, item => {
    enableDragItem(item);
  });
}

function enableDragItem(item) {
  item.setAttribute("draggable", true);
  item.ondragstart = onDragStart;
  item.ondragend = onDragEnd;
}

function onDragStart() {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.currentTarget.classList.add("onMove");
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

  if (dropzone.classList.contains("dropable")) {
    dropzone.appendChild(draggableElement);

    event.dataTransfer.clearData();
  }
}
