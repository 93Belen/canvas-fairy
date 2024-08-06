<script setup>
import { onMounted, ref } from 'vue'
import * as Tone from "tone"
import { useCoordinatesStore } from '../stores/coordinates'
const store = useCoordinatesStore()

const synth = new Tone.Synth().toDestination();
let video, canvas, ctx;
let hand;
let detector;
let started = false;
let prevX = 0
let prevY = 0
let bubbles = []
let index = 0

class Bubble {
  constructor(x, y, radius, opacity, color){
    this.x = x
    this.y = y
    this.radius = radius
    this.opacity = opacity
    this.color = color
    this.dx = Math.random() * 10
    this.dy = Math.random() * 5
  }
  draw(){
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    ctx.strokeStyle = this.color
    ctx.fillStyle = this.color
    ctx.globalAlhpa = this.opacity
    ctx.fill()
    ctx.stroke()
  }
  move(){
    this.x = this.x + this.dx
    this.y = this.y | this.dy
  }
}




onMounted(() => {
    video = document.getElementById("video");
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight


    ctx.scale(-1, 1);
    ctx.translate(-canvas.width, 0);
    ctx.lineCap = "round";
    ctx.lineWidth = 5
    ctx.lineJoin = 'round'
    ctx.shadowBlur = 7;

    function drawCameraIntoCanvas() {
        ctx.drawImage(video, 0, 0, window.innerWidth, window.innerHeight);
        addBubblesToArr()
        paint()
        window.requestAnimationFrame(drawCameraIntoCanvas);
      }
      drawCameraIntoCanvas();


})

// helpers =====================

const notes = [
  "C4", "E4", "G4", "C5", // Cheerful start
  "E4", "D4", "C4", // Descending notes
  "G4", "A4", "G4", // Up and down motion
  "C5", "B4", "A4", // Climbing up and back
  "F4", "E4", "D4", "C4" // Resolution back down
];

const noteDurations = [
  "4n", "4n", "4n", "4n", // Cheerful start (4 quarter notes)
  "4n", "4n", "4n", // Descending notes (3 quarter notes)
  "4n", "4n", "4n", // Up and down motion (3 quarter notes)
  "4n", "4n", "4n", // Climbing back (3 quarter notes)
  "4n", "4n", "4n", "2n" // Resolution down (last note is a half note)
];

function addBubblesToArr(){
  let dist = distanceBetween({x: prevX, y: prevY}, {x: store.brushX, y: store.brushY});
  let angle = angleBetween({x: prevX, y: prevY},  {x: store.brushX, y: store.brushY});
     // Calculate number of circles to draw
    let numCircles = Math.min(Math.floor(dist / 20), 5); // 5 circles max, adjust as needed
    for (let i = 0; i <= numCircles; i++) {
      // Calculate the intermediate point
      let x = prevX + (Math.sin(angle) * (i * (dist / numCircles)));
      let y = prevY + (Math.cos(angle) * (i * (dist / numCircles)));
      const point = {
        x: x,
        y: y,
        radius: Math.random() * 20,
        opacity: Math.random(),
        color: getRandomColor()
      }
      const bubble = new Bubble(x, y, point.radius, point.opacity, point.color)
      bubbles.push(bubble)
    }
  prevX = store.brushX
  prevY = store.brushY
}

function sound(){
    if(store.brushX !== prevX || store.brushY !== prevY){
    synth.triggerAttackRelease(notes[index], noteDurations[index]);
    if(index < notes.length){
      index++
    } else {
      index = 0
    }
  }
}


function paint(){
  bubbles.forEach(bubble => {
    sound()
    bubble.draw()
    bubble.move()
  })
}
  


// Helper function to get a random color
function getRandomColor() {
  const colors = ['red', 'orange', 'yellow', 'green', 'lightblue', 'blue', 'purple'];
  return colors[Math.floor(Math.random() * colors.length)]; // Select a random color from the array
}


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})



function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
function angleBetween(point1, point2) {
    return Math.atan2( point2.x - point1.x, point2.y - point1.y );
}



</script>

<template>
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<style scoped>

</style>
