import { Image } from "./Image";

export interface Post {
  id: string;
  title: string;
  sub_title: string;
  content: string;
  images: Image[];
  post_category?: {
    id: string;
    name: string;
  };
  created_at: string;
  updated_at: string;
}
