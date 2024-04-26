import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState([]);
    const [pass, setPass] = useState([]);
    const [err, setErr] = useState(false);
    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://yourblogging-api.vercel.app/login',{email, pass})
        .then(result => {
            console.log(result)
            if (result.data === "Success"){
                window.location = `/profile?email=${email}`;
            } else {
                setErr(true);
            }
        })
        .catch(err => console.log(err))
    }

  return (
    <div>
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <div className="logins">
                    <h1>Login</h1>
                    <div className="inputs">
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="inputs">
                        <label htmlFor="">Password</label>
                        <input type='password' placeholder='Enter Your Password' onChange={(e) => setPass(e.target.value)}/>
                    </div>
                    {err && (<p className='error'>* Email or Password is wrong</p>)}
                    <button>Login</button>
                    <p>Forget Password ?</p>
                    <p><Link to='/signup' className='link'>Don't have an account ?</Link></p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
