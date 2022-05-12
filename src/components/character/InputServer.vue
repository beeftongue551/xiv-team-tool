<template>
  <v-autocomplete v-model="dataCenter" :items="dataCenters" dense filled label="DC" @update:search="changedDataCenter" />
  <v-autocomplete v-model="server" :items="servers" dense filled label="サーバー" @update:search="changedServer"/>
</template>

<script>
import {defineComponent, ref} from "vue"

export default defineComponent({
  name: "InputServer",
  setup(prop, { emit }) {
    const dataCenters = ref(['Mana','Gaia','Elemental'])
    const dataCenter = ref("")
    const dataCenterServers = ref({
      Mana:["Anima","Asura","Belias","Chocobo","Hades","Ixion","Mandragora","Masamune","Pandaemonium","Shinryu","Titan"],
      Gaia:["Alexander","Bahamut","Durandal","Fenrir","Ifrit","Ridill","Tiamat","Ultima","Valefor","Yojimbo","Zeromus"],
      Elemental:["Aegis","Atomos","Carbuncle","Garuda","Gungnir","Kujata","Ramuh","Tonberry","Typhon","Unicorn"],
    })
    let servers = ref([])
    const server = ref("")

    /**
     * データセンタの値が変更された際に選択できるサーバを決定する
     * @return {void}
     */
    const changedDataCenter = () => {
      server.value = ''
      servers.value = dataCenterServers.value[dataCenter.value]
    }

    const changedServer = () => {
      emit('change-server',server.value)
    }



    return {
      server,
      servers,
      dataCenter,
      dataCenters,

      changedDataCenter,
      changedServer
    }
  }
})
</script>

<style scoped>
</style>