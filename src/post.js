import { useEffect, useState } from 'react';

const BASE_URL = "http://localhost:8000/"


function Post({ post }) {
    const [imageUrl, setImageUrl] = useState("")

    useEffect(() => {
        setImageUrl(BASE_URL + post.imageUrl)
    }, [])

    return (
        <div className='post'>
            <img className='post_name' src={imageUrl} alt='img' />
        </div>
    )
}

export default Post