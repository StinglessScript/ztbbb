export default async function ({
  app,
  store,
  route,
  req,
  $strapi,
  redirect,
  $sdk,
}) {
  if (process.server) {
    console.log("Running on server-side");
    try {
      //console.log("vào rồidddd");
      // Fetch Categories
      const categoryData = await store.dispatch("getCategories");
      if (categoryData.status == 1) {
        //console.log("🚀 ~ categoryData:", categoryData);
        store.commit(
          "setCategories",
          categoryData.data?.filter((c) => c.level == 1)
        );
      }
      // Fetch Logo
      const logoData = await $strapi.find("site-logo?populate=*");
      //console.log("🚀 ~ logoData:", logoData);
      store.commit("setLogo", logoData?.data?.attributes);

      // Fetch Menus
      const menuData = await $strapi.find("menus?nested");
      //console.log("🚀 ~ menuData:", menuData);
      store.commit("setMenus", menuData?.menus || []);

      // Handle Slug & Fetch Categories by Store
      const menuSlug = store.state.menus?.find((c) =>
        c?.slug?.includes("shop")
      )?.slug;

      if (menuSlug) {
        const storeId = menuSlug.split("_").pop();
        const storeDetail = await $sdk.product.getDetailStores(storeId);

        if (storeDetail) {
          const categoryByStore = await store.dispatch(
            "getCategories",
            storeDetail.id
          );

          if (categoryByStore.status === 1) {
            store.commit("setCategoryByStore", {
              data: [...categoryByStore.data]?.filter((c) => c.level == 1),
              store: storeDetail.id,
            });
          }
        }
      }
    } catch (error) {
      console.error("Error fetching global data:", error);
    }
  } else {
    console.log("Running on client-side");
  }
}
