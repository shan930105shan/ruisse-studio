<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

// 圖片路徑匯入
import plan4_1 from '@/assets/images/exquisite/plan4_1.jpg'
import plan4_2 from '@/assets/images/exquisite/plan4_2.jpg'
import plan4_3 from '@/assets/images/exquisite/plan4_3.jpg'
import plan4_4 from '@/assets/images/exquisite/plan4_4.jpg'
import plan4_5 from '@/assets/images/exquisite/plan4_5.jpg'
import plan4_6 from '@/assets/images/exquisite/plan4_6.jpg'

const router = useRouter();
const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        // 觸發後解除觀察，優化效能
        if (sectionRef.value && observer) observer.unobserve(sectionRef.value);
      }
    });
  }, { threshold: 0.15 });

  if (sectionRef.value) observer.observe(sectionRef.value);
});

onUnmounted(() => {
  observer?.disconnect();
});

const goToGallery = () => {
  router.push('/work/exquisite'); // 導向精緻寫真作品集
};
</script>

<template>
  <section ref="sectionRef" class="w-full min-h-screen bg-[#f2eedc] flex items-center justify-center py-20 px-4 md:px-20 font-serif overflow-hidden">
    <div class="max-w-7xl w-full grid grid-cols-12 grid-rows-7 gap-4 h-[85vh]">
      
      <div class="col-span-4 row-span-5 overflow-hidden col-start-1 row-start-1">
        <div class="w-full h-full transition-all duration-1000 transform"
             :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'">
          <img :src="plan4_4" class="w-full h-full object-cover" alt="細節" loading="lazy"/>
        </div>
      </div>

      <div class="col-span-2 row-span-2 overflow-hidden col-start-1 row-start-6">
        <div class="w-full h-full transition-all duration-1000 delay-700 transform"
             :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'">
          <img :src="plan4_5" class="w-full h-full object-cover" alt="小圖1" loading="lazy"/>
        </div>
      </div>

      <div class="col-span-2 row-span-2 overflow-hidden col-start-3 row-start-6">
        <div class="w-full h-full transition-all duration-1000 delay-800 transform"
             :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'">
          <img :src="plan4_6" class="w-full h-full object-cover" alt="小圖2" loading="lazy"/>
        </div>
      </div>

      <div class="col-span-4 row-span-3 overflow-hidden col-start-5">
        <div class="w-full h-full transition-all duration-1000 delay-300 transform"
             :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'">
          <img :src="plan4_2" class="w-full h-full object-cover" alt="花絮1" loading="lazy"/>
        </div>
      </div>

      <div class="col-span-4 row-span-4 overflow-hidden col-start-5 row-start-4">
        <div class="w-full h-full transition-all duration-1000 delay-500 transform"
             :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
          <img :src="plan4_3" class="w-full h-full object-cover" alt="花絮2" loading="lazy"/>
        </div>
      </div>

      <div class="col-span-4 row-span-7 overflow-hidden group relative col-start-9 row-start-1">
        <div class="w-full h-full transition-all duration-1000 delay-200 transform"
             :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'">
          <img 
            :src="plan4_1" 
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            alt="主視覺"
            loading="lazy"
          />
          
          <div @click="goToGallery" class="absolute inset-0 bg-[#002B40]/70 flex flex-col items-center justify-center text-white p-6 cursor-pointer">
            <h2 class="text-2xl md:text-3xl tracking-[0.4em] font-light border-b border-white/30 pb-4 mb-4">
              精緻寫真
            </h2>
            <p class="text-xs tracking-widest opacity-80 uppercase">Exquisite Photo</p>
          </div>
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