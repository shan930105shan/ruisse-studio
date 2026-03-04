<template>
  <a 
    href="https://lin.ee/miyCTjD" 
    target="_blank" 
    class="fixed bottom-8 right-8 z-50 flex flex-col items-center group"
  >
    <div class="mb-2 bg-white text-[#002B40] px-4 py-2 rounded-full shadow-lg text-sm font-medium tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      點我預約
    </div>
    
    <div class="w-16 h-16 bg-[#002B40] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 border border-white/20">
      <i class="fa-regular fa-comment-dots text-white text-2xl"></i>
    </div>
    
    <span class="mt-2 text-[#002B40] text-xs font-bold bg-white/80 px-2 py-1 rounded shadow-sm md:hidden">
      點我預約
    </span>
  </a>
</template>

<style scoped>
/* 讓按鈕有一點輕微的上下漂浮感 */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.group {
  animation: float 3s ease-in-out infinite;
}
</style>