const data = [
    {
        x: 200,
        y: 100,
        radius: 25,
        id: 'Room 1',
        title: 'Bed Room',
        detail: '11 feet wide and 11 1/4 feet long',
        color: '#9f360c',
        dimensions: {}
    },
    {
        x: 550,
        y: 80,
        radius: 25,
        id: 'Room 2',
        title: 'Drawing Room',
        detail: '11 feet wide and 12 feet long',
        color: '#c74510',
        dimensions: {}
    },
    {
        x: 180,
        y: 320,
        radius: 25,
        id: 'Room 3',
        title: 'Master Room',
        detail: '16 feet wide and 11 1/4 feet long',
        color: '#9f360c',
        dimensions: {}
    }
];

window.onload = function () {

image = new Image();
image.src = "./house-map.jpg";
function draw(scale) {
    let canvas = document.getElementById("appCanvas");
    let context = canvas.getContext("2d");
    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.scale(scale, scale);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    data.forEach(function(item){
        drawPoint(context, item.x, item.y, item.radius, item.id, item.color)
        item.dimensions = {
            left: item.x - item.radius,
            right: item.x + item.radius,
            top: item.y - item.radius,
            bottom: item.y + item.radius
        }
    })
}
function drawPoint(context, x, y, radius, id, color) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
    context.lineWidth = 2;
    context.fillStyle = "white";
    context.font = "Arial";
    context.textAlign = "center";
    context.fillText(id, x, y);
}

// Add button event listeners on button click
document.getElementById("zoomInBtn").addEventListener(
    "click",
    function () {
        draw(1.2);
    },
    false
);

document.getElementById("zoomOutBtn").addEventListener(
    "click",
    function () {
        draw(0.8);
    },
    false
);

// add Event Listener for click event
document.getElementById("appCanvas").addEventListener("click", function (e) {

    let outSideX = this.offsetLeft; // left space of out side of canvas
    let outSideY = this.offsetTop // Top space of out side of canvas
    let clickedX = e.pageX - outSideX;
    let clickedY = e.pageY - outSideY;

    data.forEach(function(item) {
        let m =  item.dimensions
        // for matching position of points
        if (clickedX < m.right && clickedX > m.left && clickedY > m.top && clickedY < m.bottom) {
            let toolTip = document.getElementById("tooltip")
            toolTip.style.display = "block"
            toolTip.textContent = item.detail
            toolTip.style.top = outSideY + m.top + 60 + 'px'
            toolTip.style.left = outSideX + m.left + 'px'
        }
    })

});

image.onload = function () {
    draw(1.0);
};
};