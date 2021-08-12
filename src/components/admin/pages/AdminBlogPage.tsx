import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { useInjection } from "../../../container/inversify-hook";
import { TYPES } from "../../../container/types";
import { IBlogService } from "../../../services/BlogService";
import { useStore } from "../../../stores/helpers/useStore";
import AdminPage from "../shared/AdminPage";

const AdminBlogPage: FC = () => {
  const { dataStore: { blogStore } } = useStore();
  const blogService = useInjection<IBlogService>(TYPES.blogService);
  const imageBaseUrl = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    blogService.getPosts().then(res => {
      
      blogStore.setPosts(res.data);
      console.log(blogStore.getPosts());
    });
  }, []);
  return (
    <AdminPage>
      <br />
      <Link to="/admin/blog/new" className="btn btn-primary d-block mb-3 ms-auto" style={ { width: "120px" } }>Nuevo artículo</Link>
      <table className="table posts">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Título / Subtítulo</th>
            <th>Contenido</th>
          </tr>
        </thead>
        <tbody>
          { blogStore.getPosts().map(post => <tr key={post.id}>
            <td className="image">
              <div className="post-thumb" style={ { backgroundImage: `url(${imageBaseUrl}/${post.image_url})` } } />
            </td>
            <td className="title">{ post.title }<br /><span className="sub-title">{ post.sub_title }</span></td>
            <td className="position-relative">
              { post.content.substring(0, 300) + ' ...' }
              <br />
              <div className="position-absolute bottom-0">
                <i className="icon-eye"></i>
                <i className="icon-pencil"></i>
                <i className="icon-bin"></i>
              </div>
            </td>
          </tr>) }
        </tbody>
      </table>
    </AdminPage>
  );
};

export default observer(AdminBlogPage);