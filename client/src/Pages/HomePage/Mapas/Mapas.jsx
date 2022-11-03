import React from 'react';
import styles from './Mapas.module.css';
import { Link } from 'react-router-dom'





const Mapas = () => {
  return (
    <>
    <div className={styles.hero}>
      
    <div className={styles.driver}>
        <div>
            <h2>Profesionales
              <br />
               <span>CERCA DE CASA !</span>
            </h2>
            <p>Buscalos y contactalos!</p>

            <button>
            <Link
                 /* style={isActive("/login")} */
                 to="/mapaservicioscerca">
                 Buscar en el mapa
            </Link>
              </button>

        </div>
    </div>

    </div>
    </>
  );
};

export default Mapas;