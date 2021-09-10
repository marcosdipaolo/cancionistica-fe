import { FC, FormEvent, useEffect, useRef, useState } from "react";
import history from "../../../history";
import { useInjection } from "../../../container/inversify-hook";
import { TYPES } from "../../../container/types";
import { Category } from "../../../models/Category";
import { IBlogService } from "../../../services/BlogService";
import { INotificationService, NotificationType } from "../../../services/NotificationService";
import { useStore } from "../../../stores/helpers/useStore";
import BlogEditor from "../BlogEditor";
import AdminPage from "../shared/AdminPage";
import * as Yup from "yup";
import { ValidationError } from "yup";
import { authMessages } from "../../../messages/messages";
import { observer } from "mobx-react-lite";

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
  const notificationService = useInjection<INotificationService>(TYPES.notificationService);

  const { dataStore: { userStore } } = useStore();

  const schema = Yup.object().shape({
    title: Yup.string().min(4, "El título debe tener un mínimo de 4 caracteres").required("El título es obligatorio"),
    subTitle: Yup.string().min(4, "El subtítulo debe tener un mínimo de 4 caracteres").required("El subtítulo es obligatorio"),
    content: Yup.string().min(20, "El contenido debe tener un mínimo de 20 caracteres").required("El contenido es obligatorio"),
    currentCategory: Yup.string().min(1, "Elejí una categoría").required("Elejí una categoría"),
    image: Yup.mixed().test("image", "Elejí una imagen", function (value) {
      return value instanceof File;
    })
  });

  useEffect(() => {
    userStore.checkIfAdmin();
    blogService.getCategories().then(({ data }) => {
      setCategories(data);
    }).catch(err => {
      notificationService.createNotification(NotificationType.ERROR, err.message);
    });
  }, []);

  useEffect(() => {
    if (!userStore.isAdmin) {
      notificationService.createNotification(NotificationType.ERROR, authMessages.onlyAdmin);
      history.push("/admin");
    }
  }, [ userStore.isAdmin ]);

  const onSubmit = async () => {
    try {
      await schema.validate({ title, subTitle, content, image, currentCategory });
      const { data } = await blogService.createPost({ title, subTitle, content, image, categoryId: currentCategory });
      blogStore.addPostToList(data);
      notificationService.createNotification(NotificationType.SUCCESS, "Artículo creado");
      history.push("/admin/blog");
    } catch (err) {
      if (err instanceof ValidationError && err.errors.length) {
        notificationService.createNotification(NotificationType.ERROR, err.errors[ 0 ]);
        return;
      }
      notificationService.createNotification(NotificationType.ERROR, err.message);
    }
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
          value={ title }
          onChange={ (e: FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value) }
          placeholder="Escribí el título"
          type="text"
          className="form-control"
        />
        <br />
        <div className="d-flex">
          <input
            value={ subTitle }
            onChange={ (e: FormEvent<HTMLInputElement>) => setSubTitle(e.currentTarget.value) }
            placeholder="Escribí el subtítulo"
            type="text"
            className="form-control"
            style={ { flex: '4', marginRight: '10px' } }
          />
          <select
            className="form-control"
            value={ currentCategory }
            onChange={ (e) => { setCurrentCategory(e.target.value); } }
            style={ { flex: '2' } }
          >
            <option value="">Elejí la categoría</option>
            { categories ? categories.map((category: Category) => (
              <option value={ category.id } key={ category.id }>{ category.name }</option>
            )) : '' }
          </select>
        </div>
        <br />
        <BlogEditor setContent={ setContent } />
        <br />
        <div className="d-flex justify-content-between">
          <label htmlFor="inputFile" className="btn btn-primary">Seleccionar Foto</label>
          <input id="inputFile" onChange={ onFileChange } ref={ inputFile } type="file" className="d-none" />
          <button onClick={ onSubmit } className="btn btn-danger">publicar</button>
        </div>
        <img className="thumbnail d-block m-auto position-relative" src={ thumb } alt="" width="300" style={ { top: '-50px' } } />
        <br />
        <br />
      </div>
    </AdminPage>
  );
};

export default observer(AdminNewPostPage);