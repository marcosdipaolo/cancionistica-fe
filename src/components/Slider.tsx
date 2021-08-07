import { FC } from "react";
import Slide, { SlideInterface } from "./Slide";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slideConfig: SlideInterface[] = [
  {
    title: "Create A Motivational Template",
    tag: "Branding",
    imageUrl: "/images/slide_1.jpg",
  },
  {
    title: "Start Practicing Your Course",
    tag: "Website",
    imageUrl: "/images/slide_2.jpg",
  },
  {
    title: "Start Practicing Your Course",
    tag: "Products",
    imageUrl: "/images/slide_3.jpg",
  },
];

// https://react-slick.neostack.com/docs/api

const Slider: FC = () => {
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
