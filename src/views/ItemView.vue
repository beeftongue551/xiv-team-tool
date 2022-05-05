<template>
  <div>
    <h1>ItemSearch</h1>
    <ItemSearch />
    <RecipeCard />
    <ItemList />
  </div>
</template>

<script>
import {defineComponent} from "vue";
import ItemSearch from "@/components/item/ItemSearch";
import RecipeCard from "@/components/item/RecipeCard";
import ItemList from "@/components/item/ItemList";

export default defineComponent({
  name: "ItemView",
  components: {ItemList, RecipeCard, ItemSearch}
})
</script>