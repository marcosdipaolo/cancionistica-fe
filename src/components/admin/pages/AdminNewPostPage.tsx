import { observer } from "mobx-react-lite";
import { FC, FormEvent, useRef, useState } from "react";
import { useInjection } from "../../../container/inversify-hook";
import { TYPES } from "../../../container/types";
import { IBlogService } from "../../../services/BlogService";
import { useStore } from "../../../stores/helpers/useStore";
import BlogEditor from "../BlogEditor";
import AdminPage from "../shared/AdminPage";

const AdminNewPostPage: FC = () => {
  const inputFile = useRef<HTMLInputElement>(null);
  const { dataStore: { blogStore } } = useStore();
  const [ title, setTitle ] = useState("");
  const [ subTitle, setSubTitle ] = useState("");
  const blogService = useInjection<IBlogService>(TYPES.blogService);

  const onSubmit = (e: FormEvent) => {
    const el: HTMLInputElement | null = (inputFile!.current);
    blogStore.setEditorNewPostData({
      title, subTitle
    });
    if (!el || !blogStore.editorContentIsValid()) {
      return;
    }
    
    blogService.createPost(blogStore.getEditorNewPostData()).then(({ data }) => {
      console.log(data);
      blogStore.clearEditorNewPostData();
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
        <h3>Redacción</h3>
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
        <BlogEditor />
        <br />
        <input onChange={ onFileChange } ref={ inputFile } type="file" />
        <br />
        <br />
        <button onClick={onSubmit} className="btn btn-primary">publicar</button>
        <br />
        <br />
      </div>
    </AdminPage>
  );
};

export default observer(AdminNewPostPage);