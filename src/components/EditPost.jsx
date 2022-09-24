import { useParams, Navigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState, useRef } from 'react';
import { useEdit } from '../hooks/useEdit';

import Cookies from 'universal-cookie';
import { set } from 'date-fns/esm';
const cookies = new Cookies();

export const EditPost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [published, setPublished] = useState(false);
  const [url, setUrl] = useState('');
  const [imgId, setImgId] = useState('');
  const [error, setError] = useState('');
  const [changeImage, setChangeImage] = useState(false);
  const [fileInput, setFileInput] = useState('');
  const editorRef = useRef(null);
  const { updatePost, message, errorMessage } = useEdit();

  const { id } = useParams();

  useEffect(() => {
    const getPostDetails = async () => {
      const res = await fetch(`/posts/${id}`);
      const json = await res.json();

      if (res.ok) {
        setTitle(json[0].title);
        setDescription(json[0].desc);
        setUrl(json[0].img);
        setImgId(json[0]?.imgId);
        setPublished(json[0].published);
      } else {
        setError(json.msg);
      }
    };
    getPostDetails();
  }, [changeImage]);

  const editPost = async e => {
    e.preventDefault();

    if (!fileInput) {
      updatePost(
        id,
        title,
        editorRef.current.getContent(),
        published,
        url,
        imgId
      );
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(fileInput);
      reader.onloadend = async () => {
        updatePost(
          id,
          title,
          editorRef.current.getContent(),
          published,
          reader.result,
          imgId
        );
      };
    }
  };

  const deleteImage = async e => {
    try {
      await fetch(`/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.get('token').token}`,
        },
        body: JSON.stringify({ img: '', imgId }),
      });

      setChangeImage(true);
      setUrl('');
      setFileInput('');
      setImgId('');
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div style={{ width: '80%', padding: '10px', textAlign: 'center' }}>
      <h1>Edit Post</h1>
      {errorMessage}
      {error && <h1>{error}</h1>}

      <form onSubmit={editPost}>
        <h3>Title</h3>
        <input onChange={e => setTitle(e.target.value)} value={title} />
        <h3>Description</h3>
        <>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={description}
            init={{
              height: 450,
              menubar: false,

              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
            }}
          />
        </>

        <div
          className="publish-section"
          style={{ display: 'flex', justifyContent: 'center', gap: '25px' }}
        >
          <h2>Publish your post?</h2>
          {published ? (
            <input
              checked
              type="checkbox"
              value={published}
              onChange={e => setPublished(!published)}
            />
          ) : (
            <input
              type="checkbox"
              value={published}
              onChange={e => setPublished(!published)}
            />
          )}
        </div>
        <div
          className="update-image-section"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {url ? (
            <>
              <img src={url} alt="img" />
              <button type="button" onClick={deleteImage}>
                Delete Image
              </button>
            </>
          ) : (
            <input
              type="file"
              name="img"
              onChange={e => setFileInput(e.target.files[0])}
            />
          )}
        </div>

        <button>Save Changes</button>
      </form>

      {message && <Navigate to="/" />}
    </div>
  );
};
