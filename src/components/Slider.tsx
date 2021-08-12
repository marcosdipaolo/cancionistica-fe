import { FC } from "react";
import Slide, { SlideInterface } from "./Slide";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useStore } from "../stores/helpers/useStore";

const Slider: FC = () => {
  const { dataStore: { blogStore } } = useStore();
  const slideConfig = blogStore.getPosts().map(post => {
    return {
      title: post.title,
      tag: "cancionistica",
      imageUrl: process.env.REACT_APP_BACKEND_URL + '/' +  post.image_url
    }
  });
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
        { slideConfig.map((slide: SlideInterface, index) => (
          <Slide
            tag={ slide.tag }
            title={ slide.title }
            imageUrl={ slide.imageUrl }
            key={ index }
          />
        )) }
      </Slick>
    </aside>
  );
};

export default Slider;
