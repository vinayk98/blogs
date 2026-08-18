import { useEffect, useState } from 'react';
import './BlogForm.css';

function BlogForm({ blog, onSubmit, onCancel, fetchBlogs }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [creator, setCreator] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (blog) {
            setTitle(blog.title || '');
            setContent(blog.content || '');
            setCreator(blog.creator || '');
            setImage(null);
        } else {
            setTitle('');
            setContent('');
            setCreator('');
            setImage(null);
        }
    }, [blog]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Keep existing image by default
            let filename = blog?.image_url || '';

            // Upload only if a NEW image was selected
            if (image) {
                const imageFormData = new FormData();

                imageFormData.append('image', image);

                const imageResponse = await fetch(
                    'https://fastapi-blogs-2o2l.onrender.com/blog/image',
                    {
                        method: 'POST',
                        body: imageFormData,
                    }
                );

                if (!imageResponse.ok) {
                    throw new Error('Image upload failed');
                }

                const imageData = await imageResponse.json();

                console.log('Uploaded image:', imageData);

                // Get the NEW filename
                filename = imageData.filename;
            }

            const blogData = {
                title,
                content,
                creator,
                image_url: filename,
            };

            console.log('Final payload:', blogData);

            let response;

            // EDIT
            if (blog) {
                response = await fetch(
                    `https://fastapi-blogs-2o2l.onrender.com/blog/update/${blog.id}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(blogData),
                    }
                );
            }

            // CREATE
            else {
                response = await fetch(
                    'https://fastapi-blogs-2o2l.onrender.com/blog/new',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(blogData),
                    }
                );
            }

            if (!response.ok) {
                throw new Error('Failed to save blog');
            }

            const data = await response.json();

            console.log('Saved blog:', data);

            onSubmit(data);

        } catch (error) {
            console.log(error);
        } finally {
            onCancel();
            await fetchBlogs();
        }
    };
    return (
        <div className="blog-form-container">
            <form className="blog-form" onSubmit={handleSubmit}>
                <h2>{blog ? 'Edit Blog' : 'Create New Blog'}</h2>

                <div className="form-group">
                    <label>Title</label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter blog title"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Content</label>

                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your blog..."
                        rows="8"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Author</label>

                    <input
                        type="text"
                        value={creator}
                        onChange={(e) => setCreator(e.target.value)}
                        placeholder="Enter author name"
                        required
                    />
                </div>

                {/* <div className="form-group">
                    <label>Image</label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div> */}

                <div className="form-actions">
                    <button type="submit">
                        {blog ? 'Update Blog' : 'Create Blog'}
                    </button>

                    <button
                        type="button"
                        className="cancel-button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BlogForm;