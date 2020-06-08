<template>
  <div id="pages__posts-id">
    <v-card class="mb-6">
      <v-card-title> View Post #{{ post.id }} </v-card-title>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ post.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ post.body }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>

    <post-comment-list />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import PostCommentList from '@/components/pages/posts/PostCommentList.vue'

@Component({
  components: {
    PostCommentList
  }
})
export default class PagePostsIdIndex extends Vue {
  post = {}

  async fetch() {
    await this.fetchPost()
  }

  async fetchPost() {
    try {
      const post = await this.$api.posts.getOne(parseInt(this.$route.params.id))
      this.post = post
    } catch (err) {
      console.error(err)
    }
  }
}
</script>