// 验证是否是登陆中间件

export default ({ store, redirect }) => {
  if (store.state.user) {
    return redirect('/')
  }
}