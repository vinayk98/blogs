import './BlogCard.css';

function BlogCard({ blog, onDelete, onEdit, formatDate }) {
    return (
        <div className="blog-card">
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