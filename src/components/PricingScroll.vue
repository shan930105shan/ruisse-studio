<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 方案資料
const plans = [
  { 
    title: '外景寫真', 
    price: '2990$-4990$', 
    // 注意：這裡的路徑是從「目前的組件檔」出發，找到圖片的位置
    img: new URL('../assets/images/shooting-plan/plan1.png', import.meta.url).href, 
    features: ['2小時拍攝', '10張精修圖（含調色.細節）', '單人.雙人.多人'] 
  },
  { 
    title: '形象模卡', 
    price: '2690$', 
    img: new URL('../assets/images/shooting-plan/plan2.png', import.meta.url).href, 
    features: ['2小時拍攝（含妝容）', '6張精修圖（含調色.細節）'] 
  },
  { 
    title: '輕盈寫真', 
    price: '2990$', 
    img: new URL('../assets/images/shooting-plan/plan3.png', import.meta.url).href, 
    features: ['2小時拍攝（含妝容）', '6張精修圖（含調色.細節）', '提供簡約白洋裝'] 
  },
  { 
    title: '精緻寫真', 
    price: '4990$', 
    img: new URL('../assets/images/shooting-plan/plan4.png', import.meta.url).href, 
    features: ['2.5小時拍攝（含妝容）', '8張精修圖（含調色.細節）', '電影感實景'] 
  },
  { 
    title: '生日寫真', 
    price: '5990$', 
    img: new URL('../assets/images/shooting-plan/plan5.png', import.meta.url).href, 
    features: ['2.5小時拍攝（含妝容）', '8張精修圖（含調色.細節）', '軟綿綿生日造景/提供婚紗洋裝'] 
  },
  { 
    title: '客製化寫真', 
    price: '1990$UP', 
    img: new URL('../assets/images/shooting-plan/plan6.png', import.meta.url).href, 
    features: ['2小時拍攝（含妝容）', '8張精修圖（含調色.細節）', '客製化寫真佈置'] 
  }
];

const containerRef = ref<HTMLElement | null>(null);
const horizontalRef = ref<HTMLElement | null>(null);
const translateX = ref(0);

const handleScroll = () => {
  if (!containerRef.value || !horizontalRef.value) return;

  const rect = containerRef.value.getBoundingClientRect();
  const windowWidth = window.innerWidth;
  const contentWidth = horizontalRef.value.scrollWidth; // 取得 6 張卡片的總寬度
  
  // 計算「溢出」的寬度：卡片總長度扣掉螢幕寬度（再加上左側標題佔據的寬度）
  // 這樣最後一張就不會滑出螢幕
  const maxMove = contentWidth - windowWidth + (windowWidth * 0.2); 

  const progress = -rect.top / (rect.height - window.innerHeight);
  const constrainedProgress = Math.max(0, Math.min(1, progress));

  // 將進度轉換為像素位移
  translateX.value = constrainedProgress * maxMove;
};

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<template>
  <section ref="containerRef" class="relative h-[300vh] bg-[#f2eedc]">
    
    <div class="sticky top-0 h-screen w-full flex items-center overflow-hidden">
      
      <div class="w-[25%] md:w-[20%] px-8 md:px-12 h-full flex items-center justify-center z-20 bg-[#f2eedc]">
        <h2 class="text-3xl md:text-4xl font-black tracking-[0.5em] leading-relaxed text-black writing-vertical">
          案容<br>方內
        </h2>
      </div>

      <div 
        ref="horizontalRef"
        class="flex space-x-12 px-12 transition-transform duration-75 ease-out"
        :style="{ transform: `translateX(-${translateX}px)` }" 
      >
        <div v-for="(plan, i) in plans" :key="i" class="flex-shrink-0 w-[300px] md:w-[400px]">
          <div class="aspect-[3/4] overflow-hidden border border-gray-300 shadow-md mb-6 bg-white">
            <img :src="plan.img" class="w-full h-full object-cover" />
          </div>
          <div class="text-black">
            <div class="flex items-baseline space-x-2 mb-2">
              <h3 class="text-xl font-bold">{{ plan.title }}</h3>
              <span class="text-gray-400 text-sm ml-auto">{{ plan.price }}</span>
            </div>
            <ul class="text-sm space-y-2 text-gray-700 border-t border-gray-300 pt-4">
              <li v-for="f in plan.features" :key="f" class="flex items-start">
                 <span class="mr-2">•</span> {{ f }}
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.writing-vertical {
  writing-mode: vertical-rl;
  text-orientation: upright;
}
</style>