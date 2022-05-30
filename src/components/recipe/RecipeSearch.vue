<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="itemName" label="アイテム名" />
        </v-col>
        <v-col cols="12" md="6" >
          <v-select v-model="dataCenter" :items="dataCenters" dense filled label="DC" @update:search="changedDataCenter">
            <template v-slot:append>
              <v-btn
                class="mx-2"
                fab
                dark
                color="teal"
                @click="recipeSearch"
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
    </v-container>
  </v-form>
</template>

<script>
import {defineComponent, ref} from "vue"
import {useStore} from "vuex";
import {getCraftableItemByName} from "@/module/BeefApi/ItemModule";
import {getMarketByIDs} from "@/module/UniversalisApiModule";

export default defineComponent({
  name: "RecipeSearch",
  setup(props, { emit }) {

    const itemName = ref('')
    const dataCenters = ref(['Mana','Gaia','Elemental'])
    const dataCenter = ref('Mana')
    const snackbar = ref(false)

    const store = useStore()

    /**
     * レシピ検索を行い親コンポーネントに検索結果を渡す
     *
     * @return {Promise<void>}
     */
    const recipeSearch = async () => {
      store.dispatch('updateIsLoading', true)

      // 入力不備がある場合の処理
      if(itemName.value === '' || dataCenter.value === ''){
        snackbar.value = true
        store.dispatch('updateIsLoading', false)
        return
      }

      const craftableItemData = await getCraftableItemByName(itemName.value)

      const itemsIds = []
      craftableItemData.items.forEach((item) => {
        itemsIds.push(item.id)
      })
      const marketData = await getMarketByIDs(itemsIds, dataCenter.value)
      const itemsData =[]
      craftableItemData.items.forEach((itemData) => {
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
      craftableItemData.items = itemsData

      const searchData = {
        isDetail: false,
        itemName: itemName.value,
        dataCenter: dataCenter.value,
        jobAbbreviation: '',
        jobLevel: 0
      }

      emit('update-items', craftableItemData, searchData)
      store.dispatch('updateIsLoading', false)
    }

    return {
      itemName,
      dataCenter,
      dataCenters,

      recipeSearch
    }
  }
})
</script>

<style scoped>
</style>