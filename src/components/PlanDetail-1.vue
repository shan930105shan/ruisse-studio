<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
// 使用 import 方式引入圖片，Vite 會自動處理路徑解析與打包
import plan1_1 from '@/assets/images/outdoor-photography/plan1_1.jpg'
import plan1_2 from '@/assets/images/outdoor-photography/plan1_2.jpg'
import plan1_3 from '@/assets/images/outdoor-photography/plan1_3.jpg'
import plan1_4 from '@/assets/images/outdoor-photography/plan1_4.jpg'
import plan1_5 from '@/assets/images/outdoor-photography/plan1_5.jpg'
import plan1_6 from '@/assets/images/outdoor-photography/plan1_6.jpg'

import { useRouter } from 'vue-router';

const router = useRouter();
const sectionRef = ref<HTMLElement | null>(null); // 用來綁定 DOM
const isVisible = ref(false); // 控制是否顯示動畫

let observer: IntersectionObserver | null = null;

onMounted(() => {
      observer = new IntersectionObserver((entries) => {
      // 使用 forEach 遍歷所有的觀察目標
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          // 觸發後停止觀察
          if (sectionRef.value && observer) {
            observer.unobserve(sectionRef.value);
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});

onUnmounted(() => {
  observer?.disconnect(); // 組件銷毀時記得移除觀察器，避免記憶體洩漏
});

const goToGallery = () => {
  router.push('/work/outdoor');
};

</script>

<template>
  <section ref="sectionRef" class="w-full min-h-screen bg-[#f2eedc] flex items-center justify-center py-20 px-4 md:px-20 font-serif">
    <div class="max-w-7xl w-full grid grid-cols-12 grid-rows-7 gap-4 h-[85vh]">
      
      <div class="col-span-4 row-span-8 overflow-hidden group relative">
        <div class="w-full h-full transition-all duration-1000 transform"
             :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'">
          <img :src="plan1_1" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="主視覺" loading="lazy" />
          <div @click="goToGallery" class="absolute inset-0 bg-[#002B40]/70 flex flex-col items-center justify-center text-white p-6 cursor-pointer">
            <h2 class="text-2xl md:text-3xl tracking-[0.4em] font-light border-b border-white/30 pb-4 mb-4">外景寫真</h2>
            <p class="text-xs tracking-widest opacity-80 uppercase">Outdoor Photography</p>
          </div>
        </div>
      </div>

      <div class="col-span-4 row-span-4 overflow-hidden">
        <div class="w-full h-full transition-all duration-1000 delay-200 transform"
             :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'">
          <img :src="plan1_2" class="w-full h-full object-cover" alt="花絮1" loading="lazy"/>
        </div>
      </div>

      <div class="col-span-4 row-span-5 overflow-hidden">
        <div class="w-full h-full transition-all duration-1000 delay-400 transform"
             :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'">
          <img :src="plan1_3" class="w-full h-full object-cover" alt="花絮2" loading="lazy"/>
        </div>
      </div>

      <div class="col-span-4 row-span-4 overflow-hidden">
        <div class="w-full h-full transition-all duration-1000 delay-500 transform"
             :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
          <img :src="plan1_4" class="w-full h-full object-cover" alt="細節" loading="lazy"/>
        </div>
      </div>

      <div class="col-span-2 row-span-3 overflow-hidden">
        <div class="w-full h-full transition-all duration-1000 delay-700 transform"
             :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'">
          <img :src="plan1_5" class="w-full h-full object-cover" alt="小圖1" loading="lazy"/>
        </div>
      </div>

      <div class="col-span-2 row-span-3 overflow-hidden">
        <div class="w-full h-full transition-all duration-1000 delay-900 transform"
             :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'">
          <img :src="plan1_6" class="w-full h-full object-cover" alt="小圖2" loading="lazy"/>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
img {
  display: block;
  filter: saturate(0.9);
}
/* 基礎動畫設定 */
[class^="animate-fade-"] {
  opacity: 0; /* 初始透明 */
  animation-duration: 1.2s;
  animation-fill-mode: forwards; /* 讓動畫結束後停在最後一幀 */
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); /* 高雅的緩動曲線 */
}

/* 從左淡入 */
.animate-fade-left { animation-name: fadeLeft; }
@keyframes fadeLeft {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

/* 從右淡入 */
.animate-fade-right { animation-name: fadeRight; }
@keyframes fadeRight {
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
}

/* 從上淡入 */
.animate-fade-down { animation-name: fadeDown; }
@keyframes fadeDown {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 從下淡入 */
.animate-fade-up { animation-name: fadeUp; }
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 原地淡入 */
.animate-fade-in { animation-name: fadeIn; }
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>