import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Home from './Home';
import CreateBlog from './CreateBlog';
import Blogs from './Blogs';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';

function App() {
  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<CreateBlog />}/>
          <Route path='/blog' element={<Blogs />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/profile' element={<Profile />}/>
        </Routes>
    </div>
  );
}

export default App;
