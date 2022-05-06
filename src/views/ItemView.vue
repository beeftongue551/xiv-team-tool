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
import {useStore} from "vuex";
import {computed, onMounted} from "vue";

export default defineComponent({
  name: "ItemView",
  components: {ItemList, RecipeCard, ItemSearch},
  setup() {
    const store = useStore()
    onMounted(()=> {
      store.dispatch('item/updateItemsData', {})
    })

    return {
      itemsData: computed(() => store.getters['item/getItemsData'])
    }
  }
})
</script>