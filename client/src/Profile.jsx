import React, { useEffect, useState } from 'react';
import axios from 'axios';
import black from './assets/black-heart.png';
import red from './assets/red-heart.png';
import user from './assets/user.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const [name, setName] = useState('');
  const [uemail, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [postImage, setPostImage] = useState({myFile: ""})
  const [showForm, setShowForm] = useState(false);
  const [myblogs, setMyblogs] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(false);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const email = queryParams.get('email');
    axios.get('https://yourblogging-api.vercel.app/getProfile',{ params: {email: email}})
    .then(result => {
      setName(result.data.name)
      setEmail(result.data.email)
      setPhoto(result.data.photo)
    })
    .catch(err => console.log(err))
  },[])

  const createPost = (newImage) => {
    const photo = newImage.myFile;
    axios.post('https://yourblogging-api.vercel.app/setProfile', { uemail, photo })
    .then(result => {
      setPhoto(result.data.photo);
      setShowForm(false);
      console.log(photo);
    })
    .catch(err => console.log(err))
  }

  const handleShow = (e) => {
    e.preventDefault();
    console.log(name);
    axios.get(`https://yourblogging-api.vercel.app/getBlogs/${name}`,)
    .then(result => {
      console.log(result.data);
      setMyblogs(result.data);
      setMessage(true);
    })
    .catch(err => console.log(err))
  }

  const handlePhoto = (e) => {
    e.preventDefault();
    setShowForm(true);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage)
    console.log("uploaded")
  }
  const handleFileUpload = async(e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({...postImage, myFile: base64})
  }

  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/create?email=${uemail}`);
  }  

  const handleLikeClick = (index, id) => {
    const updatedBlogs = [...blogs];
    updatedBlogs[index].liked = !updatedBlogs[index].liked;

    localStorage.setItem(`Liked_${id}`, JSON.stringify(updatedBlogs[index].liked));

    if (updatedBlogs[index].liked) {
        axios.get(`https://yourblogging-api.vercel.app/getLike/${id}`)
            .then(result => {
                const currentLikes = result.data.likes;
                const updatedLikes = currentLikes + 1;
                updatedBlogs[index].likes = updatedLikes;
                setBlogs(updatedBlogs);

                axios.post(`https://yourblogging-api.vercel.app/updateLike/${id}`, { like: updatedLikes })
                    .then(result => console.log(result))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
      } else {
          const currentLikes = updatedBlogs[index].likes;
          const updatedLikes = currentLikes - 1;
          updatedBlogs[index].likes = updatedLikes;
          setBlogs(updatedBlogs);

          axios.post(`https://yourblogging-api.vercel.app/updateLike/${id}`, { like: updatedLikes })
              .then(result => console.log(result))
              .catch(err => console.log(err));
        }
    };

    const handleTimes = () => {
      setShowForm(false);
    }

  return (
    <div className='profiles'>
        <div className="profile-container">
            <div className="profile-photo">
            <div className="photo">
              {photo ? (<img src={photo} alt="profile" />) : 
              ( <img src={user} alt='prof' onClick={handlePhoto}></img> )}
            </div>
                {showForm && (<form  onSubmit={handleSubmit} className='photo-input'>
                  <FontAwesomeIcon icon={faTimes} className='fatime' onClick={handleTimes}/>
                  <input type="file" label="Image" name='myFile' onChange={(e) => handleFileUpload(e)}/>
                  <button type="submit">Upload Photo</button>
                </form>)}
                <div className="profile-detail">
                    <h1>{name}</h1>
                    <h5>{uemail}</h5>
                    <div className="butt">
                      <h4 onClick={handleClick}>Create</h4>
                      <button onClick={handleShow}>Show my blogs</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="blogs-container">
            <div className="blog-container profile-blog">
              {myblogs.length > 0 && myblogs.map((blog, index) => {
                  return <div className="blogs profile-blogs" key={blog._id}>
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
                              <img src={blog.liked ? red : black} alt="heart" onClick={() => handleLikeClick(index, blog._id)}/>
                              <p>{blog.likes}</p>
                          </div>
                      </div>
                  </div>
              </div>})}
          </div>
          {myblogs.length <= 0 && message && <p className='no-blogs'>No Blogs are Posted...!</p>}
        </div>
    </div>
  )
}

export default Profile;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}
