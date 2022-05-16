<template>
  <div>
    <h3>ET : {{eorzeaTime}} LT : {{realTime}}</h3>
  </div>
</template>

<script>
import {defineComponent, onMounted, ref} from "vue";
import EorzeaTime from "eorzea-time";
import dayjs from "dayjs";

export default defineComponent({
  name: "EorzeaTime",
  setup() {
    let realTime = ref('')
    let eorzeaTime = ref('')

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
    }

    onMounted(()=>{
      setInterval(updateTime, 1000)
    })

    return {
      realTime,
      eorzeaTime
    }
  }
})
</script>