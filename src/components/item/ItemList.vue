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
          <FavoriteStar
            :favorite="userData.favoriteItemId.includes(itemData.id)"
            @click="changeFavorite(itemData.id)"
            v-if="userData.id !==0" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import {computed, defineComponent, watch, ref, onBeforeUnmount} from "vue";
import {useStore} from "vuex";
import {getRecipeByItemID} from "@/module/XIVApiModule";
import FavoriteStar from "@/components/FavoriteStar";
import {updateUserCharacter} from "@/module/BeefApiModule";

export default defineComponent({
  name: "ItemList",
  components: {FavoriteStar},
  setup () {
    const store = useStore()
    const userData = ref(store.getters["user/getUserCharacter"])
    const defaultFavorite = userData.value.favoriteItemId
    watch(() => store.getters['item/getItemsData'])

    /**
     * レシピ情報の検索を行い、レシピ情報をストアに格納する処理
     * @param {number} id
     * @return {Promise<void>}
     */
    const openRecipe = async (id) => {
      const recipeData = await getRecipeByItemID(id)
      store.dispatch('recipe/updateRecipeData', recipeData)
    }

    const changeFavorite = (id) => {
      if(userData.value.favoriteItemId.includes(id)) {
        userData.value.favoriteItemId = userData.value.favoriteItemId.filter((item) => {
          return item !== id
        })
      } else {
        userData.value.favoriteItemId.push(id)
      }
    }

    onBeforeUnmount(() => {
      if(userData.value.id !== 0 && userData.value.favoriteItemId !== defaultFavorite) {
        updateUserCharacter(userData.value)
      }
    })

    return {
      itemsData: computed(() => store.getters['item/getItemsData']),
      userData,

      changeFavorite,
      openRecipe
    }
  }
})
</script>