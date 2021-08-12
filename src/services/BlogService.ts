import { AxiosResponse } from "axios";
import { injectable } from "inversify";
import cancionistica from "../api/cancionistica";
import { Post } from "../models/Post";
import { EditorNewPostData } from "../stores/data-stores/BlogStore";

export interface IBlogService {
  createPost: (data: EditorNewPostData) => Promise<AxiosResponse<Post>>;
  getPosts(): Promise<AxiosResponse<Post[]>>;
}

@injectable()
export class BlogService implements IBlogService {
  async createPost(data: EditorNewPostData) {
    const _data = new FormData();
    _data.append("title", data.title);
    _data.append("sub_title", data.subTitle);
    _data.append("content", data.content);
    _data.append("image", data.image!);
    await cancionistica.get(`/sanctum/csrf-cookie`);
    return cancionistica.post<Post>("/api/posts", _data);
  }

  getPosts() {
    return cancionistica.get<Post[]>("/api/posts");
  }
}