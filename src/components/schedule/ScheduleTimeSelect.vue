<template>
  <v-select :items="sevenDays" v-model="day" label="日付" @update:modelValue="updateValue"/>
  <v-checkbox v-model="isEntry" :label="entryLabel" @update:modelValue="updateValue"/>
  <v-select
    :items="times"
    v-model="time"
    label="時間"
    :disabled="!isEntry"
    @update:modelValue="updateValue"
  />
</template>

<script>
import {defineComponent, onMounted, ref, watch} from "vue"
import dayjs from "dayjs";

export default defineComponent({
  name: "ScheduleTimeSelect",
  props: ['scheduleDate'],
  setup(props, { emit }) {

    const sevenDays = ref([])
    const day = ref('')

    const isEntry = ref(false)
    const entryLabel = ref('参加しません')

    const times = ['20:00', '21:00', '22:00', '23:00', '24:00', '01:00', '02:00',
      '03:00', '04:00', '05:00', '06:00', '07:00', '08:00',
      '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
      '15:00', '16:00', '17:00', '18:00', '19:00'
    ]
    const time = ref('')

    onMounted(() => {
      for(let i = 0; i < 7; i++) {
        sevenDays.value.push(dayjs().add(i, 'day').format('YYYY-MM-D'))
      }
    })

    watch(isEntry, () => {
      if(isEntry.value === true) {
        entryLabel.value = '参加します'
      } else {
        entryLabel.value = '参加しません'
        time.value = ''
      }
    })

    watch(props, () => {
      day.value = props.scheduleDate.day
      isEntry.value = props.scheduleDate.isEntry
      time.value = props.scheduleDate.time
    })

    const updateValue = () => {
      emit('change-schedule',{
        day: day.value,
        isEntry: isEntry.value,
        time: time.value
      })
    }

    return {
      sevenDays,
      day,
      isEntry,
      entryLabel,
      times,
      time,

      updateValue
    }
  }
})
</script>

<style scoped>
</style>