<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import ContactUs from '@/components/ContactUs.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

// 引入資料
import testimonialData from '@/data/testimonials.json';
const getImageUrl = (path: string) => {
  // 如果妳 JSON 裡寫的是 "client1.png"
  // 且圖片放在 src/assets/images/avatars/
  return new URL(`../assets/images/avatars/${path}`, import.meta.url).href;
};
</script>

<template>
  <Navbar />
  
  <section class="relative bg-[#f2eedc] pt-24 pb-40 overflow-hidden font-serif z-10">
    <div class="max-w-7xl mx-auto px-4">
      
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-black tracking-[0.5em] text-[#002B40] ml-[0.5em]">
          客戶回饋
        </h2>
        
        <p class="text-[#002B40]/50 text-xs md:text-sm tracking-[0.3em] uppercase mt-4 font-light">
          Customer Feedback
        </p>

        <div class="h-[1px] w-20 bg-[#002B40]/20 mx-auto mt-6"></div>
      </div>

      <swiper
        :modules="[FreeMode, Autoplay]"
        :slides-per-view="'auto'"
        :space-between="40"
        :loop="true"
        :grab-cursor="true"
        :free-mode="true"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
        }"
        class="testimonial-swiper"
      >
        <swiper-slide 
          v-for="item in testimonialData" 
          :key="item.id" 
          class="testimonial-slide"
        >
          <div class="flex flex-col items-center text-center px-4">
            <div class="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 border-4 border-white shadow-sm transition-transform duration-500 hover:scale-105">
              <img 
                :src="getImageUrl(item.avatar)" 
                :alt="item.name"
                class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            <h3 class="text-lg md:text-xl font-bold text-[#002B40] tracking-widest mb-3">
              {{ item.name }}
            </h3>

            <p class="text-gray-600 text-sm md:text-base leading-relaxed tracking-wider max-w-[240px]">
              {{ item.feedback }}
            </p>
          </div>
        </swiper-slide>
      </swiper>

    </div>
  </section>

  <div class="relative w-full bg-[#f2eedc] pt-20"> 
    
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[400px] bg-[#002B40] rounded-[50%] -translate-y-1/2 z-0"></div>
    
    <div class="relative z-10">
      <ContactUs />
    </div>
  </div>
</template>
<style scoped>
/* 設定每一張卡片的寬度 */
.testimonial-slide {
  width: 280px; /* 手機版寬度 */
}

@media (min-width: 768px) {
  .testimonial-slide {
    width: 320px; /* 桌機版寬度 */
  }
}

.testimonial-swiper {
  padding: 20px 0;
}

/* 確保字體 TC */
.font-serif {
  font-family: "Noto Serif TC", serif;
}
</style>