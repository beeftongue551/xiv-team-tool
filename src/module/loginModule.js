const {useStore} = require("vuex");
const {useRouter} = require("vue-router");
module.exports = {

  /**
   * 未ログイン時にこの関数が呼ばれるとトップページにリダイレクトを行う
   */
  loginCheck () {
    const store = useStore()
    const router = useRouter()
    if(
      store.getters['user/getUserCharacter'].id === undefined ||
      store.getters['user/getUserCharacter'].id === 0
    ) {
      console.log(store.getters['user/getUserCharacter'])
      router.push('/')
    }
  }
}