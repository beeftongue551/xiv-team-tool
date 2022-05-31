<template>
  <div v-if="recipe.id" id="recipe-card">
    <v-card id="recipe-card">
      <v-card-header>
        <v-card-header-text><h3><XivIcon :icon="recipe.itemIcon" size="30" />{{recipe.itemName}}</h3></v-card-header-text>
      </v-card-header>
      <v-card-text class="text-left">
        <v-container>
          <v-row no-gutters>
            <v-col
              cols = 6 class="d-flex align-center">
              作成JOB: {{recipe.job}}
              <XivIcon :icon="recipe.jobIcon" size="20" />
            </v-col>
            <v-col
              cols = 6>
              <div v-if="recipe.recipeBook !== ''" class="text-right">
                秘伝書: {{recipe.recipeBook}}
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-table>
        <tbody>
          <tr v-for="i in 10" :key="i" v-show="recipe['ingredient'+(i-1)]">
            <td>{{recipe['ingredient' + (i-1) + 'Name']}}</td>
            <td>必要個数: {{recipe['amountIngredient' + (i-1) + 'Result']}}</td>
            <td>必要ギル: {{recipe['ingredient' + (i-1) + 'GillResult']}}</td>
          </tr>
        </tbody>
      </v-table>
      <v-card-text>
        <v-container>
          <v-row no-gutters>
            <v-col>
              一つあたりの最小経費：{{gillParOne}} ギル
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              合計の経費：{{totalGill}} ギル
            </v-col>

          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-btn color="error" @click="closeRecipe">close</v-btn>
            </v-col>
            <v-col cols="5">
              <VueNumberInput v-model="amountResult" :min="minAmount" :step="recipe.amountResult" @update:modelValue="updateAmount" controls/>
            </v-col>
            <v-col cols="3">
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {defineComponent, ref, toRefs, watch} from "vue";
import {useStore} from "vuex";
import SearchFailure from "@/components/SearchFailure";
import {getItemById} from "@/module/BeefApi/ItemModule";
import {getMarketByIDs} from "@/module/UniversalisApiModule";
import XivIcon from "@/components/XivIcon";
import VueNumberInput from "@chenfengyuan/vue-number-input";

export default defineComponent({
  name: "RecipeCard",
  // eslint-disable-next-line vue/no-unused-components
  components: {XivIcon, SearchFailure, VueNumberInput},
  props:['recipeData', 'dataCenter'],
  setup(props) {
    const { recipeData } = toRefs(props)

    const store = useStore()

    const recipe = ref({})
    const amount = ref(0)
    const totalGill = ref(0)
    const gillParOne = ref(0)
    const snackbar = ref(false)

    const minAmount = ref(1)
    const amountResult = ref(1)

    watch(recipeData,async () => {
      store.dispatch('updateIsLoading', true)

      recipe.value = recipeData.value
      const itemData = await getItemById(recipe.value.itemId)
      recipe.value.itemName = itemData.itemName
      recipe.value.itemIcon = itemData.itemIcon
      const ingredientIds = []
      for (let i = 0; i < 10; i++) {
        const ingredientId = recipe.value['ingredient' + i]
        if(ingredientId === 0) {
          continue
        }
        ingredientIds.push(ingredientId)
        const ingredientData = await getItemById(ingredientId)
        recipe.value['ingredient' + i + 'Name'] = ingredientData.itemName
        recipe.value['ingredient' + i + 'Icon'] = ingredientData.itemIcon
        recipe.value['amountIngredient' + i + 'Result'] = recipe.value['amountIngredient' + i]
      }
      minAmount.value = recipe.value.amountResult
      amountResult.value = recipe.value.amountResult
      const ingredientMarketData = await getMarketByIDs(ingredientIds, props.dataCenter)

      for (let i = 0; i < 10; i++) {
        const ingredientId = recipe.value['ingredient' + i]
        if(ingredientId === 0) {
          continue
        }
        recipe.value['ingredient' + i + 'Gill'] = ingredientMarketData.items[ingredientId].minPrice *  recipe.value['amountIngredient' + i]
        recipe.value['ingredient' + i + 'GillResult'] = recipe.value['ingredient' + i + 'Gill']
        totalGill.value += recipe.value['ingredient' + i + 'Gill']
      }

      gillParOne.value = totalGill.value / recipe.value.amountResult
      gillParOne.value = gillParOne.value.toFixed(1)

      recipeScroll()

      store.dispatch('updateIsLoading', false)
    })

    const updateAmount = () => {
      if(amountResult.value % recipe.value.amountResult !== 0) {
        amountResult.value +=  recipe.value.amountResult - (amountResult.value % recipe.value.amountResult)
      }

      const count = amountResult.value / recipe.value.amountResult
      totalGill.value = 0
      for (let i = 0; i < 10; i++) {
        recipe.value['amountIngredient' + i + 'Result'] = recipe.value['amountIngredient' + i] * count
        recipe.value['ingredient' + i + 'GillResult'] = recipe.value['ingredient' + i + 'Gill'] * count
        if(isNaN(recipe.value['ingredient' + i + 'GillResult'])){
          continue
        }
        totalGill.value += recipe.value['ingredient' + i + 'GillResult']
      }
    }

    const recipeScroll = () => {
      const recipeElement = document.getElementById("recipe-card")
      const recipePosition = recipeElement.getBoundingClientRect().top + 50
      window.scrollTo({
        top: recipePosition,
        behavior: 'smooth'
      })
    }

    /**
     * 保持しているレシピ情報を削除し、レシピ表示を閉じる
     */
    const closeRecipe = () => {
      recipe.value = {}
    }


    return {
      recipe,
      amount,
      totalGill,
      gillParOne,
      snackbar,

      minAmount,
      amountResult,

      updateAmount,
      closeRecipe
    }
  }
})
</script>