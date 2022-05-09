<template>
  <div>
    <v-form>
      <v-text-field v-model="nickname"></v-text-field>
      <v-select :items="sevenDays" v-model="day" label="日付"/>
      <v-checkbox
        v-model="isEntry"
        :label="entryLabel"
      />
      <v-select :items="times" v-model="time" :disabled="!isEntry" label="時間"/>
      <v-btn
        color="success"
        class="mr-4"
        @click="submitSchedule(false)"
      >送信</v-btn>
      <v-btn
        color="success"
        class="mr-4"
        @click="submitSchedule(true)"
      >送信して追加入力</v-btn>
    </v-form>
  </div>
</template>

<script>
import {defineComponent, onMounted, ref, watch} from "vue"
import dayjs from "dayjs"
// import {createXIVSchedule} from "@/module/ScheduleApiModule"
// import {Schedule} from "@/class/Schedule"
import {useRouter} from "vue-router";

export default defineComponent({
  name: "ScheduleForm",
  setup() {
    const router = useRouter()

    const nickname = ref('')
    const times = ref(
      ['20:00', '21:00', '22:00', '23:00']
    )
    const time = ref('')
    const sevenDays =ref([])
    const day = ref('')
    const isEntry = ref(false)
    const valid = ref(false)
    const entryLabel = ref('参加しません')

    onMounted(() => {
      for(let i = 0; i < 7; i++){
        sevenDays.value.push(dayjs().add(i, 'day').format('YYYY/M/D'))
      }
    })

    watch(isEntry, () =>{
      if(isEntry.value === true) {
        entryLabel.value = '参加します'
      } else {
        entryLabel.value = '参加しません'
        time.value = ''
      }
    })

    const submitSchedule = (add = false) => {
      // const scheduleData = new Schedule(isEntry, nickname, day, time)
      // createXIVSchedule(scheduleData)
      if(add) {
        time.value = ''
        day.value = ''
      } else {
        console.log('toHome')
        router.push('/')
      }
    }

    return {
      nickname,
      sevenDays,
      isEntry,
      time,
      times,
      day,
      entryLabel,
      valid,
      submitSchedule
    }
  }
})
</script>
