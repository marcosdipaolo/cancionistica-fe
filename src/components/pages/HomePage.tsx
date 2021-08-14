import { FC } from "react";
import Slider from "../Slider";
import Intro from "../Intro";
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
    </Page>
  );
};
export default HomePage;
