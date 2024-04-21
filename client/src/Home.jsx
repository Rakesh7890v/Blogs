import React from 'react';
import blog from './assets/blog.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
        <div className="home-container">
            <div className="left-home">
                <img src={blog} alt='blog' className='home-blog'/>
            </div>
            <div className="right-home">
                <p>
                A blog, short for weblog, is a frequently updated web page used for personal commentary or business content. Blogs are often interactive and include sections at the bottom of individual blog posts where readers can leave comments.
                Blogs serve various purposes, including personal expression, sharing of knowledge or expertise, promotion of products or services, journalism, and more. They can cover a wide range of topics, from personal experiences and hobbies to professional advice and news commentary.
                </p>
                <button><Link to='/login' className='link'>Create a Blog</Link></button>
            </div>
        </div>
    </div>
  )
}

export default Home