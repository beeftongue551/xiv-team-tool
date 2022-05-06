<template>
  <div>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel
        v-for="itemData in itemsData"
        :key="itemData.id"
      >
        <v-expansion-panel-title>
          {{itemData.name}}
          <v-spacer />
          IL: {{itemData.itemLevel}}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-container>
            <v-row no-gutters>
              <v-col
                cols="12"
                sm="4"
              >
                更新時間: {{itemData.lastUploadTime}}
              </v-col>
              <v-col
                  cols="12"
                  sm="4"
              >
                最安値：{{itemData.minPrice}}
              </v-col>
              <v-col
                  cols="12"
                  sm="4"
              >
                販売サーバー：{{itemData.minServer}}
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col
                  cols="12"
                  sm="4"
              >
                平均値：{{itemData.averagePrice}}
              </v-col>
              <v-col
                  cols="12"
                  sm="4"
              >
                HQ最安値：{{itemData.minPriceHQ}}
              </v-col>
              <v-col
                cols="12"
                sm="4"
              >
                <v-btn color="secondary" @click="openRecipe(itemData.id)">
                  レシピ検索
                  <v-icon
                  large
                  color="white"
                  >
                    mdi-magnify
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import {computed, defineComponent, watch} from "vue";
import {useStore} from "vuex";
import {getRecipeByItemID} from "@/module/XIVApiModule";

export default defineComponent({
  name: "ItemList",
  setup () {
    const store = useStore()
    watch(() => store.getters['item/getItemsData'])

    const openRecipe = async (id) => {
      const recipeData = await getRecipeByItemID(id)
      store.dispatch('recipe/updateRecipeData', recipeData)
    }

    return {
      itemsData: computed(() => store.getters['item/getItemsData']),
      openRecipe
    }
  }
})
</script>