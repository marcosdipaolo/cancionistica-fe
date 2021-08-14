import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useInjection } from "../../../container/inversify-hook";
import { TYPES } from "../../../container/types";
import { IBlogService } from "../../../services/BlogService";
import { INotificationService, NotificationType } from "../../../services/NotificationService";
import BlogEditor from "../BlogEditor";
import AdminPage from "../shared/AdminPage";

const AdminEditPostPage: FC = () => {
  const { id } = useParams<{ id: string; }>();
  const inputFile = useRef<HTMLInputElement>(null);
  const [ title, setTitle ] = useState("");
  const [ subTitle, setSubTitle ] = useState("");
  const [ content, setContent ] = useState("");
  const [ initialValue, setInitialValue ] = useState("");
  const [ image, setImage ] = useState<File | null>(null);
  const [ thumb, setThumb ] = useState<string>("");
  const blogService = useInjection<IBlogService>(TYPES.blogService);
  const history = useHistory();
  const notificationService = useInjection<INotificationService>(TYPES.notificationService);

  useEffect(() => {
    const post = blogService.getPost(id).then(({ data }) => {
      if (!post) {
        history.goBack();
        notificationService.createNotification(NotificationType.ERROR, "No hay un artículo con ese id");
      }
      setTitle(data.title);
      setSubTitle(data.sub_title);
      setContent(data.content);
      setInitialValue(data.content);
      setThumb(`${process.env.REACT_APP_BACKEND_URL}/${data.image_url}`);
    });
  }, []);

  const onSubmit = () => {
    blogService.editPost(id, { title, subTitle, content, image }).then(({ data }) => {
      notificationService.createNotification(NotificationType.SUCCESS, "Artículo editado");
      history.push("/admin/blog");
    }).catch(err => {
      notificationService.createNotification(NotificationType.ERROR, err.message);
    });
  };

  const onFileChange = () => {
    const el: HTMLInputElement | null = (inputFile!.current);
    if (!el || !el.files) return;
    const newImage = el.files[ 0 ];
    setImage(newImage);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setThumb(reader.result as string)
    });
    if (newImage) {
      reader.readAsDataURL(newImage);
    }
  };

  return (
    <AdminPage>
      <div className="container">
        <br />
        <h3>Edición</h3>
        <input
          value={title}
          onChange={(e: FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
          placeholder="Escribí el título"
          type="text"
          className="form-control"
        />
        <br />
        <input
          value={subTitle}
          onChange={(e: FormEvent<HTMLInputElement>) => setSubTitle(e.currentTarget.value)}
          placeholder="Escribí el subtítulo"
          type="text"
          className="form-control"
        />
        <br />
        <BlogEditor initialValue={initialValue} content={content} setContent={setContent} />
        <br />
        <div className="d-flex justify-content-between">
          <label htmlFor="inputFile" className="btn btn-primary">Seleccionar Foto</label>
          <input id="inputFile" onChange={onFileChange} ref={inputFile} type="file" className="d-none"/>
          <button onClick={onSubmit} className="btn btn-danger">publicar</button>
        </div>
        <img className="thumbnail d-block m-auto position-relative" src={thumb} alt="" width="300" style={{top: '-50px'}}/>
        <br />
        <br />
      </div>
    </AdminPage>
  );
};

export default AdminEditPostPage;