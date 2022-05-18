const {useStore} = require("vuex");
const {useRouter} = require("vue-router");
module.exports = {

  /**
   * 未ログイン時にこの関数が呼ばれるとトップページにリダイレクトを行う
   */
  loginCheck() {
    const store = useStore()
    const router = useRouter()
    if(
      store.getters['user/getUserCharacter'].id === undefined ||
      store.getters['user/getUserCharacter'].id === 0
    ) {
      router.push('/')
    }
  },

  /**
   * ログインユーザが固定に未所属の場合、この関数が呼ばれるとトップページにリダイレクトを行う
   */
  teamCheck() {
    const store = useStore()
    const router = useRouter()
    if(
      store.getters['user/getUserCharacter'].teamId === undefined ||
      store.getters['user/getUserCharacter'].teamId === 0
    ) {
      router.push('/')
    }
  }
}