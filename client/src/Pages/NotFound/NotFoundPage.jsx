import React from 'react'
import styles from './NotFoundPage.module.css';
import Profesional from '../../img/ERROR 404-PAGENOTFOUND.webp';
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <>
      <div className={styles.driver}>
          <div className={styles.left}>
              <img src={Profesional} alt="/" />
          </div>
          <div>
              <h1>
                <br />
                 <span>UPS, ESTA PAGINA NO FUNCIONA!</span>
              </h1>
              <p>Verifica la URL por favor o volve a Inicio</p>
  
                  
              <button>
              <Link
                   to="/">
                   Volver a inicio
              </Link>
              </button>
          </div>
      </div>
      </>
    )
    
}




