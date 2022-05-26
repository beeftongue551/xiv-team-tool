<template>
  <div>
    <v-form>
      <v-container>
        <v-row >
          <v-col cols="12" md="5">
            <v-text-field autofocus="true" v-model="itemName" label="アイテム名" @keyup.prevent.enter.exact="itemSearch"/>
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
        <v-expansion-panels>
          <v-expansion-panel @click="openPanel" v-model="openPanels">
            <v-expansion-panel-title>
              <label class="text-orange-darken-2">詳細検索</label>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <ItemDetailSearch @detail-update="updateDetailInput"/>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </v-form>
    <SearchFailure :is-open="snackbar" msg="値を入力してください"/>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {ref} from "vue";
import {useStore} from "vuex";
import SearchFailure from "@/components/SearchFailure";
import {getMarketableItemByName, getMarketableItemByNameAndJobAndLevel} from "@/module/BeefApi/ItemModule";
import {getMarketByIDs} from "@/module/UniversalisApiModule";
import ItemDetailSearch from "@/components/item/ItemDetailSearch";

export default defineComponent({
  name: "ItemSearch",
  components: {ItemDetailSearch, SearchFailure},
  setup(props, { emit }) {
    const store = useStore()

    const itemName = ref('')
    const dataCenters = ref(['Mana','Gaia','Elemental'])
    const dataCenter = ref('Mana')
    let itemsData = ref([])
    const isDetail = ref(false)
    const openPanels = ref([])
    let snackbar = ref(false)

    let jobAbbreviation = ''
    let jobLevel = 90

    /**
     * アイテム検索を行う
     * @return {Promise<void>}
     */
    const itemSearch = async () => {
      store.dispatch('updateIsLoading', true)

      if(openPanels.value.length !== 0) {
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
      marketableItemData.forEach((item) =>{
        itemIDs.push(item.id)
      })
      const marketData = await getMarketByIDs(itemIDs, dataCenter.value)
      let itemsData = []

      marketableItemData.forEach((itemData) => {

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
      //親コンポーネントに各アイテムデータを渡す
      emit('update-items', itemsData)
      store.dispatch('updateIsLoading', false)
    }
    
    const openPanel = () => {
      if(openPanels.value.length === 0) {
        openPanels.value.push('詳細検索')
      } else {
        openPanels.value = []
      }
    }

    const updateDetailInput = (...inputValue) => {
      jobAbbreviation = inputValue[0]
      jobLevel = inputValue[1]
    }

    const detailSearch = async () => {
      const marketableItemData = await getMarketableItemByNameAndJobAndLevel(itemName.value, jobAbbreviation, jobLevel)
      let itemIDs = []
      marketableItemData.forEach((item) =>{
        itemIDs.push(item.id)
      })

      const marketData = await getMarketByIDs(itemIDs, dataCenter.value)
      let itemsData = []

      marketableItemData.forEach((itemData) => {

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
      //親コンポーネントに各アイテムデータを渡す
      emit('update-items', itemsData)
    }

    return {
      itemName,
      dataCenters,
      dataCenter,
      itemsData,
      snackbar,
      isDetail,
      openPanels,
      itemSearch,
      updateDetailInput,
      openPanel
    }
  }
})
</script>