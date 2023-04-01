import { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const PostForm = () => {
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const editorRef = useRef(null);
  const [fileInput, setFileInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!fileInput) {
      setErrorMessage('Upload your image');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(fileInput);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
  }

  const uploadImage = async base64EncodedIamge => {
    setIsLoading(true);
    try {
      const res = await fetch('https://blog-api-lys3.onrender.com/posts/', {
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
      setErrorMessage('Image too large');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-post-container">
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
        <h4 style={{ color: 'red' }}>{errorMessage}</h4>

        <button>{isLoading ? 'Loading....' : 'Save Post'}</button>
      </form>
    </div>
  );
};
