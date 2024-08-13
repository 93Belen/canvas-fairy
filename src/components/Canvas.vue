<script setup>
import { onMounted, ref } from 'vue'
import { useCoordinatesStore } from '../stores/coordinates'
const store = useCoordinatesStore()

let video, canvas, ctx;
let prevX = 0
let prevY = 0
let bubbles = []

// ========================================

class Bubble {
  constructor(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = Math.random() * 10;
    this.dy = Math.random() * 5;
  }
  
  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

    // Log parameters to debug
    // console.log('Drawing bubble at:', { x: this.x, y: this.y, radius: this.radius });

    // Create radial gradient with error handling
    if (isFinite(this.x) && isFinite(this.y) && isFinite(this.radius)) {
      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        1,
        this.x + 0.5,
        this.y + 0.5,
        this.radius
      );

      gradient.addColorStop(0.4, `hsla(${this.color}, 60%, 60%, 0.4)`);
      gradient.addColorStop(0.95, `hsla(${this.color}, 60%, 60%, 0.95)`);

      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }
  
  move(){
    	this.x = this.x - this.dx;
		  this.y = this.y - this.dy;
  }
}


// ========================================


onMounted(() => {
    video = document.getElementById("video");
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight


    ctx.scale(-1, 1);
    ctx.translate(-canvas.width, 0);

    function drawCameraIntoCanvas() {
        ctx.drawImage(video, 0, 0, window.innerWidth, window.innerHeight);
        addBubblesToArr()
        paint()
        window.requestAnimationFrame(drawCameraIntoCanvas);
      }
      drawCameraIntoCanvas();


})

// ========================================

function addBubblesToArr(){
  store.getBrushPosition.forEach(brush => {
    let brushX = brush.x
    let brushY = brush.y
  let dist = distanceBetween({x: prevX, y: prevY}, {x: brushX, y: brushY});
  let angle = angleBetween({x: prevX, y: prevY},  {x: brushX, y: brushY});
     // Calculate number of circles to draw
    let numCircles = Math.min(Math.floor(dist / 1), 1); // 3 circles max, adjust as needed
    for (let i = 0; i <= numCircles; i++) {
      // Calculate the intermediate point
      let x = prevX + (Math.sin(angle) * (i * (dist / numCircles)));
      let y = prevY + (Math.cos(angle) * (i * (dist / numCircles)));
      const point = {
        x: x,
        y: y,
        radius: Math.random() * 20,
        color: Math.round(Math.random() * 255)
      }
      const bubble = new Bubble(x, y, point.radius, point.color)
      bubbles.push(bubble)
    }
  prevX = brushX
  prevY = brushY
  })
}

let lastSoundTime = 0; // Track the last time sound was played
const soundCooldown = 200; // Minimum time between sounds in milliseconds
let prev = {x: 0, y: 0}

// ========================================
function paint(){
  bubbles.forEach(bubble => {
    bubble.draw()
    bubble.move()
  })
}
// ========================================

function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
function angleBetween(point1, point2) {
    return Math.atan2( point2.x - point1.x, point2.y - point1.y );
}

// ========================================
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})




</script>

<template>
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<style scoped>

</style>
