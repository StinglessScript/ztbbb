export default async function ({ app, store, route, req, redirect, $sdk }) {
  let status = route.query.status;
  let token = app.$cookies.get(process.env.ACCESSTOKEN_NAME);
  let urlData = app.$cookies.get("urlData");
  console.log("🚀 ~ urlData:", urlData)
  let toast = app.$toast;
  const protocol = req && (req.headers["x-forwarded-proto"] || "http");
  let currentUrl = req
    ? `${protocol}://${req.headers.host}${req.originalUrl}`
    : window.location.href;
  let currentDomain = new URL(currentUrl).origin + new URL(currentUrl).pathname;
  // console.log("🚀 ~ currentDomain:", currentDomain);
  // console.log("🚀 ~ currentUrl:", currentUrl);
  // console.log(
  //   "🚀 ~ app.$cookies.get('urlData').domain:",
  //   app.$cookies.get("urlData").domain
  // );

  if (route.query.accessToken) {
    let userLoginByToken = await getUserLoginByToken(
      route.query.accessToken,
      $sdk
    );
    //console.log("🚀 ~ userLoginByToken?.userLoginId:", userLoginByToken);
    if (userLoginByToken) {
      if (userLoginByToken?.status == "UN_VERIFIED") {
        app.$cookies.set("token_zalo", route.query.accessToken);
        app.$cookies.set("userLoginId_zalo", userLoginByToken?.id);
        //console.log("route.query", route.query);
        return redirect(
          `/cap-nhat-dang-ky?status=UPDATE_INFO&typeLogin=oauth&callback=${
            route.query.redirectUrl ? route.query.redirectUrl : "/"
          }`
        );
      } else {
        app.$cookies.set(
          process.env.ACCESSTOKEN_NAME,
          route.query.accessToken,
          {
            path: "/",
            maxAge: 86400,
            domain: ".longvan.net",
          }
        );
        store.commit("setToken", route.query.accessToken);
        token = route.query.accessToken;

        let user = await getUser(userLoginByToken.accessToken, store);

        //console.log("🚀 ~ user:", user?.readyV2);
        return redirect(
          route.query.redirectUrl && route.query.redirectUrl != "/"
            ? route.query.redirectUrl
            : process.env.USER_INSIDE_URL
          // : user?.readyV2
          // ? process.env.USER_INSIDE_URL
          // : `${process.env.SUPPORT_V1}/services/quan-ly-dich-vu.xhtml?source=user-inside`
        );
      }
    } else {
      app.$cookies.set(process.env.ACCESSTOKEN_NAME, route.query.accessToken, {
        path: "/",
        maxAge: 86400,
        domain: ".longvan.net",
      });
      store.commit("setToken", route.query.accessToken);
      token = route.query.accessToken;

      let user = await getUser(route.query.accessToken, store);
      if (status == "UPDATE_INFO") {
        //console.log("route.query", route.query);
        return redirect(
          `/cap-nhat-dang-ky?status=UPDATE_INFO&typeLogin=oauth&callback=${
            route.query.redirectUrl ? route.query.redirectUrl : "/"
          }`
        );
      } else {
        //console.log("🚀 ~ user:", user?.readyV2);
        return redirect(
          route.query.redirectUrl && route.query.redirectUrl != "/"
            ? route.query.redirectUrl
            : process.env.USER_INSIDE_URL
          // : user?.readyV2
          // ? process.env.USER_INSIDE_URL
          // : `${process.env.SUPPORT_V1}/services/quan-ly-dich-vu.xhtml?source=user-inside`
        );
      }
    }
  }

  if (urlData && urlData.domain == currentDomain) {
    const redirectUrl = `${urlData.domain}${urlData.params}`;
    app.$cookies.remove("urlData");
    return redirect(redirectUrl);
  }

  if (route.fullPath && !route.query.errorMessage) {
    const formatURL = decodeURIComponent(route.fullPath);
    const firstQuestionMarkIndex = formatURL.indexOf("?");

    if (firstQuestionMarkIndex !== -1) {
      // Tìm vị trí của dấu "?" thứ hai trong chuỗi
      const secondQuestionMarkIndex = formatURL.indexOf(
        "?",
        firstQuestionMarkIndex + 1
      );

      // Nếu có dấu "?" thứ hai, thì thay thế các dấu "?" từ dấu "?" thứ hai trở đi bằng "&"
      if (secondQuestionMarkIndex != -1) {
        const modifiedURL =
          formatURL.slice(0, secondQuestionMarkIndex) +
          formatURL.slice(secondQuestionMarkIndex).replace(/\?/g, "&");
        route.fullPath = modifiedURL;
        return redirect(route.fullPath);
      }

      // console.log("formatURL", route.fullPath);
    }
  }

  if (route.query.errorMessage == "ACCESS_DENIED" && route.query.redirectUrl) {
    const routeQueryWithoutRedirect = { ...route.query };
    delete routeQueryWithoutRedirect.redirectUrl;
    const queryString = Object.keys(routeQueryWithoutRedirect)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            routeQueryWithoutRedirect[key]
          )}`
      )
      .join("&");
    //console.log("queryString",route.query.redirectUrl, queryString)
    if (route.query.redirectUrl == "/") {
      return redirect(`/dang-nhap`);
    } else {
      return redirect(`${route.query.redirectUrl}?${queryString}`);
    }
  }

  // if (store.getters.isLoading) {
  //   store.commit("setLoading", false); // Set lại isLoading khi reload
  // }

  // store.commit("setHost", req?.headers.host);
  // store.dispatch("initSSid", req);
  // store.dispatch("initAuth", req);

  //console.log("🚀 ~ token:", app.$cookies.get(process.env.ACCESSTOKEN_NAME));
  if (token) {
    let user = null;
    user = await getUser(token, store);
    if (user) {
      store.commit("setUser", user);
    } else {
      store.commit("setToken", null);
      store.commit("setUser", null);
    }
  } else {
    //console.log("vào rồi nè ");
    store.commit("setToken", null);
    store.commit("setUser", null);
  }
}

async function getUser(token, store) {
  try {
    if (token) {
      const res = await store.dispatch("getUserByToken", {
        token: token,
        orgId: process.env.ORG_ID,
      });
      return res.data.getUserDetail;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

async function getUserLoginByToken(token, $sdk) {
  try {
    if (token) {
      const res = await $sdk.auth.getUserLoginByToken(token);
      return res;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching getUserLoginByToken:", error);
    return null;
  }
}
