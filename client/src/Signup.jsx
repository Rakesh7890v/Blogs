import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {

    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [pass, setPass] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3005/signup', {name, email, pass})
        .then(result => {
            console.log(result);
            navigate('/login')
        })
        .catch(err => console.log(err))
    }

  return (
    <div>
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <div className="logins">
                    <h1>Signup</h1>
                    <div className="inputs">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="inputs">
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="inputs">
                        <label htmlFor="">Password</label>
                        <input type='password' placeholder='Enter Your Password' onChange={(e) => setPass(e.target.value)}/>
                    </div>
                    <button>Signup</button>
                    <p><Link to='/login' className='link'>Already have an account ?</Link></p>
                </div>
            </form>    
        </div>
    </div>
  )
}

export default Signup