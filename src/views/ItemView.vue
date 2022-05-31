<template>
  <div>
    <TitleBar main-title="MARKET" sub-title="マーケット検索" icon="mdi-store"/>
    <ItemSearch @update-items="getItemsData"/>
    <RecipeCard :recipe-data="recipeData" :data-center="searchData.dataCenter"/>
    <ItemList :items-data="itemsData" :search-data="searchData" @update-recipe="getRecipeData" />
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import ItemSearch from "@/components/item/ItemSearch";
import RecipeCard from "@/components/item/RecipeCard";
import ItemList from "@/components/item/ItemList";
import TitleBar from "@/components/TitleBar";

export default defineComponent({
  name: "ItemView",
  components: {TitleBar, ItemList, RecipeCard, ItemSearch},
  setup() {
    const itemsData = ref([])
    const searchData = ref({})
    const recipeData = ref({})

    const getItemsData = (...updateItems) => {
      itemsData.value = updateItems[0]
      searchData.value = updateItems[1]
    }

    const getRecipeData = (...updateRecipe) => {
      recipeData.value = updateRecipe[0]
    }

    return {
      itemsData,
      searchData,
      recipeData,
      getItemsData,
      getRecipeData
    }
  }
})
</script>