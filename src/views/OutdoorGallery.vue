<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import ContactUs from '@/components/ContactUs.vue'

// 1. 定義分類
const categories = [
  { id: 'all', name: '全部' },
  { id: 'japanese', name: '日系風格', keyword: 'jp' },
  { id: 'nature', name: '森林 / 海洋系', keyword: 'nature' },
  { id: 'retro', name: '復古風格', keyword: 'retro' },
  { id: 'couple', name: '雙人寫真', keyword: 'couple' }
]

const photoGallery = ref([])

// 2. 自動掃描資料夾下的圖片
// 這會抓取 assets/images/gallery/outdoor/ 下所有的 jpg, png, webp
const loadPhotos = () => {
  const images = import.meta.glob('@/assets/images/gallery/outdoor/*.{png,jpg,jpeg,webp}', { eager: true })
  
  const allPhotos = Object.keys(images).map((path, index) => {
    // 1. 先取得完整檔名 (例如: nature-01.jpg)
    const fullFileName = path.split('/').pop().toLowerCase()
    
    // 2. 去掉副檔名，只留下純檔名 (例如: nature-01)
    // 這行會把最後一個點之後的字都刪掉
    const fileName = fullFileName.substring(0, fullFileName.lastIndexOf('.'))
    
    let category = 'other'
    
    // 3. 判斷邏輯（建議把較長的單字放在前面，或確保關鍵字不會重疊）
    if (fileName.includes('nature')) {
      category = 'nature'
    } else if (fileName.includes('retro')) {
      category = 'retro'
    } else if (fileName.includes('couple')) {
      category = 'couple'
    } else if (fileName.includes('jp')) {
      // 現在這裡只會檢查檔名有沒有 jp，不會被 .jpg 影響了
      category = 'japanese'
    }

    return {
      id: index,
      category: category,
      src: images[path].default || images[path]
    }
  })
  
  photoGallery.value = allPhotos
}

onMounted(() => {
  loadPhotos()
})

// 捲動邏輯
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
      <h1 class="text-3xl tracking-[0.6em] text-[#002B40] mb-2 font-medium">外景寫真</h1>
      <p class="text-xs uppercase tracking-[0.3em] text-[#002B40] opacity-60">Outdoor Portfolio</p>
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
          尚無 {{ cat.name }} 作品
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