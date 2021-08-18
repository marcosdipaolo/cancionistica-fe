import { injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import { Post } from "../../models/Post";

export interface EditorNewPostData {
  title: string,
  subTitle: string,
  content: string,
  image: File | null;
  categoryId: string
}

@injectable()
export class BlogStore {

  postList: Post[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getPost(id: string) {
    return this.postList.find((post) => post.id === id);
  }

  getPosts(): Post[] {
    return this.postList ?? [];
  }

  setPosts(posts: Post[]): void {
    this.postList = posts;
  }

  addPostToList(post: Post) {
    if(!this.postList.find((_post) => _post.id === post.id)) {
      this.postList.push(post);
    }
  }
}