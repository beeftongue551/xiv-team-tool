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

  async getItemByName(itemName) {
    const url = XIV_API_URL + 'search?language=ja&indexes=item&columns=ID,Name_ja,Icon,LevelItem&string=' + itemName
    const response = await getResponseByUrl(url)
    return response
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
}