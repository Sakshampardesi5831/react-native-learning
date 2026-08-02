export interface NewsArticle {
  source:{
    id:string|null;
    name:string
  };
  author:string | null;
  title:string|null;
  description:string|null;
  url:string|null;
  urlToImage:string|null;
  publishedAt:string;
  content:string|null
}

export interface NewsApiResponse {
   status:string;
   totalResults:number;
   articles:NewsArticle[]
}