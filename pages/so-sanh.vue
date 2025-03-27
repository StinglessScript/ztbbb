
<template>
    <div class="example">
     
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide
          v-for="slide in swiperSlides"
          :key="slide"
        >Slide {{ slide }}</swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </template>
  
  <script>
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
  
    export default {
      name: 'swiper-example-dynamic-slides',
      title: 'Dynamic slides',
      components: {
        Swiper,
        SwiperSlide
      },
      data() {
        return {
          swiperOption: {
            slidesPerView: 5,
            // centeredSlides: true,    
            spaceBetween: 30,
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          },
          swiperSlides: [1, 2, 3, 4, 5]
        }
      },
      methods: {
        appendSlide() {
          this.swiperSlides.push(this.swiperSlides.length + 1)
        },
        prependSlide() {
          this.swiperSlides.unshift(this.swiperSlides[0] - 1)
        },
        popSlide() {
          this.swiperSlides.pop()
        },
        shiftSlide() {
          this.swiperSlides.shift()
        }
      }
    }
  </script>
  
  <style lang="scss" scoped>
  
    .example {
      height: auto;
  
      .toolbar {
        display: flex;
        justify-content: space-around;
        width: 100%;
        height: 2rem;
        border-bottom: 1px solid #eee;
        margin-bottom: 2px;
  
        button {
          flex: 1;
          padding: 0;
          margin: 0;
          border: none;
          border-right: 1px solid #eee;
          background-color: #ededed;
          cursor: pointer;
          &:last-child {
            border: none;
          }
  
          &:hover {
          }
        }
      }
    }
  </style>