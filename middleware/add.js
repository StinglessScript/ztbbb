export default async function ({route, store, app }) {
  if (route.query.productid) {
    store.commit("setSessionId2", null);
    let cart_child = [];
    if (route.query.cartchild) {
      let cart_child_item = route.query?.cartchild.split("-");
      cart_child_item.forEach((element) => {
        let item = {
          product_id: element,
          quantity: "1",
          allow_delete: false,
        };
        cart_child.push(item);
      });
    }
    let product = {
      quantity: 1,
      id: route.query.productid,
      allow_delete: true,
      cart_child: cart_child,
    };
    await store.dispatch("addToCart2", product);
    app.$cookies.set("sessionId2", store.state.sessionId2);
  }
}
