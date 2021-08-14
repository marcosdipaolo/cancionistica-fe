import { FC, useRef, useState, Dispatch, SetStateAction } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { observer } from 'mobx-react-lite';

interface BlogEditorProps {
  content?: string;
  initialValue?: string;
  setContent: Dispatch<SetStateAction<string>>
}

const BlogEditor: FC<BlogEditorProps> = ({ content, initialValue, setContent }) => {
  const [ showSpinner, setShowSpinner ] = useState(true);
  const editorRef = useRef<{ getContent: Function; }>();
  return (
    <div className="position-relative">
      <Editor
        onInit={ (evt, editor) => { editorRef.current = editor; } }
        onPostRender={ () => setShowSpinner(false) }
        initialValue={ initialValue }
        apiKey="f7lgtlctu8kv23vmz0b4sqiet0g67wykosqruxl1ptysq300"
        // onEditorChange={ (newValue, editor) => { blogStore.setEditorNewPostData({content: newValue}); } }
        onEditorChange={(newValue, editor) => setContent(newValue)}
        value={content}
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

export default observer(BlogEditor);
