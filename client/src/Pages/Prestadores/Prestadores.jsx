import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom'
import DefaultPhoto from '../../img/logo.png'
import Header from '../HomePage/Header/Header'

const Prestadores = () => {
    const [prestadores, setPrestadores] = useState([])
    const [borrar,setBorrar] = useState({})

    const eliminarPrestador = async(id)=>{
        let response = await fetch(`http://localhost:5000/api/v1/prestador/delete/${id}`,{
            method:'DELETE'
        })
        const data = await response.json()
        setBorrar(data)
    }

    const confirmarBorrado = (prestadorId)=>{
        let ans = window.confirm("estas seguro que queres eliminar este Prestador?")
        if(ans){
            eliminarPrestador(prestadorId)
        }
    }
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/v1/prestador/getprestadores', {
                    method: 'GET'
                })
                const data = await res.json();
                setPrestadores(data)
            }
            catch (err) {
                console.log(err)
            }
        }
        return getData;
    }, [borrar._id])


    return (
        <div className="popular" id="popular">
            
            
            <div className="box-container">
                {!prestadores ? <h2>Cargando..</h2> :
                    prestadores.map((prestador) => {
                        let photoUrl = prestador.fotoPerfil ? `http://localhost:5000/api/v1/prestador/photo/${prestador._id}?${new Date().getTime()}` : DefaultPhoto

                        return <div  className="box" key={prestador._id}>
                            <>
                                <MDBCardImage className="image"
                                    src={photoUrl}
                                    alt={prestador.name}
                                    /* style={{ height: "300px", width: "100%", objectFit: "cover" }} */
                                />
                                <div className="content">
                                <div className="price">{prestador.nombrePrestador}</div>
                                    <div className="stars">
                                        {prestador.numeroTelefono}
                                    </div>
                                    <Link to={`/editarPrestador/${prestador._id}`} state={{ ...prestador }}
                                        /* className='btn btn-warning' */
                                    >Editar</Link>
                                    <button className="btn"
                                        /* className='btn btn-danger ms-3' */
                                        onClick={()=>confirmarBorrado(prestador._id)}
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

export default Prestadores