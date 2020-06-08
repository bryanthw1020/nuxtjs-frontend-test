import CommentService from '~/services/api/comment.service'
import PostService from '~/services/api/post.service'

export default interface Api {
  posts: PostService
  comments: CommentService
}
