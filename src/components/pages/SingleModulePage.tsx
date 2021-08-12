import { FC, useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import Page from "../shared/Page";
import SectionTitle from "../shared/SectionTitle";
import modulesConfig, { WorkshopModuleData } from "../workshop/modules.config";

interface SingleModulePageProps extends RouteComponentProps { }

const SingleModulePage: FC<SingleModulePageProps> = ({ history }) => {
  const { id } = useParams<{ id: string; }>();
  const data = modulesConfig.find((module: WorkshopModuleData) => module.index === parseInt(id));

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  if (!data) {
    throw new Error("No module for that id.");
  }

  return (
    <Page>
      <div className="container single-module">
        <div className="image mb-5 animate-box" style={ { backgroundImage: `url(${data.image})` } } />
        <span onClick={ () => history.goBack() }>&laquo;&laquo; Atras</span>
        <SectionTitle title={ data.title } sub={ data.subTitle } />
        <p>{ data.content }</p>
      </div>
    </Page>);
};

export default SingleModulePage;