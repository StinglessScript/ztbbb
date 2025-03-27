<template>
<div>
        <div class="services-area ptb-80">
        <div class="container">
            <div 
                class="row h-100 justify-content-center align-items-center"
                v-if="feature !== null"
            >
                <div class="col-lg-6 col-md-12 services-content">
                    <div class="section-title">
                        <h2>{{feature.heading}}</h2>
                        <div class="bar"></div>
                        <p>{{feature.shortDesc}}</p>
                    </div>

                    <div class="row">
                        <div 
                            class="col-lg-6 col-md-6 col-sm-6"
                            v-for="boxe in feature.boxes"
                            :key="boxe.id"
                        >
                            <div class="box">
                                <feather :type="boxe.icon"></feather>
                                {{boxe.text}}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 col-md-12 services-right-image">
                    <img src="~/assets/img/services-right-image/book-self.png" class="wow fadeInDown" v-wow data-wow-delay="0.6s" alt="book-self">
                    <img src="~/assets/img/services-right-image/box.png" class="wow fadeInUp" v-wow data-wow-delay="0.6s" alt="box">
                    <img src="~/assets/img/services-right-image/chair.png" class="wow fadeInLeft" v-wow data-wow-delay="0.6s" alt="chair">
                    <img src="~/assets/img/services-right-image/cloud.png" class="wow zoomIn" v-wow data-wow-delay="0.6s" alt="cloud">
                    <img src="~/assets/img/services-right-image/cup.png" class="wow bounceIn" v-wow data-wow-delay="0.6s" alt="cup">
                    <img src="~/assets/img/services-right-image/flower-top.png" class="wow fadeInDown" v-wow data-wow-delay="0.6s" alt="flower">
                    <img src="~/assets/img/services-right-image/head-phone.png" class="wow zoomIn" v-wow data-wow-delay="0.6s" alt="head-phone">
                    <img src="~/assets/img/services-right-image/monitor.png" class="wow fadeInUp" v-wow data-wow-delay="0.6s" alt="monitor">
                    <img src="~/assets/img/services-right-image/mug.png" class="wow rotateIn" v-wow data-wow-delay="0.6s" alt="mug">
                    <img src="~/assets/img/services-right-image/table.png" class="wow fadeInUp" v-wow data-wow-delay="0.6s" alt="table">
                    <img src="~/assets/img/services-right-image/tissue.png" class="wow zoomIn" v-wow data-wow-delay="0.6s" alt="tissue">
                    <img src="~/assets/img/services-right-image/water-bottle.png" class="wow zoomIn" v-wow data-wow-delay="0.6s" alt="water-bottle">
                    <img src="~/assets/img/services-right-image/wifi.png" class="wow fadeInLeft" v-wow data-wow-delay="0.6s" alt="wifi">
                    <img src="~/assets/img/services-right-image/cercle-shape.png" class="bg-image rotateme" alt="shape">
                    
                    <img :src="feature.img.url" class="wow fadeInUp" v-wow data-wow-delay="0.6s" alt="main-pic">
                </div>
            </div>
        </div>
    </div>    <div class="services-area ptb-80">
        <div class="container">
            <div 
                class="row h-100 justify-content-center align-items-center"
                v-if="feature !== null"
            >
                <div class="col-lg-6 col-md-12 services-content ">
                    <div class="section-title">
                        <h2>{{feature.heading}}</h2>
                        <div class="bar"></div>
                        <p>{{feature.shortDesc}}</p>
                    </div>

                    <div class="row">
                        <div 
                            class="col-lg-6 col-md-6 col-sm-6"
                            v-for="boxe in feature.boxes"
                            :key="boxe.id"
                        >
                            <div class="box">
                                <feather :type="boxe.icon"></feather>
                                {{boxe.text}}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 col-md-12 services-right-image">
                    <img src="~/assets/img/services-right-image/book-self.png" class="wow fadeInDown" v-wow data-wow-delay="0.6s" alt="book-self">
                    <img src="~/assets/img/services-right-image/box.png" class="wow fadeInUp" v-wow data-wow-delay="0.6s" alt="box">
                    <img src="~/assets/img/services-right-image/chair.png" class="wow fadeInLeft" v-wow data-wow-delay="0.6s" alt="chair">
                    <img src="~/assets/img/services-right-image/cloud.png" class="wow zoomIn" v-wow data-wow-delay="0.6s" alt="cloud">
                    <img src="~/assets/img/services-right-image/cup.png" class="wow bounceIn" v-wow data-wow-delay="0.6s" alt="cup">
                    <img src="~/assets/img/services-right-image/flower-top.png" class="wow fadeInDown" v-wow data-wow-delay="0.6s" alt="flower">
                    <img src="~/assets/img/services-right-image/head-phone.png" class="wow zoomIn" v-wow data-wow-delay="0.6s" alt="head-phone">
                    <img src="~/assets/img/services-right-image/monitor.png" class="wow fadeInUp" v-wow data-wow-delay="0.6s" alt="monitor">
                    <img src="~/assets/img/services-right-image/mug.png" class="wow rotateIn" v-wow data-wow-delay="0.6s" alt="mug">
                    <img src="~/assets/img/services-right-image/table.png" class="wow fadeInUp" v-wow data-wow-delay="0.6s" alt="table">
                    <img src="~/assets/img/services-right-image/tissue.png" class="wow zoomIn" v-wow data-wow-delay="0.6s" alt="tissue">
                    <img src="~/assets/img/services-right-image/water-bottle.png" class="wow zoomIn" v-wow data-wow-delay="0.6s" alt="water-bottle">
                    <img src="~/assets/img/services-right-image/wifi.png" class="wow fadeInLeft" v-wow data-wow-delay="0.6s" alt="wifi">
                    <img src="~/assets/img/services-right-image/cercle-shape.png" class="bg-image rotateme" alt="shape">
                    
                    <img :src="feature.img.url" class="wow fadeInUp" v-wow data-wow-delay="0.6s" alt="main-pic">
                </div>
            </div>
        </div>
    </div>
        <div class="services-area ptb-80">
        <div class="container">
            <div 
                class="row h-100 justify-content-center align-items-center"
                v-if="feature !== null"
            >
                <div class="col-lg-6 col-md-12 services-content">
                    <div class="section-title">
                        <h2>{{feature.heading}}</h2>
                        <div class="bar"></div>
                        <p>{{feature.shortDesc}}</p>
                    </div>

                    <div class="row">
                        <div 
                            class="col-lg-6 col-md-6 col-sm-6"
                            v-for="boxe in feature.boxes"
                            :key="boxe.id"
                        >
                            <div class="box">
                                <feather :type="boxe.icon"></feather>
                                {{boxe.text}}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 col-md-12 services-right-image">
                    <img src="~/assets/img/services-right-image/book-self.png" class="wow fadeInDown" v-wow data-wow-delay="0.6s" alt="book-self">
                    <img src="~/assets/img/services-right-image/box.png" class="wow fadeInUp" v-wow data-wow-delay="0.6s" alt="box">
                    <img src="~/assets/img/services-right-image/chair.png" class="wow fadeInLeft" v-wow data-wow-delay="0.6s" alt="chair">
                    <img src="~/assets/img/services-right-image/cloud.png" class="wow zoomIn" v-wow data-wow-delay="0.6s" alt="cloud">
                    <img src="~/assets/img/services-right-image/cup.png" class="wow bounceIn" v-wow data-wow-delay="0.6s" alt="cup">
                    <img src="~/assets/img/services-right-image/flower-top.png" class="wow fadeInDown" v-wow data-wow-delay="0.6s" alt="flower">
                    <img src="~/assets/img/services-right-image/head-phone.png" class="wow zoomIn" v-wow data-wow-delay="0.6s" alt="head-phone">
                    <img src="~/assets/img/services-right-image/monitor.png" class="wow fadeInUp" v-wow data-wow-delay="0.6s" alt="monitor">
                    <img src="~/assets/img/services-right-image/mug.png" class="wow rotateIn" v-wow data-wow-delay="0.6s" alt="mug">
                    <img src="~/assets/img/services-right-image/table.png" class="wow fadeInUp" v-wow data-wow-delay="0.6s" alt="table">
                    <img src="~/assets/img/services-right-image/tissue.png" class="wow zoomIn" v-wow data-wow-delay="0.6s" alt="tissue">
                    <img src="~/assets/img/services-right-image/water-bottle.png" class="wow zoomIn" v-wow data-wow-delay="0.6s" alt="water-bottle">
                    <img src="~/assets/img/services-right-image/wifi.png" class="wow fadeInLeft" v-wow data-wow-delay="0.6s" alt="wifi">
                    <img src="~/assets/img/services-right-image/cercle-shape.png" class="bg-image rotateme" alt="shape">
                    
                    <img :src="feature.img.url" class="wow fadeInUp" v-wow data-wow-delay="0.6s" alt="main-pic">
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Services',

    data(){
        return{
            feature: null
        }
    },

    created: async function(){
        this.feature = await this.$strapi.find('best-feature-sever'+'?populate=*')
        this.feature = this.feature.data.attributes
    }
}
</script>
<style lang="scss" scoped>
.services-area:nth-of-type(2n) {
    background: #f7fafd;
    .row {
        flex-direction: row-reverse;
    }
}
</style>