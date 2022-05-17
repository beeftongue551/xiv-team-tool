<template>
  <div>
    <v-label @click="changeTime">{{displayTimeText}}</v-label>
  </div>
</template>

<script>
import {defineComponent, onMounted, ref} from "vue";
import EorzeaTime from "eorzea-time";
import dayjs from "dayjs";

export default defineComponent({
  name: "EorzeaTime",
  setup() {
    const realTime = ref('')
    const eorzeaTime = ref('')
    const displayTimeText = ref('')
    let displayFlag = 0

    /**
     * LTとETの更新を行う
     * @return {void}
     */
    const updateTime = () => {
      //リアルタイムの更新を行う
      let currentDate = new dayjs()
      realTime.value = currentDate.format('hh') + ':' + currentDate.format('mm') + ':' + currentDate.format('ss')
      //エオルゼア時間の取得を行う
      const time = new EorzeaTime();
      eorzeaTime.value = time.toString()
      displayTime()
    }

    onMounted(()=>{
      setInterval(updateTime, 1000)
    })

    const displayTime = () => {
      if(displayFlag === 0) {
        displayTimeText.value = 'LT : ' + realTime.value
      } else if(displayFlag === 1) {
        displayTimeText.value = 'ET : ' +  eorzeaTime.value
      }
    }
    const changeTime = () => {
      if(displayFlag === 0) {
        displayFlag = 1
      } else if(displayFlag === 1) {
        displayFlag = 0
      }
    }

    return {
      realTime,
      eorzeaTime,
      displayTimeText,

      displayTime,
      changeTime
    }
  }
})
</script>