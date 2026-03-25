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
export const fetchOutdoorPortfolio = async () => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'outdoorPortfolio', // 請確保 Contentful 後台 ID 一致
      order: '-sys.createdAt' as any,    // 最新發佈的排在最前面
    });

    return response.items.map((item: any) => {
      const fileUrl = item.fields.photo?.fields?.file?.url;
      return {
        id: item.sys.id,
        title: item.fields.title,
        category: item.fields.category, // 例如: 'japanese', 'nature', 'retro', 'couple'
        src: fileUrl ? (fileUrl.startsWith('//') ? `https:${fileUrl}` : fileUrl) : ''
      };
    });
  } catch (error) {
    console.error('抓取戶外寫真作品失敗:', error);
    return [];
  }
};