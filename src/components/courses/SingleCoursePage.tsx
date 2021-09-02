import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
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
  const backendBaseUrl = process.env.REACT_APP_BACKEND_URL;
  const { dataStore: { cartStore } } = useStore();

  useEffect(() => {
    window.scroll({ top: 0 });
    courseService.getCourse(id).then(({ data }) => {
      setCourse(data);
    }).catch(() => { });
  }, []);

  if (!course) {
    return (
      <div className="container d-flex" style={ { height: '80vh' } }>
        <i className="spinner d-inline-block icon-spinner9 m-auto" />
      </div>
    );
  }
  const image = course.images.find(img => img.size === "full");

  const addToCart = () => {
    if (cartStore.isInCart(course)) {
      cartStore.removeFromCart(course);
    } else {
      cartStore.addToCart(course);
    }
  };

  const cartIconActionClass = cartStore.isInCart(course) ? 'remove' : 'add';

  return (
    <Page>
      <div className="container single-module">
        <div className="image mb-5 animate-box" style={ { backgroundImage: `url(${backendBaseUrl}/${image?.path || ""})` } } />
        <span onClick={ () => history.goBack() } className="back">&laquo;&laquo; Atras</span>
        <div className="d-flex align-items-start">
          <SectionTitle title={ course.title } sub={ course.sub_title } />
          <br />
          <br />
          <br />
          <br />
          <i onClick={ addToCart } className="icon-cart" />
          <div className={ `cart-action-icon ${cartIconActionClass}` }>{cartStore.isInCart(course) ? '-' : '+'}</div>
        </div>
        <div dangerouslySetInnerHTML={ { __html: course.content } } />
      </div>
    </Page>);
};

export default observer(SingleCoursePage);