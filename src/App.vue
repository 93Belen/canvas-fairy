// <script setup>
import { RouterView } from 'vue-router'
import WebSockets from './components/WebSockets.vue'
</script>

<template>
  <div id="app-div">
    <WebSockets/>
    <RouterView />
  </div>
</template>

<style scoped>
#app-div{
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100vw;
}
</style>
