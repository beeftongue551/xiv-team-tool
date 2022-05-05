/**
 * XIVAPIとUniversalisAPIを結合したアイテム情報
 */
export class ItemData {
  id = 0
  lastUploadTime = ''
  name = ''
  icon = ''
  itemLevel= 0
  minPrice = 0
  minPriceHQ = 0
  averagePrice = 0
  minServer = ''

  /**
   * コンストラクタ
   * @param itemData XIVAPIから取得したアイテムデータ
   * @param marketData UniversalisAPIから取得したマーケット情報
   */
  constructor(itemData, marketData) {
    const date = new Date(marketData.lastUploadTime)
    this.id = itemData.ID
    this.lastUploadTime =
      date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate() + " " +
      date.getHours() + ':' + date.getMinutes()
    this.name = itemData.Name_ja
    this.icon = itemData.Icon
    this.itemLevel = itemData.LevelItem
    this.minPrice = marketData.minPrice
    this.minPriceHQ = marketData.minPriceHQ
    this.averagePrice = marketData.averagePrice
    this.minServer = marketData.listings[0].worldName
  }
}