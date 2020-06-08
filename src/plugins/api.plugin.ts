import Api from '~/types/api'
import CommentService from '~/services/api/comment.service'
import { Plugin } from '@nuxt/types'
import PostService from '~/services/api/post.service'

declare module 'vue/types/vue' {
  interface Vue {
    $api: Api
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $api: Api
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $api: Api
  }
}

const apiPlugin: Plugin = ({ $axios, app: { $helper } }, inject) => {
  const api: Api = {
    posts: new PostService($axios, $helper),
    comments: new CommentService($axios, $helper)
  }

  inject('api', api)
}

export default apiPlugin
