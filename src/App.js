import { useEffect, useState } from 'react';
import './App.css';
import BlogCard from './Blogcard';
import BlogForm from './BlogForm';
function App() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);


  const fetchBlogs = () => {
    fetch('https://fastapi-blogs-2o2l.onrender.com/blog/all')
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteBlog = (id) => {
    fetch(`https://fastapi-blogs-2o2l.onrender.com/blog/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Blog deleted:', data);
        fetchBlogs();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreate = () => {
    setSelectedBlog(null);
    setShowForm(true);
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setShowForm(true);
  };

  const handleSubmit = (formData) => {
    console.log('Form submitted');
    console.log(formData);

    // We will connect this to POST/PUT API next
  };

  return (
    <div className="App">
      <h1>StoryStack</h1>

      {!showForm && (
        <button onClick={handleCreate} className='create-button'>
          Create New Blog
        </button>
      )}

      {showForm && (
        <BlogForm
          blog={selectedBlog}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          fetchBlogs={fetchBlogs}
        />
      )}

      <div className="blogs-container">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              key={blog?.id}
              blog={blog}
              onEdit={handleEdit}
              onDelete={handleDeleteBlog}
              formatDate={formatDate}
            />
          ))
        ) : (
          <div className="no-blogs">
            <h2>No Blogs Found</h2>
            <p>There are no blogs available right now.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
