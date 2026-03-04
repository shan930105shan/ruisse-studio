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

// --- 拖拉相關狀態 ---
const isDragging = ref(false);
const startX = ref(0);
const scrollLeftStart = ref(0);

// 計算最大位移限制
const getMaxMove = () => {
  if (!horizontalRef.value) return 0;
  const windowWidth = window.innerWidth;
  const contentWidth = horizontalRef.value.scrollWidth;
  return Math.max(0, contentWidth - windowWidth + (windowWidth * 0.1));
};

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

// 2. 拖拉邏輯
const startDragging = (e: MouseEvent) => {
  isDragging.value = true;
  startX.value = e.pageX;
  scrollLeftStart.value = translateX.value;
  // 增加抓取視覺感
  if (horizontalRef.value) horizontalRef.value.style.cursor = 'grabbing';
};

const stopDragging = () => {
  isDragging.value = false;
  if (horizontalRef.value) horizontalRef.value.style.cursor = 'grab';
};

const onDragging = (e: MouseEvent) => {
  if (!isDragging.value) return;
  e.preventDefault();
  
  const x = e.pageX;
  const walk = (startX.value - x) * 1.5; // 1.5 是靈敏度
  let newTranslate = scrollLeftStart.value + walk;
  
  // 邊界限制
  const max = getMaxMove();
  translateX.value = Math.max(0, Math.min(max, newTranslate));
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('mouseup', stopDragging); // 全域放開，防止卡死
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('mouseup', stopDragging);
});
</script>

<template>
  <section ref="containerRef" class="relative h-[300vh] bg-[#f2eedc]">
    
    <div class="sticky top-0 min-h-screen w-full flex flex-col overflow-hidden">

  <div 
    ref="horizontalRef"
    class="flex space-x-12 px-12 mt-12 transition-transform duration-75 ease-out"
    @mousedown="startDragging" 
    @mousemove="onDragging"
    @mouseleave="stopDragging"
    :style="{ transform: `translateX(-${translateX}px)` }" 
  >
    <div v-for="(plan, i) in plans" :key="i" class="flex-shrink-0 w-[280px] md:w-[350px]">

      <div class="h-[450px] w-auto overflow-hidden border border-gray-300 shadow-lg mb-8 bg-white group">
        <img 
          :src="plan.img" 
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>

      <div class="text-black px-2">
        <div class="flex items-baseline justify-between space-y-2 mb-4">
          <h3 class="text-2xl md:text-3xl font-black tracking-wider">
            {{ plan.title }}
          </h3>
          
          <span class="text-gray-500 text-lg md:text-xl text-right font-medium font-mono">
            {{ plan.price }}
          </span>
        </div>

        <ul class="text-base md:text-lg space-y-3 text-gray-700 border-t border-gray-300 pt-6">
          <li v-for="f in plan.features" :key="f" class="flex items-start">
            <span class="mr-3 text-gray-400">•</span> {{ f }}
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