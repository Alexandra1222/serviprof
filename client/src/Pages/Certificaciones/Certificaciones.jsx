import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom'
import DefaultPhoto from '../../img/logo.png'
import Header from '../HomePage/Header/Header'

const Certificaciones = () => {
    const [certificaciones, setCertificaciones] = useState([])
    const [borrar,setBorrar] = useState({})

    const eliminarcertificacion = async(id)=>{
        let response = await fetch(`http://localhost:5000/api/v1/certificaciones/delete/${id}`,{
            method:'DELETE'
        })
        const data = await response.json()
        setBorrar(data)
    }

    const confirmarBorrado = (certificacionId)=>{
        let ans = window.confirm("estas seguro que queres eliminar esta certificacion?")
        if(ans){
            eliminarcertificacion(certificacionId)
        }
    }
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/v1/certificaciones/getCertificaciones', {
                    method: 'GET'
                })
                const data = await res.json();
                setCertificaciones(data)
            }
            catch (err) {
                console.log(err)
            }
        }
        return getData;
    }, [borrar._id])


    return (
        <div className="popular" id="popular">
            {/* <h2 className='mt-5 mb-5' class="heading">certificaciones Cargadas recientemente</h2> */}
            <div className="box-container">
                {!certificaciones ? <h2>Cargando..</h2> :
                    certificaciones.map((certificacion) => {
                        let photoUrl = certificacion.fotoCertificacion ? `http://localhost:5000/api/v1/certificaciones/photo/${certificacion._id}?${new Date().getTime()}` : DefaultPhoto

                        return <div className="box" key={certificacion._id}>
                            <>
                                <MDBCardImage className="image"
                                    src={photoUrl}
                                    alt={certificacion.name}
                                    /* style={{ height: "300px", width: "100%", objectFit: "cover" }} */
                                />
                                <div className="content">
                                    <div className="price">{certificacion.nombreCertificacion}</div>
                                    <div className="stars">
                                        {certificacion.entidadCertificante}
                                    </div>
                                    <Link to={`editarCertificacion/${certificacion._id}`} state={{ ...certificacion }}
                                        /* className='btn btn-warning' */
                                        className="btn"
                                    >Editar</Link>
                                    <button className="btn"
                                        /* className='btn btn-danger ms-3' */
                                        onClick={()=>confirmarBorrado(certificacion._id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </>
                        </div>
                    })

                }

            </div>

        </div>
    )
}

export default Certificaciones

/* lo comento porque hay que reemplazar el mdbbotstrap  por otro tipo de card */