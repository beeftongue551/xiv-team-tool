// eslint-disable-next-line no-unused-vars
const {DEBUG_API_URL, BEEF_API_URL} = require("@/module/ModuleType");
const {getResponseByUrl, postResponseByUrl} = require("@/module/UrlModule");
const {getItemByPage, getItemByIdInXivApi} = require("@/module/XIVApiModule");

module.exports = {

  /**
   * アイテムIDが一致するアイテム情報を取得する
   *
   * @param {number} itemId アイテムID
   * @return {Promise<*>} アイテム情報
   */
  async getItemById(itemId) {
    const url = BEEF_API_URL + 'item/id/' + itemId
    return await getResponseByUrl(url)
  },

  /**
   * アイテム名を含むマーケット取引可能なアイテム情報を取得する
   *
   * @param {string} itemName アイテム名
   * @param {number} page ページ
   * @return {Promise<*>} アイテム情報
   */
  async getMarketableItemByName(itemName, page = 1) {
    const url = BEEF_API_URL + 'item/marketable/name/' + itemName + '/page/' + page
    return await getResponseByUrl(url)
  },

  async getCraftableItemByName(itemName, page = 1) {
    const url = DEBUG_API_URL + 'item/craftable/name/' + itemName + '/page/' + page
    return await getResponseByUrl(url)
  },

  /**
   * アイテム名を含むマーケット取引可能なアイテム情報を取得する
   *
   * @param {string} itemName アイテム名
   * @param {string} jobAbbreviation ジョブ略称
   * @param {number} jobLevel レベル
   * @param {number} page ページ
   * @return {Promise<*>} アイテム情報
   */
  async getMarketableItemByNameAndJobAndLevel(itemName, jobAbbreviation, jobLevel, page = 1) {
    if(itemName !== '' && jobAbbreviation !== '') {
      const url = BEEF_API_URL + 'item/marketable/name/' + itemName + '/job/' + jobAbbreviation + '/level/' + jobLevel + '/page/' + page
      return await getResponseByUrl(url)
    }else if(itemName !== '' && jobAbbreviation === '') {
      const url = BEEF_API_URL + 'item/marketable/name/' + itemName + '/level/' + jobLevel + '/page/' + page
      return await getResponseByUrl(url)
    } else if(itemName === '' &&jobAbbreviation !== '') {
      const url = BEEF_API_URL + 'item/marketable/job/' + jobAbbreviation + '/level/' + jobLevel + '/page/' + page
      return await getResponseByUrl(url)
    } else {
      const url = BEEF_API_URL + 'item/marketable/level/' + jobLevel + '/page/' + page
      return await getResponseByUrl(url)
    }
  },

  /**
   * アイテムIDが一致するアイテムをマーケット取引可能とする
   *
   * @param itemId
   * @return {Promise<*>}
   */
  async updateItemByMarketFlg(itemId) {
    const url = BEEF_API_URL + 'item/marketable/' +itemId
    return await getResponseByUrl(url)
  },

  /**
   * アイテム情報をテーブルに追加する
   *
   * @param itemData アイテム情報
   * @return {Promise<number>} 成功時: 1, 失敗時: -1
   */
  async addItem(itemData) {
    const url = BEEF_API_URL + 'item'
    return await postResponseByUrl(url, itemData)
  },

  async updateAllItem() {
    let globalData = await getItemByPage()
    const pageTotal = globalData.Pagination.PageTotal
    for (let i = 1; i <= pageTotal; i++) {
      globalData = await getItemByPage(i)
      const globalResults = globalData.Results
      for (let j = 0; j < globalResults.length; j++) {
        if (globalResults[j].Name !== '') {
          const itemData = await getItemByIdInXivApi(globalResults[j].ID)
          const addItemData = {
            id: itemData.ID,
            itemIcon: itemData.Icon,
            itemName: itemData.Name_ja,
            itemLevel: itemData.LevelItem,
            itemCategory: itemData.ItemUICategory.Name_ja,
            itemCategoryIcon: itemData.ItemUICategory.Icon,
            equipmentLevel: itemData.LevelEquip
          }
          if(itemData.Recipes !== undefined) {
            addItemData.recipeId = itemData.Recipes[0].ID
          } else {
            addItemData.recipeId = 0
          }
          if(itemData.ClassJobCategory !== null) {
            addItemData.classJobCategoryId = itemData.ClassJobCategoryTargetID
          } else {
            addItemData.classJobCategoryId = 0
          }
          if(addItemData.itemName.charAt(0) !== '†' && addItemData.itemCategory !== '排出停止アイテム'){
            const url = BEEF_API_URL + 'item'
            const addResult = await postResponseByUrl(url, addItemData)
            if(addResult === -1) {
              console.error('登録失敗エラー' + itemData.ID)
            }
          }
        }
      }
    }
  },

  /**
   * レシピIDが一致する レシピ情報を取得する
   *
   * @param recipeId レシピID
   * @return {Promise<*>}
   */
  async getRecipeById(recipeId) {
    const url = DEBUG_API_URL + 'recipe/id/' + recipeId
    return await getResponseByUrl(url)
  },

  /**
   * アイテム情報をテーブルに追加する
   *
   * @param recipeData アイテム情報
   * @return {Promise<number>} 成功時: 1, 失敗時: -1
   */
  async addRecipe(recipeData) {
    const url = DEBUG_API_URL + 'recipe'
    return await postResponseByUrl(url, recipeData)
  },

}