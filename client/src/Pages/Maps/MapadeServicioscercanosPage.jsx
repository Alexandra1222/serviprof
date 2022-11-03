import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import './mapaservicios.css'
import { Marker } from 'react-leaflet';
import { Popup } from 'react-leaflet';



function MapadeServicioscercanosPage() {
  return (
    <div className='leaflet-container'>
      <MapContainer center={[-29.41039512243599, -66.85908602127687]} zoom={17} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[-29.41039512243599, -66.85908602127687]}>
  <Popup>
      hola soy un pop up <br /> como estas?
    </Popup>
  </Marker>
</MapContainer>
    </div>
  )
}

export default MapadeServicioscercanosPage


/* https://leafletjs.com/

https://www.google.com/search?q=leaflet+y+mern+stack&rlz=1C1UEAD_esAR977AR977&oq=leaflet+y+mern+stack&aqs=chrome..69i57.4515j0j1&sourceid=chrome&ie=UTF-8

https://www.youtube.com/watch?v=D4jq5Bd9bTA


https://www.youtube.com/watch?v=rmIhGPy8rSY

https://www.youtube.com/watch?v=NfDTO4c0xLc

 */