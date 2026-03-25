<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import ContactUs from '@/components/ContactUs.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

// 1. 引入 Contentful client
import { contentfulClient } from '@/contentful'

// 2. 定義響應式變數
const rawTestimonials = ref<any[]>([])

// 3. 抓取雲端回饋資料
const fetchTestimonials = async () => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'testimonial',
      order: 'fields.order' as any // 依序號排序
    })

    rawTestimonials.value = response.items.map((item: any) => {
      const asset = item.fields.avatar;
      const avatarUrl = asset?.fields?.file?.url;

      return {
        id: item.sys.id,
        name: item.fields.name,
        feedback: item.fields.feedback,
        // 處理雲端圖片路徑
        avatar: avatarUrl 
          ? (avatarUrl.startsWith('//') ? `https:${avatarUrl}` : avatarUrl)
          : 'https://images.ctfassets.net/placeholder-user.png' // 預設頭貼
      }
    })
  } catch (error) {
    console.error('抓取客戶回饋失敗:', error)
  }
}

// 4. 自動複製資料邏輯：確保 Swiper Loop 順暢
const displayData = computed(() => {
  if (rawTestimonials.value.length === 0) return [];
  // 複製三份以確保在大螢幕（slidesPerView: 5）下 loop 不會卡住
  return [...rawTestimonials.value, ...rawTestimonials.value, ...rawTestimonials.value];
});

onMounted(() => {
  fetchTestimonials()
})
</script>

<template>
  <Navbar />
  
  <section class="relative bg-[#f2eedc] pt-24 pb-40 overflow-hidden font-serif z-10">
    <div class="max-w-7xl mx-auto px-4">
      
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-black tracking-[0.5em] text-[#002B40] ml-[0.5em]">
          客戶回饋
        </h2>
        <div class="h-[1px] w-20 bg-[#002B40]/20 mx-auto mt-6"></div>
      </div>

      <swiper
        v-if="displayData.length > 0"
        :key="displayData.length"
        :modules="[Autoplay]"
        :slides-per-view="1"
        :space-between="40"
        :loop="true"
        :centered-slides="true"
        :autoplay="{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }"
        :speed="1000"
        :breakpoints="{
          '768': { slidesPerView: 3 },
          '1024': { slidesPerView: 5 } 
        }"
        class="testimonial-swiper"
      >
        <swiper-slide 
          v-for="(item, index) in displayData" 
          :key="`${item.id}-${index}`" 
          class="testimonial-slide group" 
        >
          <div class="flex flex-col items-center text-center px-4">
            <div class="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 border-4 border-[#002B40] shadow-sm relative">
              <img :src="item.avatar" :alt="item.name" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-[#002B40]/60 transition-opacity duration-500 group-hover:opacity-0"></div>
            </div>

            <h3 class="text-lg md:text-xl font-bold text-[#002B40] tracking-widest mb-3">
              {{ item.name }}
            </h3>
            <p class="text-gray-600 text-sm md:text-base leading-relaxed tracking-wider max-w-[280px]">
              {{ item.feedback }}
            </p>
          </div>
        </swiper-slide>
      </swiper>

      <div v-else class="text-center py-20 opacity-30 tracking-[0.2em]">
        LOADING FEEDBACK...
      </div>

    </div>
  </section>

  <div class="relative w-full bg-[#f2eedc] pt-20 overflow-x-hidden"> 
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[400px] bg-[#002B40] rounded-[50%] -translate-y-1/2 z-0"></div>
    <div class="relative z-10">
      <ContactUs />
    </div>
  </div>
</template>

<style scoped>
.testimonial-slide {
  height: auto;
  display: flex;
  justify-content: center;
}

.testimonial-swiper {
  padding: 40px 0;
}

.font-serif {
  font-family: "Noto Serif TC", serif;
}
</style>