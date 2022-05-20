<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="8">
          <v-text-field v-model="itemName" label="アイテム名" />
        </v-col>
        <v-col cols="12" md="4">
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
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import {defineComponent, ref} from "vue"
import {getRecipeByName} from "@/module/XIVApiModule";

export default defineComponent({
  name: "RecipeSearch",
  setup(props, { emit }) {
    const itemName = ref('')

    /**
     * レシピ検索を行い親コンポーネントに検索結果を渡す
     *
     * @return {Promise<void>}
     */
    const recipeSearch = async () => {
      const recipesData = await getRecipeByName(itemName.value)
      emit('recipes', recipesData)
    }

    return {
      itemName,

      recipeSearch
    }
  }
})
</script>

<style scoped>
</style>