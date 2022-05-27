<template>
  <div>
    <div  v-for="item in items" :key="item.itemData.id">
      <div>
        <v-container>
          <v-card
            class="pa-2"
            outlined
            tile
            elevation="16"
            color="#C0C0C0"
          >
            <v-row no-gutters @click="onClickTitle(item.itemData.id)">
              <v-col
                cols="1"
                sm="1"
                class="d-flex align-center"
              >
                <XivIcon :icon="item.itemData.itemIcon" size="40"/>
              </v-col>
              <v-col
                cols="11"
                sm="11"
              >
                <v-row no-gutters>
                  <v-col
                    cols="8"
                    sm="8"
                  >
                    <h4>{{item.itemData.itemName}}</h4>
                  </v-col>
                  <v-col
                    cols="2"
                    sm="2"
                    class="text-center"
                  >
                    IL: {{item.itemData.itemLevel}}
                  </v-col>
                  <v-col
                    cols="2"
                    sm="2"
                    class="text-right"
                  >
                    LV: {{item.itemData.equipmentLevel}}
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col
                    cols="12"
                    sm="4"
                    class="d-flex align-center"
                  >
                    {{item.itemData.itemCategory}}
                    <XivIcon :icon="item.itemData.itemCategoryIcon" size="20"/>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="8"
                    class="align-center text-right">
                    {{item.itemData.jobCategoryName}}
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <transition name="fade">
              <div class="content" v-show="item.active">
                <v-divider class="mx-4"></v-divider>
                <v-container>
                  <v-row no-gutters>
                    <v-col
                      cols="12"
                      sm="4"
                    >
                      最安値：<b>{{item.marketData.minPrice}}</b>
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
                    >
                      HQ最安値：{{item.marketData.minPriceHQ}}
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col
                      cols="7"
                      sm="4"
                    >
                      平均価格：{{item.marketData.averagePrice}}
                    </v-col>
                    <v-col
                      cols="1"
                      sm="4"
                    >
                    </v-col>
                    <v-col
                      cols="4"
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
              </div>
            </transition>
          </v-card>
        </v-container>
      </div>
    </div>
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
        items.value[i].active = false
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

    const active = ref(false)
    const onClickTitle = (id) => {
      for (let i = 0; i < items.value.length; i++) {
        if(items.value[i].itemData.id === id){
          items.value[i].active = !items.value[i].active
        }
      }
    }

    return {
      items,
      openRecipe,
      active,
      onClickTitle
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