<template>
  <div>
    <div  v-for="item in items" :key="item.itemData.id">
      <div>
        <v-container>
          <ItemExpansionBar :item-data="item.itemData" :market-data="item.marketData" @update-recipe="openRecipe"/>
        </v-container>
      </div>
    </div>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="pagination.pageTotal"
        @update:modelValue="pageUpdate"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, toRefs, watch} from "vue";
import XivIcon from "@/components/XivIcon";
import dayjs from "dayjs";
import {getMarketableItemByName, getMarketableItemByNameAndJobAndLevel} from "@/module/BeefApi/ItemModule";
import {getMarketByIDs} from "@/module/UniversalisApiModule";
import {useStore} from "vuex";
import ItemExpansionBar from "@/components/item/ItemExpansionBar";

export default defineComponent({
  name: "ItemList",
  // eslint-disable-next-line vue/no-unused-components
  components: {ItemExpansionBar, XivIcon},
  props: ['itemsData', 'searchData'],
  setup (props, { emit }) {
    const { itemsData } = toRefs(props)
    const { searchData } = toRefs(props)

    const childItemsData = ref(props.itemsData)

    const store = useStore()

    const items = ref({})
    const pagination = ref({
      page: 0,
      pageNext: 0,
      pagePrev: 0,
      pageTotal: 0,
      resultsParPage: 0,
      resultsTotal: 0
    })
    const page = ref(1)

    watch(itemsData, () => {
      childItemsData.value = itemsData.value
    })

    watch(childItemsData, () => {
      items.value = childItemsData.value.items
      for (let i = 0; i < items.value.length; i++) {
        items.value[i].active = false
        if(items.value[i].marketData === undefined) {
          items.value[i].marketData = {}
          items.value[i].marketData.minPrice = 'None'
          items.value[i].marketData.averagePrice = 'None'
          items.value[i].marketData.listings = []
          items.value[i].marketData.listings.push({worldName:'None'})
          continue
        }
        const date = dayjs(items.value[i].marketData.lastUploadTime)
        items.value[i].marketData.lastUploadTime = date.format('YYYY-MM-DD HH:mm:ss')
        // 出品情報がない場合
        if(items.value[i].marketData.listings.length === 0) {
          items.value[i].marketData.listings.push({worldName:'None'})
          items.value[i].marketData.minPrice = 'None'
          items.value[i].marketData.averagePrice = 'None'
        }
      }
      pagination.value = childItemsData.value.pagination
      page.value = pagination.value.page
    })

    const detailSearch = async () => {
      const marketableItemData = await getMarketableItemByNameAndJobAndLevel(searchData.value.itemName, searchData.value.jobAbbreviation, searchData.value.jobLevel, page.value)
      let itemIDs = []
      marketableItemData.items.forEach((item) => {
        itemIDs.push(item.id)
      })

      const marketData = await getMarketByIDs(itemIDs, searchData.value.dataCenter)
      let newItemsData = []

      marketableItemData.items.forEach((itemData) => {

        // 複数アイテムの場合は一致するアイテムのマーケットデータをともに格納する
        if (marketData.items !== undefined) {
          newItemsData.push({
            itemData: itemData,
            marketData: marketData.items[itemData.id]
          })
        } else {
          newItemsData.push({
            itemData: itemData,
            marketData: marketData
          })
        }
      })
      marketableItemData.items = newItemsData
      childItemsData.value = marketableItemData
    }

    const pageUpdate = async () => {
      store.dispatch('updateIsLoading', true)
      if(searchData.value.isDetail) {
        await detailSearch()
        store.dispatch('updateIsLoading', false)
        return
      }

      const marketableItemData = await getMarketableItemByName(searchData.value.itemName, page.value)

      let itemIDs = []
      marketableItemData.items.forEach((item) =>{
        itemIDs.push(item.id)
      })
      const marketData = await getMarketByIDs(itemIDs, searchData.value.dataCenter)
      let newItemsData = []

      marketableItemData.items.forEach((itemData) => {

        // 複数アイテムの場合は一致するアイテムのマーケットデータをともに格納する
        if(marketData.items !== undefined) {
          newItemsData.push({
            itemData: itemData,
            marketData: marketData.items[itemData.id]
          })
        } else {
          newItemsData.push({
            itemData: itemData,
            marketData: marketData
          })
        }
      })
      marketableItemData.items = newItemsData
      childItemsData.value = marketableItemData
      store.dispatch('updateIsLoading', false)
    }

    /**
     * レシピ情報の検索を行い、レシピ情報をストアに格納する処理
     * @param recipeData
     * @return {Promise<void>}
     */
    const openRecipe = async (...recipeData) => {
      emit('update-recipe', recipeData[0])
    }



    return {
      items,
      openRecipe,

      pagination,
      page,
      pageUpdate,
    }
  }
})
</script>

<style scoped>
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.2s;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-leave-to {
  opacity: 0;
}
</style>