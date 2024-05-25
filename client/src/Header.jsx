import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [menuItems, setMenuItems] = useState(false);

    useEffect(() => {
        const handleResize = () => {
          setShowMenu(window.innerWidth < 750);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleBars = () => {
        setMenuItems(true);
    }

    const handleTimes = () => {
        setMenuItems(false);
    }

    const handleClose = () => {
        setMenuItems(false);
    }

  return (
    <div>
        <div className="header-component">
            <div className="left-head">
                <h1>BLOGS</h1>
            </div>
            <div className="right-head">
                {showMenu && <FontAwesomeIcon icon={faBars} onClick={handleBars} className='fabar'/>}
                {!showMenu && <ul>
                    <li><Link to='/' className='link'>Home</Link></li>
                    <li><Link to='/blog' className='link'>Blogs</Link></li>
                    <li className='login'><Link to='/login' className='link'>Profile</Link></li>
                </ul>}
            </div>
            {menuItems && <div className="right">
                <ul className='menus'>
                {menuItems && (<FontAwesomeIcon icon={faTimes} className='fatime' onClick={handleTimes}/>)}                    <li><Link to='/' className='link' onClick={handleClose}>Home</Link></li>
                <li><Link to='/blog' className='link' onClick={handleClose}>Blogs</Link></li>
                <li className='login'><Link to='/login' className='link' onClick={handleClose}>Profile</Link></li>
            </ul>
            </div>}
        </div>
    </div>
  )
}

export default Header