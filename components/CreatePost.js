import { useState } from 'react';
import fire from '../services/firebase';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fire.blog.addPost({
      title: title,
      content: content
    });
    setTitle('');
    setContent('');
  };

  return (
    <div className="max-w-xs">
      <h2>Add Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title
          <br />
          <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          Content
          <br />
          <textarea value={content} onChange={({ target }) => setContent(target.value)} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreatePost;
