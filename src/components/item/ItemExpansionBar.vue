<template>
  <v-card
    class="pa-2"
    outlined
    tile
    elevation="16"
    color="#C0C0C0"
  >
    <v-row no-gutters @click="onClickTitle(itemData.id)">
      <v-col
        cols="1"
        sm="1"
        class="d-flex align-center"
      >
        <XivIcon :icon="itemData.itemIcon" size="40" :debug="true"/>
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
            <h4>{{itemData.itemName}}</h4>
          </v-col>
          <v-col
            cols="2"
            sm="2"
            class="text-center"
          >
            IL: {{itemData.itemLevel}}
          </v-col>
          <v-col
            cols="2"
            sm="2"
            class="text-right"
          >
            LV: {{itemData.equipmentLevel}}
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col
            cols="12"
            sm="4"
            class="d-flex align-center"
          >
            {{itemData.itemCategory}}
            <XivIcon :icon="itemData.itemCategoryIcon" size="20"/>
          </v-col>
          <v-col
            cols="12"
            sm="8"
            class="align-center text-right">
            {{itemData.jobCategoryName}}
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="content" v-show="active">
      <v-divider class="mx-4"></v-divider>
      <v-container>
        <v-row no-gutters>
          <v-col
            cols="12"
            sm="4"
          >
            最安値：<b>{{marketData.minPrice}}</b>
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            販売サーバー：{{marketData.listings[0].worldName}}
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            HQ最安値：{{marketData.minPriceHQ}}
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col
            cols="7"
            sm="4"
          >
            平均価格：{{marketData.averagePrice}}
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
            <v-btn color="secondary" @click="openRecipe(itemData.recipeId)" v-if="itemData.recipeId">
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
        <v-label>更新時間: {{marketData.lastUploadTime}}</v-label>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import {defineComponent} from "vue"
import {ref} from "vue";
import {getRecipeByRecipeId} from "@/module/BeefApi/RecipeModule";
import XivIcon from "@/components/XivIcon";

export default defineComponent({
  name: "ItemExpansionBar",
  components: {XivIcon},
  props: ['itemData', 'marketData'],
  setup(props, {emit}) {
    const active = ref(false)
    const onClickTitle = () => {
      active.value = !active.value
    }

    const openRecipe = async (id) => {
      const recipeData = await getRecipeByRecipeId(id)
      emit('update-recipe', recipeData)
    }

    return {
      active,
      onClickTitle,
      openRecipe
    }
  }
})
</script>

<style scoped>
</style>