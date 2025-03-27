<template>
    <div class="services-area ptb-80">
        <div class="container">
            <div 
                class="row h-100 justify-content-center align-items-center"
                v-if="software !== null"
            >
                
                <div class="col-lg-6 col-md-12 services-content">
                    <div class="section-title">
                        <h2>{{software.heading}}</h2>
                        <div class="bar"></div>
                        <p>{{software.shortDesc}}</p>
                    </div>

                    <div class="row">
                        <div 
                            class="col-lg-6 col-md-6 col-sm-6"
                            v-for="boxe in software.boxes"
                            :key="boxe.id"
                        >
                            <div class="box">
                                <feather :type="boxe.icon"></feather>
                                {{boxe.text}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 services-left-image">
                    <img src="~/assets/img/services-left-image/big-monitor.png" class="wow fadeInDown" v-wow data-wow-delay="0.6s" alt="big-monitor">
                    <img src="~/assets/img/services-left-image/creative.png" class="wow fadeInUp" v-wow data-wow-delay="0.6s" alt="creative">
                    <img src="~/assets/img/services-left-image/developer.png" class="wow fadeInLeft" v-wow data-wow-delay="0.6s" alt="developer">
                    <img src="~/assets/img/services-left-image/flower-top.png" class="wow zoomIn" v-wow data-wow-delay="0.6s" alt="flower-top">
                    <img src="~/assets/img/services-left-image/small-monitor.png" class="wow bounceIn" v-wow data-wow-delay="0.6s" alt="small-monitor">
                    <img src="~/assets/img/services-left-image/small-top.png" class="wow fadeInDown" v-wow data-wow-delay="0.6s" alt="small-top">
                    <img src="~/assets/img/services-left-image/table.png" class="wow zoomIn" v-wow data-wow-delay="0.6s" alt="table">
                    <img src="~/assets/img/services-left-image/target.png" class="wow fadeInUp" v-wow data-wow-delay="0.6s" alt="target">
                    <img src="~/assets/img/services-left-image/cercle-shape.png" class="bg-image rotateme" alt="shape">

                    <img :src="software.img.url" class="wow fadeInUp" v-wow data-wow-delay="0.6s" alt="main-pic">
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ServicesArea',

    data(){
        return{
            software: null
        }
    },

    created: async function(){
        this.software = await this.$strapi.find('our-software'+'?populate=*')
        this.software = this.software.data.attributes
    }
}
</script>