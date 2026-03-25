import { createClient } from 'contentful';

export const contentfulClient = createClient({
  space: '99icmpv51aj3',
  accessToken: '41Y1-bBuGGKe9eid2r8l-J4AG93PhEDHn87NYEWoWpU'
});

/**
 * 1. 萬用相簿抓取函數 (ServiceGallery)
 * 用於：生日寫真、戶外攝影、精緻方案等所有圖片資料夾（首頁方案區塊使用）
 */
export const fetchGalleryImages = async (serviceName: string) => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'serviceGallery',
      'fields.serviceName': serviceName,
    });

    if (response.items.length > 0) {
      const assets = (response.items[0]?.fields as any)?.images;
      return assets ? assets.map((asset: any) => ({
        url: asset.fields.file.url.startsWith('//') ? `https:${asset.fields.file.url}` : asset.fields.file.url,
        title: asset.fields.title || serviceName
      })) : [];
    }
    return [];
  } catch (error) {
    console.error(`抓取相簿 [${serviceName}] 失敗:`, error);
    return [];
  }
};

/**
 * 2. 客戶評價抓取函數 (Testimonial)
 */
export const fetchTestimonials = async () => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'testimonial',
      order: 'sys.createdAt' as any 
    });

    return response.items.map((item: any) => ({
      name: item.fields.name,
      feedback: item.fields.feedback,
      avatar: item.fields.avatar?.fields?.file?.url 
              ? `https:${item.fields.avatar.fields.file.url}` 
              : '/default-avatar.png' 
    }));
  } catch (error) {
    console.error('抓取客戶評價失敗:', error);
    return [];
  }
};

/**
 * 3. Reels 連結抓取函數 (ReelsItem)
 */
export const fetchReels = async () => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'reelsItem',
      order: 'fields.id' as any
    });

    return response.items.map((item: any) => ({
      id: item.fields.id,
      url: item.fields.url,
      // 這裡維持原本的本地預覽圖命名邏輯，若之後 Reels 也要雲端圖片可再修改
      image: `reels-${String(item.fields.id).padStart(2, '0')}.jpg`,
      alt: `Reels${item.fields.id}`
    }));
  } catch (error) {
    console.error('抓取 Reels 失敗:', error);
    return [];
  }
};

/**
 * 4. 戶外寫真作品集抓取函數 (OutdoorPortfolio)
 * 用於：Portfolio 頁面，需根據 Category 分類顯示大量圖片
 */
/**
 * 4. 戶外寫真作品集抓取函數 (OutdoorPortfolio)
 * 匹配 Contentful 欄位：title, category, photo (多張圖模式)
 */
export const fetchOutdoorPortfolio = async () => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'outdoorPortfolio',
      order: '-sys.createdAt' as any,
    });

    // 使用 flatMap 將每個 Entry 裡的多張 Photo 攤平
    return response.items.flatMap((item: any) => {
      const category = item.fields.category;
      // 關鍵點：這裡要對應你截圖中的欄位名稱 "photo"
      const assets = item.fields.photo || []; 

      return assets.map((asset: any) => ({
        id: asset.sys.id,
        title: asset.fields.title,
        category: category,
        src: asset.fields.file.url.startsWith('//') 
             ? `https:${asset.fields.file.url}` 
             : asset.fields.file.url
      }));
    });
  } catch (error) {
    console.error('抓取戶外寫真作品失敗:', error);
    return [];
  }
};

/**
 * 5. 形象模卡作品集抓取函數 (ModelCardPortfolio)
 * 支援一個 Entry 多張照片 (flatMap)
 */
export const fetchModelCardPortfolio = async () => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'modelCardPortfolio',
      order: '-sys.createdAt' as any,
    });

    return response.items.flatMap((item: any) => {
      const category = item.fields.category;
      const assets = item.fields.photos || [];

      return assets.map((asset: any) => ({
        id: asset.sys.id,
        title: asset.fields.title,
        category: category,
        src: asset.fields.file.url.startsWith('//') 
             ? `https:${asset.fields.file.url}` 
             : asset.fields.file.url
      }));
    });
  } catch (error) {
    console.error('抓取形象模卡作品失敗:', error);
    return [];
  }
};
/**
 * 6. 輕盈寫真作品集抓取函數 (LightWeightPortfolio)
 */
export const fetchLightWeightPortfolio = async () => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'lightWeightPortfolio',
      order: '-sys.createdAt' as any,
    });

    return response.items.flatMap((item: any) => {
      const category = item.fields.category || 'light'; // 預設為 light
      const assets = item.fields.photo || []; // 確保對應 Contentful 的欄位 ID

      return assets.map((asset: any) => ({
        id: asset.sys.id,
        title: asset.fields.title,
        category: category,
        src: asset.fields.file.url.startsWith('//') 
             ? `https:${asset.fields.file.url}` 
             : asset.fields.file.url
      }));
    });
  } catch (error) {
    console.error('抓取輕盈寫真作品失敗:', error);
    return [];
  }
};