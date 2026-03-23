<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

// 圖片 import
import plan5_1 from '@/assets/images/birthday-portrait-session/plan5_1.jpg'
import plan5_2 from '@/assets/images/birthday-portrait-session/plan5_2.jpg'
import plan5_3 from '@/assets/images/birthday-portrait-session/plan5_3.jpg'
import plan5_4 from '@/assets/images/birthday-portrait-session/plan5_4.jpg'
import plan5_5 from '@/assets/images/birthday-portrait-session/plan5_5.jpg'
import plan5_6 from '@/assets/images/birthday-portrait-session/plan5_6.jpg'

const router = useRouter();
const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

// --- 輪播邏輯 ---
const images = [plan5_1, plan5_2, plan5_3, plan5_4, plan5_5, plan5_6];
const currentImageIndex = ref(0);
let timer: number | null = null;

const startCarousel = () => {
  timer = window.setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
  }, 1000); // 每一秒換一張
};

let observer: IntersectionObserver | null = null;

onMounted(() => {
  startCarousel(); // 啟動輪播

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        if (sectionRef.value && observer) observer.unobserve(sectionRef.value);
      }
    });
  }, { threshold: 0.15 });

  if (sectionRef.value) observer.observe(sectionRef.value);
});

onUnmounted(() => {
  observer?.disconnect();
  if (timer) clearInterval(timer);
});

const goToGallery = () => {
  router.push('/work/birthday'); 
};
</script>

<template>
  <section ref="sectionRef" class="w-full min-h-screen bg-[#f2eedc] flex items-center justify-center py-10 md:py-20 px-4 md:px-20 font-serif overflow-hidden">
    
    <div class="max-w-7xl w-full grid grid-cols-2 md:grid-cols-12 md:grid-rows-7 gap-3 md:gap-4 h-auto md:h-[85vh]">
      
      <div class="col-span-2 md:col-span-4 md:row-span-8 overflow-hidden group relative aspect-[3/2] md:aspect-auto">
        <div class="w-full h-full transition-all duration-1000 transform"
             :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'">
          
          <TransitionGroup name="fade-bg">
            <img 
              v-for="(img, index) in images" 
              :key="img"
              v-show="currentImageIndex === index"
              :src="img" 
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="生日寫真輪播" 
            />
          </TransitionGroup>

          <div @click="goToGallery" class="absolute inset-0 bg-[#002B40]/60 flex flex-col items-center justify-center text-white p-6 cursor-pointer z-10 transition-colors group-hover:bg-[#002B40]/40">
            <h2 class="text-xl md:text-3xl tracking-[0.4em] font-light border-b border-white/30 pb-4 mb-4">生日寫真</h2>
            <p class="text-[10px] md:text-xs tracking-widest opacity-80 uppercase">Birthday Portrait Session</p>
          </div>
        </div>
      </div>

      <div class="col-span-1 md:col-span-4 md:row-span-4 overflow-hidden aspect-[2/3] md:aspect-auto">
        <div class="w-full h-full transition-all duration-1000 delay-200 transform"
             :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'">
          <img :src="plan5_2" class="w-full h-full object-cover" alt="細節1" loading="lazy"/>
        </div>
      </div>

      <div class="col-span-1 md:col-span-4 md:row-span-5 overflow-hidden aspect-[2/3] md:aspect-auto">
        <div class="w-full h-full transition-all duration-1000 delay-400 transform"
             :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'">
          <img :src="plan5_3" class="w-full h-full object-cover" alt="細節2" loading="lazy"/>
        </div>
      </div>

      <div class="hidden md:block col-span-4 row-span-4 overflow-hidden">
        <div class="w-full h-full transition-all duration-1000 delay-500 transform"
             :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
          <img :src="plan5_4" class="w-full h-full object-cover" alt="細節3" loading="lazy"/>
        </div>
      </div>

      <div class="hidden md:block col-span-2 row-span-3 overflow-hidden">
        <div class="w-full h-full transition-all duration-1000 delay-700 transform"
             :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'">
          <img :src="plan5_5" class="w-full h-full object-cover" alt="細節4" loading="lazy"/>
        </div>
      </div>

      <div class="hidden md:block col-span-2 row-span-3 overflow-hidden">
        <div class="w-full h-full transition-all duration-1000 delay-900 transform"
             :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'">
          <img :src="plan5_6" class="w-full h-full object-cover" alt="細節5" loading="lazy"/>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* 輪播淡入淡出動畫 */
.fade-bg-enter-active,
.fade-bg-leave-active {
  transition: opacity 0.8s ease;
}
.fade-bg-enter-from,
.fade-bg-leave-to {
  opacity: 0;
}
.fade-bg-leave-active {
  position: absolute;
}

img {
  display: block;
  filter: saturate(0.9);
}
</style>