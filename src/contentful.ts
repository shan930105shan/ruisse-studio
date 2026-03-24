// src/contentful.ts
import { createClient } from 'contentful';

export const contentfulClient = createClient({
  space: '99icmpv51aj3',
  accessToken: '41Y1-bBuGGKe9eid2r8l-J4AG93PhEDHn87NYEWoWpU'
});

/**
 * 1. 萬用相簿抓取函數 (ServiceGallery)
 * 用於：生日寫真、戶外攝影、精緻方案等所有圖片資料夾
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
      order: 'sys.createdAt' as any // 按建立時間排序
    });

    return response.items.map((item: any) => ({
      name: item.fields.name,
      feedback: item.fields.feedback,
      avatar: item.fields.avatar?.fields?.file?.url 
              ? `https:${item.fields.avatar.fields.file.url}` 
              : '/default-avatar.png' // 如果沒設頭像給個預設值
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
      // 這裡維持你原本的 Reels 縮圖邏輯
      image: `reels-${String(item.fields.id).padStart(2, '0')}.jpg`,
      alt: `Reels${item.fields.id}`
    }));
  } catch (error) {
    console.error('抓取 Reels 失敗:', error);
    return [];
  }
};