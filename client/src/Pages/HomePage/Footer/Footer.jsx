import React from 'react';
import styles from './Footer.module.css';
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineUser, AiOutlineSearch, AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';
import { useState } from 'react';
import Logo from '../../../img/logo.png'

const Header = () =>{

    const [nav, setNav] = useState(false);
    const location = useLocation()
    /* const isActive = (path) => {
        if (location.pathname === path) return { color: "#ff9900" }
        else return { color: "black" }
    } */

    return (
        <header className={styles.navbar}>
         <img src={Logo} alt='Logo' className={styles.image}/>

         <nav>
        <ul className={nav ? [styles.menu, styles.active].join(' ') : [styles.menu]} >
          <li>
             <Link 
             /* style={isActive("/")} */
             to="/">
             Home
            </Link>
          </li>
          <li>
            <Link
                 /* style={isActive("/login")} */
                 to="/login">
                 Ingresar
            </Link>
          </li>
          <li>
            <Link 
            /* style={isActive("/servicios")} */
            to="/servicios">
            Servicios
            </Link>
          </li>
          <li>
            <AiOutlineSearch size={25} style={{ marginTop: '6px' }} />
          </li>
          <li>
            <AiOutlineUser size={25} style={{ marginTop: '6px' }} />
          </li>
        </ul>
      </nav>
      <div onClick={()=> setNav(!nav)} className={styles.mobile_btn}>
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
        
      </div>
    </header>
    )
    
}

export default Header
