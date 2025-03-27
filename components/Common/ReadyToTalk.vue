<template>
    <div class="ready-to-talk">
        <div v-if="ready !== null" class="container">
            <h3>{{ready.heading}}</h3>
            <p>{{ready.shortdesc}}</p>
            <a href="#" class="btn btn-primary">{{ready.btnText}}</a>
            <span><a href="#">{{ready.text}}</a></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ReadyToTalk',
    data(){
        return{
            ready: null
        }
    },

    created: async function(){
        this.ready = await this.$strapi.find('ready-to-talk'+'?populate=*')
        this.ready = this.ready.data.attributes
    }
}
</script>