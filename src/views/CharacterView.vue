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
export default {
  name: "CharacterView",
  components: {CharacterList, CharacterSearch, CharacterModal}
}
</script>

<style scoped>

</style>