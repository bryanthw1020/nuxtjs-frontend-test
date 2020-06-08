import CommentSearch from '~/types/commentSearch'
import Helper from '~/types/helper'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import apiRoute from './config'

export default class CommentService {
  constructor(
    private readonly axios: NuxtAxiosInstance,
    private readonly helper: Helper
  ) {}

  getAll(searchParams: CommentSearch): Promise<any> {
    const url = `${apiRoute.comments.getAll}?${this.helper.stringifyParams(
      searchParams
    )}`

    return this.axios.$get(url)
  }
}
