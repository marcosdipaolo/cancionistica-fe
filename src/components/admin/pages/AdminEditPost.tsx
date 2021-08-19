import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import history from "../../../history";
import { useInjection } from "../../../container/inversify-hook";
import { TYPES } from "../../../container/types";
import { Category } from "../../../models/Category";
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
  const [ categories, setCategories ] = useState<Category[]>();
  const [ currentCategory, setCurrentCategory ] = useState("");
  const [ initialValue, setInitialValue ] = useState("");
  const [ image, setImage ] = useState<File | null>(null);
  const [ thumb, setThumb ] = useState<string>("");
  const blogService = useInjection<IBlogService>(TYPES.blogService);
  const notificationService = useInjection<INotificationService>(TYPES.notificationService);

  useEffect(() => {
    blogService.getCategories().then(({ data }) => {
      setCategories(data);
    }).catch(err => {
      notificationService.createNotification(NotificationType.ERROR, err.message);
    });
    const post = blogService.getPost(id).then(({ data }) => {
      if (!post) {
        history.goBack();
        notificationService.createNotification(NotificationType.ERROR, "No hay un artículo con ese id");
      }
      setTitle(data.title);
      setSubTitle(data.sub_title);
      setContent(data.content);
      setInitialValue(data.content);
      if(data.post_category) {
        setCurrentCategory(data.post_category.id);
      }
      setThumb(`${process.env.REACT_APP_BACKEND_URL}/${data.images.find(img => img.size === "thumbnail")?.path}`);
    });
  }, []);

  const onSubmit = () => {
    blogService.editPost(id, { title, subTitle, content, image, categoryId: currentCategory }).then(({ data }) => {
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
      setThumb(reader.result as string);
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
        <div className="d-flex">
          <input
            value={subTitle}
            onChange={(e: FormEvent<HTMLInputElement>) => setSubTitle(e.currentTarget.value)}
            placeholder="Escribí el subtítulo"
            type="text"
            className="form-control" style={{ flex: '4', marginRight: '10px' }}
          />
          <select
            className="form-control"
            value={currentCategory}
            onChange={(e) => { setCurrentCategory(e.target.value); }}
            style={{ flex: '2' }}
          >
            <option value="">Elejí la categoría</option>
            {categories ? categories.map((category: Category) => (
              <option value={category.id} key={category.id}>{category.name}</option>
            )) : ''}
          </select>

        </div>
        <br />
        <BlogEditor initialValue={initialValue} content={content} setContent={setContent} />
        <br />
        <div className="d-flex justify-content-between">
          <label htmlFor="inputFile" className="btn btn-primary">Seleccionar Foto</label>
          <input id="inputFile" onChange={onFileChange} ref={inputFile} type="file" className="d-none" />
          <button onClick={onSubmit} className="btn btn-danger">publicar</button>
        </div>
        <img className="thumbnail d-block m-auto position-relative" src={thumb} alt="" width="150" style={{ top: '-50px' }} />
        <br />
        <br />
      </div>
    </AdminPage>
  );
};

export default AdminEditPostPage;