<template>
  <div>
    <v-dialog
      v-model="openModal"
      hide-overlay
      fullscreen="true"
    >
      <CharacterDetail :characterID="characterDetail.ID" />
    </v-dialog>
  </div>
</template>

<script>
import {defineComponent, watch} from "vue";
import {useStore} from "vuex";
import {computed} from "vue";
import CharacterDetail from "@/components/character/CharacterDetail";

export default defineComponent({
  name: "CharacterModal",
  components: {CharacterDetail},
  setup() {
    const store = useStore()

    watch(() => store.getters["getOpenModal"])
    watch(() => store.getters["character/getCharacterDetail"])

    return {
      openModal: computed(() => store.getters["getOpenModal"]),
      characterDetail: computed(() => store.getters["character/getCharacterDetail"])
    }
  }
})
</script>