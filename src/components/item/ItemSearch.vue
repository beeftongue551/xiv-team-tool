<template>
  <div class="text-center">
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              autofocus="true"
              v-model="itemName"
              label="アイテム名"
              @keyup.prevent.enter.exact="itemSearch"
            />
          </v-col>
          <v-col cols="12" md="6" >
            <v-select v-model="dataCenter" :items="dataCenters" dense filled label="DC" @update:search="changedDataCenter">
              <template v-slot:append>
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
              </template>
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <v-switch color="orange" label="装備詳細検索" inset v-model="isDetail" />
          </v-col>
        </v-row>
        <ItemDetailSearch @detail-update="updateDetailInput" @push-enter="itemSearch" v-show="isDetail"/>
      </v-container>
    </v-form>
    <v-snackbar
      v-model="snackbar"
      color="error"
      tile
    >アイテムが見つかりませんでした</v-snackbar>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {ref} from "vue";
import {useStore} from "vuex";
import {getMarketableItemByName, getMarketableItemByNameAndJobAndLevel} from "@/module/BeefApi/ItemModule";
import {getMarketByIDs} from "@/module/UniversalisApiModule";
import ItemDetailSearch from "@/components/item/ItemDetailSearch";


export default defineComponent({
  name: "ItemSearch",
  components: {ItemDetailSearch},
  setup(props, { emit }) {
    const store = useStore()

    const itemName = ref('')
    const dataCenters = ref(['Mana','Gaia','Elemental'])
    const dataCenter = ref('Mana')
    let itemsData = ref([])
    const isDetail = ref(false)
    const snackbar = ref(false)

    let jobAbbreviation = ''
    let jobLevel = 90

    /**
     * アイテム検索を行う
     * @return {Promise<void>}
     */
    const itemSearch = async () => {
      store.dispatch('updateIsLoading', true)

      if(isDetail.value) {
        await detailSearch()
        store.dispatch('updateIsLoading', false)
        return
      }

      //入力不備がある場合の処理
      if(itemName.value === '' || dataCenter.value === ''){
        snackbar.value = true
        store.dispatch('updateIsLoading', false)
        return
      }
      snackbar.value = false

      const marketableItemData = await getMarketableItemByName(itemName.value)

      let itemIDs = []
      marketableItemData.items.forEach((item) => {
        itemIDs.push(item.id)
      })
      const marketData = await getMarketByIDs(itemIDs, dataCenter.value)
      let itemsData = []

      marketableItemData.items.forEach((itemData) => {

        // 複数アイテムの場合は一致するアイテムのマーケットデータをともに格納する
        if(marketData.items !== undefined) {
          itemsData.push({
            itemData: itemData,
            marketData: marketData.items[itemData.id]
          })
        } else {
          itemsData.push({
            itemData: itemData,
            marketData: marketData
          })
        }
      })
      marketableItemData.items = itemsData
      const searchData = {
        isDetail: false,
        itemName: itemName.value,
        dataCenter: dataCenter.value,
        jobAbbreviation: '',
        jobLevel: 90
      }
      //親コンポーネントに各アイテムデータを渡す
      emit('update-items', marketableItemData, searchData)
      store.dispatch('updateIsLoading', false)
    }

    const updateDetailInput = (...inputValue) => {
      jobAbbreviation = inputValue[0]
      jobLevel = inputValue[1]
    }

    const detailSearch = async () => {
      const marketableItemData = await getMarketableItemByNameAndJobAndLevel(itemName.value, jobAbbreviation, jobLevel)
      let itemIDs = []
      marketableItemData.items.forEach((item) =>{
        itemIDs.push(item.id)
      })

      const marketData = await getMarketByIDs(itemIDs, dataCenter.value)
      let itemsData = []

      marketableItemData.items.forEach((itemData) => {

        // 複数アイテムの場合は一致するアイテムのマーケットデータをともに格納する
        if(marketData.items !== undefined) {
          itemsData.push({
            itemData: itemData,
            marketData: marketData.items[itemData.id]
          })
        } else {
          itemsData.push({
            itemData: itemData,
            marketData: marketData
          })
        }
      })
      marketableItemData.items = itemsData
      const searchData = {
        isDetail: true,
        itemName: itemName.value,
        dataCenter: dataCenter.value,
        jobAbbreviation: jobAbbreviation,
        jobLevel: jobLevel
      }
      //親コンポーネントに各アイテムデータを渡す
      emit('update-items', marketableItemData, searchData)
    }

    return {
      itemName,
      dataCenters,
      dataCenter,
      itemsData,
      snackbar,
      isDetail,
      itemSearch,
      updateDetailInput,
    }
  }
})
</script>