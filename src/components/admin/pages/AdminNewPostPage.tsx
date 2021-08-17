import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useInjection } from "../../../container/inversify-hook";
import { TYPES } from "../../../container/types";
import { Category } from "../../../models/Category";
import { IBlogService } from "../../../services/BlogService";
import { INotificationService, NotificationType } from "../../../services/NotificationService";
import { useStore } from "../../../stores/helpers/useStore";
import BlogEditor from "../BlogEditor";
import AdminPage from "../shared/AdminPage";

const AdminNewPostPage: FC = () => {
  const inputFile = useRef<HTMLInputElement>(null);
  const { dataStore: { blogStore } } = useStore();
  const [ title, setTitle ] = useState("");
  const [ subTitle, setSubTitle ] = useState("");
  const [ categories, setCategories ] = useState<Category[]>();
  const [ currentCategory, setCurrentCategory ] = useState("");
  const [ content, setContent ] = useState("");
  const [ image, setImage ] = useState<File | null>(null);
  const [ thumb, setThumb ] = useState("");
  const blogService = useInjection<IBlogService>(TYPES.blogService);
  const history = useHistory();
  const notificationService = useInjection<INotificationService>(TYPES.notificationService);

  useEffect(() => {
    blogService.getCategories().then(({ data }) => {
      setCategories(data);
    }).catch(err => {
      notificationService.createNotification(NotificationType.ERROR, err.message);
    });
  }, []);

  const onSubmit = () => {
    console.log(image);
    blogService.createPost({ title, subTitle, content, image, categoryId: currentCategory }).then(({ data }) => {
      blogStore.addPostToList(data);
      notificationService.createNotification(NotificationType.SUCCESS, "Artículo creado");
      history.push("/admin/blog");
    }).catch(err => {
      notificationService.createNotification(NotificationType.ERROR, err.message);
    });
  };

  const onFileChange = () => {
    const el: HTMLInputElement | null = (inputFile!.current);
    if (!el || !el.files) {
      return;
    }
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
        <h3>Redacción</h3>
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
            className="form-control"
            style={{flex: '4', marginRight: '10px'}}
          />
          <select
            className="form-control"
            value={currentCategory}
            onChange={(e) => { setCurrentCategory(e.target.value); }}
            style={{flex: '2'}}
          >
            <option value="">Elejí la categoría</option>
            {categories ? categories.map((category: Category) => (
              <option value={category.id} key={category.id}>{category.name}</option>
            )) : ''}
          </select>
        </div>
        <br />
        <BlogEditor setContent={setContent} />
        <br />
        <div className="d-flex justify-content-between">
          <label htmlFor="inputFile" className="btn btn-primary">Seleccionar Foto</label>
          <input id="inputFile" onChange={onFileChange} ref={inputFile} type="file" className="d-none" />
          <button onClick={onSubmit} className="btn btn-danger">publicar</button>
        </div>
        <img className="thumbnail d-block m-auto position-relative" src={thumb} alt="" width="300" style={{ top: '-50px' }} />
        <br />
        <br />
      </div>
    </AdminPage>
  );
};

export default AdminNewPostPage;