<script setup>
import { useMusicStore } from '../stores/musicStore'
import * as Tone from "tone";
import { onBeforeMount, onMounted, onUnmounted } from 'vue';
import { useCoordinatesStore } from '../stores/coordinates'

const musicStore = useMusicStore()
const store = useCoordinatesStore()


// Define the notes for "Under the Sea"
const notes = musicStore.notes

// Timing settings
const NOTE_DURATION = 0.5; // Duration of each note in seconds

let timer;
let synth;
let lastIndex;

onBeforeMount(async () => {
    await Tone.start();
    synth = new Tone.Synth({
    oscillator: {
        type: "sine" // Use a sine wave for a softer sound
    },
    envelope: {
        attack: 0.05, // Slightly longer attack for a more piano-like onset
        decay: 0.1,   // Shorter decay for a quick response
        sustain: 0.1, // Increased sustain for a fuller sound
        release: 0.5  // Longer release for a smoother fade out
    }
}).toDestination();
});





// Set up a watcher to detect brush movement
onMounted(() => {
    timer = setInterval(() => {
        if(musicStore.index > 0 && lastIndex !== musicStore.index){
            const now = Tone.now();
           console.log(musicStore.index)
            const note = notes[musicStore.index];
            synth.triggerAttack(note, now);
            synth.triggerRelease(now + NOTE_DURATION * 0.8); // Release after 80% of the duration
            lastIndex = musicStore.index
        }
    }, 10); // Check for movement every 1s
});

// Clean up the timer on unmount
onUnmounted(() => {
    clearInterval(timer);
});
</script>

<template>
</template>

<style scoped>

</style>
