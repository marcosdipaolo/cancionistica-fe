import { Image } from "./Image";

export interface Course {
  id: string,
  title: string,
  sub_title: string,
  content: string,
  price: number,
  images: Image[];
}