import { FC, useEffect, useState } from "react";
import Slide, { SlideInterface } from "./Slide";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useStore } from "../stores/helpers/useStore";
import { observer } from "mobx-react-lite";

const Slider: FC = () => {
  const { dataStore: { blogStore } } = useStore();
  const [posts, setPosts] = useState<SlideInterface[]>([]);
  useEffect(() => {
    const posts = blogStore.postList.map<SlideInterface>(post => {
      return {
        id: post.id,
        title: post.title,
        category: "cancionistica",
        imageUrl: process.env.REACT_APP_BACKEND_URL + '/' +  post.image_url
      }
    });
    setPosts(posts)
  }, []);
  
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
            category={ slideData.category }
            title={ slideData.title }
            imageUrl={ slideData.imageUrl }
            key={ index }
          />
        )) }
      </Slick>
    </aside>
  );
};

export default observer(Slider);
