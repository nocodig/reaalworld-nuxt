import { request } from "@/plugins/request";

// 文章公共列表
export const getArticles = (params) => {
  return request({
    method: "GET",
    url: "/api/articles",
    params,
  });
};

export const getFeedArticles = (params) => {
  return request({
    method: "GET",
    url: "/api/articles/feed",
    params,
  });
};


export const addFavorite = (slug) => {
  return request({
    method: "POST",
    url: `/api/articles/${slug}/favorite`,
  });
};

export const removeFavorite = (slug) => {
  return request({
    method: "DELETE",
    url: `/api/articles/${slug}/favorite`,
  });
};

export const getArticle = (slug) => {
  return request({
    method: "GET",
    url: `/api/articles/${slug}`,
  });
};

export const getComments = (slug) => {
  return request({
    method: "GET",
    url: `/api/articles/${slug}/comments`,
  });
};

