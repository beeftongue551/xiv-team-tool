<template>
  <div v-show="recipeData.name">
    <v-card>
      <v-card-header>
        <v-card-header-text>{{recipeData.name}}</v-card-header-text>
      </v-card-header>
      <v-card-text>作成JOB {{recipeData.job}}</v-card-text>
      <v-table>
        <tbody>
        <tr
          v-for="itemIngredient in recipeData.itemIngredients"
          :key="itemIngredient.name"
        >
          <td >{{itemIngredient.name}}</td>
          <td>必要個数：{{itemIngredient.amountResult}}</td>
          <td>必要ギル：{{itemIngredient.gill}}</td>
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
import {defineComponent, ref, watch} from "vue";
import {useStore} from "vuex";
import {getMarketByIDs} from "@/module/UniversalisApiModule";
import SearchFailure from "@/components/SearchFailure";

export default defineComponent({
  name: "RecipeCard",
  components: {SearchFailure},
  setup() {
    const store = useStore()
    let recipeData = ref({})
    let amount = ref(0)
    let gillParOne = ref(0)
    let snackbar = ref(false)

    watch(() => store.getters['recipe/getRecipeData'],async (newVal) => {
      recipeData.value = newVal
      const itemIngredients = []
      let totalGill = 0
      for (const itemIngredient of recipeData.value.itemIngredients) {
        itemIngredient["amountResult"] = itemIngredient.amount
        const marketData =  await getMarketByIDs([itemIngredient.id], 'Mana')
        itemIngredient["gill"] = marketData.minPrice * itemIngredient.amountResult
        totalGill += marketData.minPrice * itemIngredient.amountResult
        itemIngredients.push(itemIngredient)
      }
      recipeData.value.itemIngredients = itemIngredients
      amount.value = recipeData.value.amountResult
      gillParOne.value = totalGill / amount.value
      gillParOne.value = gillParOne.value.toFixed(0)
    })

    const closeRecipe = () => {
      recipeData.value = {}
    }

    const detailRecipe = () => {
      snackbar.value = true
    }

    return {
      amount,
      recipeData,
      gillParOne,
      snackbar,

      closeRecipe,
      detailRecipe
    }
  }
})
</script>