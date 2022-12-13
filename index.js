const movableDiv = document.getElementById("draggable-div");
const borderDiv = document.getElementById("border-div");

movableDiv.addEventListener('mousedown',pickup);
movableDiv.addEventListener('touchstart',pickup);

window.addEventListener('mousemove',move);
window.addEventListener('touchmove',move);

movableDiv.addEventListener('mouseup',drop);
movableDiv.addEventListener('touchend',drop);

borderDiv.addEventListener('mouseout',drop)
let draggableElement = null;

function pickup(event) {
    draggableElement = event.target;
    draggableElement.style.height = draggableElement.clientHeight;
    draggableElement.style.width = draggableElement.clientWidth;
}
function drop() {
    if (draggableElement) {
        draggableElement = null;
    }
}
function move(event) {
    if (draggableElement) {
        let leftPrevious = draggableElement.style.left;
        let topPrevious = draggableElement.style.top;
        let offsetX, offsetY;
        if (event.type === 'mousemove') {
            offsetX = event.clientX - draggableElement.clientWidth/2;
            offsetY = event.clientY - draggableElement.clientHeight/2;
        } else {
            offsetX =event.changedTouches[0].clientX - draggableElement.clientWidth/2;
            offsetY =event.changedTouches[0].clientY - draggableElement.clientHeight/2;
        }
        draggableElement.style.left = offsetX + 'px';
        draggableElement.style.top = offsetY + 'px';
        if(!elementsOverlap(borderDiv, draggableElement)){
            draggableElement.style.left = leftPrevious;
            draggableElement.style.top = topPrevious;
        }
    }
}
function elementsOverlap(el1, el2) {
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();

    return !(
        domRect1.top > domRect2.top ||
        domRect1.right < domRect2.right ||
        domRect1.bottom < domRect2.bottom ||
        domRect1.left > domRect2.left
    );
}
