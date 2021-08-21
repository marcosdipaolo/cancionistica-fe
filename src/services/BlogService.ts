import { AxiosResponse } from "axios";
import { inject, injectable } from "inversify";
import cancionistica from "../api/cancionistica";
import { TYPES } from "../container/types";
import { Category } from "../models/Category";
import { Post } from "../models/Post";
import { EditorNewPostData } from "../stores/data-stores/BlogStore";
import { INotificationService, NotificationType } from "./NotificationService";

export interface IBlogService {
  createPost: (data: EditorNewPostData) => Promise<AxiosResponse<Post>>;
  getPosts(): Promise<Post[]>;
  getPost(id: string): Promise<AxiosResponse<Post>>;
  deletePost(id: string): Promise<AxiosResponse>;
  editPost(id: string, data: EditorNewPostData): Promise<AxiosResponse<Post>>;
  getCategories(): Promise<AxiosResponse<Category[]>>
}

@injectable()
export class BlogService implements IBlogService {
  @inject(TYPES.notificationService) private notificationService!: INotificationService

  async createPost(data: EditorNewPostData) {
    const _data = new FormData();
    _data.append("title", data.title);
    _data.append("sub_title", data.subTitle);
    _data.append("content", data.content);
    _data.append("post_category_id", data.categoryId);
    _data.append("image", data.image!);
    await cancionistica.get(`/sanctum/csrf-cookie`);
    return cancionistica.post<Post>("/api/posts", _data);
  }

  async getPosts(): Promise<Post[]> {
    try {
      const { data } = await cancionistica.get<Post[]>("/api/posts");
      if (!Array.isArray(data)) {
        throw new Error("No nos pudimos conectar con nuestra base de datos");
      }
      return data;
    } catch(err){
      this.notificationService.createNotification(NotificationType.ERROR, "Hubo un problema adquiriendo los artículos");
      return  [];
    }
  }

  getPost(id: string) {
    return cancionistica.get<Post>(`/api/posts/${id}`);
  }

  async editPost(id: string, data: EditorNewPostData) {
    const _data = new FormData();
    _data.append("title", data.title);
    _data.append("sub_title", data.subTitle);
    _data.append("content", data.content);
    if (data.image) {
      _data.append("image", data.image!);
    }
    if (data.categoryId) {
      _data.append("post_category_id", data.categoryId);
    }
    _data.append("_method", "PUT");
    await cancionistica.get(`/sanctum/csrf-cookie`);
    return cancionistica.post<Post>(`/api/posts/${id}`, _data);
  }

  getCategories(){
    return cancionistica.get<Category[]>("/api/categories");
  }

  deletePost(id: string) {
    return cancionistica.delete(`/api/posts/${id}`);
  }
}