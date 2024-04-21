import React, { useEffect, useState } from 'react';
import user from './assets/user.png';
import axios from 'axios';
import black from './assets/black-heart.png';
import red from './assets/red-heart.png';

const Blogs = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3005')
        .then(result => {
            const loadedBlogs = result.data.map(blog => {
                const liked = localStorage.getItem(`Liked_${blog._id}`);
                blog.liked = liked ? JSON.parse(liked) : false;
                return blog;
            });
            setBlogs(loadedBlogs);
        })
        .catch(err => console.log(err))
    }, []);
    
    const handleLikeClick = (index, id) => {
        const updatedBlogs = [...blogs];
        updatedBlogs[index].liked = !updatedBlogs[index].liked;
    
        localStorage.setItem(`Liked_${id}`, JSON.stringify(updatedBlogs[index].liked));
    
        if (updatedBlogs[index].liked) {
            axios.get(`http://localhost:3005/getLike/${id}`)
                .then(result => {
                    const currentLikes = result.data.likes;
                    const updatedLikes = currentLikes + 1;
                    updatedBlogs[index].likes = updatedLikes;
                    setBlogs(updatedBlogs);
    
                    axios.post(`http://localhost:3005/updateLike/${id}`, { like: updatedLikes })
                        .then(result => console.log(result))
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        } else {
            const currentLikes = updatedBlogs[index].likes;
            const updatedLikes = currentLikes - 1;
            updatedBlogs[index].likes = updatedLikes;
            setBlogs(updatedBlogs);
    
            axios.post(`http://localhost:3005/updateLike/${id}`, { like: updatedLikes })
                .then(result => console.log(result))
                .catch(err => console.log(err));
        }
    };

  return (
    <div>
        <div className="blog-container">
            <div className="blogging">
            {blogs.map((blog, index) => {
                return <div className="blogs" key={blog._id}>
                <div className="top">
                    <img src={blog.photo || user} alt="User" className='user-profile'/>
                    <h1>{blog.name}</h1>
                </div>
                <div className="bottom">
                    <h2>{blog.title}</h2>
                    <p>{blog.content}</p>
                </div>
                <div className="like-comment">
                    <div className="buttons">       
                        <div className="like">
                            <img src={blog.liked ? red : black} alt="heart" onClick={() => handleLikeClick(index, blog._id)} />
                            <p>{blog.likes}</p>
                        </div>
                    </div>
                </div>
            </div>})}
        </div>
        </div>
    </div>
  )
}

export default Blogs;
