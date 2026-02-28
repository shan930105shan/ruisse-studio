<template>
  <section class="h-[400vh] bg-white relative" ref="scrollSection">
    <div class="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-[10%]">
      
      <div class="flex items-center gap-5 mb-12">
        <span class="text-[2.5rem] ">→</span>
        <h2 class="text-[2rem] font-extrabold tracking-tight">作品介紹</h2>
      </div>
      
      <div 
        class="flex gap-12 transition-transform duration-200 ease-out will-change-transform" 
        :style="{ transform: `translateX(-${scrollOffset}px)` }"
      >
        <div 
          v-for="(item, index) in works" 
          :key="index"
          class="w-[400px] flex-shrink-0 cursor-none"
          @mouseenter="showPreview(item, $event)"
          @mouseleave="hidePreview"
          @mousemove="updatePreviewPos($event)"
        >
          <div class="w-full aspect-square bg-gray-100 overflow-hidden mb-5 border border-transparent hover:border-black transition-colors">
            <img :src="item.img" class="w-full h-full object-cover" />
          </div>
          <div>
            <h3 class="text-2xl font-bold mb-2">{{ item.title }}</h3>
            <p class="text-gray-500 uppercase tracking-widest text-sm">Explore more</p>
          </div>
        </div>
      </div>

      <div 
        v-if="hoveredWork" 
        class="fixed w-[300px] bg-white border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] z-[9999] p-4 pointer-events-none animate-in fade-in zoom-in duration-200"
        :style="{ left: mouseX + 20 + 'px', top: mouseY + 20 + 'px' }"
      >
        <img :src="hoveredWork.img" class="w-full h-[180px] object-cover mb-4" />
        <h4 class="text-xl font-black mb-2">{{ hoveredWork.title }}</h4>
        <p class="text-sm leading-relaxed text-gray-700">{{ hoveredWork.fullDesc }}</p>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps(['works']);

const scrollSection = ref(null);
const scrollOffset = ref(0);
const hoveredWork = ref(null);
const mouseX = ref(0);
const mouseY = ref(0);

const handleScroll = () => {
  if (!scrollSection.value) return;
  const rect = scrollSection.value.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // 當此區塊在視窗內時，計算捲動比例
  if (rect.top <= 0 && rect.bottom >= windowHeight) {
    const totalScroll = rect.height - windowHeight;
    const progress = Math.abs(rect.top) / totalScroll;
    // 1600 為軌道移動總距離，可依作品數量微調
    scrollOffset.value = progress * 1600;
  }
};

const showPreview = (work, event) => {
  hoveredWork.value = work;
  updatePreviewPos(event);
};
const hidePreview = () => { hoveredWork.value = null; };
const updatePreviewPos = (event) => {
  mouseX.value = event.clientX;
  mouseY.value = event.clientY;
};

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>