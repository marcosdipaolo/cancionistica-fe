import { FC, useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useStore } from '../../stores/helpers/useStore';

interface BlogEditorProps {
  initialValue?: string;
}

const BlogEditor: FC<BlogEditorProps> = ({ initialValue }) => {
  const [ showSpinner, setShowSpinner ] = useState(true);
  const { dataStore: { blogStore } } = useStore();
  useEffect(() => { blogStore.setEditorNewPostData({content: initialValue ?? blogStore.getEditorNewPostData().content}); }, [ initialValue, blogStore ]);
  const editorRef = useRef<{ getContent: Function; }>();
  return (
    <div className="position-relative">
      <Editor
        onInit={ (evt, editor) => { editorRef.current = editor; } }
        onPostRender={ () => setShowSpinner(false) }
        initialValue={ blogStore.getEditorNewPostData().content }
        apiKey="f7lgtlctu8kv23vmz0b4sqiet0g67wykosqruxl1ptysq300"
        value={ blogStore.getEditorNewPostData().content }
        onEditorChange={ (newValue, editor) => { blogStore.setEditorNewPostData({content: newValue}); } }
        init={ {
          placeholder: "Escribí el contenido...",
          height: 425,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Roboto,Helvetica,Arial,sans-serif; font-size:14px; color: rgb(34, 47, 62) }'
        } }
      />
      <div
        style={ {
          display: showSpinner ? "flex" : "none",
          height: '500px',
          right: 0,
          left: 0,
          marginTop: '-73px',
          fontSize: ' 72px',
          color: '#5D7A91'
        } }
      >
        <i className="spinner d-inline-block icon-spinner9 m-auto"></i>
      </div>
    </div>
  );
};

export default BlogEditor;
