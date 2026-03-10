<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import ContactUs from '@/components/ContactUs.vue'

// 1. 定義精緻寫真的四個分類
const categories = [
  { id: 'all', name: '全部' },
  { id: 'home', name: '日系居家', keyword: 'home' },
  { id: 'french', name: '法式光影', keyword: 'french' },
  { id: 'k-style', name: '韓系風格', keyword: 'kstyle' },
  { id: 'other', name: '其他風格', keyword: 'other' }
]

const photoGallery = ref([])

// 2. 自動掃描資料夾（路徑：gallery/exquisite/）
const loadPhotos = () => {
  // 記得建立資料夾：assets/images/gallery/exquisite/
  const images = import.meta.glob('@/assets/images/gallery/exquisite/*.{png,jpg,jpeg,webp}', { eager: true })
  
  const allPhotos = Object.keys(images).map((path, index) => {
    const fullFileName = path.split('/').pop().toLowerCase()
    const fileName = fullFileName.substring(0, fullFileName.lastIndexOf('.'))
    
    let category = 'other' // 預設歸類為其他風格
    
    // 3. 判斷邏輯（建議檔名包含以下關鍵字）
    if (fileName.includes('home')) {
      category = 'home'
    } else if (fileName.includes('french')) {
      category = 'french'
    } else if (fileName.includes('kstyle')) {
      category = 'k-style'
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
      <h1 class="text-3xl tracking-[0.6em] text-[#002B40] mb-2 font-medium">精緻寫真</h1>
      <p class="text-xs uppercase tracking-[0.3em] text-[#002B40] opacity-60">Exquisite Portfolio</p>
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