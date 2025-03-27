<template>
    <!-- Start Fun Facts Area -->
    <div class="funfacts-area ptb-80">
        <div v-if="funfact !== null" class="container">
            <div class="section-title">
                <h2>{{funfact.heading}}</h2>
                <div class="bar"></div>
                <p>{{funfact.shortDesc}}</p>
            </div>

            <div class="row">
                <div 
                    class="col-lg-3 col-md-3 col-6 col-sm-6"
                    v-for="funfact in funfact.funfacts"
                    :key="funfact.id"
                >
                    <div class="funfact">
                        <h3>{{funfact.number}}</h3>
                        <p>{{funfact.text}}</p>
                    </div>
                </div>
            </div>

            <div class="contact-cta-box">
                <h3>{{funfact.contactTitle}}</h3>
                <p>{{funfact.contactDesc}}</p>
                <a href="#" class="btn btn-primary">
                    {{funfact.contactBtnText}}
                </a>
            </div>

            <div class="map-bg">
                <img src="~/assets/img/map.png" alt="map">
            </div>
        </div>
    </div>
    <!-- End Fun Facts Area -->
</template>

<script>
export default {
    name: 'Funfacts',

    data(){
        return{
            funfact: null
        }
    },

    created: async function(){
        this.funfact = await this.$strapi.find('funfacts1'+'?populate=*')
        this.funfact = this.funfact.data.attributes
    }
}
</script>