import Helper from '~/types/helper'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import apiRoute from './config'

export default class PostService {
  constructor(
    private readonly axios: NuxtAxiosInstance,
    private readonly helper: Helper
  ) {}

  getAll(): Promise<any> {
    const url = apiRoute.posts.getAll

    return this.axios.$get(url)
  }

  getOne(postId: number): Promise<any> {
    const url = this.helper.prepareUrl(apiRoute.posts.getOne, {
      postId: postId
    })

    return this.axios.$get(url)
  }
}
