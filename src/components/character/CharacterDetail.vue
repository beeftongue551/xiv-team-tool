<template>
      <v-card>
        <v-toolbar
            dark
            color="primary"
        >
          <v-btn
              icon
              dark
              @click="modalClose"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{characterDetail.Name}}</v-toolbar-title>
        </v-toolbar>
        <v-list
            three-line
            subheader
        >
          <v-subheader>JOB: {{activeClassJob.job}} Level: {{activeClassJob.level}}</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-media><v-img :src="characterDetail.Portrait" width="200"></v-img></v-list-item-media>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list
            three-line
            subheader
        >
          <v-subheader>最新パッチのLogsデータ</v-subheader>
          <v-table>
            <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">ログ数</th>
              <th class="text-left">perce</th>
            </tr>
            </thead>
            <tbody>
              <tr
                v-for="averageLog in averageLogs"
                :key="averageLog.enemyName"
              >
                <td>
                  {{averageLog.enemyName}}
                </td>
                <td>
                  {{averageLog.count}}
                </td>
                <td>
                  {{averageLog.percentile}}
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-list>
      </v-card>
</template>

<script>
import {defineComponent, onMounted, ref, watch} from "vue";
import {getCharacterDetail} from "@/module/XIVApiModule";
import {useStore} from "vuex";
import {getLogsData} from "@/module/LogsApiModule";

export default defineComponent({
  name: "CharacterDetail",
  props: ['characterID'],
  setup(props) {
    const store = useStore()
    let characterDetail = ref({})
    let activeClassJob = ref({})
    let averageLogs = ref([])

    watch(() => props.value, async (newVal) => {
      characterDetail.value = await getCharacterDetail(newVal.characterID)
      activeClassJob.value.level = characterDetail.value.Level
      activeClassJob.value.job = characterDetail.value.ActiveClassJob.UnlockedState.Name
    })

    onMounted(async () => {
      characterDetail.value = await getCharacterDetail(props.characterID)
      activeClassJob.value.level = characterDetail.value.ActiveClassJob.Level
      activeClassJob.value.job = characterDetail.value.ActiveClassJob.UnlockedState.Name
      await makeLogsData()
    })

    const modalClose = () => {
      store.dispatch('updateOpenModal', false)
    }

    /**
     * データセンタ付きのサーバ情報からデータセンタを削除する
     * @param {string} serverText XIVAPIから取得したデータセンタ付きのサーバ情報
     * @return {string} サーバテキスト
     */
    const serverSplit = function (serverText) {
      const dataCenter = {
        mana: " [Mana]",
        elemental: " [Elemental]",
        gaia: " [Gaia]"
      };
      let server = ""
      if (serverText === undefined || serverText.isEmpty) {
        return server
      }
      server = serverText.replace(dataCenter.mana, "").replace(dataCenter.elemental, "").replace(dataCenter.gaia, "");
      return server
    }

    /**
     *
     * @param {array} logsData
     * @param {number} enemyID
     * @param {string} enemyName
     * @return {{percentile: number, color: string, enemyName: string, count: number}}
     */
    const logsCount = (logsData, enemyID, enemyName) => {
      let enemyLog = {
        enemyName: enemyName,
        count: 0,
        percentile: 0,
        color: ''
      }
      logsData.forEach(logData => {
        if (logData.encounterID === enemyID && logData.difficulty === 101) {
          enemyLog.percentile += logData.percentile;
          enemyLog.count++;
        }
      })
      enemyLog.percentile = enemyLog.percentile / enemyLog.count;
      enemyLog.percentile = Number.parseFloat(enemyLog.percentile).toFixed(0)
      return enemyLog;
    }

    const calcAverage = (logsData) => {
      averageLogs.value =[]
      averageLogs.value.push(logsCount(logsData, 78, "Erichthonios"))
      averageLogs.value.push(logsCount(logsData, 79, "Hippokampos"))
      averageLogs.value.push(logsCount(logsData, 80, "Phoinix"))
      averageLogs.value.push(logsCount(logsData, 81, "HesperosI"))
      averageLogs.value.push(logsCount(logsData, 82, "HesperosII"))
    }

    const makeLogsData = async () => {
      const server = serverSplit(characterDetail.value.Server)
      const logsData = await getLogsData(characterDetail.value.Name, server)
      calcAverage(logsData)
    }

    return {
      characterDetail,
      activeClassJob,
      averageLogs,
      modalClose
    }
  }
})
</script>