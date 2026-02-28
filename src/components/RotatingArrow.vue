<template>
  <div class="flex justify-center items-center">
    <img 
      ref="arrowRef"
      :src="src" 
      :class="className"
      :style="computedStyle"
      alt="Rotating Arrow"
      class="transition-transform duration-75 ease-out"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  src: { type: String, required: true },
  className: { type: String, default: 'w-full max-w-[500px] h-auto' }
});

const arrowRef = ref(null);
const rotation = ref(0);
const isFlipped = ref(false); // 控制是否水平翻轉

const handleMouseMove = (e) => {
  if (!arrowRef.value) return;

  const rect = arrowRef.value.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const deltaX = e.clientX - centerX;
  const deltaY = e.clientY - centerY;

  // 計算角度並修正 180 度偏移
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  rotation.value = angle + 180;

  // **新增邏輯：判斷滑鼠在圖片左側還是右側**
  // 當 deltaX > 0，滑鼠在圖片右側 -> 水平翻轉
  // 當 deltaX < 0，滑鼠在圖片左側 -> 恢復原狀
  if (deltaX > 0) {
    isFlipped.value = true;
  } else {
    isFlipped.value = false;
  }
};

// **使用 computed 來組合 CSS 樣式**
const computedStyle = computed(() => {
  // flip: 鏡像翻轉 (scaleX)
  // rotate: 旋轉角度 (rotate)
  const flip = isFlipped.value ? 'scaleX(-1)' : 'scaleX(1)';
  
  // 建議順序：先鏡像，再旋轉
  return {
    transform: `${flip} rotate(${rotation.value}deg)`,
    // 也可以加上 transform-origin 確保繞著中心轉，雖然預設就是 center
    transformOrigin: 'center'
  };
});

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>