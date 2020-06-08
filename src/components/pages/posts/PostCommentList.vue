<template>
  <v-card>
    <v-progress-linear
      color="primary accent-4"
      :active="loading"
      absolute
      top
      indeterminate
    />
    <v-card-title class="pb-0">Comments ({{ totalComment }})</v-card-title>

    <v-container>
      <v-row>
        <v-col cols="12" sm="3">
          <v-text-field
            v-model="searchParams.name"
            label="Name"
            dense
            hide-details
            outlined
          />
        </v-col>
        <v-col cols="12" sm="3">
          <v-text-field
            v-model="searchParams.email"
            label="Email"
            dense
            hide-details
            outlined
          />
        </v-col>
        <v-col cols="12" sm="3">
          <v-text-field
            v-model="searchParams.body"
            label="Body"
            dense
            hide-details
            outlined
          />
        </v-col>
      </v-row>

      <div class="mt-3">
        <v-btn
          class="mr-2"
          color="primary"
          :disabled="loading"
          @click="fetchComments(searchParams)"
        >
          <v-icon left>mdi-magnify</v-icon>
          Search
        </v-btn>
        <v-btn :disabled="loading" @click="fetchComments">
          <v-icon left>mdi-refresh</v-icon>
          Reset
        </v-btn>
      </div>
    </v-container>

    <v-divider />

    <v-list three-line v-if="totalComment > 0">
      <template v-for="comment in comments">
        <v-list-item :key="comment.id">
          <v-list-item-content>
            <v-list-item-title>
              {{ comment.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <p class="caption grey--text mb-2 font-italic">
                {{ comment.email }}
              </p>
              <div>
                {{ comment.body }}
              </div>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <v-card-text v-else>
      No comment found.
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import debounce from 'lodash/debounce'
import CommentSearch from '../../../types/commentSearch'

@Component
export default class ComponentPostCommentList extends Vue {
  loading = true
  comments = [] as Array<any>
  searchParams = {
    name: '',
    email: '',
    body: ''
  } as CommentSearch

  get totalComment() {
    return this.comments.length
  }

  created() {
    this.fetchComments = debounce(this.fetchComments)
    this.fetchComments()
  }

  async fetchComments(searchParams?: CommentSearch) {
    try {
      this.loading = true
      const comments = await this.$api.comments.getAll({
        ...searchParams,
        ...{ postId: parseInt(this.$route.params.id) }
      })
      this.comments = comments
    } catch (err) {
      console.error(err)
    } finally {
      this.loading = false
    }
  }
}
</script>