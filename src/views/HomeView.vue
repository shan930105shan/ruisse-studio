<script setup lang="ts">
// 注意：Navbar 建議放在 App.vue 以保持固定，若放這須確保 Navbar 內部有 fixed 定義
import { defineAsyncComponent } from 'vue' // 引入異步定義工具
import Navbar from '../components/Navbar.vue'
import Typewriter from '@/components/Typewriter.vue';
import PricingScroll from '@/components/PricingScroll.vue'; // 引入新組件
//視差滾動效果
import { ref, onMounted, onUnmounted } from 'vue';
const PlanDetail1 = defineAsyncComponent(() => import('@/components/PlanDetail-1.vue'))
const PlanDetail2 = defineAsyncComponent(() => import('@/components/PlanDetail-2.vue'))
const PlanDetail3 = defineAsyncComponent(() => import('@/components/PlanDetail-3.vue'))
const PlanDetail4 = defineAsyncComponent(() => import('@/components/PlanDetail-4.vue'))
const PlanDetail5 = defineAsyncComponent(() => import('@/components/PlanDetail-5.vue'))
const PlanDetail6 = defineAsyncComponent(() => import('@/components/PlanDetail-6.vue'))
import ContactUs from '@/components/ContactUs.vue';

const services = [
  { zh: '個人寫真拍攝', en: 'Personal portrait shoot' },
  { zh: '外景拍攝', en: 'On-location shooting' },
  { zh: '商業形象照', en: 'Business image photos' },
  { zh: '活動紀錄', en: 'Activity record' },
  { zh: '品牌形象影片', en: 'Brand image video' },
  { zh: '商業/個人IP短影音', en: 'Commercial/Personal IP Short Videos' }
]

const scrollY = ref(0);

const handleScroll = () => {
  scrollY.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="min-h-screen bg-[#002B40] font-serif">
    
    <Navbar />

    <section id="hero" class="min-h-screen flex flex-col mt-0 items-center justify-between overflow-hidden relative bg-[#002B40]">

      <h1 
        class="text-white text-4xl md:text-6xl tracking-[0.8em] pt-45 md:pt-60 md:tracking-[1.0em] font-light ml-[1.2em] md:ml-[1.5em] mb-12 whitespace-nowrap transition-transform duration-75 ease-out"
        :style="{ transform: `translateY(${scrollY * 0.4}px)` }"
      >
        RUISSE STUDIO
      </h1>

      <div 
        class="text-gray-300 space-y-6 tracking-[0.5em] md:tracking-[0.8em] ml-[0.5em] md:ml-[0.8em] text-center transition-transform duration-75 ease-out"
        :style="{ transform: `translateY(${scrollY * 0.5}px)` }"
      >
        <p class="text-base md:text-lg min-h-[1.5em]">
          <Typewriter :words="['影像，讓生活更不一樣，捕捉瞬息萬變的美好']" />
        </p>
        <p class="text-xs md:text-sm opacity-70">
          歡迎一同和我們創作屬於你的新篇章
        </p>
      </div>

      <div 
        class="text-gray-500 text-[10px] md:text-xs py-10 tracking-widest uppercase text-center transition-transform duration-75 ease-out"
        :style="{ transform: `translateY(${scrollY * 0.6}px)` }"
      >
        Welcome to join us in creating your new chapter.
      </div>

      <div class="w-full bg-[#f2eedc] py-6 md:py-8 border-y border-[#002B40]/5 overflow-hidden z-20">
        <div class="flex whitespace-nowrap animate-marquee">
          <div v-for="i in 2" :key="i" class="flex items-center gap-12 md:gap-24 px-6 md:px-12">
            <div v-for="service in services" :key="service.zh" class="flex flex-col items-center">
              <span class="text-[#002B40] text-lg md:text-2xl font-bold tracking-[0.2em] mb-1">{{ service.zh }}</span>
              <span class="text-gray-500 text-[10px] md:text-xs uppercase tracking-widest font-light">{{ service.en }}</span>
            </div>
          </div>
        </div>
      </div>

    </section>

    <section id="pricing" class="min-h-screen">
      <div class="w-full pt-12 pb-0 z-20 bg-[#f2eedc] flex flex-col items-center">
        <h2 class="text-3xl md:text-5xl font-black tracking-[0.5em] text-black ml-[0.5em]">
          方案內容
        </h2>
        
        <p class="text-gray-400 text-xs md:text-sm tracking-[0.3em] uppercase mt-4 font-light">
          Service Packages & Pricing
        </p>
      </div>
      <PricingScroll />
    </section>

    <section id="work">
      <PlanDetail1 />
      <PlanDetail2 />
      <PlanDetail3 />
      <PlanDetail4 />
      <PlanDetail5 />
      <PlanDetail6 />
    </section>

    <section id="contact">
      <ContactUs />
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

/* --- 新增：跑馬燈動畫 --- */
.animate-marquee {
  display: flex;
  width: max-content; /* 確保寬度由內容撐開 */
  animation: marquee 40s linear infinite; /* 40秒跑一圈，覺得太慢可以改成 30s */
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%); /* 往左位移掉一半的長度，達成無縫銜接 */
  }
}

/* 滑鼠懸停時暫停 (選用，增加互動感) */
.animate-marquee:hover {
  animation-play-state: paused;
}

</style>