// JavaScript for drawing functionality

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;

canvas.width = window.innerWidth * 0.8;
canvas.height = 400;

ctx.lineWidth = 3;
ctx.lineCap = 'round';
ctx.strokeStyle = '#000';

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!isDrawing) return;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
