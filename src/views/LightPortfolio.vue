<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import ContactUs from '@/components/ContactUs.vue'
// 1. 引入新 API 函數
import { fetchLightWeightPortfolio } from '@/contentful'

const categories = [
  { id: 'all', name: '全部' },
  { id: 'light', name: '輕盈寫真' }
]

const photoGallery = ref([])

// 2. 透過 API 載入資料
const loadPhotos = async () => {
  try {
    const data = await fetchLightWeightPortfolio();
    photoGallery.value = data;
  } catch (error) {
    console.error("載入作品失敗:", error);
  }
}

onMounted(() => {
  loadPhotos()
})

const scrollToCategory = (id) => {
  if (id === 'all') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = document.getElementById(id)
  if (el) {
    const offset = 140
    window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' })
  }
}
</script>

<template>
  <Navbar />
  
  <main class="min-h-screen bg-[#f2eedc] pt-28 pb-20 font-serif">
    <header class="text-center mb-12">
      <h1 class="text-3xl tracking-[0.6em] text-[#002B40] mb-2 font-medium">輕盈寫真</h1>
      <p class="text-xs uppercase tracking-[0.3em] text-[#002B40] opacity-60">Light-weight Portfolio</p>
    </header>

    <nav class="sticky top-20 z-40 bg-[#f2eedc]/90 backdrop-blur-md py-6 mb-10 border-b border-[#002B40]/10">
      <ul class="flex justify-center gap-6 md:gap-12 text-sm tracking-widest text-[#002B40]">
        <li 
          v-for="cat in categories" 
          :key="cat.id"
          @click="scrollToCategory(cat.id)"
          class="cursor-pointer hover:opacity-50 transition-all border-b border-transparent hover:border-[#002B40] pb-1"
        >
          {{ cat.name }}
        </li>
      </ul>
    </nav>

    <div class="max-w-[1400px] mx-auto px-4 md:px-10">
      <section v-for="cat in categories.slice(1)" :key="cat.id" :id="cat.id" class="mb-24">
        <div class="flex items-center gap-4 mb-10">
          <h2 class="text-xl tracking-[0.4em] text-[#002B40] font-medium">{{ cat.name }}</h2>
          <div class="flex-1 h-[1px] bg-[#002B40]/10"></div>
        </div>

        <div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <div 
            v-for="photo in photoGallery.filter(p => p.category === cat.id)" 
            :key="photo.id"
            class="break-inside-avoid group overflow-hidden rounded-sm"
          >
            <img 
              :src="photo.src" 
              class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 shadow-sm hover:shadow-xl"
              loading="lazy"
            />
          </div>
        </div>
        
        <p v-if="photoGallery.filter(p => p.category === cat.id).length === 0" class="text-center py-10 opacity-30 tracking-widest text-sm">
          尚無作品載入
        </p>
      </section>
    </div>
  </main>

  <ContactUs />
</template>

<style scoped>
.break-inside-avoid {
  break-inside: avoid;
}
</style>