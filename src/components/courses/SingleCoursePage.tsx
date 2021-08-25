import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { Link, RouteComponentProps, useParams } from "react-router-dom";
import { useInjection } from "../../container/inversify-hook";
import { TYPES } from "../../container/types";
import { Course } from "../../models/Course";
import { ICourseService } from "../../services/CourseService";
import { useStore } from "../../stores/helpers/useStore";
import Page from "../shared/Page";
import SectionTitle from "../shared/SectionTitle";

interface SingleCoursePageProps extends RouteComponentProps { }

const SingleCoursePage: FC<SingleCoursePageProps> = ({ history }) => {
  const { id } = useParams<{ id: string; }>();
  const [ course, setCourse ] = useState<Course | null>(null);
  const courseService = useInjection<ICourseService>(TYPES.courseService);

  const { dataStore: { paymentStore } } = useStore();

  useEffect(() => {
    window.scroll({ top: 0 });
    paymentStore.clearPreferenceId();
    courseService.getCourse(id).then(({ data }) => {
      setCourse(data);
    }).catch(() => { });
  }, []);

  if (!course) {
    return (
      <div className="container d-flex" style={{ height: '80vh' }}>
        <i className="spinner d-inline-block icon-spinner9 m-auto" />
      </div>
    );
  }

  const buyModuleClicked = () => {
    paymentStore.getMercadopagoReferenceId(course);
  };


  const image = course.images.find(img => img.path === "full");

  return (
    <Page>
      <div className="container single-module">
        <div className="image mb-5 animate-box" style={{ backgroundImage: `url(${image || ""})` }} />
        <span onClick={() => history.goBack()} className="back">&laquo;&laquo; Atras</span>
        <div className="d-flex align-items-start">
          <SectionTitle title={course.title} sub={course.sub_title} />
          <Link to={`/modules/${id}/pre-purchase`}><button onClick={buyModuleClicked} className="btn btn-primary">Comprar</button></Link>
        </div>
        <p>{course.content}</p>
      </div>
    </Page>);
};

export default observer(SingleCoursePage);