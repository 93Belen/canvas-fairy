<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToVideo = () =>{
router.push('/video')
}
</script>

<template>
  <div>
    <h1>Home</h1>
    <p @click="goToVideo" >Go to Video</p>
  </div>
</template>

<style scoped>

</style>
