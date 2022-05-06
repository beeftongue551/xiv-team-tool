<template>
  <div class="search">
    <v-form>
      <v-container>
        <v-row>
          <v-col
              cols="12"
              md="4"
          >
            <v-text-field v-model="characterName" label="キャラクター名" />
          </v-col>
          <v-col
              cols="12"
              md="3"
          >
            <v-autocomplete v-model="dataCenter" :items="dataCenters" dense filled label="DC" @update:search="changedDataCenter"/>
          </v-col>
          <v-col
              cols="12"
              md="3"
          >
            <v-autocomplete v-model="server" :items="servers" dense filled label="サーバー" @change="changedDataCenter"/>
          </v-col>
          <v-col
            cols="12"
            md="1"
          >
            <v-btn
                class="mx-2"
                fab
                dark
                color="teal"
                @click="searchCharacter"
            >
              <v-icon
                  large
                  dark
                  color="white"
              >
                mdi-magnify
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import {getCharactersData} from "@/module/XIVApiModule";
import {useStore} from "vuex";

export default defineComponent({
  name: 'characterSearch',
  setup() {
    const store = useStore()

    const characterName = ref("")
    const dataCenters = ref(['Mana','Gaia','Elemental'])
    const dataCenter = ref("")
    const dataCenterServers = ref({
      Mana:["Anima","Asura","Belias","Chocobo","Hades","Ixion","Mandragora","Masamune","Pandaemonium","Shinryu","Titan"],
      Gaia:["Alexander","Bahamut","Durandal","Fenrir","Ifrit","Ridill","Tiamat","Ultima","Valefor","Yojimbo","Zeromus"],
      Elemental:["Aegis","Atomos","Carbuncle","Garuda","Gungnir","Kujata","Ramuh","Tonberry","Typhon","Unicorn"],
    })
    let servers = ref([])
    const server = ref("")
    //let charactersData =  ref([])

    /**
     * データセンタの値が変更された際に選択できるサーバを決定する
     * @return {void}
     */
    const changedDataCenter = () => {
      server.value = ''
      servers.value = dataCenterServers.value[dataCenter.value]
    }

    /**
     * キャラクターを検索しstoreに情報を格納する
     * @return {Promise<void>}
     */
    const searchCharacter = async () => {
      store.dispatch('updateIsLoading', true)
      const response = await getCharactersData(characterName.value, server.value)
      store.dispatch('character/updateCharactersData', response.Results)
      store.dispatch('character/updateNameText', characterName)
      store.dispatch('character/updateServerText', server)
      store.dispatch('pagination/updatePagination', response.Pagination)
      store.dispatch('updateIsLoading', false)
    }

    return {
      characterName,
      server,
      servers,
      dataCenter,
      dataCenters,
      searchCharacter,
      changedDataCenter
    }
  }
})
</script>