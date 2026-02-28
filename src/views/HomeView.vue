<template>
  <main class="pt-[80px] bg-white min-h-screen">
    
    <section class="w-full flex justify-center items-center py-[40px]">
      <div class="w-[90%] max-w-[1400px]">
        <video autoplay muted loop playsinline class="w-full h-auto block">
          <source src="@/assets/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
    </section>

    <section class="w-full overflow-hidden border-t border-black py-[25px] bg-white group">
      <div class="flex w-max animate-[scroll-left_40s_linear_infinite] group-hover:[animation-play-state:paused]">
        <div class="flex items-center" v-for="i in 2" :key="i">
          <div class="flex items-center px-[40px] whitespace-nowrap">
            <span class="font-[800] text-[1.2rem] mr-[15px]">校內展 Campus Exhibition</span>
            <span class="font-[600] text-[1.5rem]">05.01</span>
            <img src="@/assets/plane.png" class="h-[24px] mx-[10px]" />
            <span class="font-[600] text-[1.5rem]">05.04</span>
            <span class="font-[500] text-[1rem] ml-[10px] text-[#333]">北科藝文中心</span>
          </div>

          <div class="flex items-center px-[40px] whitespace-nowrap">
            <span class="font-[800] text-[1.2rem] mr-[15px]">新一代設計展 YODEX</span>
            <span class="font-[600] text-[1.5rem]">05.22</span>
            <img src="@/assets/plane.png" class="h-[24px] mx-[10px]" />
            <span class="font-[600] text-[1.5rem]">05.25</span>
            <span class="font-[500] text-[1rem] ml-[10px] text-[#333]">南港展覽館二館</span>
          </div>

          <div class="flex items-center px-[40px] whitespace-nowrap">
            <span class="font-[800] text-[1.2rem] mr-[15px]">放視大賞 Vision Get Wild</span>
            <span class="font-[600] text-[1.5rem]">05.28</span>
            <img src="@/assets/plane.png" class="h-[24px] mx-[10px]" />
            <span class="font-[600] text-[1.5rem]">05.30</span>
            <span class="font-[500] text-[1rem] ml-[10px] text-[#333]">高雄展覽館南館</span>
          </div>
        </div>
      </div>
    </section>

    <section class="w-full py-[100px] px-[5%] flex justify-center bg-white">
      <div class="max-w-[1200px] w-full flex flex-col md:flex-row items-center gap-[60px]">
        <div class="flex-1 text-left">
          <h2 class="text-[2rem] font-[800] mb-[30px] leading-[1.4]">“ 吐出我們不懼破格的無限延續創造力 ”</h2>
          <div class="text-[1rem] leading-[1.8] text-[#333] tracking-[0.05rem]">
            <p class="mb-[20px]">在網站設計上，我們將「破圖」的精神融入視覺互動：部分關鍵圖像將以 3D 方式呈現，並結合滑鼠互動。體驗者在瀏覽時，這些元素將搭配「破圖」動畫變化，讓您直觀地感受到打破僵固界限展現的創造力。</p>
            <p>本畢業製作網頁採用一頁式設計，旨在提供連貫沉浸的體驗。當體驗者平滑滾動時，即是參與創作產出的探索旅程。各組作品資訊將配合流暢動畫呈現在網站中；而每一次點擊，都將如爆破般的能量釋放。</p>
          </div>
        </div>

        <div class="flex-1 mt-10 md:mt-0">
          <RotatingArrow :src="arrowImg" className="w-full max-w-[500px] h-auto" />
        </div>
      </div>
    </section>

    <section class="w-full py-[60px] pb-[100px] flex justify-center bg-white">
      <div class="w-[90%] max-w-[1400px] aspect-[16/9] md:aspect-[21/4] overflow-hidden bg-black">
        <video autoplay muted loop playsinline class="w-full h-full object-cover">
          <source src="@/assets/promo-video.mp4" type="video/mp4" />
        </video>
      </div>
    </section>

    <WorkScrollSection :works="workList" id="work-introduction" />

    <section class="w-full py-[100px] px-[5%] bg-white border-t border-black">
      <div class="max-w-[1200px] mx-auto w-full">
        <div class="flex items-center gap-5 mb-12">
          <span class="text-[2.5rem]">→</span>
          <h2 class="text-[2rem] font-[800]" id="promotional-video">宣傳片</h2>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div class="h-32 flex items-center justify-center border border-dashed border-gray-300 text-gray-400">
            Coming Soon
          </div>
          <div class="h-32 flex items-center justify-center border border-dashed border-gray-300 text-gray-400">
            Coming Soon
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup>
import WorkScrollSection from '@/components/WorkScrollSection.vue';
import RotatingArrow from '@/components/RotatingArrow.vue';
import arrowImg from '@/assets/rrrr-logo-graffiti.png'; // 引入圖片路徑

// 作品資料
const workList = [
  { title: 'C 計劃', fullDesc: '這裡填入關於 C 計劃的詳細介紹內容...', img: '/src/assets/work1.jpg' },
  { title: 'RE:ARM', fullDesc: '這裡填入關於 RE:ARM 的詳細介紹內容...', img: '/src/assets/work2.jpg' },
  { title: '審判之手', fullDesc: '這裡填入關於 審判之手 的詳細介紹內容...', img: '/src/assets/work3.jpg' },
  { title: '警戒深宵', fullDesc: '這裡填入關於 警戒深宵 的詳細介紹內容...', img: '/src/assets/work4.jpg' },
  { title: '晶簇韻律', fullDesc: '這裡填入關於 晶簇韻律 的詳細介紹內容...', img: '/src/assets/work5.jpg' },
  { title: 'Dionysus', fullDesc: '這裡填入關於 Dionysus 的詳細介紹內容...', img: '/src/assets/work7.jpg' },
];
</script>

<style>
/* 跑馬燈動畫仍需保留在全域或此處，Tailwind config 亦可設定 */
@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>