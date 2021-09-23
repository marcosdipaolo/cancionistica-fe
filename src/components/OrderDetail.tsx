import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { Course } from "../models/Course";
import { useStore } from "../stores/helpers/useStore";

const OrderDetail: FC = () => {
  const backendBaseUrl = process.env.REACT_APP_BACKEND_URL; 
  const { dataStore: { cartStore } } = useStore();
  useEffect(() => {

  }, []);

  const renderCourseThumb = (course: Course) => {
    return course.images.find(image => image.size === "thumbnail");
  };

  return (
    <div className="container">
      <table className="table table-bordered align-top order-list">
        <thead>
          <tr>
            <th className="text-center">Módulo</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          { cartStore.cart.map((course: Course) => (
            <tr key={course.id}>
              <td>
                <img style={{marginRight: "1rem"}} width="100" src={`${backendBaseUrl}/${renderCourseThumb(course).path}`} alt="" />
                <span>{course.title}</span>
                </td>
              <td>AR$ {course.price}.-</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="text-end fw-bold text-uppercase">Total:</td>
            <td>AR$ {cartStore.total}.-</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default observer(OrderDetail);