import { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const PostForm = () => {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const editorRef = useRef(null);
  const [fileInput, setFileInput] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (!fileInput) return;
    const reader = new FileReader();
    reader.readAsDataURL(fileInput);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
  }

  const uploadImage = async base64EncodedIamge => {
    try {
      const res = await fetch('/posts/', {
        method: 'POST',
        body: JSON.stringify({
          title,
          desc: editorRef.current.getContent(),
          img: base64EncodedIamge,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.get('token').token}`,
        },
      });

      const json = await res.json();
      if (res.ok) {
        setMessage(json.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ width: '100%', padding: '45px' }}>
      {message && <Navigate to="/" />}
      <form onSubmit={handleSubmit}>
        <h1 style={{ textAlign: 'center' }}>Create Post</h1>
        <h2>Title</h2>
        <input onChange={e => setTitle(e.target.value)} value={title} />
        <h2>Description</h2>
        <>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 350,
              menubar: false,

              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
        </>

        <input
          type="file"
          name="img"
          onChange={e => setFileInput(e.target.files[0])}
        />
        <button>Save Post</button>
      </form>
    </div>
  );
};
