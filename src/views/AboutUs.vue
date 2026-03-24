<script setup lang="ts">
import { ref, onMounted } from 'vue' // 引入 ref 和生命週期
import Navbar from '@/components/Navbar.vue'
import ContactUs from '@/components/ContactUs.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

// 1. 引入剛剛建立的 client
import { contentfulClient } from '@/contentful'

// 2. 定義響應式變數來存放 Reels 資料
const reelsData = ref<any[]>([])

// 3. 抓取資料的函式
const fetchReels = async () => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'reelsItem', // 這是你在 Contentful 設定的 API ID
      order: ['fields.ID']       // 依照你設定的 ID 排序
    })
    
    // 將抓回來的資料格式化成你原本 JSON 的樣子
      reelsData.value = response.items.map((item: any) => ({
      id: item.fields.ID,   // 改為大寫 ID
      url: item.fields.URL, // 改為大寫 URL
      image: `reels-${String(item.fields.ID).padStart(2, '0')}.jpg`,
      alt: `Reels${item.fields.ID}`
    }))
  } catch (error) {
    console.error('抓取 Reels 資料失敗:', error)
  }
}

// 4. 在組件掛載時執行抓取
onMounted(() => {
  fetchReels()
})

// 原有的圖片路徑邏輯維持不變
const getImageUrl = (name: string) => {
  return new URL(`../assets/images/about/${name}`, import.meta.url).href
}
</script>

<template>
  <Navbar />
  <main class="relative w-full min-h-screen bg-[#f2eedc] pt-32 overflow-x-hidden font-serif">
    
    <div class="w-full bg-[#002B40] py-24 mb-16">
      <div class="text-center mb-16">
        <h1 class="text-2xl md:text-3xl tracking-[0.5em] text-white font-medium inline-block md:mr-8">
          瑞思影像工作室
        </h1>
        <span class="block md:inline text-2xl md:text-3xl tracking-[0.3em] text-white/80 font-light">
          RUISSE STUDIO
        </span>
      </div>

      <div class="max-w-7xl mx-auto px-6 md:px-20 flex flex-col items-center relative z-10">
        <div class="w-full max-w-3xl text-white tracking-[0.2em] leading-loose text-center">
          <div class="space-y-6 opacity-90">
            <p class="text-center">
              瑞思攝影是專注人物攝影和影像創作的工作室<br>
              <span class="opacity-70 text-sm md:text-base">希望透過鏡頭為每一位來到這裡的人留下值得紀念的畫面。</span>
            </p>
            <p class="text-center font-light">
              我們是由一群22歲創作者組成的團隊，拍攝過程輕鬆、親切，偶爾還會有一點搞笑與玩鬧的時刻，因為在最自然的狀態下，往往才能拍出最自然、最有溫度的內容。
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center mb-10">
      <h1 class="text-xl md:text-2xl tracking-[0.5em] text-[#002B40] font-medium inline-block md:mr-8">
        — 瑞思攝影工作室提供多樣化的人像與影像創作服務 —
      </h1>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-24 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
        <div v-for="(service, index) in services" :key="index" class="group border-b border-black/10 pb-8 hover:border-[#002B40] transition-all duration-500">
          <span class="text-xs font-mono opacity-40 block mb-3 group-hover:text-[#002B40] group-hover:opacity-100">0{{ index + 1 }}</span>
          <h4 class="text-xl md:text-2xl font-bold tracking-widest mb-3 text-[#002B40]">{{ service.title }}</h4>
          <p class="text-sm opacity-60 leading-relaxed text-[#002B40]">{{ service.desc }}</p>
        </div>
      </div>
    </div>

    <div class="text-center mt-20 mb-16 relative z-10">
      <h1 class="text-xl md:text-2xl tracking-[0.5em] text-[#002B40] font-medium inline-block">
        — 一些真實的我們 —
      </h1>
    </div>

    <div class="max-w-7xl mx-auto px-6 mb-32 relative z-10 pb-20">
      <swiper
        v-if="reelsData.length > 0"
        :modules="[Autoplay, Pagination]"
        :slides-per-view="1"
        :space-between="20"
        :loop="true"
        :autoplay="{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }"
        :pagination="{ clickable: true }"
        :breakpoints="{
          '768': { slidesPerView: 2, spaceBetween: 30 },
          '1024': { slidesPerView: 3, spaceBetween: 40 }
        }"
        class="reels-swiper"
      >
        <swiper-slide v-for="reel in reelsData" :key="reel.id">
          <a 
            :href="reel.url" 
            target="_blank" 
            rel="noopener noreferrer"
            class="aspect-[9/16] block overflow-hidden border border-gray-200 shadow-sm bg-white group cursor-pointer relative"
          >
            <img 
              :src="getImageUrl(reel.image)" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              :alt="reel.alt"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-[#002B40]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div class="px-4 py-2 border border-white text-white text-xs tracking-widest uppercase">Watch on Instagram</div>
            </div>
          </a>
        </swiper-slide>
      </swiper>
    </div>

  </main>
  
  <ContactUs />
</template>

<script lang="ts">
// 為了簡潔，將服務項目提取成數據
const services = [
  { title: '個人寫真拍攝', desc: '定義屬於你的美感，透過細膩的光影紀錄最真實的自我。' },
  { title: '外景拍攝', desc: '走出棚內，在城市街頭或自然山海中，捕捉瞬息萬變的氛圍。' },
  { title: '商業形象照', desc: '打造專業職人氣場，為你的品牌與專業形象注入視覺影響力。' },
  { title: '活動紀錄', desc: '捕捉現場的溫度與張力，將每個不可替代的瞬間轉化為永恆。' },
  { title: '品牌形象影片', desc: '運用運鏡與剪輯敘事，為品牌量身打造具備深度的影像名片。' },
  { title: '商業/個人IP短影音', desc: '緊扣社群流量趨勢，打造節奏流暢且具高轉換率的影音內容。' }
]
</script>

<style scoped>
/* 訂製 Swiper 分頁點顏色 */
:deep(.swiper-pagination-bullet-active) {
  background: #002B40;
}

.reels-swiper {
  padding-bottom: 50px; /* 為分頁點留出空間 */
}

.font-serif {
  font-family: "Noto Serif TC", serif;
}
</style>