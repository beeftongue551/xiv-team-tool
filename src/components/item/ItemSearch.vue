<template>
  <div>
    <v-form>
      <v-container>
        <v-row >
          <v-col cols="12" md="5">
            <v-text-field v-model="itemName" label="アイテム名" />
          </v-col>
          <v-col cols="12" md="5">
            <v-autocomplete v-model="dataCenter" :items="dataCenters" dense filled label="DC" @update:search="changedDataCenter"/>
          </v-col>
          <v-col cols="12" md="2">
            <v-btn
                class="mx-2"
                fab
                dark
                color="teal"
                @click="itemSearch"
            >
              <v-icon
                  large
                  dark
                  color="white"
              >
                mdi-magnify
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <SearchFailure :is-open="snackbar" msg="値を入力してください"/>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {ref} from "vue";
import {getItemByName} from "@/module/XIVApiModule";
import {useStore} from "vuex";
import {getMarketByIDs} from "@/module/UniversalisApiModule";
import {ItemData} from "@/class/ItemData";
import SearchFailure from "@/components/SearchFailure";

export default defineComponent({
  name: "ItemSearch",
  components: {SearchFailure},
  setup() {
    const store = useStore()

    const itemName = ref('')
    const dataCenters = ref(['Mana','Gaia','Elemental'])
    const dataCenter = ref('')
    let itemsData = ref([])
    let snackbar = ref(false)

    /**
     * アイテム検索を行いstoreに情報を格納する
     * @return {Promise<void>}
     */
    const itemSearch = async () => {
      //入力不備がある場合の処理
      if(itemName.value === '' || dataCenter.value === ''){
        snackbar.value = true
        return
      }
      snackbar.value = false

      store.dispatch('updateIsLoading', true)
      const xivResponse = await getItemByName(itemName.value)
      const xivItemData = xivResponse.Results
      let itemIDs = []
      xivItemData.forEach((item) =>{
        itemIDs.push(item.ID)
      })
      const marketData = await getMarketByIDs(itemIDs, dataCenter.value)
      let itemsData = []
      // storeの初期化
      store.dispatch('item/updateItemsData', itemsData)
      xivItemData.forEach((itemData) => {
        //複数のアイテムでマーケット情報があるものを処理する
        if(marketData.items!== undefined && marketData.items[itemData.ID] !== undefined) {
          //必要なデータを格納する
          itemsData.push(new ItemData(itemData, marketData.items[itemData.ID]))
        } else if (marketData.items === undefined && marketData.itemID === itemIDs[0]) {
          //単一のアイテムでマーケット情報があるものを処理する
          itemsData.push(new ItemData(itemData,marketData))
        }
      })
      // storeにデータを格納する
      store.dispatch('pagination/updatePagination', xivResponse.Pagination)
      store.dispatch('item/updateItemsData', itemsData)
      store.dispatch('updateIsLoading', false)
    }

    return {
      itemName,
      dataCenters,
      dataCenter,
      itemsData,
      snackbar,
      itemSearch
    }
  }
})
</script>