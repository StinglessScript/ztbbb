<template>
    <div class="ml-projects-area pt-80 ptb-80">
        <div class="container">
            <div class="section-title">
                <h2>CÁC DỰ ÁN ĐÃ TRIỂN KHAI</h2>
                <div class="bar"></div>
                <p>Ù à ù ập , Flatinor, Topway, Freshfast ,...</p>
               
            </div>
        </div>

        <div class="container-fluid">
            <div class="ml-projects-slides owl-carousel owl-theme">
                <carousel 
                    :autoplay = "true" 
                    :paginationEnabled = "true"
                    :loop = "true"
                    :smartSpeed = "1000"
                    :autoplayTimeout = "5000"
                    :perPageCustom = "[[0, 1],[576, 2],[768, 2], [1024, 3], [1200, 4]]"
                >
                    <slide>
                        <div class="single-ml-projects-box">
                            <img src="~/assets/img/projects-img1.jpg" alt="image">
                        
                            <div class="plus-icon">
                                <a href="#">
                                    <span></span>
                                </a>
                            </div>
                        </div>
                    </slide>

                    <slide>
                        <div class="single-ml-projects-box">
                            <img src="~/assets/img/projects-img2.jpg" alt="image">
                        
                            <div class="plus-icon">
                                <a href="#">
                                    <span></span>
                                </a>
                            </div>
                        </div>
                    </slide>

                    <slide>
                        <div class="single-ml-projects-box">
                            <img src="~/assets/img/projects-img3.jpg" alt="image">
                        
                            <div class="plus-icon">
                                <a href="#">
                                    <span></span>
                                </a>
                            </div>
                        </div>
                    </slide>

                    <slide>
                        <div class="single-ml-projects-box">
                            <img src="~/assets/img/projects-img4.jpg" alt="image">
                        
                            <div class="plus-icon">
                                <a href="#">
                                    <span></span>
                                </a>
                            </div>
                        </div>
                    </slide>

                    <slide>
                        <div class="single-ml-projects-box">
                            <img src="~/assets/img/projects-img5.jpg" alt="image">
                        
                            <div class="plus-icon">
                                <a href="#">
                                    <span></span>
                                </a>
                            </div>
                        </div>
                    </slide>
                
                </carousel>
            </div>
        </div>

        <div class="shape2 rotateme"><Shape2/></div>
        <div class="shape3"><img src="~/assets/img/shape3.svg"/></div>
        <div class="shape4"><img src="~/assets/img/shape4.svg"/></div>
        <div class="shape6 rotateme"><img src="~/assets/img/shape4.svg"/></div>
        <div class="shape7"><img src="~/assets/img/shape4.svg"/></div>
        <div class="shape8 rotateme"><img src="~/assets/img/shape2.svg"/></div>
    </div>
</template>

<script>
import Shape2 from "~/assets/img/shape2.svg";
import Shape3 from "~/assets/img/shape3.svg";
import Shape4 from "~/assets/img/shape4.svg";
export default {
  components: {
    Shape2,
    Shape3,
    Shape4,
  },
    name: 'Projects'
}
</script>