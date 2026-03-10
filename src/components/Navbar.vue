<template>
  <nav class="navbar">
    <div class="logo" @click="goToHome" style="cursor: pointer;">
      <img src="@/assets/images/logo-dark.png" alt="Logo" />
    </div>

    <ul class="nav-links hidden md:flex">
      <li @click="goToHome" class="nav-item">首頁</li>
      <li @click="goToAbout" class="nav-item">關於我們</li>
      
      <li class="relative group nav-item">
        <span class="flex items-center gap-1">作品參考 <i class="fa-solid fa-chevron-down text-xs"></i></span>
        <ul class="absolute top-full left-0 bg-[#f2eedc] shadow-xl py-4 w-48 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 border-t-2 border-[#002B40]">
          <li v-for="work in workTypes" :key="work" @click="handleWorkClick(work)" class="px-6 py-2 hover:bg-[#002B40] hover:text-white transition-colors text-sm">
            {{ work }}
          </li>
        </ul>
      </li>

      <li @click="scrollToSection('pricing')" class="nav-item">方案內容</li>
      <li @click="goToTestimonials" class="nav-item">客戶回饋</li>
      <a 
        href="https://lin.ee/miyCTjD" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="cursor-pointer hover:opacity-70 transition-opacity"
        @click="isMenuOpen = false"
      >
        拍攝預約點我
      </a>
    </ul>

    <div class="md:hidden flex items-center cursor-pointer z-[1001]" @click="isMobileMenuOpen = !isMobileMenuOpen">
      <i :class="[
        'fa-solid', 
        isMobileMenuOpen ? 'fa-xmark' : 'fa-bars', 
        'text-2xl text-[#002B40]'
      ]"></i>
    </div>

    <transition name="fade">
      <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-[#f2eedc] z-[999] flex flex-col items-center justify-center space-y-8 text-xl font-serif">
        <div @click="closeAndNavigate(goToHome)" class="cursor-pointer">首頁</div>
        <div @click="closeAndNavigate(goToAbout)" class="cursor-pointer">關於我們</div>
        
        <div class="text-center">
          <div @click="isWorkSubMenuOpen = !isWorkSubMenuOpen" class="flex items-center justify-center gap-2 cursor-pointer">
            作品參考 
            <i :class="['fa-solid', isWorkSubMenuOpen ? 'fa-chevron-up' : 'fa-chevron-down', 'text-sm']"></i>
          </div>
          <transition name="fade">
            <div v-if="isWorkSubMenuOpen" class="mt-4 space-y-4 bg-[#002B40]/5 py-4 px-12 rounded-lg">
              <div v-for="work in workTypes" :key="work" @click="handleWorkClick(work)" class="text-base opacity-70 cursor-pointer">
                {{ work }}
              </div>
            </div>
          </transition>
        </div>

        <div @click="closeAndNavigate(() => scrollToSection('pricing'))" class="cursor-pointer">方案內容</div>
        <div @click="closeAndNavigate(goToTestimonials)" class="cursor-pointer">客戶回饋</div>
        <a 
          href="https://lin.ee/miyCTjD" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="cursor-pointer hover:opacity-70 transition-opacity"
          @click="isMenuOpen = false"
        >
          拍攝預約點我
        </a>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMobileMenuOpen = ref(false)
const isWorkSubMenuOpen = ref(false)

const workTypes = [
  '外景寫真', '形象模卡', '輕盈寫真', 
  '精緻寫真', '生日寫真', '客製化寫真'
]

const goToHome = () => router.push('/')
const goToAbout = () => {
  router.push('/about')
  isMobileMenuOpen.value = false
}

const handleWorkClick = (type) => {
  console.log('跳轉至作品類別:', type)
  if (type === '外景寫真') {
    router.push('/work/outdoor') // 跳轉到剛才設定的門牌號碼
  } 
  else if (type === '形象模卡') {
    router.push('/work/modelcard') // 跳轉到剛才設定的門牌號碼
  }
  else if (type === '輕盈寫真') {
    router.push('/work/light') // 跳轉到新頁面
  }
  else if (type === '精緻寫真') {
    router.push('/work/exquisite')
  }
  else if (type === '生日寫真') {
    router.push('/work/birthday') // 確保與 router 設定的路徑一致
  }
  else if (type === '客製化寫真') {
    router.push('/work/customized')
  }
  else {
    // 其他類型可以先放著，或跳轉到通用作品頁
    console.log('準備開發中:', type)
  }
  isMobileMenuOpen.value = false
}

const goToTestimonials = () => {
  router.push('/testimonials');
};

const closeAndNavigate = (fn) => {
  fn()
  isMobileMenuOpen.value = false
}

const scrollToSection = (id) => {
  // 如果不在首頁，先跳回首頁再捲動
  if (router.currentRoute.value.path !== '/') {
    router.push('/').then(() => {
      setTimeout(() => performScroll(id), 300)
    })
  } else {
    performScroll(id)
  }
}

const performScroll = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    });
  }
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  background-color: #f2eedc;
  z-index: 1000;
}

@media (max-width: 768px) {
  .navbar {
    padding: 0 20px; /* 手機版縮減左右間距 */
  }
}

/* 桌機版列表樣式 */
.nav-links {
  list-style: none;
  gap: 30px;
}

.nav-item {
  @apply cursor-pointer hover:opacity-50 transition-opacity;
}

.logo img {
  height: 45px;
  width: auto;
  display: block;
  object-fit: contain;
}

/* 動畫設定 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* 確保下拉選單滑過時顯示 */
.group:hover ul {
  display: block;
}
</style>