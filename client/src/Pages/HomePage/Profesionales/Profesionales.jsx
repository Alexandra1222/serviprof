import React from 'react'
import styles from './Profesionales.module.css';
import Profesional from '../../../img/electricistass.webp'
import { Link } from 'react-router-dom'


const Profesionales = () => {
  return (
    <div className={styles.driver}>
        <div className={styles.left}>
            <img src={Profesional} alt="/" />
        </div>
        <div>
            <h2>Encontra Profesionales
              <br />
               <span>MAS RAPIDO!</span>
            </h2>
            <p>Accede a los perfiles de profesionales certificados, sus presupuestos y comentarios de otros usuarios!</p>

                
            <button>
            <Link
                 /* style={isActive("/login")} */
                 to="/servicios">
                 Ver  todos los Profesionales
            </Link>
            </button>
        </div>
    </div>
  )
}

export default Profesionales