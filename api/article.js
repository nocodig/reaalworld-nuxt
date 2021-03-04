import request from "@/utils/request";

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
    headers: {
      Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTQ2MDkyLCJ1c2VybmFtZSI6InhpYW9mYW5nIiwiZXhwIjoxNjIwMDU0MTQ3fQ.H9mwpng4D5_bTDDAUCeGh4XRUIy9NFcllahBd-nD0co`,
    },
  });
};
