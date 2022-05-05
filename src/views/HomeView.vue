<template>
  <div>
    <v-img
        src="../assets/ffxiv_20211205_095817_942.png"
        height="225"
        cover
    ></v-img>
    <div class="explanation">
      <label class="explanation-text"><strong>XIVTeamTool</strong>はプレイヤーを手助けする便利サイトを目指して作成されているサイトです。</label>
    </div>
    <v-container>
      <v-row no-gutters>
        <v-col cols="2">
          <v-card
              class="mx-auto"
              width="344"
              variant="outlined"
          >
            <v-card-header>
              <div>
                <div class="text-h6 mb-1">キャラ検索</div>
              </div>
            </v-card-header>
            <v-card-text>
              <div class="text-caption">キャラクターを検索してItemLevelやLogsの簡易データを見たい場合はこちら</div>
            </v-card-text>
            <v-card-actions>
              <v-btn variant="outlined" to="/character" nuxt>
                <v-icon
                    large
                    color="green darken-2"
                >
                  mdi-magnify
                </v-icon>
                キャラ検索
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col >
          <v-card
              class="mx-auto"
              width="344"
              variant="outlined"
          >
            <v-card-header>
              <div>
                <div class="text-h6 mb-1">キャラ検索</div>
              </div>
            </v-card-header>
            <v-card-text>
              <div class="text-caption">アイテムを検索して最安値やレシピを見たい場合はこちら</div>
            </v-card-text>
            <v-card-actions>
              <v-btn variant="outlined" to="/item" nuxt>
                <v-icon
                    large
                    color="green darken-2"
                >
                  mdi-magnify
                </v-icon>
                アイテム検索
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',


});
</script>
