<template>
  <div v-if="recipe.id">
    <v-card>
      <v-card-header>
        <v-card-header-text>{{recipe.itemName}}</v-card-header-text>
      </v-card-header>
      <v-card-text class="text-left">
        作成JOB {{recipe.job}}
      </v-card-text>
      <v-table>
        <tbody>
          <tr v-for="i in 10" :key="i" v-show="recipe['ingredient'+(i-1)]">
            <td>{{recipe['ingredient' + (i-1) + 'Name']}}</td>
            <td>必要個数: {{recipe['amountIngredient' + (i-1)]}}</td>
            <td>必要ギル: {{recipe['ingredient' + (i-1) + 'Gill']}}</td>
          </tr>
        </tbody>
      </v-table>
      <v-card-text>一つあたりの最小経費：{{gillParOne}} ギル</v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="closeRecipe">close</v-btn>
        <v-spacer />
        <v-btn color="warning" @click="detailRecipe">詳細レシピ</v-btn>
      </v-card-actions>
    </v-card>
    <SearchFailure :is-open="snackbar" msg="未実装の機能です"/>
  </div>
</template>

<script>
import {defineComponent, ref, toRefs, watch} from "vue";
import {useStore} from "vuex";
import SearchFailure from "@/components/SearchFailure";
import {getItemById} from "@/module/BeefApi/ItemModule";
import {getMarketByIDs} from "@/module/UniversalisApiModule";
import XivIcon from "@/components/XivIcon";

export default defineComponent({
  name: "RecipeCard",
  // eslint-disable-next-line vue/no-unused-components
  components: {XivIcon, SearchFailure},
  props:['recipeData'],
  setup(props) {
    const { recipeData } = toRefs(props)

    const store = useStore()
    let recipe = ref({})
    let amount = ref(0)
    let gillParOne = ref(0)
    let snackbar = ref(false)

    watch(recipeData,async () => {
      store.dispatch('updateIsLoading', true)

      recipe.value = recipeData.value
      let totalGill = 0

      recipe.value.itemName = (await getItemById(recipe.value.itemId)).itemName

      for (let i = 0; i < 10; i++) {
        const ingredientId = recipe.value['ingredient' + i]
        if(ingredientId === 0) {
          continue
        }
        const ingredientData = await getItemById(ingredientId)
        recipe.value['ingredient' + i + 'Name'] = ingredientData.itemName
        recipe.value['ingredient' + i + 'Icon'] = ingredientData.itemIcon
        const ingredientMarketData = await getMarketByIDs([ingredientId], 'Mana')
        recipe.value['ingredient' + i + 'Gill'] = ingredientMarketData.minPrice *  recipe.value['amountIngredient' + i]
        totalGill += recipe.value['ingredient' + i + 'Gill']
      }

      gillParOne.value = totalGill / recipe.value.amountResult
      gillParOne.value = gillParOne.value.toFixed(1)

      store.dispatch('updateIsLoading', false)
    })

    /**
     * 保持しているレシピ情報を削除し、レシピ表示を閉じる
     */
    const closeRecipe = () => {
      recipe.value = {}
    }

    /**
     * TODO: レシピ詳細ページへ遷移する処理
     */
    const detailRecipe = () => {
      snackbar.value = true
    }

    return {
      recipe,
      amount,
      gillParOne,
      snackbar,

      closeRecipe,
      detailRecipe
    }
  }
})
</script>