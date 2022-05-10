<template>
  <v-row justify="center" >
    <v-card>
      <v-table max-height="300px">
        <thead>
        <v-list-item-title>{{title}}</v-list-item-title>
        </thead>
        <tbody>
        <tr
          v-for="noticeDetail in noticeDetails"
          :key="noticeDetail"
        >
          <NoticeItem :notice-detail="noticeDetail" />
        </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-row>
</template>

<script>
import {defineComponent} from "vue"
import NoticeItem from "@/components/Notification/NoticeItem";


export default defineComponent({
  name: "NoticeList",
  props:['title', 'noticeDetails'],
  components:{NoticeItem},
  setup() {
    return {
    }
  }
})
</script>

<style scoped>
</style>