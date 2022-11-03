import React from 'react'
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Card from './Card.jsx'
import styles from './Categoria.module.css'

function Categoria() {
  return (
    <div className={styles.find}>
      <div className={styles.heading}>
        <h1>Los profesionales que necesitas!</h1>
        <div className={styles.text_bg}>
          <p>
            <span>Explorá todas nuestra categorias!!</span>
          </p>
        </div>
      </div>
      <div className={styles.slider_container}>
        <Swiper
          // instalando  los modulos de swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={5}
          navigation
          breakpoints={{
            // when window width is >= 340px
            340: {
              width: 200,
              slidesPerView: 1,
            },
            // when window width is >= 768px
            768: {
              width: 768,
              slidesPerView: 4,
            },
            // when window width is >= 1040px
            1040: {
              width: 1040,
              slidesPerView: 5,
            },
          }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          <SwiperSlide>
            <Card
              image="https://core.bonds.app/static/files/IYB3Iwees0NlAwADiAJCqaZoE8jlaoHN.png"
              make='Plomeria'
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              image= "https://core.bonds.app/static/files/tQbsf2J5nfqWsEQmeuBQ5Q4ybIT2mrel.png"
              make='Electricidad'
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              image= "https://core.bonds.app/static/files/iOjpVULstAmMlze2GqbYGXTX7klKU23H.png"
              make='Cerrajeria'
            />
          </SwiperSlide>

          <SwiperSlide>
            <Card
              image="https://core.bonds.app/static/files/IYB3Iwees0NlAwADiAJCqaZoE8jlaoHN.png"
              make='Plomeria'
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              image= "https://core.bonds.app/static/files/tQbsf2J5nfqWsEQmeuBQ5Q4ybIT2mrel.png"
              make='Electricidad'
            />
          </SwiperSlide>
          <SwiperSlide>
            <Card
              image= "https://core.bonds.app/static/files/iOjpVULstAmMlze2GqbYGXTX7klKU23H.png"
              make='Cerrajeria'
            />
          </SwiperSlide>
        </Swiper>
      </div> 
    </div>
  );
}

export default Categoria
