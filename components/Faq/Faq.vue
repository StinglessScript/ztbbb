<template >
    <div class="main container">
        <h5>{{ block.title }}</h5>
        <div class="accordion-card" v-for="item in newListQuestion" :key="item.id">
            <div class="header" @click.prevent="toggleExpand(item)">
                <span>{{ item.title }}</span>
                <div class="icon">
                    <div v-if="item.isExpand">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M8.12 14.71L12 10.83l3.88 3.88a.996.996 0 1 0 1.41-1.41L12.7 8.71a.996.996 0 0 0-1.41 0L6.7 13.3a.996.996 0 0 0 0 1.41c.39.38 1.03.39 1.42 0" />
                        </svg>
                    </div>
                    <div v-else>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="body" 
                :style="[item.isExpand ? { height: 'auto', marginTop: '20px' } : {}]">
                <div class="content" v-html="item.value"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['block'],
    data() {
        return {
            newListQuestion: []
        }
    },
    methods: {
        toggleExpand(item) {
            item.isExpand = !item.isExpand;
        },
       
    },
    mounted() {

        this.newListQuestion = this.block.faqs.map(item => ({
            ...item, isExpand: false, computedHeight: 0
        }))

      
    },
}
</script>
<style lang="scss" scoped>
.main {
    margin-top: 3rem;
}

.accordion-card:hover {
    border: 1px solid #16b364;
    border-radius: 4px;
}

.accordion-card {
    width: 100%;
    height: auto;
    display: block;
    position: relative;
    margin: 10px 0;
    border: 1px solid #fff;
    border-radius: 4px;
    transition: 0.3s ease-in;
    padding: 10px;
}




.header {
    cursor: pointer;
    color: #16b364;
}

.header span {
    font-weight: 600;
}

.body {
    height: 0;
    overflow: hidden;
    transition: 0.5s;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>