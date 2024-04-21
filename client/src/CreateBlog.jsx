import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const [content, setContent] = useState('');

    const navigate = useNavigate();
    axios.default.withCredentials = true;

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const email = queryParams.get('email');
        axios.get('https://yourblogging-api.vercel.app/getProfile',{ params: {email: email}})
        .then(result => {
            setName(result.data.name)
            setPhoto(result.data.photo)
        })
        .catch(err => console.log(err))
    },[]);

    const Create = (e) => {
        e.preventDefault();
        axios.post('https://yourblogging-api.vercel.app/create', {photo, name, title, content})
        .then(result => {
            console.log(result);
            navigate('/blog');
        })
        .catch(err => console.log(err));
    }

  return (
    <div>
        <div className="createblog-container">
            <form onSubmit={Create}>
                <div className="input-container">
                    <input type="text" placeholder='Enter Blog Title' onChange={(e) => setTitle(e.target.value)}/>
                    <input type="text" placeholder='Enter Blog Content' onChange={(e) => setContent(e.target.value)}/>
                </div>
                <button>Create</button>
            </form>
        </div>
    </div>
  )
}

export default CreateBlog
