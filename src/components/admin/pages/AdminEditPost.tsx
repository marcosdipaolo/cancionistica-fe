import { observer } from "mobx-react-lite";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useInjection } from "../../../container/inversify-hook";
import { TYPES } from "../../../container/types";
import { IBlogService } from "../../../services/BlogService";
import { INotificationService, NotificationType } from "../../../services/NotificationService";
import { useStore } from "../../../stores/helpers/useStore";
import BlogEditor from "../BlogEditor";
import AdminPage from "../shared/AdminPage";

const AdminEditPostPage: FC = () => {
  const { id } = useParams<{ id: string; }>();
  const inputFile = useRef<HTMLInputElement>(null);
  const { dataStore: { blogStore } } = useStore();
  const [ title, setTitle ] = useState("");
  const [ subTitle, setSubTitle ] = useState("");
  const [ content, setContent ] = useState("");
  const blogService = useInjection<IBlogService>(TYPES.blogService);
  const history = useHistory();
  const notificationService = useInjection<INotificationService>(TYPES.notificationService);

  useEffect(() => {
    const post = blogService.getPost(id).then(({data}) => {
      if (!post) {
        history.goBack();
        notificationService.createNotification(NotificationType.ERROR, "No hay un artículo con ese id");
      }
      setTitle(data.title);
      setSubTitle(data.sub_title);
      setContent(data.content);
    });
  }, []);

  const onSubmit = (e: FormEvent) => {
    const el: HTMLInputElement | null = (inputFile!.current);
    blogStore.setEditorNewPostData({
      title, subTitle
    });
    if (!el || !blogStore.editorContentIsValid()) {
      return;
    }

    blogService.editPost(id, blogStore.getEditorNewPostData()).then(({ data }) => {
      blogStore.clearEditorNewPostData();
      notificationService.createNotification(NotificationType.SUCCESS, "Artículo editado");
      history.push("/admin/blog");
    }).catch(err => {
      notificationService.createNotification(NotificationType.ERROR, err.message);
    });
  };

  const onFileChange = () => {
    const el: HTMLInputElement | null = (inputFile!.current);
    if (!el) {
      return;
    }
    blogStore.setEditorNewPostData({ image: el.files![ 0 ] });
  };

  return (
    <AdminPage>
      <div className="container">
        <br />
        <h3>Edición</h3>
        <input
          value={ title }
          onChange={ (e: FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value) }
          placeholder="Escribí el título"
          type="text"
          className="form-control"
        />
        <br />
        <input
          value={ subTitle }
          onChange={ (e: FormEvent<HTMLInputElement>) => setSubTitle(e.currentTarget.value) }
          placeholder="Escribí el subtítulo"
          type="text"
          className="form-control"
        />
        <br />
        <BlogEditor initialValue={content} />
        <br />
        <input onChange={ onFileChange } ref={ inputFile } type="file" />
        <br />
        <br />
        <button onClick={ onSubmit } className="btn btn-primary">publicar</button>
        <br />
        <br />
      </div>
    </AdminPage>
  );
};

export default observer(AdminEditPostPage);