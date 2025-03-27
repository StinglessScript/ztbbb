<template>
  <!-- Start Navbar Area -->

  <div>
    <header
      id="header"
      class="bg-white pb-15 is-mobile headroom"
      :class="{ 'is-sticky': isSticky }"
    >
      <!-- <a
        style="padding: 8px; color: #364152; font-size: 14px"
        href="tel:1800.6070"
        >Hotline hỗ trợ 24/24: 1800.6070</a
      > -->
      <div class="startp-nav">
        <div
          class="container d-flex justify-content-between align-items-center"
        >
          <div class="cart-wrapper-btn menu" style="width: 33.332%">
            <feather type="menu" @click="toggleMenu()"></feather>
          </div>
          <a 
            v-if="logo !== null"
            class="navbar-brand"
            href="/"
            style="width: 33.332%; text-align: center"
          >
            <img
              v-if="logo?.imageUrl"
              :src="logo?.imageUrl"
              style="width: 150px"
            />
            <nuxt-img
              v-else
              :src="logo.image?.data?.attributes?.url"
              width="150"
              alt="logo"
              provider="strapi"
            />
          </a>
          <div class="others-option" style="width: 33.332%; text-align: right">
            <a
              class="cart-wrapper-btn"
              @click="
                $store.getters.getUser
                  ? toggleMenuUser()
                  : navigateWithCurrentPath()
              "
            >
              <feather type="user"></feather>
            </a>
          </div>
          <div
            class="modal"
            :class="{ active: isShowMenuUser }"
            @click="toggleMenuUser()"
          ></div>
          <div class="menu-mobile" :class="{ active: isShowMenuUser }">
            <div class="menu-mobile-content">
              <ul class="nav-list">
                <li>
                  <div class="nav-item">
                    <div class="nav-link" style="text-transform: none">
                      Thông tin cá nhân
                    </div>
                    <feather
                      :type="'chevron-down'"
                      style="padding: 8px; cursor: pointer"
                    ></feather>
                  </div>
                  <ul class="dropdown_menu_sub">
                    <!-- <li
                      class="nav-item-sub"
                      :class="{
                        active: isToggleSubUser,
                      }"
                    >
                      <a
                        @click="
                          $router.push(
                            `/gio-hang${
                              idOrderCookies ? `?orderId=${idOrderCookies}` : ''
                            }`
                          )
                        "
                        style="
                          text-transform: none;
                          display: flex;
                          gap: 0.5rem;
                          cursor: pointer;
                        "
                        class="nav-link"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <path
                            :fill="
                              $store.getters.cartOrderByUser != null
                                ? '#44ce6f'
                                : 'currentColor'
                            "
                            fill-rule="evenodd"
                            d="M12 2.75A2.25 2.25 0 0 0 9.75 5v.254q.626-.005 1.355-.004h1.79q.73-.001 1.355.004V5A2.25 2.25 0 0 0 12 2.75m3.75 2.557V5a3.75 3.75 0 0 0-7.5 0v.307q-.202.014-.391.035c-.878.095-1.613.293-2.265.74a5 5 0 0 0-.63.516c-.566.552-.905 1.234-1.17 2.076c-.257.819-.465 1.859-.727 3.166l-.019.095c-.376 1.883-.673 3.367-.758 4.549c-.088 1.208.034 2.223.606 3.104q.288.442.664.81c.752.734 1.724 1.052 2.925 1.204c1.176.148 2.69.148 4.61.148h1.81c1.921 0 3.434 0 4.61-.148c1.201-.152 2.174-.47 2.925-1.204a4.8 4.8 0 0 0 .664-.81c.572-.88.694-1.896.607-3.104c-.086-1.182-.382-2.666-.76-4.549l-.018-.095c-.261-1.307-.47-2.347-.727-3.166c-.265-.842-.604-1.524-1.17-2.076a5 5 0 0 0-.63-.516c-.652-.447-1.387-.645-2.265-.74a11 11 0 0 0-.39-.035M8.02 6.833c-.747.08-1.208.233-1.578.486a3.3 3.3 0 0 0-.431.354c-.321.313-.56.735-.786 1.451c-.23.733-.424 1.693-.695 3.052c-.39 1.948-.667 3.34-.744 4.416c-.077 1.062.052 1.693.368 2.179q.196.302.454.554c.415.405 1.008.655 2.065.789c1.07.135 2.49.136 4.476.136h1.703c1.986 0 3.404-.001 4.475-.136c1.057-.134 1.65-.384 2.065-.789a3.3 3.3 0 0 0 .454-.554c.316-.486.445-1.117.369-2.18c-.078-1.076-.355-2.467-.744-4.415c-.272-1.359-.465-2.32-.696-3.052c-.225-.716-.465-1.138-.786-1.451a3 3 0 0 0-.43-.354c-.37-.253-.832-.405-1.579-.486c-.763-.082-1.743-.083-3.129-.083H11.15c-1.386 0-2.366.001-3.13.083m.901 7.46a.75.75 0 0 1 .957.457a2.251 2.251 0 0 0 4.244 0a.75.75 0 1 1 1.415.5a3.751 3.751 0 0 1-7.073 0a.75.75 0 0 1 .457-.957"
                            clip-rule="evenodd"
                          /></svg
                        >
                        </a
                      >
                    </li> -->
                    <li
                      class="nav-item-sub"
                      :class="{
                        active: isToggleSubUser,
                      }"
                    >
                      <a
                        :href="
                          readyV2
                            ? `${userInside}/service`
                            : `${supportV1}/services/quan-ly-dich-vu.xhtml?source=user-inside`
                        "
                        style="
                          text-transform: none;
                          display: flex;
                          gap: 0.5rem;
                          cursor: pointer;
                        "
                        class="nav-link"
                      >
                        <!-- readyV2
                            ? `${userInside}/service`
                            : `${supportV1}/services/quan-ly-dich-vu.xhtml?source=user-inside` -->
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 32 32"
                        >
                          <path
                            fill="currentColor"
                            d="M29 25h-2v-2h1v-4h-4v1h-2v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1"
                          />
                          <path
                            fill="currentColor"
                            d="M24 30h-6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1m-5-2h4v-4h-4zm-4-8.142A3.993 3.993 0 1 1 20 16h2a6 6 0 1 0-7 5.91z"
                          />
                          <path
                            fill="currentColor"
                            d="m28.89 13.55l-2.31 2.03l-1.42-1.42l2.41-2.12l-2.36-4.08l-3.44 1.16a9.368 9.368 0 0 0-2.7-1.57L18.36 4h-4.72l-.71 3.55a8.86 8.86 0 0 0-2.71 1.57L6.79 7.96l-2.36 4.08l2.72 2.39a8.895 8.895 0 0 0 0 3.13l-2.72 2.4l2.36 4.08l3.44-1.16a9.368 9.368 0 0 0 2.7 1.57l.71 3.55H15v2h-1.36a2 2 0 0 1-1.96-1.61l-.51-2.52a11.412 11.412 0 0 1-1.31-.75l-2.43.82a2.038 2.038 0 0 1-.64.1a1.973 1.973 0 0 1-1.73-1L2.7 20.96a2 2 0 0 1 .41-2.51l1.92-1.68C5.01 16.51 5 16.26 5 16s.02-.51.04-.76l-1.93-1.69a2 2 0 0 1-.41-2.51l2.36-4.08a1.973 1.973 0 0 1 1.73-1a2.038 2.038 0 0 1 .64.1l2.42.82a11.542 11.542 0 0 1 1.32-.75l.51-2.52A2 2 0 0 1 13.64 2h4.72a2 2 0 0 1 1.96 1.61l.51 2.52a11.412 11.412 0 0 1 1.31.75l2.43-.82a2.038 2.038 0 0 1 .64-.1a1.973 1.973 0 0 1 1.73 1l2.36 4.08a2 2 0 0 1-.41 2.51"
                          /></svg
                        >Dịch vụ của tôi</a
                      >
                    </li>
                    <li
                      class="nav-item-sub"
                      :class="{
                        active: isToggleSubUser,
                      }"
                    >
                      <a
                        :href="
                          readyV2
                            ? `${userInside}/order`
                            : `${supportV1}/orders/danh-sach-don-hang.xhtml?source=user-inside`
                        "
                        style="
                          text-transform: none;
                          display: flex;
                          gap: 0.5rem;
                          cursor: pointer;
                        "
                        class="nav-link"
                      >
                        <!-- readyV2
                            ? `${userInside}/order`
                            : `${supportV1}/orders/danh-sach-don-hang.xhtml?source=user-inside` -->
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="m17.275 20.25l3.475-3.45l-1.05-1.05l-2.425 2.375l-.975-.975l-1.05 1.075zM6 9h12V7H6zm12 14q-2.075 0-3.537-1.463T13 18q0-2.075 1.463-3.537T18 13q2.075 0 3.538 1.463T23 18q0 2.075-1.463 3.538T18 23M3 22V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v6.675q-.7-.35-1.463-.513T18 11H6v2h7.1q-.425.425-.787.925T11.675 15H6v2h5.075q-.05.25-.062.488T11 18q0 1.05.288 2.013t.862 1.837L12 22l-1.5-1.5L9 22l-1.5-1.5L6 22l-1.5-1.5z"
                          />
                        </svg>
                        Đơn hàng</a
                      >
                    </li>
                    <li
                      class="nav-item-sub"
                      :class="{
                        active: isToggleSubUser,
                      }"
                    >
                      <a
                        :href="
                          readyV2
                            ? `${userInside}/profile`
                            : `${supportV1}/customer/thong-tin-ca-nhan.xhtml?source=user-inside`
                        "
                        style="
                          text-transform: none;
                          display: flex;
                          gap: 0.5rem;
                          cursor: pointer;
                        "
                        class="nav-link"
                      >
                        <!-- readyV2
                            ? `${userInside}/profile`
                            : `${supportV1}/customer/thong-tin-ca-nhan.xhtml?source=user-inside` -->
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M5.85 17.1q1.275-.975 2.85-1.537T12 15q1.725 0 3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4Q8.675 4 6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5q0-1.475 1.013-2.488T12 6q1.475 0 2.488 1.013T15.5 9.5q0 1.475-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"
                          />
                        </svg>
                        Tài khoản</a
                      >
                    </li>
                    <li
                      class="nav-item-sub"
                      :class="{
                        active: isToggleSubUser,
                      }"
                      @click="handleLogout()"
                    >
                      <a 
                        href="/"
                        class="nav-link"
                        style="
                          text-transform: none;
                          display: flex;
                          gap: 0.5rem;
                          cursor: pointer;
                        "
                        exact
                        ><svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="m12.59 13l-2.3 2.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4-4a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76a1 1 0 0 0-.21-.33l-4-4a1 1 0 1 0-1.42 1.42l2.3 2.29H3a1 1 0 0 0 0 2ZM12 2a10 10 0 0 0-9 5.55a1 1 0 0 0 1.8.9A8 8 0 1 1 12 20a7.93 7.93 0 0 1-7.16-4.45a1 1 0 0 0-1.8.9A10 10 0 1 0 12 2"
                          /></svg
                        >Đăng xuất
                      </a>
                    </li>
                  </ul>
                  <!-- <div class="nav-item"></div> -->
                </li>
              </ul>
            </div>
          </div>

          <div
            class="modal"
            :class="{ active: isShowMenu }"
            @click="toggleMenu()"
          ></div>

          <div class="menu-mobile" :class="{ active: isShowMenu }">
            <div class="menu-mobile-content">
              <ul class="nav-list">
                <li>
                  <div class="nav-item">
                    <span></span>
                    <div class="d-flex justify-content-end">
                      <!-- <a 
                        to
                        class="cart-wrapper-btn menu"
                        style="text-align: right"
                      >
                        <feather type="menu" @click="toggleMenu()"></feather>
                      </a> -->
                      <feather type="menu" @click="toggleMenu()"></feather>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="nav-item">
                    <a  href="/" class="nav-link" exact
                      >Trang chủ
                    </a>
                  </div>
                </li>
                <li v-for="(menu, index) in menus" :key="index">
                  <div class="nav-item" v-if="!menu?.slug.includes('shop') && !menu.slug.includes('http')">
                    <a  :href="`/${menu.slug}`" class="nav-link" exact
                      >{{ menu.title }}
                    </a>
                    <feather
                      :type="
                        activeIndex === index && isToggleSub
                          ? 'chevron-down'
                          : 'chevron-right'
                      "
                      style="padding: 8px; cursor: pointer"
                      v-if="menu.items.length !== 0 || menu.slug === 'cua-hang'"
                      @click="selectItem(index)"
                    ></feather>
                  </div>
                  <div
                    class="nav-item"
                    v-else-if="menu.slug.includes('http')"
                  >
                    <a :href="menu.slug" class="nav-link" exact
                      >{{ menu.title }}
                    </a>
                    <feather
                      :type="
                        activeIndex === index && isToggleSub
                          ? 'chevron-down'
                          : 'chevron-right'
                      "
                      style="padding: 8px; cursor: pointer"
                      v-if="menu.items.length !== 0 || menu.slug === 'cua-hang'"
                      @click="selectItem(index)"
                    ></feather>
                  </div>
                  <div class="nav-item" v-else>
                    <a 
                      v-if="
                        categoryByStore && categoryByStore?.data?.length == 1
                      "
                      :href="`/cua-hang/danh-muc/${categoryByStore?.data[0]?.handle}?store=${categoryByStore?.store}`"
                      class="nav-link"
                      exact
                      >{{ menu.title }}
                    </a>
                    <a v-else class="nav-link" style="cursor: pointer" exact>{{
                      menu.title
                    }}</a>
                    <feather
                      :type="
                        activeIndex === index && isToggleSub
                          ? 'chevron-down'
                          : 'chevron-right'
                      "
                      style="padding: 8px; cursor: pointer"
                      v-if="categoryByStore?.data.length > 1"
                      @click="selectItem(index)"
                    ></feather>
                  </div>
                  <ul
                    class="dropdown_menu_sub"
                    v-if="categories && menu.slug === 'cua-hang'"
                  >
                    <template v-for="(item, i) in categories">
                      <li v-if="item.level === 1" :key="i">
                        <div
                          class="nav-item-sub"
                          :class="{
                            active: activeIndex === index && isToggleSub,
                          }"
                        >
                          <a 
                            class="nav-link"
                            :href="`/cua-hang/danh-muc/${item.handle}`"
                            >{{ item.title }}</a
                          >
                          <feather
                            :type="
                              isToggleSubLv2 && activeIndexLv2 === parseInt(item.id)
                                ? 'chevron-down'
                                : 'chevron-right'
                            "
                            style="padding: 8px; cursor: pointer"
                            v-if="item.child"
                            @click="selectItemLv2(parseInt(item.id))"
                          >
                          </feather>
                        </div>

                        <ul class="dropdown_menu_sub" v-if="item.child">
                          <li v-for="children in item.child" :key="children.id">
                            <div
                              class="nav-item-sub"
                              style="padding-left: 12px"
                              :class="{
                                active: activeIndexLv2 === parseInt(item.id) && isToggleSubLv2,
                              }"
                            >
                              <!-- <a 
                                :href="`/cua-hang/${item.handle}/${children.handle}`"
                                class="nav-link"
                                >{{ children.title }}</a
                              > -->
                              <a 
                                :href="
                                  children.product_filter
                                    ? `/cua-hang/${item.handle}/${children.handle}?${children.product_filter}`
                                    : `/cua-hang/${item.handle}/${children.handle}`
                                "
                                class="nav-link"
                                >{{ children.title }}</a
                              >
                            </div>

                            <ul class="dropdown_menu_sub" v-if="item.child">
                              <li
                                class="nav-item-sub"
                                v-for="children in item.child"
                                :key="children.id"
                              >
                                <a 
                                  :href="`/cua-hang/danh-muc/${children.handle}`"
                                  class="nav-link"
                                  >{{ children.title }}</a
                                >
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </template>
                  </ul>

                  <ul
                    class="dropdown_menu_sub"
                    v-if="categoryByStore?.data && menu?.slug.includes('shop')"
                  >
                    <template v-for="(item, i) in categoryByStore?.data">
                      <li v-if="item.level === 1" :key="i">
                        <div
                          class="nav-item-sub"
                          :class="{
                            active: activeIndex === parseInt(item.id) && isToggleSub,
                          }"
                        >
                          <a 
                            class="nav-link"
                            :href="`/cua-hang/danh-muc/${item.handle}?store=${categoryByStore?.store}`"
                            >{{ item.title }}</a
                          >
                          <feather
                            :type="
                              isToggleSubLv2 && activeIndexLv2 === parseInt(item.id)
                                ? 'chevron-down'
                                : 'chevron-right'
                            "
                            style="padding: 8px; cursor: pointer"
                            v-if="item.child"
                            @click="selectItemLv2(parseInt(item.id))"
                          >
                          </feather>
                        </div>

                        <ul class="dropdown_menu_sub" v-if="item.child">
                          <li v-for="children in item.child" :key="children.id">
                            <div
                              class="nav-item-sub"
                              style="padding-left: 12px"
                              :class="{
                                active: activeIndexLv2 === i && isToggleSubLv2,
                              }"
                            >
                              <!-- <a 
                                :href="`/cua-hang/${item.handle}/${children.handle}`"
                                class="nav-link"
                                >{{ children.title }}</a
                              > -->
                              <a 
                                :href="
                                  children.product_filter
                                    ? `/cua-hang/${item.handle}/${children.handle}?${children.product_filter}&store=${categoryByStore?.store}`
                                    : `/cua-hang/${item.handle}/${children.handle}?store=${categoryByStore?.store}`
                                "
                                class="nav-link"
                                >{{ children.title }}</a
                              >
                            </div>

                            <ul class="dropdown_menu_sub" v-if="item.child">
                              <li
                                class="nav-item-sub"
                                v-for="children in item.child"
                                :key="children.id"
                              >
                                <a 
                                  :href="`/cua-hang/danh-muc/${children.handle}?store=${categoryByStore?.store}`"
                                  class="nav-link"
                                  >{{ children.title }}</a
                                >
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </template>
                  </ul>

                  <ul class="dropdown_menu_sub" v-if="menu.items">
                    <template v-for="(item, i) in menu.items">
                      <li v-if="item.children" :key="i">
                        <div class="nav-item-sub" :class="{ active: activeIndex === index && isToggleSub }">
                          <a
                            :href="item.url"
                            class="nav-link"
                            exact
                            v-if="`${item.url}`.includes('http')"
                            >{{ item.title }}
                          </a>
                          <Nuxt-link :to="item.url" class="nav-link" exact v-else
                            >{{ item.title }}
                          </Nuxt-link>
                          <feather
                            type="chevron-down"
                            style="
                              padding: 8px;
                              border-bottom: 0.5px solid #f1f1f1;
                            "
                            v-if="item.children.length !== 0"
                            @click="selectItemLv2(parseInt(item.id))"
                          ></feather>
                        </div>
                        <ul
                          class="dropdown_menu"
                          v-if="item.children.length !== 0"
                        >
                          <li v-for="children in item.children" :key="children.id">
                            <div class="nav-item-sub"
                              :class="{
                                active: activeIndexLv2 === parseInt(item.id) && isToggleSubLv2,
                              }">
                              <a :href="children.url" class="nav-link">{{
                                children.title
                              }}</a>
                            </div>
                          </li>
                        </ul>
                      </li>
                    </template>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>

    <header
      id="header"
      class="bg-white pb-15 is-pc headroom"
      :class="{ 'is-sticky': isSticky }"
    >
      <div class="startp-nav">
        <div class="container">
          <nav class="navbar navbar-expand-md navbar-light">
            <a  v-if="logo !== null" class="navbar-brand" href="/">
              <img
                v-if="logo?.imageUrl"
                :src="logo?.imageUrl"
                style="width: 150px"
              />
              <nuxt-img
                :src="logo.image.data?.attributes?.url"
                width="150"
                alt="logo"
                provider="strapi"
              />
            </a>

            <ul class="navbar-nav nav ml-auto">
              <li class="nav-item" v-for="menu in menus" :key="menu.id">
                <a
                  :href="menu.slug"
                  class="nav-link"
                  exact
                  v-if="menu.slug && menu.slug.includes('http')"
                  target="_blank"
                  >{{ menu.title }}
                  <feather
                    type="chevron-down"
                    v-if="menu.items.length !== 0"
                  ></feather>
                </a>
                <template v-if="menu?.slug.includes('shop')">
                  <a 
                    v-if="categoryByStore && categoryByStore?.data?.length == 1"
                    :href="`/cua-hang/danh-muc/${categoryByStore?.data[0]?.handle}?store=${categoryByStore?.store}`"
                    class="nav-link"
                    exact
                  >
                    {{ menu?.title }}
                  </a>
                  <a class="nav-link" v-else style="cursor: pointer">
                    {{ menu?.title }}
                    <feather
                      type="chevron-down"
                      v-if="
                        categoryByStore && categoryByStore?.data?.length > 1
                      "
                    ></feather>
                  </a>

                  <!-- Note dropdown -->
                  <ul
                    class="dropdown_menu"
                    v-if="
                      categoryByStore &&
                      categoryByStore?.data?.length > 1 &&
                      menu?.slug &&
                      `${menu?.slug}`.includes('shop')
                    "
                    :class="getGridColumns(categoryByStore?.length)"
                  >
                    <!--  style="max-height: 400px; overflow-y: scroll; width: 380px" -->
                    <template v-for="item in categoryByStore?.data">
                      <li
                        class="nav-item"
                        v-if="item.level === 1"
                        :key="item.id"
                        @mouseover="showSubmenu()"
                        @mouseleave="showSubmenu()"
                      >
                        <a 
                          v-if="item.product_filter"
                          :href="`/cua-hang/danh-muc/${item.handle}?${item.product_filter}?store=${categoryByStore?.store}`"
                          class="nav-link"
                          exact
                          >{{ item.title }}
                          <feather
                            type="chevron-right"
                            v-if="item.child"
                          ></feather> </a
                        ><a 
                          v-else
                          :href="`/cua-hang/danh-muc/${item.handle}?store=${categoryByStore?.store}`"
                          class="nav-link"
                          exact
                          >{{ item.title }}
                          <feather
                            type="chevron-right"
                            v-if="item.child"
                          ></feather>
                        </a>

                        <ul class="dropdown_menu" v-if="item.child">
                          <li
                            class="nav-item"
                            v-for="children in item.child"
                            :key="children.id"
                          >
                            <a 
                              :href="
                                children.product_filter
                                  ? `/cua-hang/${item.handle}/${children.handle}?${children.product_filter}&store=${categoryByStore?.store}`
                                  : `/cua-hang/${item.handle}/${children.handle}?store=${categoryByStore?.store}`
                              "
                              class="nav-link"
                              >{{ children.title }}</a
                            >
                          </li>
                        </ul>
                      </li>
                    </template>
                  </ul>
                </template>

                <a 
                  v-if="
                    !menu.slug.includes('http') && !menu.slug.includes('shop')
                  "
                  :href="`/${menu.slug}`"
                  class="nav-link"
                  exact
                  >{{ menu.title }}
                  <feather
                    type="chevron-down"
                    v-if="
                      menu.items.length !== 0 ||
                      (menu.slug === 'cua-hang' && categories)
                    "
                  ></feather>
                </a>
                <ul
                  class="dropdown_menu"
                  v-if="categories && menu.slug === 'cua-hang'"
                  :class="getGridColumns(categories.length)"
                >
                  <template v-for="item in categories">
                    <li class="nav-item" v-if="item.level === 1" :key="item.id">
                      <a 
                        v-if="item.product_filter"
                        :href="`/cua-hang/danh-muc/${item.handle}?${item.product_filter}`"
                        class="nav-link"
                        exact
                        >{{ item.title }}
                        <feather
                          type="chevron-right"
                          v-if="item.child"
                        ></feather> </a
                      ><a 
                        v-else
                        :href="`/cua-hang/danh-muc/${item.handle}`"
                        class="nav-link"
                        exact
                        >{{ item.title }}
                        <feather
                          type="chevron-right"
                          v-if="item.child"
                        ></feather>
                      </a>

                      <ul class="dropdown_menu" v-if="item.child">
                        <li
                          class="nav-item"
                          v-for="children in item.child"
                          :key="children.id"
                        >
                          <a 
                            :href="
                              children.product_filter
                                ? `/cua-hang/${item.handle}/${children.handle}?${children.product_filter}`
                                : `/cua-hang/${item.handle}/${children.handle}`
                            "
                            class="nav-link"
                            >{{ children.title }}</a
                          >
                        </li>
                      </ul>
                    </li>
                  </template>
                </ul>
                <ul
                  class="dropdown_menu"
                  v-if="menu.items.length !== 0"
                  :class="getGridColumns(menu.items.length)"
                >
                  <li
                    class="nav-item"
                    v-for="item in menu.items"
                    :key="item.id"
                  >
                    <a
                      :href="item.url"
                      class="nav-link"
                      exact
                      v-if="`${item.url}`.includes('http')"
                      target="_blank"
                      >{{ item.title }}
                      <feather
                        type="chevron-right"
                        v-if="item.children.length !== 0"
                      ></feather>
                    </a>
                    <a  :href="item.url" class="nav-link" exact v-else
                      >{{ item.title }}
                      <feather
                        type="chevron-right"
                        v-if="item.children.length !== 0"
                      ></feather>
                    </a>

                    <ul class="dropdown_menu" v-if="item.children.length !== 0">
                      <li
                        class="nav-item"
                        v-for="children in item.children"
                        :key="children.id"
                      >
                        <a :href="children.url" class="nav-link">{{
                          children.title
                        }}</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
            <div class="others-option" style="margin-right: 15px">
              <!-- <li class="cart-wrapper-btn">
                <a
                  @click="
                    $router.push(
                      `/gio-hang${
                        idOrderCookies ? `?orderId=${idOrderCookies}` : ''
                      }`
                    )
                  "
                >
                  <div
                    v-if="
                      !$store.getters.getUser && $store.getters.cartOrderByUser
                    "
                    style="position: relative; cursor: pointer"
                  >
                    <div
                      class="d-flex gap-1 justify-content-center align-items-center"
                      :style="{
                        color: `${
                          $store.getters.cartOrderByUser ? '#44ce6f' : 'black'
                        }`,
                      }"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <path
                          :fill="
                            $store.getters.cartOrderByUser != null
                              ? '#44ce6f'
                              : 'currentColor'
                          "
                          fill-rule="evenodd"
                          d="M12 2.75A2.25 2.25 0 0 0 9.75 5v.254q.626-.005 1.355-.004h1.79q.73-.001 1.355.004V5A2.25 2.25 0 0 0 12 2.75m3.75 2.557V5a3.75 3.75 0 0 0-7.5 0v.307q-.202.014-.391.035c-.878.095-1.613.293-2.265.74a5 5 0 0 0-.63.516c-.566.552-.905 1.234-1.17 2.076c-.257.819-.465 1.859-.727 3.166l-.019.095c-.376 1.883-.673 3.367-.758 4.549c-.088 1.208.034 2.223.606 3.104q.288.442.664.81c.752.734 1.724 1.052 2.925 1.204c1.176.148 2.69.148 4.61.148h1.81c1.921 0 3.434 0 4.61-.148c1.201-.152 2.174-.47 2.925-1.204a4.8 4.8 0 0 0 .664-.81c.572-.88.694-1.896.607-3.104c-.086-1.182-.382-2.666-.76-4.549l-.018-.095c-.261-1.307-.47-2.347-.727-3.166c-.265-.842-.604-1.524-1.17-2.076a5 5 0 0 0-.63-.516c-.652-.447-1.387-.645-2.265-.74a11 11 0 0 0-.39-.035M8.02 6.833c-.747.08-1.208.233-1.578.486a3.3 3.3 0 0 0-.431.354c-.321.313-.56.735-.786 1.451c-.23.733-.424 1.693-.695 3.052c-.39 1.948-.667 3.34-.744 4.416c-.077 1.062.052 1.693.368 2.179q.196.302.454.554c.415.405 1.008.655 2.065.789c1.07.135 2.49.136 4.476.136h1.703c1.986 0 3.404-.001 4.475-.136c1.057-.134 1.65-.384 2.065-.789a3.3 3.3 0 0 0 .454-.554c.316-.486.445-1.117.369-2.18c-.078-1.076-.355-2.467-.744-4.415c-.272-1.359-.465-2.32-.696-3.052c-.225-.716-.465-1.138-.786-1.451a3 3 0 0 0-.43-.354c-.37-.253-.832-.405-1.579-.486c-.763-.082-1.743-.083-3.129-.083H11.15c-1.386 0-2.366.001-3.13.083m.901 7.46a.75.75 0 0 1 .957.457a2.251 2.251 0 0 0 4.244 0a.75.75 0 1 1 1.415.5a3.751 3.751 0 0 1-7.073 0a.75.75 0 0 1 .457-.957"
                          clip-rule="evenodd"
                        /></svg
                      >
                    </div>
                    <span
                      class="absolute"
                      style="
                        top: -10px;
                        right: -20px;
                        font-size: 11px;
                        padding: 5px;
                        border-radius: 50%;
                        color: white;
                        background: red;
                        position: absolute;
                        width: 20px;
                        height: 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                      "
                      v-if="$store.getters.notificationOrder?.isBoolean == true"
                      >{{ $store.getters.notificationOrder?.quality }}</span
                    >
                  </div>
                </a>
              </li> -->
            </div>
            <div class="others-option">
              <!-- <li class="cart-wrapper-btn magr">
                <a href="tel:18006070">
                  <div class="icon-call">
                    <feather class="icon-ab" type="phone"></feather>
                  </div>
                  1800.6070
                </a>
              </li> -->

              <li class="cart-wrapper-btn">
                <!-- {{ tokenData }} -->
                <a @click="navigateWithCurrentPath()">
                  <span v-if="!$store.getters.getUser">Đăng nhập</span>

                  <span v-else style="position: relative; white-space: nowrap;"
                    ><svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.0342 6C14.0342 8.20914 12.2433 10 10.0342 10C7.82507 10 6.03418 8.20914 6.03418 6C6.03418 3.79086 7.82507 2 10.0342 2C12.2433 2 14.0342 3.79086 14.0342 6Z"
                        stroke="#364152"
                        stroke-width="2"
                      />
                      <path
                        d="M18.0342 19V18C18.0342 14.6863 15.3479 12 12.0342 12H9.03418C5.72047 12 3.03418 14.6863 3.03418 18V19"
                        stroke="#364152"
                        stroke-width="2"
                      />
                    </svg>
                    {{ user?.fullName }}
                    <!-- <span
                      class="absolute"
                      style="
                        top: -10px;
                        right: -20px;
                        font-size: 11px;
                        padding: 5px;
                        border-radius: 50%;
                        color: white;
                        background: red;
                        position: absolute;
                        width: 20px;
                        height: 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                      "
                      v-if="$store.getters.notificationOrder?.isBoolean == true"
                      >{{ $store.getters.notificationOrder?.quality }}</span
                    > -->
                  </span>
                </a>
                <ul
                  class="dropdown_menu_op"
                  v-if="!$store.getters.getUser"
                ></ul>
                <ul class="dropdown_menu_op" v-else>
                  <!-- <li>
                    <a
                      @click="
                        $router.push(
                          `/gio-hang${
                            idOrderCookies ? `?orderId=${idOrderCookies}` : ''
                          }`
                        )
                      "
                      style="
                        display: flex;
                        gap: 0.5rem;
                        cursor: pointer;
                        position: relative;
                      "
                      :style="
                        $store.getters.cartOrderByUser != null
                          ? 'color: #44ce6f'
                          : 'color: black'
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                      >
                        <path
                          :fill="
                            $store.getters.cartOrderByUser != null
                              ? '#44ce6f'
                              : 'currentColor'
                          "
                          fill-rule="evenodd"
                          d="M12 2.75A2.25 2.25 0 0 0 9.75 5v.254q.626-.005 1.355-.004h1.79q.73-.001 1.355.004V5A2.25 2.25 0 0 0 12 2.75m3.75 2.557V5a3.75 3.75 0 0 0-7.5 0v.307q-.202.014-.391.035c-.878.095-1.613.293-2.265.74a5 5 0 0 0-.63.516c-.566.552-.905 1.234-1.17 2.076c-.257.819-.465 1.859-.727 3.166l-.019.095c-.376 1.883-.673 3.367-.758 4.549c-.088 1.208.034 2.223.606 3.104q.288.442.664.81c.752.734 1.724 1.052 2.925 1.204c1.176.148 2.69.148 4.61.148h1.81c1.921 0 3.434 0 4.61-.148c1.201-.152 2.174-.47 2.925-1.204a4.8 4.8 0 0 0 .664-.81c.572-.88.694-1.896.607-3.104c-.086-1.182-.382-2.666-.76-4.549l-.018-.095c-.261-1.307-.47-2.347-.727-3.166c-.265-.842-.604-1.524-1.17-2.076a5 5 0 0 0-.63-.516c-.652-.447-1.387-.645-2.265-.74a11 11 0 0 0-.39-.035M8.02 6.833c-.747.08-1.208.233-1.578.486a3.3 3.3 0 0 0-.431.354c-.321.313-.56.735-.786 1.451c-.23.733-.424 1.693-.695 3.052c-.39 1.948-.667 3.34-.744 4.416c-.077 1.062.052 1.693.368 2.179q.196.302.454.554c.415.405 1.008.655 2.065.789c1.07.135 2.49.136 4.476.136h1.703c1.986 0 3.404-.001 4.475-.136c1.057-.134 1.65-.384 2.065-.789a3.3 3.3 0 0 0 .454-.554c.316-.486.445-1.117.369-2.18c-.078-1.076-.355-2.467-.744-4.415c-.272-1.359-.465-2.32-.696-3.052c-.225-.716-.465-1.138-.786-1.451a3 3 0 0 0-.43-.354c-.37-.253-.832-.405-1.579-.486c-.763-.082-1.743-.083-3.129-.083H11.15c-1.386 0-2.366.001-3.13.083m.901 7.46a.75.75 0 0 1 .957.457a2.251 2.251 0 0 0 4.244 0a.75.75 0 1 1 1.415.5a3.751 3.751 0 0 1-7.073 0a.75.75 0 0 1 .457-.957"
                          clip-rule="evenodd"
                        /></svg
                      >Giỏ hàng3
                      <span
                        class="absolute"
                        style="
                          top: 0px;
                          right: 20px;
                          font-size: 11px;
                          padding: 5px;
                          border-radius: 50%;
                          color: white;
                          background: red;
                          position: absolute;
                          width: 20px;
                          height: 20px;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                        "
                        v-if="
                          $store.getters.notificationOrder?.isBoolean == true
                        "
                        >{{ $store.getters.notificationOrder?.quality }}</span
                      >
                    </a>
                  </li> -->
                  <li>
                    <a
                      :href="
                        readyV2
                          ? `${userInside}/service`
                          : `${supportV1}/services/quan-ly-dich-vu.xhtml?source=user-inside`
                      "
                      style="display: flex; gap: 0.5rem; cursor: pointer"
                    >
                      <!-- readyV2
                          ? `${userInside}/service`
                          : `${supportV1}/services/quan-ly-dich-vu.xhtml?source=user-inside` -->
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                      >
                        <path
                          fill="currentColor"
                          d="M29 25h-2v-2h1v-4h-4v1h-2v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1"
                        />
                        <path
                          fill="currentColor"
                          d="M24 30h-6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1m-5-2h4v-4h-4zm-4-8.142A3.993 3.993 0 1 1 20 16h2a6 6 0 1 0-7 5.91z"
                        />
                        <path
                          fill="currentColor"
                          d="m28.89 13.55l-2.31 2.03l-1.42-1.42l2.41-2.12l-2.36-4.08l-3.44 1.16a9.368 9.368 0 0 0-2.7-1.57L18.36 4h-4.72l-.71 3.55a8.86 8.86 0 0 0-2.71 1.57L6.79 7.96l-2.36 4.08l2.72 2.39a8.895 8.895 0 0 0 0 3.13l-2.72 2.4l2.36 4.08l3.44-1.16a9.368 9.368 0 0 0 2.7 1.57l.71 3.55H15v2h-1.36a2 2 0 0 1-1.96-1.61l-.51-2.52a11.412 11.412 0 0 1-1.31-.75l-2.43.82a2.038 2.038 0 0 1-.64.1a1.973 1.973 0 0 1-1.73-1L2.7 20.96a2 2 0 0 1 .41-2.51l1.92-1.68C5.01 16.51 5 16.26 5 16s.02-.51.04-.76l-1.93-1.69a2 2 0 0 1-.41-2.51l2.36-4.08a1.973 1.973 0 0 1 1.73-1a2.038 2.038 0 0 1 .64.1l2.42.82a11.542 11.542 0 0 1 1.32-.75l.51-2.52A2 2 0 0 1 13.64 2h4.72a2 2 0 0 1 1.96 1.61l.51 2.52a11.412 11.412 0 0 1 1.31.75l2.43-.82a2.038 2.038 0 0 1 .64-.1a1.973 1.973 0 0 1 1.73 1l2.36 4.08a2 2 0 0 1-.41 2.51"
                        /></svg
                      >Dịch vụ của tôi</a
                    >
                  </li>
                  <li>
                    <a
                      :href="
                        readyV2
                          ? `${userInside}/order`
                          : `${supportV1}/orders/danh-sach-don-hang.xhtml?source=user-inside`
                      "
                      style="display: flex; gap: 0.5rem; cursor: pointer"
                    >
                      <!-- readyV2
                          ? `${userInside}/order`
                          : `${supportV1}/orders/danh-sach-don-hang.xhtml?source=user-inside` -->
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="m17.275 20.25l3.475-3.45l-1.05-1.05l-2.425 2.375l-.975-.975l-1.05 1.075zM6 9h12V7H6zm12 14q-2.075 0-3.537-1.463T13 18q0-2.075 1.463-3.537T18 13q2.075 0 3.538 1.463T23 18q0 2.075-1.463 3.538T18 23M3 22V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v6.675q-.7-.35-1.463-.513T18 11H6v2h7.1q-.425.425-.787.925T11.675 15H6v2h5.075q-.05.25-.062.488T11 18q0 1.05.288 2.013t.862 1.837L12 22l-1.5-1.5L9 22l-1.5-1.5L6 22l-1.5-1.5z"
                        />
                      </svg>
                      Đơn hàng</a
                    >
                  </li>
                  <li>
                    <a
                      :href="
                        readyV2
                          ? `${userInside}/profile`
                          : `${supportV1}/customer/thong-tin-ca-nhan.xhtml?source=user-inside`
                      "
                      style="display: flex; gap: 0.5rem; cursor: pointer"
                    >
                      <!-- readyV2
                          ? `${userInside}/profile`
                          : `${supportV1}/customer/thong-tin-ca-nhan.xhtml?source=user-inside` -->
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M5.85 17.1q1.275-.975 2.85-1.537T12 15q1.725 0 3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4Q8.675 4 6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5q0-1.475 1.013-2.488T12 6q1.475 0 2.488 1.013T15.5 9.5q0 1.475-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"
                        />
                      </svg>
                      Tài khoản
                    </a>
                  </li>
                  <li @click="handleLogout()">
                    <a 
                      to
                      style="display: flex; gap: 0.5rem; cursor: pointer"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="m12.59 13l-2.3 2.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4-4a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76a1 1 0 0 0-.21-.33l-4-4a1 1 0 1 0-1.42 1.42l2.3 2.29H3a1 1 0 0 0 0 2ZM12 2a10 10 0 0 0-9 5.55a1 1 0 0 0 1.8.9A8 8 0 1 1 12 20a7.93 7.93 0 0 1-7.16-4.45a1 1 0 0 0-1.8.9A10 10 0 1 0 12 2"
                        /></svg
                      >Đăng xuất</a
                    >
                  </li>
                </ul>
              </li>
            </div>
          </nav>
        </div>
      </div>
    </header>
  </div>
  <!-- End Navbar Area -->
</template>

<script>
import Cookies from "js-cookie";
import { nextTick } from "vue";
export default {
  name: "Header",
  middleware: ["checkAuth", "middlewareHeader"],

  data() {
    return {
      isSticky: false,
      menus: [],
      logo: null,
      item_length: null,
      favorite_lenght: null,
      count: 0,
      isShowMenu: false,
      activeIndex: null,
      activeIndexLv2: null,
      activeIndexUser: null,
      isToggleSub: false,
      categories: null,
      isToggleSubLv2: false,
      user: {},
      tokenData: null,
      isShowMenuUser: false,
      isToggleSubUser: false,
      userInside: process.env.USER_INSIDE_URL,
      supportV1: process.env.SUPPORT_V1,
      // readyV2: this.$store.getters.getUser.readyV2,
      accessToken: Cookies.get(process.env.ACCESSTOKEN_NAME, {
        domain: ".longvan.net",
        path: "/",
      }),
      isShow: false,

      categoryByStore: null,
    };
  },
  computed: {
    readyV2() {
      return true;
    },

    idOrderCookies() {
      return this.$store.getters.cartOrderByUser?.order?.id;
    },
  },
  async created() {
    await this.handleGetUserDetail();
  },
  mounted() {
    this.categories = this.$store.getters.categories;
    this.logo = this.$store.getters.logo;
    this.menus = this.$store.getters.menus;
    console.log("menus", this.menus);
    this.categoryByStore = this.$store.getters.categoryByStore;

    console.log("this.categories", this.categories);
    console.log("this.categoryByStore", this.categoryByStore);

    const orderIdCookies = Cookies.get("orderId_with_cart", {
      domain: ".longvan.net",
      path: "/",
    });
    if (orderIdCookies) {
      this.handleGetOrder(orderIdCookies);
    }

    this.tokenData = Cookies.get(process.env.ACCESSTOKEN_NAME, {
      domain: ".longvan.net",
      path: "/",
    });

    if (
      Cookies.get(process.env.ACCESSTOKEN_NAME, {
        domain: ".longvan.net",
        path: "/",
      })
    ) {
      if (this.$store.getters.getUser) {
        this.user = this.$store.getters.getUser;
      }
    }
    const providerId = Cookies.get("providerId");
    const token = Cookies.get(process.env.ACCESSTOKEN_NAME, {
      domain: ".longvan.net",
      path: "/",
    });

    if (Cookies.get("sessionId")) {
      this.count = 0;
      this.$store
        .dispatch("getCart")
        .then((res) => {
          this.item_length = res.items;
        })
        .catch((err) => {
          Cookies.remove("sessionId");
          return err;
        });
    }

    // From Quan
    nextTick(() => {
      document.querySelectorAll('.nav-item').forEach((menuItem) => {
        const dropdown = menuItem.querySelector('.dropdown_menu');
        if (dropdown) {
          const rect = menuItem.getBoundingClientRect();
          const windowWidth = window.innerWidth;
          if (rect.right + dropdown.offsetWidth > windowWidth) {
            dropdown.classList.add('left');
          }
        }
      });
    });
  },

  watch: {
    "$store.getters.getUser": {
      handler() {
        this.$nextTick(() => {
          if (this.$store.getters.getUser) {
            this.user = this.$store.getters.getUser;
          }
        });
      },
      deep: true,
    },
    tokenData: function () {
      this.tokenData = Cookies.get(process.env.ACCESSTOKEN_NAME, {
        domain: ".longvan.net",
        path: "/",
      });
    },
    activeIndex: function () {
      this.isToggleSub = true;
    },
    activeIndexUser: function () {
      this.isToggleSubUser = true;
    },
    activeIndexLv2: function () {
      this.isToggleSubLv2 = true;
    },
    "$store.state.countItem": function () {
      if (Cookies.get("sessionId")) {
        this.getLengthCart();
      } else {
        this.item_length = null;
      }
    },
    // "$store.state.lengthFavorite": function () {
    //   if (this.$store.getters.isAuthenticated) {
    //     this.getFavoriteProducts();
    //   }
    // },
    $route(pathUrl) {
      if (pathUrl.fullPath.indexOf("?") !== -1) {
      } else {
        this.isShowMenu = false;
      }
    },
  },
  methods: {
    async handleGetOrder(id) {
      try {
        const response = await this.$sdk.order_graphQL.getOrderDetail(id);
        this.$store.commit("setCartOrderByUser", response);

        this.$store.commit(
          "setOpenNotificationOrder",
          response?.lineItems?.length
        );
      } catch (err) {
        console.log("🚀 ~ handleGetOrder ~ err:", err);
        this.$toast.error(err);
      }
    },

    async handleCheckSlug(slug) {
      if (slug) {
        const result = slug?.split("_").pop();
        console.log("🚀 ~ handleCheckSlug ~ result:", result);

        const response = await this.$sdk.product.getDetailStores(result);
        if (response) {
          this.$store
            .dispatch("getCategories", response?.id)
            .then((data) => {
              switch (data.status) {
                case 1:
                  this.categoryByStore = {
                    data: [...data.data]?.filter((c) => c.level == 1),
                    store: response?.id,
                  };
                  break;
                case 0:
                  console.log(data.message);
                  break;
              }
            })
            .catch((data) => {
              this.$toast.error(data.message, {});
            });
        }
      }
    },

    async handleGetCategoryByStore() {},

    showSubmenu() {
      this.isShow = !this.isShow;
    },
    async handleGetUserDetail() {
      try {
        const response = await this.$store.dispatch("getUserDetail", {
          token: this.accessToken,
          orgId: process.env.ORG_ID,
        });

        if (response.data.getUserDetail) {
          //this.readyV2 = response.data.getUserDetail.readyV2;
          const user_infor = {
            id: response.data.getUserDetail.partyId,
            fullName: response.data.getUserDetail.fullName,
            email: response.data.getUserDetail.email,
            phone: response.data.getUserDetail.phone,
            readyV2: true,
          };

          this.$store.commit("setUser", user_infor);
        }
      } catch (error) {
        console.log("error", error);
      }
    },

    handleLogout() {
      this.$store.commit("setLoading", true);
      this.isShowMenu = false;
      Cookies.remove("token");
      Cookies.remove(process.env.ACCESSTOKEN_NAME);
      Cookies.remove("providerId");
      Cookies.remove("userLoginId");
      Cookies.remove("extAuthId");
      Cookies.remove("urlData");
      this.$store.commit("setUser", null);
      Cookies.remove("authInfo");
      this.$store.dispatch("logout");
      this.tokenData = null;
      //this.$toast.success("Đăng xuất thành công");

      const queryParams = new URLSearchParams(window.location.search);
      const newQueryString = decodeURIComponent(queryParams).toString();
      const currentPath = `${window.location.pathname}?${newQueryString || ""}`;
      // Xác định route đích
      const redirectTo =
        window.location.pathname !== "/dang-nhap" &&
        window.location.pathname !== "/xac-thuc" &&
        window.location.pathname !== "/dang-ky" &&
        window.location.pathname !== "/quen-mat-khau" &&
        window.location.pathname !== "/quen-mat-khau/reset" &&
        window.location.pathname !== "/quen-mat-khau/verify" &&
        window.location.pathname !== "/cap-nhat-dang-ky" &&
        window.location.pathname !== "/cap-nhat-dang-ky/hoan-tat"
          ? "/dang-nhap"
          : "/";

      // Sử dụng setTimeout để delay chuyển hướng

      if (redirectTo == "/dang-nhap") {
        if (currentPath != "/") {
          setTimeout(() => {
            this.$router.push({
              name: "dang-nhap",
              query: { redirectUrl: currentPath },
            });
          }, 1500);
        } else {
          setTimeout(() => {
            this.$router.push({
              name: "dang-nhap",
            });
          }, 1500);
        }
      } else {
        setTimeout(() => {
          this.$router.push("/");
        }, 1000);
      }
    },

    selectItem(index) {
      // this.activeIndex = index;
      // this.isToggleSub = !this.isToggleSub;

      //From Quan
      if (this.activeIndex === index) {
        this.isToggleSub = !this.isToggleSub;
        if (!this.isToggleSub) {
          this.activeIndexLv2 = null; // Đóng menu nhỏ khi đóng menu lớn
          this.isToggleSubLv2 = false;
        }
      } else {
        this.activeIndex = index;
        this.isToggleSub = true;
        this.activeIndexLv2 = null; // Reset menu nhỏ khi chọn menu lớn khác
        this.isToggleSubLv2 = false;
      }
    },
    selectItemUser(index) {
      this.activeIndexUser = index;
      this.isToggleSubUser = !this.isToggleSubUser;
    },
    selectItemLv2(index) {
      // this.activeIndexLv2 = index;
      // this.isToggleSubLv2 = !this.isToggleSubLv2;
      
      //From Quan
      if (this.activeIndexLv2 === index) {
        this.isToggleSubLv2 = !this.isToggleSubLv2;
      } else {
        this.activeIndexLv2 = index;
        this.isToggleSubLv2 = true;
      }
    },
    toggleMenu() {
      this.isShowMenu = !this.isShowMenu;
      console.log("🚀 ~ toggleMenu ~ this.isShowMenu:", this.isShowMenu);
      //From Quan
      if (!this.isShowMenu) {
        this.isToggleSub = false; // Đóng tất cả menu con
        this.activeIndex = null;
      }
    },
    toggleMenuUser() {
      this.isShowMenuUser = !this.isShowMenuUser;
      this.isToggleSubUser = !this.isToggleSubUser;
    },
    getCategories() {
      this.$store
        .dispatch("getCategories")
        .then((data) => {
          switch (data.status) {
            case 1:
              this.categories = data.data?.filter((c) => c.level == 1);
              //console.log("🚀 ~ .then ~  this.categories:",  this.categories)
              this.$store.commit("setCategories", data.data);
              break;
            case 0:
              console.log(data.message);
              break;
          }
        })
        .catch((data) => {
          this.$toast.error(data.message, {});
        });
    },
    getLengthCart() {
      this.$store
        .dispatch("getCart")
        .then((res) => {
          this.item_length = res.items;
        })
        .catch((err) => {
          this.item_length = [];
          return err;
        });
    },
    getFavoriteProducts() {
      this.$store.dispatch("getFavoriteProducts").then((data) => {
        if (data) {
          this.favorite_lenght = data.data.totalResult;
        }
      });
    },
    async getLogo() {
      this.logo = await this.$strapi.find("site-logo?populate=*");
      this.logo = this.logo.data.attributes;
    },
    async getMenus() {
      const data = await this.$strapi.find("menus" + "?nested");
      this.menus = data?.menus || [];
      //console.log("🚀 ~ getMenus ~ this.menus:", this.menus);

      if (this.menus?.length > 0) {
        const checkMenuToStore = this.menus?.find((c) =>
          c?.slug?.includes("shop")
        );

        this.handleCheckSlug(checkMenuToStore?.slug);
      }
    },
    async navigateWithCurrentPath() {
      const queryParams = new URLSearchParams(window.location.search);

      if (queryParams.has("errorMessage")) {
        queryParams.delete("errorMessage");
      }

      const newQueryString = decodeURIComponent(queryParams).toString();
      const currentPath = `${window.location.pathname}${
        newQueryString ? `?${newQueryString}` : ""
      }`;

      if (
        Cookies.get(process.env.ACCESSTOKEN_NAME, {
          domain: ".longvan.net",
          path: "/",
        })
      ) {
        const routerV2 = `${process.env.USER_INSIDE_URL}`;

        const router = routerV2;

        return window.location.assign(router);
      } else {
        if (window.location.pathname != "/dang-nhap") {
          //console.log("window.location.pathname", window.location.pathname);
          console.log(
            "🚀 ~ navigateWithCurrentPath ~ currentPath:",
            currentPath
          );
          if (currentPath != "/") {
            return this.$router.push({
              name: "dang-nhap",
              query: { redirectUrl: currentPath },
            });
          } else {
            return this.$router.push({
              name: "dang-nhap",
            });
          }
        }
      }
    },

    getGridColumns(length) {
      if (length <= 10) return 'grid-1-columns';
      if (length > 10 && length <= 20) return 'grid-2-columns';
      if (length > 20) return 'grid-3-columns';
      return '';
    }
  },
};
</script>
<style lang="scss" scoped>
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .magr {
    display: none;
  }
}

.title-call {
  border: #43ce6f 1px solid;
  font-weight: 400;
}

.menu {
  display: flex;
  position: relative;
  z-index: 9;
  color: #43ce6f;
  padding: 6px;
  border-radius: 5px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;
  display: none;

  &.active {
    display: block;
  }
}

.menu-mobile {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 70%;
  background: #fff;
  z-index: 9;
  overflow-y: auto;
  transition: all 0.3s ease-in-out;
  transform: translateX(-100%);

  &.active {
    transform: translateX(0);
  }
}

.menu-mobile-content {
}

.is-mobile {
  display: none;
}

.count {
  position: absolute;
  width: 13px;
  height: 13px;
  line-height: 14px;
  text-align: center;
  font-size: 11px;
  color: #fff;
  top: -6px;
  right: -6px;
  background-color: red;
  border-radius: 50%;
  font-size: 9px;
  font-weight: 900;
}

@media (max-width: 768px) {
  #header {
    &.headroom {
      padding-top: 0;
    }
  }

  .count {
    position: absolute;
    width: 14px;
    height: 14px;
    line-height: 14px;
    text-align: center;
    font-size: 11px;
    color: #fff;
    top: -2px;
    right: -2px;
    background-color: red;
    border-radius: 50%;
    font-size: 9px;
    font-weight: 900;
  }

  .nav-item-sub {
    display: none;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: rgba(189, 188, 188, 0.075);
    float: left;
    padding: 0px;
    padding-left: 6px;
    border-bottom: 0.5px solid #f1f1f1;
    position: relative;
    overflow: hidden;

    &.active {
      display: flex;
    }
  }

  .nav-link {
    text-transform: lowercase;

    &::first-letter {
      text-transform: uppercase;
    }

    display: block;
    color: #333;
    font-size: 16px;
    width: 100%;
    height: 100%;
    padding: 10px 15px;
    position: relative;
    background: transparent;
    border: none;
  }

  .icon {
    padding: 10px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    float: left;
    padding: 0px;
    border-bottom: 0.5px solid #f1f1f1;
    position: relative;
    overflow: hidden;
  }
  

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .is-mobile {
    display: block;
  }

  .is-pc {
    display: none;
  }

  .feather {
    display: inline-block;
    overflow: hidden;
    padding: 2px;
  }
}

.icon-call {
  position: relative;
  // width: 28px;
  // height: 28px;
  // border-radius: 50%;
  // background: #43ce6f;
  display: flex;
  justify-content: center;
  align-items: center;
  // .icon-ab {
  //   color: #fff;
  // }
}

.others-option {
  span {
    cursor: pointer;
  }
}
</style>
