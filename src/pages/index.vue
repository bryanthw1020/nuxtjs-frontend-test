<template>
  <div>
    <v-data-iterator :items="posts" disable-pagination hide-default-footer>
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.id"
            cols="12"
            sm="6"
            lg="3"
          >
            <v-card
              class="full-height"
              :to="localePath({ name: 'posts-id', params: { id: item.id } })"
            >
              <v-card-title> Post #{{ item.id }} </v-card-title>
              <v-card-subtitle class="body-2 font-weight-bold">
                {{ item.title }}
              </v-card-subtitle>

              <v-card-text class="text-truncate">
                {{ item.body }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class PageIndex extends Vue {
  posts = [] as Array<any>

  async fetch() {
    await this.fetchPosts()
  }

  async fetchPosts() {
    try {
      const posts = await this.$api.posts.getAll()
      this.posts = posts
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
