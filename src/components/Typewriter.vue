<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  words: string[];      // 要輪播的文字陣列
  typeSpeed?: number;   // 打字速度
  deleteSpeed?: number; // 刪除速度
  delay?: number;       // 打完後的停頓時間
}>();

const displayText = ref('');
const wordIndex = ref(0);
const isDeleting = ref(false);
let timeoutId: number | null = null;

const type = () => {
  // 1. 明確取得目前的字串
  const currentFullText = props.words[wordIndex.value] || ""; 
  
  if (isDeleting.value) {
    // 2. 刪除邏輯
    displayText.value = currentFullText.substring(0, displayText.value.length - 1);
  } else {
    // 3. 打字邏輯
    displayText.value = currentFullText.substring(0, displayText.value.length + 1);
  }

  // 下方逻辑保持不变...
  let delta = isDeleting.value ? (props.deleteSpeed || 50) : (props.typeSpeed || 150);

  if (!isDeleting.value && displayText.value === currentFullText) {
    delta = props.delay || 2000;
    isDeleting.value = true;
  } else if (isDeleting.value && displayText.value === '') {
    isDeleting.value = false;
    wordIndex.value = (wordIndex.value + 1) % props.words.length;
    delta = 500;
  }

  timeoutId = window.setTimeout(type, delta);
};

onMounted(() => {
  type();
});

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId);
});
</script>

<template>
  <span>
    {{ displayText }}
    <span class="cursor">|</span>
  </span>
</template>

<style scoped>
.cursor {
  animation: blink 0.7s infinite;
  margin-left: 2px;
  font-weight: 200;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>