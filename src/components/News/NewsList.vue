<template>
  <v-row justify="center" >
    <v-card
      class="mx-auto"
      max-width="344">
      <v-table max-height="300px">
        <thead>
        <v-list-item-title>{{title}}</v-list-item-title>
        </thead>
        <tbody>
        <tr
          v-for="newsDetail in newsDetails"
          :key="newsDetail.id"
        >
          <NewsItem :news-detail="newsDetail" />
        </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-row>
</template>

<script>
import {defineComponent} from "vue"
import NewsItem from "@/components/News/NewsItem";


export default defineComponent({
  name: "NoticeList",
  props:['title', 'newsDetails'],
  components:{NewsItem},
  setup() {
    return {
    }
  }
})
</script>

<style scoped>
</style>