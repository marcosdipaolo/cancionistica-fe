import { makeAutoObservable } from "mobx";
import { Post } from "../../models/Post";

export interface EditorNewPostData {
  title: string,
  subTitle: string,
  content: string,
  image: File | null;
}

export class BlogStore {

  private editorNewPostData: EditorNewPostData = {
    title: "",
    subTitle: "",
    content: "",
    image: null
  };

  postList: Post[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getPost(id: string) {
    return this.postList.find((post) => post.id === id);
  }


  editorContentIsValid(): boolean {
    return this.editorNewPostData.content.length > 10
      && this.editorNewPostData.title.length > 2
      && this.editorNewPostData.image instanceof File
      && this.editorNewPostData.subTitle.length > 2;
  }

  setEditorNewPostData(data: Partial<EditorNewPostData>) {
    Object.assign(this.editorNewPostData, data);
  }

  getEditorNewPostData(): EditorNewPostData {
    return this.editorNewPostData;
  }

  clearEditorNewPostData() {
    this.editorNewPostData = {
      title: "",
      subTitle: "",
      content: "",
      image: null
    };
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