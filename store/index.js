const cookieparser = process.server ? require('cookieparser') : undefined;

// 在服务段运行时，运行都是同一个实例
// 防止数据冲突，
export const state = () => {
  return {
    user: null,
  };
}

export const mutations = {
  setUser(state, data) {
    state.user = data
  },

  removeUser(state) {
    state.user = null
  }
}

export const actions = {
  // nuxt 中特殊的action，该action会在服务端渲染期间自动调用
  // 初始化容器数据，以及传递数据给客户端使用
  nuxtServerInit({ commit }, { req }) {
    let user = null;

    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)

      try {
        user = JSON.parse(parsed.user)
      } catch (e) {

      }
    }

    commit('setUser', user);
  }
}