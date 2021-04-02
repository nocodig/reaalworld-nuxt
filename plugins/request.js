import axios from "axios";

export const request = axios.create({
  baseURL: "https://conduit.productionready.io",
});

// 请求拦截、

// 相应拦截
// 插件函数到处必须作为default成员
// 通过插件机制，获取到上下文对象，（query, params, req,res)
export default ({ store }) => {
  request.interceptors.request.use(
    (config) => {
      const { user } = store.state;

      if (user && user.token) {
        config.headers.Authorization = `Token ${user.token}`;
      }
      return config;
    },
    (err) => {
      // 如果请求失败，返回错误信息（此时请求没有发出去）
      return Promise.reject(err);
    }
  );
};
