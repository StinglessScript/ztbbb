<template>
    <div class="free-trial-area">
        <div class="container-fluid">
            <div class="row align-items-center">
                <div class="col-lg-6 col-md-12">
                    <div class="free-trial-image">
                        <img src="~/assets/img/free-trial-img.png" alt="image">
                    </div>
                </div>

                <div class="col-lg-6 col-md-12">
                    <div class="free-trial-content">
                        <h2>Start your free trial</h2>

                        <form class="newsletter-form">
                            <input type="email" class="input-newsletter" placeholder="Enter your business email here">
                            <button type="submit">Sign Up Free</button>
                        </form>

                        <p>Test out the Machine Learning features for 14 days, no credit card required.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="shape2 rotateme"><img src="~/assets/img/shape2.svg"/></div>
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
    name: 'Trial'
}
</script>