<template>
  <nav class="navbar">
    <div class="logo" @click="scrollToSection('hero')" style="cursor: pointer;">
      <img src="@/assets/images/logo-dark.png" alt="Logo" />
    </div>
    <ul class="nav-links">
      <li @click="goToHome" class="cursor-pointer hover:opacity-50 transition-opacity">
    首頁
  </li>
      <li @click="goToAbout" class="cursor-pointer hover:opacity-50 transition-opacity">
    關於我們
  </li>
      <li @click="scrollToSection('pricing')" class="nav-item">方案內容</li>
      <li @click="scrollToSection('work')" class="nav-item">作品參考</li>
      <li class="nav-item">客戶回饋</li>
      <li @click="scrollToSection('contact')" class="nav-item">拍攝預約點我</li>
    </ul>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goToHome = () => {
  router.push('/') // 跳轉到關於我們頁面
}

const goToAbout = () => {
  router.push('/about') // 跳轉到關於我們頁面
}
const scrollToSection = (id) => {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const element = document.getElementById(id);
  if (element) {
    // 取得目標元素位置
    const offset = 80; // 這裡是你的 Navbar 高度
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    // 平滑捲動
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};
</script>

<style scoped>
.navbar {
  position: fixed; /* 固定在最上方 */
  top: 0;
  left: 0;
  width: 100%;
  height: 80px; /* 根據設計稿高度調整 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  background-color: #f2eedc; /* 確保背景是不透明的白色 */
  z-index: 1000; /* 確保它在影片之上 */
}

.nav-item {
  cursor: pointer; /* 讓滑鼠移上去變成手指圖示 */
  transition: opacity 0.3s;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 30px; /* 選單之間的距離 */
}

.logo img {
  height: 45px;    /* 調整高度，寬度會自動等比例縮放 */
  width: auto;     /* 確保比例不變形 */
  display: block;  /* 移除圖片下方微小的間隙 */
  object-fit: contain; /* 確保圖片在容器內完整顯示 */
}
</style>