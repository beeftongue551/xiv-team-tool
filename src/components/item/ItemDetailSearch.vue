<template>
    <v-container>
      <v-row fluid fill-height>
        <v-col
          cols="8"
          sm="8"
        >
          <v-select label="ジョブ/クラス" :items="jobs" v-model="jobSelect" @update:modelValue="updateSelect" />
        </v-col>
        <v-col
          cols="2"
          sm="2"
        >
          <v-text-field
            type="number"
            label="レベル"
            v-model="jobLevel"
            max="90"
            min="1"
            maxlength="2"
            @update:modelValue="updateNumber"
            @keyup.prevent.enter.exact="pushEnter"
          />
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import {defineComponent, onMounted, reactive, ref} from "vue"
import {getAllJob} from "@/module/BeefApi/JobModule";

export default defineComponent({
  name: "ItemDetailSearch",
  components: {},
  setup(props, { emit }) {
    const jobSelect = ref('')
    const jobsData = ref({})
    const jobs = reactive([])
    const jobIcon = ref('')
    const jobLevel = ref(90)

    let jobAbbreviation = ''

    onMounted(async () => {
      jobsData.value = await getAllJob()
      jobsData.value.push({
        id: 0,
        jobName: '',
        jobAbbreviation: '',
        jobIcon: '',
      })
      jobsData.value = jobsData.value.reverse()
      jobsData.value.forEach((jobData) => {
        jobs.push(jobData.jobName)
      })
    })

    const updateSelect = () => {
      jobsData.value.forEach((jobData) => {
        if(jobSelect.value === jobData.jobName) {
          jobIcon.value = jobData.jobIcon
          jobAbbreviation = jobData.jobAbbreviation
        }
      })
      updateInput()
    }

    const updateNumber = () => {
      jobLevel.value = parseInt(jobLevel.value)
      if(Number.isNaN(jobLevel) || jobLevel.value <= 0 || isNaN(jobLevel.value)) {
        jobLevel.value = 1
      }
      if(jobLevel.value > 90) {
        jobLevel.value = 90
      }
      updateInput()
    }

    const updateInput = () => {
      emit('detail-update', jobAbbreviation, jobLevel.value)
    }

    const pushEnter = () => {
      emit('push-enter')
    }

    return {
      jobSelect,
      jobs,
      jobIcon,
      jobLevel,
      updateSelect,
      updateNumber,
      updateInput,
      pushEnter
    }
  }
})
</script>

<style scoped>
</style>