import './BlogCard.css';

function BlogCard({ blog, onDelete, onEdit, formatDate }) {
    const BASE_URL = 'http://localhost:8000/';

    return (
        <div className="blog-card">
            {blog?.image_url && (
                <img
                    className="post-image"
                    src={`${BASE_URL}${blog.image_url} `}
                    alt={blog.title}
                />
            )}

            <h2>{blog.title}</h2>

            <p>{blog.content}</p>

            <p>Author - {blog.creator}</p>

            <p>Time - {formatDate(blog.timestamp)}</p>

            <div className="blog-actions">
                <button
                    onClick={() => {
                        console.log('edit');
                        onEdit(blog);
                    }}
                >
                    Edit
                </button>

                <button
                    onClick={() => {
                        console.log('delete');
                        onDelete(blog.id);
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default BlogCard;