import { FC, useEffect, useState } from "react";
import Slide, { SlideInterface } from "./Slide";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useStore } from "../stores/helpers/useStore";
import { observer } from "mobx-react-lite";
import { Post } from "../models/Post";

const Slider: FC = () => {
  const { dataStore: { blogStore } } = useStore();
  const [posts, setPosts] = useState<SlideInterface[]>([]);
  useEffect(() => {
    const posts = blogStore.postList.map<SlideInterface>((post: Post) => {
      return {
        id: post.id,
        title: post.title,
        post_category: post.post_category,
        images: post.images
      }
    });
    setPosts(posts)
  }, [blogStore.postList]);
  
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 2000,
  };
  return (
    <aside id="app-slider" className="js-fullheight">
      <Slick { ...settings }>
        { posts.map((slideData: SlideInterface, index) => (
          <Slide
            id={slideData.id}
            post_category={ slideData.post_category }
            title={ slideData.title }
            images={ slideData.images }
            key={ index }
          />
        )) }
      </Slick>
    </aside>
  );
};

export default observer(Slider);
