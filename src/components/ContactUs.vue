<template>
  <section id="contact" class="w-full bg-[#002B40] text-white py-20 px-6 md:px-20 font-serif">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-light tracking-[0.6em] text-left mb-16">
        聯絡我們
      </h2>

      <div class="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
        <div class="space-y-6 max-w-xl">
          <p class="text-lg tracking-widest opacity-90">
            若對拍攝方案有任何問題請聯絡我們
          </p>
          <div class="space-y-2">
            <p class="text-lg tracking-widest opacity-90">拍攝採預約制</p>
            <p class="text-base tracking-widest opacity-70 leading-relaxed">
              歡迎填寫表單預約，收到表單資料後我們將主動與您聯繫討論拍攝內容
            </p>
          </div>
        </div>

        <a 
          href="#" 
          class="inline-block bg-[#D9D9D9] text-[#002B40] px-10 py-4 rounded-full text-lg tracking-[0.2em] hover:bg-white transition-colors duration-300 shadow-lg"
        >
          填寫預約表單
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-white/20">
        <a href="https://www.instagram.com/alittlefree.studio" target="_blank" class="flex items-center gap-4 group">
          <div class="w-15 h-15 flex items-center justify-center group-hover:bg-white/10 transition-all">
            <i class="fa-brands fa-instagram text-xl"></i>
          </div>
          <span class="text-sm tracking-[0.2em] opacity-80 uppercase">@alittlefree.studio</span>
        </a>

        <div class="flex items-center gap-4">
          <div class="w-15 h-15 flex items-center justify-center">
            <i class="fa-solid fa-phone text-lg"></i>
          </div>
          <span class="text-sm tracking-[0.2em] opacity-80 uppercase">0977-119-334</span>
        </div>

        <a href="mailto:alittlefree@gmail.com" class="flex items-center gap-4 group">
          <div class="w-15 h-15 flex items-center justify-center group-hover:bg-white/10 transition-all">
            <i class="fa-regular fa-envelope text-lg"></i>
          </div>
          <span class="text-sm tracking-[0.2em] opacity-80 uppercase">sunyeeray@gmail.com</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
// 如果妳沒安裝 FontAwesome，可以在 index.html 引入 CDN，或直接改用 SVG 圖示
</script>

<style scoped>
/* 微調字體間距與質感 */
section {
  letter-spacing: 0.1em;
}
</style>