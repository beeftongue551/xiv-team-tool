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
          <td @click="openCharacterDetail(character.ID)">{{character.Name}}</td>
          <td>{{character.Lang}}</td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination
      :model-value="pagination.Page"
      :length="pagination.PageTotal"
      @update:modelValue ="updatePage"
    >
    </v-pagination>
    <LoadingCircular />
  </div>
</template>

<script>
import {computed, defineComponent, watch} from "vue";
import {useStore} from "vuex";
import {getCharacterDetail, getCharactersData} from "@/module/XIVApiModule";
import LoadingCircular from "@/components/LoaingCircular";

export default defineComponent({
  components: {LoadingCircular},
  setup() {
    const store = useStore()

    watch(() => store.getters["character/getCharactersData"])
    watch(() => store.getters["pagination/getPagination"])

    /**
     * ページネーションでページが更新された際に該当するページのキャラクタデータを取得する
     * @param {number} page ページ番号
     * @return {Promise<void>}
     */
    const updatePage = async (page) => {
      store.dispatch('updateIsLoading', true)
      const response = await getCharactersData(store.getters["character/getNameText"], store.getters["character/getServerText"], page)
      store.dispatch('character/updateCharactersData', response.Results)
      store.dispatch('pagination/updatePagination', response.Pagination)
      store.dispatch('updateIsLoading', false)
    }

    /**
     * キャラクタの詳細情報を検索しstoreに格納する
     * @param {number} id ID
     * @return {Promise<void>}
     */
    const openCharacterDetail = async (id) => {
      const response = await getCharacterDetail(id)
      console.log(response)
      store.dispatch('character/updateCharacterDetail', response)
      store.dispatch('updateOpenModal', true)
    }

    return {
      characters: computed(() => store.getters["character/getCharactersData"]),
      pagination: computed(() => store.getters["pagination/getPagination"]),
      openCharacterDetail,
      updatePage
    }
  }
})
</script>