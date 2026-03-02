<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import HomePage from './views/HomeView.vue'; // 確認路徑是否正確
</script>

<template>
  <div class="relative w-full min-h-screen">
    <Navbar />
    <HomePage />
  </div>
</template>