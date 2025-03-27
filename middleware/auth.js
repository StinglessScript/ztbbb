export default function ({ store, redirect, route }) {
  if (!store.getters.isAuthenticated) {
    return redirect("/dang-nhap" + "?redirectUrl=" + route.fullPath);
  }
}
