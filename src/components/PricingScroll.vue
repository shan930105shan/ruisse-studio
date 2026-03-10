<script setup lang="ts">
import { ref } from 'vue';
// 引入 Swiper Vue 元件
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Controller, FreeMode } from 'swiper/modules';

// 引入 Swiper 樣式
import 'swiper/css';
import 'swiper/css/free-mode';

const plans = [
  { title: '外景寫真', price: '2990$-4990$', img: new URL('../assets/images/shooting-plan/plan-outdoor.jpg', import.meta.url).href, features: ['2小時拍攝', '10張精修圖', '單人.雙人.多人'] },
  { title: '形象模卡', price: '2690$', img: new URL('../assets/images/shooting-plan/plan-modelcard.jpg', import.meta.url).href, features: ['2小時拍攝（含妝容）', '6張精修圖'] },
  { title: '輕盈寫真', price: '2990$', img: new URL('../assets/images/shooting-plan/plan-lightweight.jpg', import.meta.url).href, features: ['2小時拍攝', '6張精修圖', '提供簡約白洋裝'] },
  { title: '精緻寫真', price: '4990$', img: new URL('../assets/images/shooting-plan/plan-exquisite.jpg', import.meta.url).href, features: ['2.5小時拍攝', '8張精修圖', '電影感實景'] },
  { title: '生日寫真', price: '5990$', img: new URL('../assets/images/shooting-plan/plan-birthday.jpg', import.meta.url).href, features: ['2.5小時拍攝', '8張精修圖', '生日造景'] },
  { title: '客製化寫真', price: '1990$UP', img: new URL('../assets/images/shooting-plan/plan-customized.jpg', import.meta.url).href, features: ['2小時拍攝', '8張精修圖', '客製化佈置'] }
];

const swiperInstance = ref<any>(null);
const activeIndex = ref(0);

const onSwiper = (swiper: any) => {
  swiperInstance.value = swiper;
};

// 當滑動時更新當前索引，用來亮起上方標籤
const onSlideChange = (swiper: any) => {
  // swiper.realIndex 會給出原始資料的索引（0-5），不會受 loop 影響
  activeIndex.value = swiper.realIndex;
};

// 點擊標籤跳轉到該方案
const scrollToPlan = (index: number) => {
  if (swiperInstance.value) {
    swiperInstance.value.slideToLoop(index);
  }
};
</script>

<template>
  <div class="bg-[#f2eedc] py-16 overflow-hidden font-serif">
    
    <nav class="max-w-4xl mx-auto mb-16 px-4">
      <ul class="flex flex-wrap justify-center gap-4 md:gap-8 border-b border-black/10 pb-6">
        <li 
          v-for="(plan, index) in plans" 
          :key="index"
          @click="scrollToPlan(index)"
          :class="[
            'cursor-pointer text-sm md:text-base tracking-widest transition-all duration-300 pb-2 border-b-2',
            activeIndex === index ? 'text-black border-black font-bold' : 'text-gray-400 border-transparent hover:text-black'
          ]"
        >
          {{ plan.title }}
        </li>
      </ul>
    </nav>

    <swiper
      :modules="[FreeMode]"
      :slides-per-view="'auto'"
      :centered-slides="true"
      :space-between="30"
      :loop="true"
      :grab-cursor="true"

      class="pricing-swiper"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="(plan, i) in plans" :key="i" class="plan-slide">
        <div class="card-container transition-all duration-500 ease-out">
          <div class="image-wrapper shadow-2xl bg-white overflow-hidden mb-8 border border-black/5">
            <img :src="plan.img" class="w-full h-full object-cover" />
          </div>

          <div class="text-content px-4 opacity-40 transition-opacity duration-500">
            <div class="flex items-baseline justify-between mb-4">
              <h3 class="text-2xl md:text-3xl font-black tracking-wider text-black">{{ plan.title }}</h3>
              <span class="text-gray-500 font-mono text-2xl">{{ plan.price }}</span>
            </div>
            <ul class="text-sm md:text-base space-y-2 text-gray-700 border-t border-black/10 pt-4">
              <li v-for="f in plan.features" :key="f" class="flex items-start">
                <span class="mr-2 text-gray-300">•</span> {{ f }}
              </li>
            </ul>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
/* 預設卡片尺寸 */
.plan-slide {
  width: 240px; /* 手機版寬度 */
}

@media (min-width: 768px) {
  .plan-slide {
    width: 360px; /* 桌機版寬度 */
  }
}

.card-container {
  transform: scale(0.75); /* 非中間的卡片縮小 */
  filter: grayscale(40%); /* 非中間的卡片稍微灰階（選用，更有高級感） */
}

.image-wrapper {
  aspect-ratio: 3 / 4; /* 統一卡片比例 */
}

/* --- 重點：當卡片在正中間時的樣式 --- */
:deep(.swiper-slide-active) .card-container {
  transform: scale(1.05); /* 中間放大 */
  filter: grayscale(0%);
}

:deep(.swiper-slide-active) .text-content {
  opacity: 1; /* 中間文字變清楚 */
}

/* 移除滑鼠滾輪干擾：Swiper 預設就不會被頁面滾輪控制，除非開啟 mousewheel 模組 */
.pricing-swiper {
  padding-bottom: 50px;
  cursor: grab;
}

.pricing-swiper:active {
  cursor: grabbing;
}
</style>