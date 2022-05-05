<template>
  <div>
    <h1>CharacterSearch</h1>
    <CharacterSearch />
    <CharacterList />
  </div>
</template>

<script>
import CharacterSearch from "@/components/character/CharacterSearch";
import CharacterList from "@/components/character/CharacterList";
export default {
  name: "CharacterView",
  components: {CharacterList, CharacterSearch}
}
</script>

<style scoped>

</style>