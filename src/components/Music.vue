<script setup>
import { useMusicStore } from '../stores/musicStore'
import * as Tone from "tone";
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import { useCoordinatesStore } from '../stores/coordinates'

const musicStore = useMusicStore()
const store = useCoordinatesStore()


// Define the notes for "Under the Sea"
const notes = musicStore.notes



// Timing settings
const NOTE_DURATION = 0.4; // Duration of each note in seconds
const STOP_DURATION = 1000; // Duration to wait before stopping playback when brush is stationary (in ms)

let lastBrushPosition = { x: store.brushX, y: store.brushY };
let isPlaying = false;
let timer = null;
let stopTimer = null;

onBeforeMount(async () => {
    await Tone.start();
});




function playNotes() {
const synth = new Tone.Synth({
    oscillator: {
        type: "sine" // Use a sine wave for a softer sound
    },
    // envelope: {
    //     attack: 0.05, // Slightly longer attack for a more piano-like onset
    //     decay: 0.1,   // Shorter decay for a quick response
    //     sustain: 0.1, // Increased sustain for a fuller sound
    //     release: 0.5  // Longer release for a smoother fade out
    // }
}).toDestination();

    isPlaying = true;

    const playNextNote = () => {
            const now = Tone.now();
            const note = notes[musicStore.index - 1];
            synth.triggerAttack(note, now);
            synth.triggerRelease(now + NOTE_DURATION * 0.8); // Release after 80% of the duration
    };

    // Play the first note immediately
    playNextNote();
    timer = setInterval(playNextNote, NOTE_DURATION * 1000); // Play next note at regular intervals
}

function stopNotes() {
    if (timer) {
        clearInterval(timer);
        timer = null; // Clear the timer
    }
    isPlaying = false; // Reset playing status
}

// Set up a watcher to detect brush movement
onMounted(() => {
    setInterval(() => {
        if (store.brushX !== lastBrushPosition.x || store.brushY !== lastBrushPosition.y) {
            lastBrushPosition = { x: store.brushX, y: store.brushY }; // Update last brush position
            if (!isPlaying) {
                playNotes(); // Start playing notes when the brush is moving
            }
            // Clear stop timer if brush is moving
            if (stopTimer) {
                clearTimeout(stopTimer);
                stopTimer = null;
            }
        } else {
            // If the brush hasn't moved, set a timer to stop playback
            if (isPlaying) {
                stopTimer = setTimeout(stopNotes, STOP_DURATION); // Stop notes after STOP_DURATION
            }
        }
    }, 100); // Check for movement every 100ms
});

// Clean up the timer on unmount
onUnmounted(() => {
    if (timer) {
        clearInterval(timer);
    }
    if (stopTimer) {
        clearTimeout(stopTimer);
    }
});
</script>

<template>
</template>

<style scoped>

</style>
