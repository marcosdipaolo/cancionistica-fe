import { inject, injectable } from "inversify";
import { flow, makeAutoObservable } from "mobx";
import { TYPES } from "../../container/types";
import { Post } from "../../models/Post";
import { IBlogService, PaginatedPosts } from "../../services/BlogService";

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
  nextCursor: string | null = null;
  prevCursor: string | null = null;

  @inject(TYPES.blogService) private blogService!: IBlogService;

  constructor(
  ) {
    makeAutoObservable(this);
  }

  getPosts = flow(function* (this: BlogStore, cursor: string | null = null) {
      const postsPaginator: PaginatedPosts = yield this.blogService.getPosts(cursor);
      this.postList = postsPaginator.data;
      this.nextCursor = postsPaginator.next_page_url ? this.parseCursor(postsPaginator.next_page_url) : null;
      this.prevCursor = postsPaginator.prev_page_url ? this.parseCursor(postsPaginator.prev_page_url) : null;
  });

  addPostToList(post: Post) {
    if (!this.postList.find((_post) => _post.id === post.id)) {
      this.postList.push(post);
    }
  }

  private parseCursor(url: string): string {
    return url.split("?")[1].split("=")[1];
  }
}