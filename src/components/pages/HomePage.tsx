import { FC } from "react";
import Slider from "../Slider";
import Branding from "../Branding";
import Intro from "../Intro";
import Product from "../Product";
import Services from "../Services";
import Page from "../shared/Page";
import Work from "../Work";
import { useHistory } from "react-router-dom";

const HomePage: FC = () => {
  const history = useHistory();
  console.log(history)
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
