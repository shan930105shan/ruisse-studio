<script setup>
import Navbar from '@/components/Navbar.vue'
import ContactUs from '@/components/ContactUs.vue'
import aboutImg from '@/assets/images/team.png'
</script>

<template>
  <Navbar />
  <main class="relative w-full min-h-screen bg-[#f2eedc] pt-32 overflow-hidden font-serif">
    
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
      
      <div class="group border-b border-black/10 pb-8 hover:border-[#002B40] transition-all duration-500">
        <span class="text-xs font-mono opacity-40 block mb-3 group-hover:text-[#002B40] group-hover:opacity-100">01</span>
        <h4 class="text-xl md:text-2xl font-bold tracking-widest mb-3 text-[#002B40]">個人寫真拍攝</h4>
        <p class="text-sm opacity-60 leading-relaxed text-[#002B40]">定義屬於你的美感，透過細膩的光影紀錄最真實的自我。</p>
      </div>

      <div class="group border-b border-black/10 pb-8 hover:border-[#002B40] transition-all duration-500">
        <span class="text-xs font-mono opacity-40 block mb-3 group-hover:text-[#002B40] group-hover:opacity-100">02</span>
        <h4 class="text-xl md:text-2xl font-bold tracking-widest mb-3 text-[#002B40]">外景拍攝</h4>
        <p class="text-sm opacity-60 leading-relaxed text-[#002B40]">走出棚內，在城市街頭或自然山海中，捕捉瞬息萬變的氛圍。</p>
      </div>

      <div class="group border-b border-black/10 pb-8 hover:border-[#002B40] transition-all duration-500">
        <span class="text-xs font-mono opacity-40 block mb-3 group-hover:text-[#002B40] group-hover:opacity-100">03</span>
        <h4 class="text-xl md:text-2xl font-bold tracking-widest mb-3 text-[#002B40]">商業形象照</h4>
        <p class="text-sm opacity-60 leading-relaxed text-[#002B40]">打造專業職人氣場，為你的品牌與專業形象注入視覺影響力。</p>
      </div>

      <div class="group border-b border-black/10 pb-8 hover:border-[#002B40] transition-all duration-500">
        <span class="text-xs font-mono opacity-40 block mb-3 group-hover:text-[#002B40] group-hover:opacity-100">04</span>
        <h4 class="text-xl md:text-2xl font-bold tracking-widest mb-3 text-[#002B40]">活動紀錄</h4>
        <p class="text-sm opacity-60 leading-relaxed text-[#002B40]">捕捉現場的溫度與張力，將每個不可替代的瞬間轉化為永恆。</p>
      </div>

      <div class="group border-b border-black/10 pb-8 hover:border-[#002B40] transition-all duration-500">
        <span class="text-xs font-mono opacity-40 block mb-3 group-hover:text-[#002B40] group-hover:opacity-100">05</span>
        <h4 class="text-xl md:text-2xl font-bold tracking-widest mb-3 text-[#002B40]">品牌形象影片</h4>
        <p class="text-sm opacity-60 leading-relaxed text-[#002B40]">運用運鏡與剪輯敘事，為品牌量身打造具備深度的影像名片。</p>
      </div>

      <div class="group border-b border-black/10 pb-8 hover:border-[#002B40] transition-all duration-500">
        <span class="text-xs font-mono opacity-40 block mb-3 group-hover:text-[#002B40] group-hover:opacity-100">06</span>
        <h4 class="text-xl md:text-2xl font-bold tracking-widest mb-3 text-[#002B40]">商業/個人IP短影音</h4>
        <p class="text-sm opacity-60 leading-relaxed text-[#002B40]">緊扣社群流量趨勢，打造節奏流暢且具高轉換率的影音內容。</p>
      </div>

    </div>
  </div>
  <div class="text-center mt-20 mb-16 relative z-10">
  <h1 class="text-xl md:text-2xl tracking-[0.5em] text-[#002B40] font-medium inline-block">
    — 一些真實的我們 —
  </h1>
</div>

<div class="max-w-7xl mx-auto px-6 mb-32 relative z-10 pb-30">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
    
    <a 
        href="https://www.instagram.com/reel/DG5irzKBZ-b/" 
        target="_blank" 
        rel="noopener noreferrer"
        class="aspect-[9/16] block overflow-hidden border border-gray-200 shadow-sm bg-white group cursor-pointer"
        >
    <img 
        src="../assets/images/about/reels-01.jpg" 
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        alt="Reels1"
    />
    </a>

    <a 
        href="https://www.instagram.com/reel/DIJX_GrB1Ki/" 
        target="_blank" 
        rel="noopener noreferrer"
        class="aspect-[9/16] block overflow-hidden border border-gray-200 shadow-sm bg-white group cursor-pointer"
        >
      <img 
        src="../assets/images/about/reels-02.jpg" 
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        alt="Reels2"
      />
    </a>

    <a 
        href="https://www.instagram.com/reel/DDjvLPrBbGr/" 
        target="_blank" 
        rel="noopener noreferrer"
        class="aspect-[9/16] block overflow-hidden border border-gray-200 shadow-sm bg-white group cursor-pointer"
        >
      <img 
        src="../assets/images/about/reels-03.jpg" 
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        alt="Reels3"
      />
    </a>


  </div>
</div>
    

    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[400px] bg-[#002B40] rounded-[50%] translate-y-1/2 z-0"></div>
  </main>
  
  <ContactUs />
</template>