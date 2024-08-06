<script setup>
import { useMusicStore } from '../stores/musicStore'
import * as Tone from "tone";
import { watch } from 'vue';

Tone.start()
const store = useMusicStore()
const synth = new Tone.Synth().toDestination();

watch(store.index, () => {
synth.triggerAttackRelease(store.notes[store.index], "8n");
})





</script>

<template>
</template>

<style scoped>

</style>
