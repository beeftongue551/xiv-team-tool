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
    <v-pagination
      :length="pagination.PageTotal"
      @update:modelValue ="updatePage"
    >

    </v-pagination>
  </div>
</template>

<script>
import {computed, defineComponent, watch} from "vue";
import {useStore} from "vuex";
import {getCharactersData} from "@/module/XIVApiModule";

export default defineComponent({
  setup() {
    const store = useStore()

    watch(() => store.getters["character/getCharactersData"])
    watch(() => store.getters["pagination/getPagination"])

    const updatePage = async (page) => {
      console.log(page)
      const response = await getCharactersData(store.getters["character/getNameText"], store.getters["character/getServerText"], page)
      store.dispatch('character/updateCharactersData', response.Results)
      store.dispatch('pagination/updatePagination', response.Pagination)
    }

    return {
      characters: computed(() => store.getters["character/getCharactersData"]),
      pagination: computed(() => store.getters["pagination/getPagination"]),
      updatePage
    }
  }
})
</script>