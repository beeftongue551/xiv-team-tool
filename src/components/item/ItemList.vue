<template>
  <div>
    <v-expansion-panels variant="accordion" v-if="items !== {}">
      <v-expansion-panel
        v-for="item in items"
        :key="item.itemData.id"
      >
        <v-expansion-panel-title
          collapse-icon="mdi-store"
        >
          <v-row no-gutters>
            <v-col
              cols="12"
              sm="1"
              class="d-flex align-center"
            >
              <XivIcon :icon="item.itemData.itemIcon" size="40" debug="true" />
            </v-col>
            <v-col
              cols="12"
              sm="11"
            >
              <v-row no-gutters>
                <v-col
                  cols="12"
                  sm="8"
                  class="d-flex align-center"
                >
                  <h4>{{item.itemData.itemName}}</h4>
                </v-col>
                <v-col
                  cols="12"
                  sm="2"
                  class="d-flex align-center"
                >
                  IL: {{item.itemData.itemLevel}}
                </v-col>
                <v-col
                  cols="12"
                  sm="2"
                  class="d-flex align-center"
                >
                  装備LV: {{item.itemData.equipmentLevel}}
                </v-col>
              </v-row>
              <br>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  sm="8"
                  class="d-flex align-center"
                >
                  {{item.itemData.itemCategory}}
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                  class="text-right">
                  {{item.itemData.jobCategoryName}}
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-container>
            <v-row no-gutters>
              <v-col
                cols="12"
                sm="4"
              >
                最安値：{{item.marketData.minPrice}}
              </v-col>
              <v-col
                  cols="12"
                  sm="4"
              >
                販売サーバー：{{item.marketData.listings[0].worldName}}
              </v-col>
              <v-col
                  cols="12"
                  sm="4"
                  v-if="item.marketData.minPriceHQ"
              >
                HQ最安値：{{item.marketData.minPriceHQ}}
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col
                  cols="12"
                  sm="4"
              >
                平均値：{{item.marketData.averagePrice}}
              </v-col>
              <v-col
                  cols="12"
                  sm="4"
              >

              </v-col>
              <v-col
                cols="12"
                sm="4"
              >
                <v-btn color="secondary" @click="openRecipe(item.itemData.recipeId)" v-if="item.itemData.recipeId">
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
            <v-row no-gutters>
              <v-spacer />
              <v-label>更新時間: {{item.marketData.lastUploadTime}}</v-label>
            </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import {defineComponent, ref, toRefs, watch} from "vue";
import XivIcon from "@/components/XivIcon";
import dayjs from "dayjs";
import {getRecipeByRecipeId} from "@/module/BeefApi/RecipeModule";

export default defineComponent({
  name: "ItemList",
  // eslint-disable-next-line vue/no-unused-components
  components: {XivIcon},
  props: ['itemsData'],
  setup (props, { emit }) {
    const { itemsData } = toRefs(props)

    const items = ref({})

    watch(itemsData, () => {
      items.value = itemsData.value
      for (let i = 0; i < items.value.length; i++) {
        if(items.value[i].marketData === undefined) {
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
    })

    /**
     * レシピ情報の検索を行い、レシピ情報をストアに格納する処理
     * @param {number} id アイテムID
     * @return {Promise<void>}
     */
    const openRecipe = async (id) => {
      const recipeData = await getRecipeByRecipeId(id)
      emit('update-recipe', recipeData)
    }


    return {
      items,
      openRecipe
    }
  }
})
</script>