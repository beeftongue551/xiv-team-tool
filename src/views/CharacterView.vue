<template>
  <div>
    <h1>CharacterSearch</h1>
    <CharacterModal />
    <CharacterSearch />
    <CharacterList />
  </div>
</template>

<script>
import CharacterSearch from "@/components/character/CharacterSearch";
import CharacterList from "@/components/character/CharacterList";
import CharacterModal from "@/components/character/CharacterModal";
import {defineComponent, onMounted} from "vue";
import {useStore} from "vuex";
export default defineComponent ({
  name: "CharacterView",
  components: {CharacterList, CharacterSearch, CharacterModal},
  setup() {
    const store = useStore()
    onMounted(()=> {
      store.dispatch('character/updateCharactersData', {})
    })

    return {
    }
  }
})
</script>

<style scoped>

</style>