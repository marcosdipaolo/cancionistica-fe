interface Image {
  id: string
  path: string
  imageable_type: string,
  imageable_id: string,
  created_at: string,
  updated_at: string,
}

export interface Post {
  id: string;
  title: string;
  sub_title: string;
  content: string;
  image: Image;
  created_at: string;
  updated_at: string
}
