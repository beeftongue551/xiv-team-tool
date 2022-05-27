<template>
  <div>
<!--    <v-img-->
<!--        src="../assets/ffxiv_20211205_095817_942.png"-->
<!--        height="225"-->
<!--        cover-->
<!--    ></v-img>-->
    <div class="explanation">
      <label class="explanation-text"><strong>SmartMarketXIV</strong>はプレイヤーを手助けする便利サイトを目指して作成されているサイトです。</label>
    </div>
    <HomeCards :cards-data="characterCardData" />
    <div class="d-flex justify-space-around">
      <NewsList title="お知らせ" :news-details="newsDetails" v-show="newsDetails.length"/>
    </div>
  </div>
</template>

<script>
import {defineComponent, onMounted, ref} from 'vue';
import NewsList from "@/components/News/NewsList";
import {getNewsListLimit} from "@/module/BeefApiModule";
import HomeCards from "@/components/HomeCards";

export default defineComponent({
  name: 'HomeView',
  components: {HomeCards, NewsList},
  setup() {
    const newsDetails = ref([])

    const characterCardData = [
      {
        title: 'マーケット検索',
        text: 'アイテムを検索して各DCのマーケット状況を見たい場合はこちら',
        jump: '/item',
        icon: 'mdi-store'
      }
    ]

    onMounted(async () => {
      newsDetails.value = await getNewsListLimit(3)
    })

    return {
      newsDetails: newsDetails,
      characterCardData
    }
  }
});
</script>
