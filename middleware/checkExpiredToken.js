export default async function ({ route, store, app, redirect, query }) {
  let token = app.$cookies.get(process.env.ACCESSTOKEN_NAME, {
    domain: ".longvan.net",
    path: "/",
  });

  if (token) {
    const payload = {
      token: token,
      orgId: "LONGVAN",
    };

    const response = await store.dispatch("getUserByToken", payload);
    //console.log("🚀 ~ file: checkExpiredToken.js:10 ~ response:", response)
    if (!response.data.getUserDetail) {
      await store.dispatch("sendCodeActive", query.userId);
      return redirect(
        `/xac-thuc?userId=${query.userId}&user=${query.user}&redirectUrl=${query.redirectUrl}`
      );
    }
  } else {
    return;
  }
}
