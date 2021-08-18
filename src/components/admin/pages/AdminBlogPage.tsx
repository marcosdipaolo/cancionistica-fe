import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useInjection } from "../../../container/inversify-hook";
import { TYPES } from "../../../container/types";
import { IBlogService } from "../../../services/BlogService";
import { useStore } from "../../../stores/helpers/useStore";
import AdminPage from "../shared/AdminPage";
import Modal from 'react-modal';
import { INotificationService, NotificationType } from "../../../services/NotificationService";

const AdminBlogPage: FC<RouteComponentProps> = ({ history }) => {
  const { dataStore: { blogStore } } = useStore();
  const blogService = useInjection<IBlogService>(TYPES.blogService);
  const imageBaseUrl = process.env.REACT_APP_BACKEND_URL;
  const notificationService = useInjection<INotificationService>(TYPES.notificationService);
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ postToDeleteId, setPostToDeleteId ] = useState("");

  const getPosts = () => {
    blogService.getPosts().then(data => {
      console.log(data);
      
      blogStore.setPosts(data);
    }).catch(err => {
      blogStore.setPosts([]);
      if (history.action !== "POP") {
        notificationService.createNotification(NotificationType.ERROR, err.message);
      }
    });
  };
  useEffect(() => {
    getPosts();
  }, []);

  const deletePost = (id: string) => {
    setModalOpen(false);
    blogService.deletePost(id).then(() => {
      notificationService.createNotification(NotificationType.SUCCESS, "Artículo borrado");
      getPosts();
    }).catch(err => {
      notificationService.createNotification(NotificationType.ERROR, err.message);
    });
  };

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
          { blogStore.postList.map(post => <tr key={ post.id }>
            <td className="image">
              <div className="post-thumb" style={ { backgroundImage: `url(${imageBaseUrl}/${post.images.find(img => img.size === "thumbnail")?.path})` } } />
            </td>
            <td className="title">{ post.title }<br /><span className="sub-title">{ post.sub_title }</span></td>
            <td className="position-relative">
              <div className="post-content" dangerouslySetInnerHTML={ { __html: post.content.substring(0, 200) + ' ...' } } />
              <br />
              <div className="position-absolute bottom-0">
                <Link to={ `/blog/${post.id}` }><i className="icon-eye"></i></Link>
                <Link to={ `/admin/blog/${post.id}/edit` }><i className="icon-pencil"></i></Link>
                <i onClick={ () => { setPostToDeleteId(post.id); setModalOpen(true); } } className="icon-bin"></i>
                { post.post_category ? <span className="badge bg-primary">{ post.post_category.name }</span> : '' }
              </div>
            </td>
          </tr>) }
        </tbody>
      </table>
      <Modal
        isOpen={ modalOpen }
        style={ {
          content:
          {
            border: 'none',
            boxShadow: '1px 1px 2px rgba(0,0,0,.4)',
            top: '50%',
            left: '50%',
            height: '200px',
            width: '400px',
            transform: 'translate(-50%, -50%)',
            padding: '10px 10px 0'
          }
        } }
      >
        <div className="delete-post-modal">
          <h4><i className="icon-cancel-circle"></i> Borrar</h4>
          <p>Estás seguro? esta es una acción irreversible</p>
          <div className="d-flex justify-content-between">
            <button onClick={ () => deletePost(postToDeleteId) } className="btn btn-danger d-block">Si, borrar</button>
            <button onClick={ () => { setPostToDeleteId(""); setModalOpen(false); } } className="btn btn-info d-block">Cancelar</button>
          </div>
        </div>
      </Modal>
    </AdminPage>
  );
};

export default observer(AdminBlogPage);