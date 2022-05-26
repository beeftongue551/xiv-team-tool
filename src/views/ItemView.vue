<template>
  <div>
    <h1>ItemSearch</h1>
    <ItemSearch @update-items="getItemsData"/>
    <RecipeCard :recipe-data="recipeData" />
    <ItemList :items-data="itemsData" @update-recipe="getRecipeData" />
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import ItemSearch from "@/components/item/ItemSearch";
import RecipeCard from "@/components/item/RecipeCard";
import ItemList from "@/components/item/ItemList";

export default defineComponent({
  name: "ItemView",
  components: {ItemList, RecipeCard, ItemSearch},
  setup() {
    const itemsData = ref([])
    const recipeData = ref({})

    const getItemsData = (...updateItems) => {
      itemsData.value = updateItems[0]
    }

    const getRecipeData = (...updateRecipe) => {
      recipeData.value = updateRecipe[0]
    }

    return {
      itemsData,
      recipeData,
      getItemsData,
      getRecipeData
    }
  }
})
</script>