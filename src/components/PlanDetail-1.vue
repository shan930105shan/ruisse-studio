<script setup>
// 使用 import 方式引入圖片，Vite 會自動處理路徑解析與打包
import plan1_1 from '@/assets/images/outdoor-photography/plan1_1.png'
import plan1_2 from '@/assets/images/outdoor-photography/plan1_2.png'
import plan1_3 from '@/assets/images/outdoor-photography/plan1_3.png'
import plan1_4 from '@/assets/images/outdoor-photography/plan1_4.png'
import plan1_5 from '@/assets/images/outdoor-photography/plan1_5.png'
import plan1_6 from '@/assets/images/outdoor-photography/plan1_6.png'
</script>

<template>
  <section class="w-full min-h-screen bg-[#f2eedc] flex items-center justify-center py-20 px-4 md:px-20 font-serif">
    <div class="max-w-7xl w-full grid grid-cols-12 grid-rows-7 gap-4 h-[85vh]">
      
      <div class="col-span-4 row-span-8 overflow-hidden group relative">
        <img 
          :src="plan1_1" 
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          alt="主視覺"
        />
        
        <div class="absolute inset-0 bg-[#002B40]/70 flex flex-col items-center justify-center text-white p-6 opacity-100 transition-opacity">
          <h2 class="text-2xl md:text-3xl tracking-[0.4em] font-light border-b border-white/30 pb-4 mb-4">
            外景寫真
          </h2>
          <p class="text-xs tracking-widest opacity-80 uppercase">Outdoor Photography</p>
        </div>
      </div>

      <div class="col-span-4 row-span-4 overflow-hidden">
        <img :src="plan1_2" class="w-full h-full object-cover" alt="花絮1" />
      </div>
      <div class="col-span-4 row-span-6 overflow-hidden">
        <img :src="plan1_3" class="w-full h-full object-cover" alt="花絮2" />
      </div>

      <div class="col-span-4 row-span-4 overflow-hidden group">
        <img :src="plan1_4" class="w-full h-full object-cover" alt="細節" />
      </div>

      <div class="col-span-2 row-span-2 overflow-hidden">
        <img :src="plan1_5" class="w-full h-full object-cover" alt="小圖1" />
      </div>
      <div class="col-span-2 row-span-2 overflow-hidden">
        <img :src="plan1_6" class="w-full h-full object-cover" alt="小圖2" />
      </div>

    </div>
  </section>
</template>

<style scoped>
img {
  display: block;
  filter: saturate(0.9);
}
</style>