const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;

canvas.addEventListener('touchstart', function(event) {
    isDrawing = true;
    const touch = event.touches[0];
    const x = touch.clientX - canvas.offsetLeft;
    const y = touch.clientY - canvas.offsetTop;
    ctx.beginPath();
    ctx.moveTo(x, y);
});

canvas.addEventListener('touchmove', function(event) {
    if (isDrawing) {
        const touch = event.touches[0];
        const x = touch.clientX - canvas.offsetLeft;
        const y = touch.clientY - canvas.offsetTop;
        ctx.lineTo(x, y);
        ctx.stroke();
    }
});

canvas.addEventListener('touchend', function(event) {
    isDrawing = false;
});
