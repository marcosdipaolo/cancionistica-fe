import { FC } from "react";
import Slider from "../Slider";
import Branding from "../Branding";
import Intro from "../Intro";
import Product from "../Product";
import Services from "../services/Services";
import Page from "../shared/Page";
import Work from "../Work";

const HomePage: FC = () => {
  return (
    <Page>
      <Intro
        title="Lorem ipsum dolor sit amet, consectetur."
        paragraph="Lorem ipsum dolor sit amet, consectetur."
      />
      <Slider />
      <Services />
      <Work />
      <Branding />
      <Product />
    </Page>
  );
};
export default HomePage;
