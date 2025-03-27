<template>
  <div class="row">
    <div class="col-lg-12 col-md-12">
      <div class="comments-area">
        <div class="comment-respond mb-4">
          <star-rating
            v-model="body.rating"
            :star-size="24"
            :show-rating="false"
          ></star-rating>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form class="comment-form" @submit.prevent="handleSubmit(onSubmit)">
              <p class="comment-form-comment">
                <ValidationProvider
                  mode="lazy"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <textarea
                    name="comment"
                    id="comment"
                    cols="45"
                    v-model="body.review"
                    rows="5"
                    maxlength="65525"
                    required="required"
                    placeholder="Viết đánh giá của bạn"
                  ></textarea>
                  <span style="color: red">{{ errors[0] }}</span>
                </ValidationProvider>
              </p>
              <!-- <div class="row d-flex" v-if="isLogin">
                        <p class="comment-form-author">
                          <label>Tên <span class="required">*</span></label>
                          <ValidationProvider
                            mode="lazy"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <input
                              type="text"
                              v-model="body.reviewer_name"
                              id="author"
                              name="author"
                              required="required"
                            />
                            <span style="color: red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </p>
                        <p class="comment-form-email">
                          <label>Email <span class="required">*</span></label>
                          <ValidationProvider
                            mode="lazy"
                            rules="email|required"
                            v-slot="{ errors }"
                          >
                            <input
                              type="email"
                              v-model="body.reviewer_email"
                              id="email"
                              name="email"
                              required="required"
                            />
                            <span style="color: red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </p>
                        <p class="comment-form-phone">
                          <label
                            >Số điện thoại
                            <span class="required">*</span></label
                          >
                          <ValidationProvider
                            rules="required|phone"
                            mode="lazy"
                            v-slot="{ errors }"
                          >
                            <input
                              type="text"
                              v-model="body.reviewer_phone"
                              id="phone"
                              name="phone"
                            />
                            <span style="color: red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </p>
                      </div> -->
              <p class="form-submit" style="text-align: end">
                <input
                  style="display: none"
                  type="file"
                  id="my-file"
                  multiple=""
                  data-max_length="20"
                  accept=".jpg, .jpeg, .png"
                  @change="uploadImages()"
                />
                <label for="my-file" class="btn-input"
                  ><feather type="instagram"></feather> Thêm hình ảnh</label
                >
                <input
                  name="submit"
                  id="submit"
                  value="Hoàn tất"
                  type="submit"
                />
              </p>

              <div class="">
                <div
                  class="wrapper-thumb"
                  v-for="(img, index) in imgs"
                  :key="index"
                  @click="
                    imgs.splice(index, 1);
                    base64.splice(index, 1);
                  "
                >
                  <img v-if="image" :src="img" class="img-preview-thumb" /><span
                    class="remove-btn"
                    >x</span
                  >
                </div>
              </div>
            </form>
          </ValidationObserver>
          <!-- <ValidationObserver v-slot="{ handleSubmit }">
                    <form
                      class="comment-form"
                      @submit.prevent="handleSubmit(onSubmit)"
                    >
                      <p class="comment-form-comment">
                        <label>Bình luận *</label
                        ><ValidationProvider
                          mode="lazy"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <textarea
                            name="comment"
                            id="comment"
                            cols="45"
                            v-model="body.review"
                            rows="5"
                            maxlength="65525"
                            required="required"
                          ></textarea>
                          <span style="color: red">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </p>
                      <div class="row d-flex" v-if="isLogin">
                        <p class="comment-form-author">
                          <label>Tên <span class="required">*</span></label>
                          <ValidationProvider
                            mode="lazy"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <input
                              type="text"
                              v-model="body.reviewer_name"
                              id="author"
                              name="author"
                              required="required"
                            />
                            <span style="color: red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </p>
                        <p class="comment-form-email">
                          <label>Email <span class="required">*</span></label>
                          <ValidationProvider
                            mode="lazy"
                            rules="email|required"
                            v-slot="{ errors }"
                          >
                            <input
                              type="email"
                              v-model="body.reviewer_email"
                              id="email"
                              name="email"
                              required="required"
                            />
                            <span style="color: red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </p>
                        <p class="comment-form-phone">
                          <label
                            >Số điện thoại
                            <span class="required">*</span></label
                          >
                          <ValidationProvider
                            rules="required|phone"
                            mode="lazy"
                            v-slot="{ errors }"
                          >
                            <input
                              type="text"
                              v-model="body.reviewer_phone"
                              id="phone"
                              name="phone"
                            />
                            <span style="color: red">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </p>
                      </div>
                      <p class="form-submit">
                        <input
                          style="display: none"
                          type="file"
                          id="my-file"
                          multiple=""
                          data-max_length="20"
                          accept="image/jpeg/*"
                          @change="uploadImages()"
                        />
                        <label for="my-file" class="btn-input"
                          >Thêm hình ảnh</label
                        >
                      </p>
                      <p class="form-submit">
                        <input
                          name="submit"
                          id="submit"
                          class="submit"
                          value="Gửi bình luận"
                          type="submit"
                        />
                      </p>

                      <div class="">
                        <div
                          class="wrapper-thumb"
                          v-for="(img, index) in imgs"
                          :key="index"
                          @click="
                            imgs.splice(index, 1);
                            base64.splice(index, 1);
                          "
                        >
                          <img
                            v-if="image"
                            :src="img"
                            class="img-preview-thumb"
                          /><span class="remove-btn">x</span>
                        </div>
                      </div>
                    </form>
                  </ValidationObserver> -->
        </div>
        <h3 class="comments-title">Đánh Giá Sản Phẩm</h3>
        <div class="comment-sort">
          <div class="average-rating">
            <div class="rating-point" v-if="reviews[0]?.avg_rating !== NaN">
              {{ reviews[0]?.avg_rating }} trên 5
            </div>
            <div class="rating-start">
              <star-rating
                :rating="4.5"
                :read-only="true"
                :star-size="16"
                :increment="0.01"
                border-color="#F9A000"
                inactive-color="#fff"
                active-color="#F9A000"
                :border-width="2"
                :show-rating="false"
                :padding="2"
              ></star-rating>
            </div>
          </div>
          <div class="sort-rating">
            <a
              class="btn-default btn-review"
              :class="ratingFilterValue ? '' : 'btn-green'"
              @click="ratingFilter(null)"
            >
              Tất cả</a
            >

            <a
              v-for="i in 5"
              class="btn-default btn-review"
              @click="ratingFilter(6 - i)"
              :class="ratingFilterValue === 6 - i ? 'btn-green' : ''"
              :key="i"
            >
              {{ 6 - i }} sao (15)</a
            >
          </div>
        </div>
        <ol class="comment-list" v-if="reviews">
          <li
            class="comment"
            v-for="review in reviews[0]?.reviews"
            :key="review.id"
          >
            <div class="comment-body">
              <div class="comment-meta">
                <div class="comment-author vcard">
                  <img
                    src="../../assets/img/2.jpg"
                    class="avatar"
                    alt="image"
                  />
                  <span class="fn">
                    {{ review.reviewer_name }}
                  </span>
                  <div class="comment-metadata">
                    <span>
                      <time>{{ changeTime(review.create_at) }} </time>
                    </span>
                  </div>
                </div>
              </div>

              <div class="comment-content">
                <span>
                  {{ review.review }}
                </span>

                <p v-if="review.images" class="d-flex mt-4">
                  <span v-for="img in review.images" :key="img.id" class="mr-3">
                    <img :src="img" style="width: 72px; height: 72px"
                  /></span>
                </p>
              </div>
            </div>
          </li>
        </ol>
        <div class="d-flex">
          <Pagination
            v-if="reviews.length > 0"
            :total-pages="totalPages"
            :per-page="recordsPerPage"
            :maxResult="maxResult"
            :current-page="page"
            @pagechanged="onPageChange"
            @maxResultChange="onMaxResultChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Cookies from "js-cookie";
import Pagination from "../Common/Pagination";

export default {
  props: ["productId"],
  components: {
    moment,
    Pagination,
  },
  data() {
    return {
      totalPages: 0,
      page: 1,
      maxResult: 10,
      totalRecords: 0,
      recordsPerPage: 10,
      isLogin: false,
      base64: [],
      reviews: [],
      ratingFilterValue: "",
      image: "",
      imgs: [],

      body: {
        review: null,
        rating: 0,
        images: [],
        reviewer_name: "",
        reviewer_phone: "",
        reviewer_email: "",
        // session_id: "",
      },
    };
  },
  created() {
    if (Cookies.get("sessionId")) this.getProductReviews();
  },

  mounted() {
    this.isLogin = !this.$store.getters.isAuthenticated;
    // this.getProductReviews();
    if (this.$store.getters.isAuthenticated) {
      this.getUserInfo();
    }
  },
  methods: {
    ratingFilter(num) {
      this.ratingFilterValue = num;
      this.getProductReviews();
    },
    onMaxResultChange(page) {
      this.maxResult = parseInt(page);
      this.getProductReviews();
    },
    onPageChange(page) {
      this.page = page;
      this.showLoader = true;
      this.getProductReviews();
    },
    onChangeRecordsPerPage() {
      this.getProductReviews();
    },
    onSubmit() {
      if (this.$store.getters.isAuthenticated) {
        this.body.images = this.base64;
        const payload = { productId: this.productId, body: this.body };
        this.$store
          .dispatch("createReview", payload)
          .then((data) => {
            switch (data.status) {
              case 1:
                this.body.rating = 0;
                this.body.review = "";
                this.body.images = [];
                this.imgs = [];
                this.base64 = [];
                console.log(this.$store.getters.getSessionId);
                if (!Cookies.get("sessionId")) {
                  Cookies.set("sessionId", this.$store.getters.getSessionId);
                }
                this.getProductReviews();
                this.$toast.success(data.message, {});

                break;
              case 0:
                this.$toast.error(data.message, {});
                break;
            }
          })
          .catch((data) => {
            this.$toast.error(data.message, {});
          });
      } else {
        this.body.images = this.base64;
        const payload = { productId: this.productId, body: this.body };
        this.$store
          .dispatch("createReviewWithoutLogin", payload)
          .then((data) => {
            switch (data.status) {
              case 1:
                this.body.rating = 0;
                this.body.review = "";
                this.body.images = [];
                this.body.reviewer_name =
                  this.body.reviewer_phone =
                  this.body.reviewer_email =
                    "";
                this.imgs = [];
                this.base64 = [];
                console.log(this.$store.getters.getSessionId);
                if (!Cookies.get("sessionId")) {
                  Cookies.set("sessionId", this.$store.getters.getSessionId);
                }
                this.getProductReviews();
                break;
              case 0:
                this.$toast.error(data.message, {});
                break;
            }
          })
          .catch((data) => {
            this.$toast.error(data.message, {});
          });
      }
    },
    getUserInfo() {
      this.$store
        .dispatch("getCustomerInfo")
        .then((response) => {
          switch (response.status) {
            case 0:
              break;
            case 1:
              this.body.reviewer_name = response.data.name;
              this.body.reviewer_email = response.data.email;
              this.body.reviewer_phone = response.data.phone;

              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    handleRating(id) {
      this.body.rating = id;
    },
    changeTime(time) {
      return moment(time).format("L LT");
    },
    getProductReviews() {
      const payload = {
        productId: this.productId,
        params: {
          currentPage: this.page,
          maxResult: this.maxResult,
          sessionId: Cookies.get("sessionId"),
        },
      };
      const payload2 = {
        productId: this.productId,
        params: {
          ratingFilter: this.ratingFilterValue,
          currentPage: this.page,
          maxResult: this.maxResult,
          sessionId: Cookies.get("sessionId"),
        },
      };
      this.$store
        .dispatch(
          "getProductReviews",
          this.ratingFilterValue ? payload2 : payload
        )
        .then((data) => {
          this.reviews = data.data.data;
          this.totalPages = data.data.totalPage;
          this.$forceUpdate();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    uploadImages() {
      for (
        let i = 0;
        i < document.querySelector("input[type=file]").files.length;
        i++
      ) {
        const file = document.querySelector("input[type=file]").files[i];

        const reader = new FileReader();

        let rawImg;
        reader.onloadend = () => {
          rawImg = reader.result;
          this.image = rawImg;
          let base64 = rawImg.split(",")[1];
          this.base64.push(base64);
          this.imgs.push(rawImg);
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.img-thumbs {
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  margin: 1.5rem 0;
  padding: 0.75rem;
}
.img-thumbs-hidden {
  display: none;
}

.wrapper-thumb {
  position: relative;
  display: inline-block;
  margin: 1rem 0;
  justify-content: space-around;
}

.img-preview-thumb {
  background: #fff;
  border: 1px solid none;
  border-radius: 0.25rem;
  box-shadow: 0.125rem 0.125rem 0.0625rem rgba(0, 0, 0, 0.12);
  margin-right: 1rem;
  max-width: 140px;
  padding: 0.25rem;
}

.remove-btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  top: -5px;
  right: 10px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
}

.remove-btn:hover {
  box-shadow: 0px 0px 3px grey;
  transition: all 0.3s ease-in-out;
}
.comments-rating {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.comment-sort {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 24px;
  gap: 48px;
  background: #f7fafd;
  border-radius: 5px;
}
.comment-list {
  margin-left: 12px;
  margin-top: 32px;
  .comment {
    margin-top: 20px;
    .comment-body {
    }
  }
}
.comment {
  &.active {
    opacity: 0.6;
    .info {
      opacity: 1;
    }
  }
}
.btn-review {
  font-weight: 400;
  font-size: 12px;
  /* identical to box height */
  text-align: center;
  color: #0e314c;
}
</style>
