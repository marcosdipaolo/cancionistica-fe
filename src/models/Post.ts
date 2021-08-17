import { Image } from "./Image";

export interface Post {
  id: string;
  title: string;
  sub_title: string;
  content: string;
  image: Image;
  created_at: string;
  updated_at: string;
}
