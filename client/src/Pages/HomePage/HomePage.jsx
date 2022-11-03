import React from 'react'
import Header from '../HomePage/Header/Header'
import Banner from '../HomePage/Banner/Banner'
import Categoria from '../HomePage/Categoria/Categoria'
import Profesionales from '../HomePage/Profesionales/Profesionales'
import Mapas from '../HomePage/Mapas/Mapas'
import Footer from '../HomePage/Footer/Footer'




export default function HomePage() {
  return (
    <div > 
      <Header/>
      <Banner/>
      <Categoria/>
      <Profesionales/>
      <Mapas/>
      <Footer/>
    </div>
  )
}
