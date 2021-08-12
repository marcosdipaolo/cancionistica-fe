import { makeAutoObservable } from "mobx";
import { Post } from "../../models/Post";
import { RootStore } from "../RootStore";

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

  private postList: Post[] = [];

  constructor(public rootStore: RootStore) {
    makeAutoObservable(this);
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
    }
  }

  getPosts(): Post[] {
    return this.postList;
  }

  setPosts(posts: Post[]): void {
    this.postList = posts;  
  }
}