import { NEWS_API_BASE_URL, NEWS_API_KEY } from "@/config/api";

import { NewsApiResponse } from "@/types/news";

export interface FetchNewsParams {
  page?: number;
  pageSize?: number;
  category?: string;
  country?: string;
  query?: string;
}

export const fetchTopHeadLines = async (params: FetchNewsParams = {}) => {
  const {
    page = 1,
    pageSize = 20,
    category = "general",
    country = "us",
    query,
  } = params;

  const queryParams = new URLSearchParams({
    apiKey: NEWS_API_KEY!,
    page: page.toString(),
    pageSize: pageSize.toString(),
    ...(category && category !== "all" && { category }),
    ...(country && { country }),
    ...(query && { q: query }),
  });
  const url = `${NEWS_API_BASE_URL}/top-headlines?${queryParams.toString()}`;
  try {
    const response = await fetch(url);
    const data: NewsApiResponse = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
