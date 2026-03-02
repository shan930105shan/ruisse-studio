<script setup lang="ts">
// 注意：Navbar 建議放在 App.vue 以保持固定，若放這須確保 Navbar 內部有 fixed 定義
import Navbar from '../components/Navbar.vue'
import Typewriter from '@/components/Typewriter.vue';
import PricingScroll from '@/components/PricingScroll.vue'; // 引入新組件
</script>

<template>
  <div class="min-h-screen bg-[#002B40] font-serif">
    
    <Navbar />

    <section id="hero" class="h-screen flex flex-col mt-10 items-center justify-center px-4 overflow-hidden">
      
      <div class="w-48 md:w-64 mb-10">
        <img src="@/assets/images/logo-white.png" alt="RUISSE Logo" class="w-full opacity-95" />
      </div>

      <h1 class="text-white text-4xl md:text-6xl tracking-[0.8em] md:tracking-[1.0em] font-light ml-[1.2em] md:ml-[1.5em] mb-12 whitespace-nowrap">
        RUISSE STUDIO
      </h1>

      <div class="text-gray-300 space-y-6 tracking-[0.5em] md:tracking-[0.8em] ml-[0.5em] md:ml-[0.8em] text-center">
        <p class="text-base md:text-lg min-h-[1.5em]">
          <Typewriter :words="['影像，讓生活更不一樣，捕捉瞬息萬變的美好']" />
        </p>
        <p class="text-xs md:text-sm opacity-70">
          歡迎一同和我們創作屬於你的新篇章
        </p>
      </div>

      <div class="text-gray-500 text-[10px] md:text-xs py-10 tracking-widest uppercase text-center">
      Welcome to join us in creating your new chapter.
    </div>

    </section>

    <section id="pricing">
      <PricingScroll />
    </section>

    <footer class="bg-[#f2eedc] text-gray-500 text-[10px] md:text-xs py-10 tracking-widest uppercase text-center">
      © RUISSE STUDIO ALL RIGHTS RESERVED.
    </footer>
    
  </div>
</template>

<style scoped>
/* 進場漸顯動畫 */
.animate-fade-in {
  animation: fadeIn 2s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>