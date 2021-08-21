import { inject, injectable } from "inversify";
import { flow, makeAutoObservable } from "mobx";
import { TYPES } from "../../container/types";
import { Post } from "../../models/Post";
import { IBlogService } from "../../services/BlogService";

export interface EditorNewPostData {
  title: string,
  subTitle: string,
  content: string,
  image: File | null;
  categoryId: string;
}

@injectable()
export class BlogStore {

  postList: Post[] = [];
  @inject(TYPES.blogService) private blogService!: IBlogService;

  constructor(
  ) {
    makeAutoObservable(this);
  }

  getPosts = flow(function* (this: BlogStore) {
      const posts = yield this.blogService.getPosts();
      this.postList = posts;
  });

  addPostToList(post: Post) {
    if (!this.postList.find((_post) => _post.id === post.id)) {
      this.postList.push(post);
    }
  }
}