<script setup>
import { useMusicStore } from '../stores/musicStore'
import * as Tone from "tone";
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import { useCoordinatesStore } from '../stores/coordinates';

const store = useCoordinatesStore();

// Define the notes for "Under the Sea"
const notes = [
    "A4", "C5", "E5", "D5", // First Phrase
    "C5", "B4", "A4", "G4", // Descending
    "A4", "C5", "E5", "D5", // Second Phrase
    "C5", "B4", "A4", "G4", // Descending
    "F#4", "G4", "A4", "C5", // Climbing
    "A4", "G4", "F#4", "E4", // Descending
    "D4", "E4", "F#4", "G4", // Ascending
    "E4", "D4", "C4", // Resolution back down
    "C4", "E4", "G4", "A4", // New Phrase
    "G4", "F#4", "E4", "D4", // Descending
    "E4", "G4", "A4", "B4", // Climbing
    "A4", "G4", "F#4", "E4", // Descending
    "C4", "D4", "E4", "G4", // Ascending
    "E4", "D4", "C4", "B3", // Descending
    "A3", "C4", "D4", "C4", // Gentle Climb
    "B3", "A3", "G3", "C4", // Resolution
];





// Timing settings
const NOTE_DURATION = 0.4; // Duration of each note in seconds
const STOP_DURATION = 1000; // Duration to wait before stopping playback when brush is stationary (in ms)

let lastBrushPosition = { x: store.brushX, y: store.brushY };
let isPlaying = false;
let noteIndex = 0;
let timer = null;
let stopTimer = null;

onBeforeMount(async () => {
    await Tone.start();
});

function playNotes() {
    const synth = new Tone.Synth({
            oscillator: {
                type: "sine" // Use sine wave for a soft sound
            },
            envelope: {
                attack: 0.1, // Short attack time
                decay: 0.2, // Short decay time
                sustain: 0.5, // Sustain level
                release: 0.5 // Release time
            }
        }).toDestination();
    noteIndex = 0; // Reset note index for each play session
    isPlaying = true;

    const playNextNote = () => {
        if (noteIndex < notes.length) {
            const now = Tone.now();
            const note = notes[noteIndex];
            synth.triggerAttack(note, now);
            synth.triggerRelease(now + NOTE_DURATION * 0.8); // Release after 80% of the duration
            noteIndex++;
        } else {
            clearInterval(timer); // Stop the timer when all notes have been played
            isPlaying = false; // Reset playing status
        }
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
