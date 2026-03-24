// src/contentful.ts
import { createClient } from 'contentful';

export const contentfulClient = createClient({
  space: '99icmpv51aj3', // 從 Contentful Settings > API keys 取得
  accessToken: '41Y1-bBuGGKe9eid2r8l-J4AG93PhEDHn87NYEWoWpU' // 取得 Content Delivery API 連結
});