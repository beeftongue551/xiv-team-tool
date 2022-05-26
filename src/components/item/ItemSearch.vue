<template>
  <div>
    <v-form>
      <v-container>
        <v-row >
          <v-col cols="12" md="5">
            <v-text-field v-model="itemName" label="アイテム名" @keyup.prevent.enter.exact="itemSearch"/>
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
import {useStore} from "vuex";
import SearchFailure from "@/components/SearchFailure";
import {getMarketableItemByName} from "@/module/BeefApi/ItemModule";
import {getMarketByIDs} from "@/module/UniversalisApiModule";

export default defineComponent({
  name: "ItemSearch",
  components: {SearchFailure},
  setup(props, { emit }) {
    const store = useStore()

    const itemName = ref('')
    const dataCenters = ref(['Mana','Gaia','Elemental'])
    const dataCenter = ref('Mana')
    let itemsData = ref([])
    let snackbar = ref(false)

    /**
     * アイテム検索を行いstoreに情報を格納する
     * @return {Promise<void>}
     */
    const itemSearch = async () => {
      store.dispatch('updateIsLoading', true)

      //入力不備がある場合の処理
      if(itemName.value === '' || dataCenter.value === ''){
        snackbar.value = true
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

    return {
      itemName,
      dataCenters,
      dataCenter,
      itemsData,
      snackbar,
      itemSearch,
    }
  }
})
</script>