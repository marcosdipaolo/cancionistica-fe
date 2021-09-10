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
  getPosts(cursor: string | null): Promise<PaginatedPosts>;
  getPost(id: string): Promise<AxiosResponse<Post>>;
  deletePost(id: string): Promise<AxiosResponse>;
  editPost(id: string, data: EditorNewPostData): Promise<AxiosResponse<Post>>;
  getCategories(): Promise<AxiosResponse<Category[]>>;
}

export interface PaginatedPosts {
  data: Post[];
  path: string;
  per_page: number;
  next_page_url: string | null,
  prev_page_url: string | null,
}

@injectable()
export class BlogService implements IBlogService {
  @inject(TYPES.notificationService) private notificationService!: INotificationService;

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

  async getPosts(cursor: string | null): Promise<PaginatedPosts> {
    try {
      let response: AxiosResponse<PaginatedPosts>;
      if (cursor) {
        response = await cancionistica.get<PaginatedPosts>("/api/posts", { params: { cursor } });

      } else {
        response = await cancionistica.get<PaginatedPosts>("/api/posts");
      }
      if (!response.data) {
        throw new Error("No nos pudimos conectar con nuestra base de datos");
      }
      return response.data;
    } catch (err) {
      this.notificationService.createNotification(NotificationType.ERROR, "Hubo un problema adquiriendo los artículos");
      return { data: [], path: "", per_page: 0, next_page_url: null, prev_page_url: null };
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

  getCategories() {
    return cancionistica.get<Category[]>("/api/categories");
  }

  deletePost(id: string) {
    return cancionistica.delete(`/api/posts/${id}`);
  }
}