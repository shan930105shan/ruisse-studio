<script setup>
import Navbar from '@/components/Navbar.vue'
import ContactUs from '@/components/ContactUs.vue'
import aboutImg from '@/assets/images/team.png'
</script>

<template>
  <Navbar />
  <main class="relative w-full min-h-screen bg-[#f2eedc] pt-32 overflow-hidden font-serif">
    
    <div class="text-center mb-16">
      <h1 class="text-2xl md:text-3xl tracking-[0.5em] text-[#002B40] font-medium inline-block md:mr-8">
        瑞思影像工作室
      </h1>
      <span class="block md:inline text-2xl md:text-3xl tracking-[0.3em] text-[#002B40] font-light">
        RUISSE STUDIO
      </span>
    </div>

    <div class="max-w-7xl mx-auto px-6 md:px-20 flex flex-col md:flex-row items-center gap-12 md:gap-24 relative z-10 pb-40">
      
      <div class="w-full md:w-1/3">
        <div class="shadow-2xl rounded-sm overflow-hidden">
          <img :src="aboutImg" class="w-full h-auto object-cover" alt="Studio Team" />
        </div>
      </div>

      <div class="w-full md:w-2/3 text-[#002B40] tracking-[0.2em] leading-loose">
        <div class="space-y-6 opacity-80">
          <p class="text-justify">
            團隊介紹內容團隊介紹內容團隊介紹內容團隊介紹內容團隊介紹內容團隊介紹內容團隊介紹內容團隊介紹內容
          </p>
          <p class="text-justify">
            這裡可以加入更多關於工作室ㄉ文字，看你們甚麼時候方便給我~~~。
          </p>
        </div>
      </div>
      
    </div>

    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[400px] bg-[#002B40] rounded-[50%] translate-y-1/2 z-0"></div>
  </main>
  
  <ContactUs />
</template>