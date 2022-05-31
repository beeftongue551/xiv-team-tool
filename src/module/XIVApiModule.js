const {getResponseByUrl} = require("@/module/UrlModule");
const {XIV_API_URL} = require("@/module/ModuleType");
module.exports = {
  /**
   * XIVAPIで名前とサーバからキャラクタの情報を取得する
   * @param name 名前
   * @param server サーバ
   * @param page ページ数
   * @returns {Promise<*>} 該当するキャラクタ情報（複数）
   */
  async getCharactersData(name, server, page = 1) {
    let characterData = {}
    const url = XIV_API_URL + 'character/search?name=' + name + '&server=' + server + '&page=' + page
    characterData = await getResponseByUrl(url)
    return characterData
  },

  /**
   * XIVAPIでキャラクタIDからキャラクタの詳細データを取得する
   * @param characterID キャラID
   * @returns {Promise<*>} キャラクタ詳細データ
   */
  async getCharacterDetail(characterID) {
    const url = XIV_API_URL + 'character/' + characterID
    const characterDetail = await getResponseByUrl(url)
    return characterDetail.Character
  },

  /**
   * XIVAPIでアイテム名からアイテムの一覧を取得する
   * @param itemName
   * @return {Promise<*>}
   */
  async getItemByName(itemName) {
    const url = XIV_API_URL + 'search?language=ja&indexes=item&columns=ID,Name_ja,Icon,LevelItem&string=' + itemName
    return await getResponseByUrl(url)
  },

  async getItemByPage(page = 1) {
    const url = XIV_API_URL + 'item?language=ja&page=' +page
    return await getResponseByUrl(url)
  },

  /**
   * XIVAPIでアイテムIDからアイテム情報を取得する
   * @param itemId
   * @return {Promise<void>}
   */
  async getItemByIdInXivApi(itemId) {
    const url = XIV_API_URL + 'item/' + itemId
    return await getResponseByUrl(url)
  },

  /**
   * XIVAPIでアイテム名からレシピの一覧を獲得する
   * @param itemName
   * @return {Promise<*>}
   */
  async getRecipeByName(itemName) {
    const url = XIV_API_URL + 'search?language=ja&indexes=recipe&string=' + itemName
    return await getResponseByUrl(url)
  },

  /**
   * XIVAPIでレシピIDからレシピを取得する
   */
  async getRecipeByIdInXivApi(id) {
    const url = XIV_API_URL + 'recipe/' + id
    return await getResponseByUrl(url)
  },

  /**
   * XIVAPIで全レシピ一覧を取得する
   *
   * @return {Promise<*>}
   */
  async getAllRecipe(page = 1) {
    const url = XIV_API_URL + 'recipe?language=ja&page=' +page
    return await getResponseByUrl(url)
  },

  /**
   * XIVAPIでアイテムIDからレシピIDを取得し、
   * レシピIDからレシピ情報を取得する。
   * @param itemID
   * @return {Promise<{amountResult: number, itemID: number, itemIngredients: *[], name: string, job: string}|undefined>}
   */
  async getRecipeByItemID(itemID) {
    let recipeData = {
      itemID: 0,
      name: '',
      job:'',
      itemIngredients: [],
      amountResult:0
    }

    // XIVAPIでレシピIDの取得 複数ある場合は1つのみを対象とする。
    // HACK: 複数ある場合の対処を考えてもいいかも
    const url = XIV_API_URL + 'item/' + itemID + '?columns=Recipes'
    let response = await getResponseByUrl(url)
    const recipes = response.Recipes
    if(recipes === null ||recipes.length===0  ) {
      return undefined
    }

    // XIVAPIでレシピ情報の取得
    const url2 = XIV_API_URL + 'recipe/' + recipes[0].ID
    response = await getResponseByUrl(url2)

    //素材データの格納
    let ingredients = []
    for (let i = 0; i < 10; i++) {
      const amountIngredient = 'AmountIngredient' + i
      const ItemIngredient = 'ItemIngredient' + i
      if(response[amountIngredient] !== 0) {
        const ingredientData = {
          id: response[ItemIngredient].ID,
          amount: response[amountIngredient],
          name: response[ItemIngredient].Name_ja
        }
        ingredients.push(ingredientData)
      }
    }

    //各データの格納
    recipeData.itemID = itemID
    recipeData.name = response.Name_ja
    recipeData.job = response.ClassJob.Name_ja
    recipeData.amountResult = response.AmountResult
    recipeData.itemIngredients = ingredients
    return recipeData
  },

  /**
   * XIVAPIでジョブ情報を取得する
   * @param id
   * @return {Promise<*>}
   */
  async getJobById(id) {
    const url = XIV_API_URL + 'ClassJob/' + id
    return await getResponseByUrl(url)
  },

  /**
   * 全ジョブの簡易情報を取得する
   * @return {Promise<*>}
   */
  async getAllJob() {
    const url = XIV_API_URL + 'ClassJob'
    return await getResponseByUrl(url)
  },

  /**
   * XIVAPIでカテゴリ情報を取得する
   *
   * @param id カテゴリID
   * @return {Promise<*>} カテゴリ情報
   */
  async getJobCategoryById(id) {
    const url = XIV_API_URL + 'ClassJobCategory/' + id
    return await getResponseByUrl(url)
  },

  /**
   * 全カテゴリ情報を取得する
   *
   * @return {Promise<*>}
   */
  async getAllJobCategory(page=1) {
    const url = XIV_API_URL + 'ClassJobCategory?page=' + page
    return await getResponseByUrl(url)
  },

  async getCompanyCraftSequence(page = 1) {
    const url = XIV_API_URL + 'CompanyCraftSequence?page=' + page
    return await getResponseByUrl(url)
  },

  async getCompanyCraftSequenceById(id) {
    const url = XIV_API_URL + 'CompanyCraftSequence/' + id
    return await getResponseByUrl(url)
  }
}