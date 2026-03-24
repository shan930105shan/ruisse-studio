<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';
// 1. 引入 Contentful 抓取函數
import { fetchGalleryImages } from '@/contentful';

const router = useRouter();
const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

// --- 資料抓取與輪播邏輯 ---
const galleryData = ref<{ url: string; title: string }[]>([]);
const currentImageIndex = ref(0);
let timer: number | null = null;

// 計算屬性：提取圖片網址陣列
const images = computed(() => galleryData.value.map(item => item.url));

const startCarousel = () => {
  if (timer) clearInterval(timer);
  timer = window.setInterval(() => {
    if (images.value.length > 0) {
      currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length;
    }
  }, 1000); 
};

let observer: IntersectionObserver | null = null;

onMounted(async () => {
  // 2. 抓取輕盈寫真的資料 (請確保 serviceName 與 Contentful 一致)
  const data = await fetchGalleryImages('light-weight');
  galleryData.value = data;

  if (data.length > 0) {
    startCarousel();
  }

  // 3. 動態監測
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
  router.push('/work/light'); 
};
</script>

<template>
  <section ref="sectionRef" class="w-full min-h-screen bg-[#f2eedc] flex items-center justify-center py-10 md:py-20 px-4 md:px-20 font-serif overflow-hidden">
    
    <div v-if="images.length > 0" class="max-w-7xl w-full grid grid-cols-2 md:grid-cols-12 md:grid-rows-7 gap-3 md:gap-4 h-auto md:h-[85vh]">
      
      <div class="col-span-2 md:col-span-4 md:row-span-8 overflow-hidden group relative aspect-[3/2] md:aspect-auto">
        <div class="w-full h-full transition-all duration-1000 transform"
             :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'">
          
          <TransitionGroup name="fade-bg">
            <img 
              v-for="(imgUrl, index) in images" 
              :key="imgUrl"
              v-show="currentImageIndex === index"
              :src="imgUrl" 
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="輕盈寫真輪播" 
            />
          </TransitionGroup>

          <div @click="goToGallery" class="absolute inset-0 bg-[#002B40]/60 flex flex-col items-center justify-center text-white p-6 cursor-pointer z-10 transition-colors group-hover:bg-[#002B40]/40">
            <h2 class="text-xl md:text-3xl tracking-[0.4em] font-light border-b border-white/30 pb-4 mb-4">輕盈寫真</h2>
            <p class="text-[10px] md:text-xs tracking-widest opacity-80 uppercase">Lightweight Photography</p>
          </div>
        </div>
      </div>

      <div class="col-span-1 md:col-span-4 md:row-span-4 overflow-hidden aspect-[2/3] md:aspect-auto">
        <div class="w-full h-full transition-all duration-1000 delay-200 transform"
             :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'">
          <img :src="images[1] || images[0]" class="w-full h-full object-cover" alt="花絮1" loading="lazy"/>
        </div>
      </div>

      <div class="col-span-1 md:col-span-4 md:row-span-5 overflow-hidden aspect-[2/3] md:aspect-auto">
        <div class="w-full h-full transition-all duration-1000 delay-400 transform"
             :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'">
          <img :src="images[2] || images[0]" class="w-full h-full object-cover" alt="花絮2" loading="lazy"/>
        </div>
      </div>

      <div class="hidden md:block col-span-4 row-span-4 overflow-hidden">
        <div class="w-full h-full transition-all duration-1000 delay-600 transform"
             :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
          <img :src="images[3] || images[0]" class="w-full h-full object-cover" alt="細節" loading="lazy"/>
        </div>
      </div>

      <div class="hidden md:block col-span-2 row-span-3 overflow-hidden">
        <div class="w-full h-full transition-all duration-1000 delay-800 transform"
             :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'">
          <img :src="images[4] || images[0]" class="w-full h-full object-cover" alt="小圖1" loading="lazy"/>
        </div>
      </div>

      <div class="hidden md:block col-span-2 row-span-3 overflow-hidden">
        <div class="w-full h-full transition-all duration-1000 delay-900 transform"
             :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'">
          <img :src="images[5] || images[0]" class="w-full h-full object-cover" alt="小圖2" loading="lazy"/>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* 輪播淡入淡出效果 */
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