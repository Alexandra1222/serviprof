/* import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import DefaultPhoto from '../../img/logo.png'



export default function UsersPage() {
  const [usuarios, setUsuarios] = useState([])

    const [borrar, setBorrar] = useState({})

    const deletePRofile = async (id) => {
        let response = await fetch(`http://localhost:5000/api/v1/perfiles/delete/${id}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        setBorrar(data)
    }

    const deleteConfirmed = (perfilId) => {
        let ans = window.confirm("Estas seguro que deseas  eliminar este perfil?")
        if (ans) {
          deletePRofile(perfilId)
        }
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/v1/perfiles', {
                    method: 'GET'
                })
                const data = await res.json();
                setUsuarios(data)
            }
            catch (err) {
                console.log(err)
            }
        }
        return getData;
    }, [borrar._id])

    return (

        <div>
            <h2 className='mt-5 mb-5'>Usuarios de serviProf</h2>
            <div className='row'>
                {!usuarios ? <h2>Cargando...</h2> :
                    usuarios.map((usuario) => {
                        let fotoUrl = usuarios.fotoPerfil ? `http://localhost:5000/api/v1/perfiles/photo/${usuario._id} ? ${new Date().getTime()}` : DefaultPhoto
                        return <div className='col-lg-4' key={usuario._id}>
                            <MDBCard>
                                <MDBCardImage
                                    src={fotoUrl}
                                    alt={usuario.nombre}
                                    style={{ height: "300px", width: "100%", objectFit: "cover" }}
                                />
                                <MDBCardBody>
                                    <MDBCardTitle>{usuario.nombre}</MDBCardTitle>
                                    <MDBCardText>{usuario.apellido}</MDBCardText>
                                    <MDBCardText>{usuario.telefono}</MDBCardText>
                                    <Link to={`/api/v1/perfiles/edit/${usuario._id}`} state={{ ...usuario }}
                                        className='btn btn-warning'
                                    >Editar</Link>
                                    <MDBBtn
                                        className='btn btn-danger ms-3'
                                        onClick={() => deleteConfirmed(usuario._id)}
                                    >
                                        Eliminar
                                    </MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </div>
                    })

                }

            </div>

        </div>



    )
}
 */