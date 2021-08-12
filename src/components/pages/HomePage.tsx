import { FC } from "react";
import Slider from "../Slider";
import Branding from "../Branding";
import Intro from "../Intro";
import Product from "../Product";
import Services from "../services/Services";
import Page from "../shared/Page";
import Workshop from "../workshop/Workshop";

const HomePage: FC = () => {
  return (
    <Page>
      <Intro
        title="Lorem ipsum dolor sit amet, consectetur."
        paragraph="Lorem ipsum dolor sit amet, consectetur."
      />
      <Slider />
      <Services />
      <Workshop />
      <Branding />
      <Product />
    </Page>
  );
};
export default HomePage;
