import { flow, makeAutoObservable } from "mobx";
import { postMessages } from "../../messages/messages";
import { Post } from "../../models/Post";
import { BlogService, IBlogService } from "../../services/BlogService";
import { INotificationService, NotificationService, NotificationType } from "../../services/NotificationService";

export interface EditorNewPostData {
  title: string,
  subTitle: string,
  content: string,
  image: File | null;
  categoryId: string;
}

export class BlogStore {

  postList: Post[] = [];

  constructor(
    private notificationService: INotificationService = new NotificationService(),
    private blogService: IBlogService = new BlogService()
  ) {
    this.notificationService = notificationService;
    makeAutoObservable(this);
  }

  getPosts = flow(function* (this: BlogStore) {
    try {
      const posts = yield this.blogService.getPosts()
      this.postList = posts;
    } catch (err) {
      this.notificationService.createNotification(NotificationType.ERROR, postMessages.getPostsFailed);
    }
  });

  addPostToList(post: Post) {
    if (!this.postList.find((_post) => _post.id === post.id)) {
      this.postList.push(post);
    }
  }
}