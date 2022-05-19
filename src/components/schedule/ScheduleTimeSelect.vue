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
  /*
    scheduleDate: {
      day: 'YYYY-MM-DD'
      isentry: {boolean}
      time: 'hh:mm'
    }
   */
  props: ['scheduleDate'],
  setup(props, { emit }) {

    const sevenDays = ref([])
    const day = ref('')

    const isEntry = ref(false)
    const entryLabel = ref('参加しません')

    const times = [
    ]
    const time = ref('')

    onMounted(() => {
      for(let i = 0; i < 7; i++) {
        sevenDays.value.push(dayjs().add(i, 'day').format('YYYY-MM-DD'))
      }
      for(let i= 0; i < 48 ; i++) {
        times.push(dayjs('2000-01-01 20:00').add(i*30, 'm').format('HH:mm'))
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