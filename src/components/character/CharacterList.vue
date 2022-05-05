<template>
  <div v-show="characters !== undefined">
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Icon</th>
          <th class="text-left">Name</th>
          <th class="text-left">Lang</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="character in characters"
          :key="character.ID"
        >
          <td width="96">
            <v-avatar size="x-large">
              <v-img
                :src="character.Avatar"
              />
            </v-avatar>
          </td>
          <td>{{character.Name}}</td>
          <td>{{character.Lang}}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import {computed, defineComponent, watch} from "vue";
import {useStore} from "vuex";

export default defineComponent({
  setup() {
    const store = useStore()

    watch(() => store.getters["character/getCharactersData"], function () {
      console.log("characters update")
    })

    return {
      characters: computed(() => store.getters["character/getCharactersData"])
    }
  }
})
</script>