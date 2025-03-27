import Cookies from "js-cookie";

// console.log("process.env.ACCESSTOKEN_NAME",process.env.ACCESSTOKEN_NAME)
const orderId_with_cart = Cookies.get("orderId_with_cart");
const token_anonymous = Cookies.get(process.env.ACCESSTOKEN_NAME)
  ? Cookies.get(process.env.ACCESSTOKEN_NAME)
  : Cookies.get("token_anonymous");

export const AddItemInCart = {
  async handleAddItemsInOrder(product, domainName, context, type) {
    //console.log("process.env.ACCESSTOKEN_NAME",process.env.ACCESSTOKEN_NAME, token_anonymous)
    context.loadding = true;
    try {
      let token = token_anonymous
        ? await this.handleGetDataWithToken(token_anonymous, context)
        : await this.handleGetToken(context);

      // if (!token) throw new Error("Token not available");

      if (!token) {
        token = await this.handleGetToken(context);
      }
      // throw new Error("Token not available");
      // console.log(
      //   "🚀 ~ handleAddItemsInOrder ~ orderId_with_cart:",
      //   orderId_with_cart
      // );
      let orderId =
        // orderId_with_cart ||
        await this.handleCreateOrderTemp(token, context);
      if (!orderId) throw new Error("Failed to create order");

      const dataAdd = await this.handleAddItemInOrder(
        orderId,
        product,
        token,
        context
      );
      if (!dataAdd || dataAdd?.status !== 1)
        throw new Error("Failed to add item to order");

      if (
        product.categories?.some((c) => c.id == process.env.DOMAIN_CATEGORY)
      ) {
        const productOption = await this.handleGetProductOption(
          product?.id,
          context
        );
        if (productOption) {
          const arrayInput = productOption.find((c) => c?.subType === "INPUT");
          const array = [
            {
              idOption: arrayInput?.id,
              name: arrayInput?.name,
              value: domainName,
            },
          ];

          const updateProductOption = await this.handleUpdateProductOption(
            dataAdd?.data[0],
            token?.partyId,
            array,
            context
          );
          if (!updateProductOption)
            throw new Error("Failed to update product option");
        }
      }

      const order = await this.handleGetOrderDetail(orderId, context);
      context.$store.commit("setCartOrderByUser", order);
      context.$store.commit(
        "setOpenNotificationOrder",
        order?.lineItems?.length
      );
      // context.$toast.success("Thêm vào giỏ hàng thành công");

      context.$router.push(
        `/gio-hang?orderId=${orderId}&type=${type}${
          domainName ? `&domain=${domainName}` : ""
        }${token?.partyId ? `&userId=${token?.partyId}` : ""}`
      );
    } catch (error) {
      console.error("🚀 ~ handleAddItemsInOrder ~ error:", error);
      context.$toast.error(error.message);
    } finally {
      //context.loadding = false;
    }
  },

  async handleGetDataWithToken(token, context) {
    return await this.safeRequest(() => context.$sdk.auth.getUserDetail(token));
  },

  async handleAddItemInOrder(orderId, product, token, context) {
    console.log("🚀 ~ handleAddItemInOrder ~ product:", product);
    const foundDataDefault = product?.discountPrice?.find(
      (d) => d.defaultPrice === true
    );
    const data = [
      // {
      //   quantity: 1,
      //   gift: false,
      //   parent_id: null,
      //   product_id: product?.id,
      //   input_price: price12
      //     ? price12?.price
      //     : product?.priceType === "RENT"
      //     ? product?.price
      //     : null,
      //   discount_amount: 0,
      // },

      {
        quantity: foundDataDefault?.time,
        gift: false,
        parent_id: null,
        product_id: product?.id,
        input_price: foundDataDefault?.price,
        discount_amount: 0,
        campaign_id:
          foundDataDefault?.attributes?.value == true
            ? foundDataDefault?.attributes?.campain?.find(
                (c) => c.attrName == "CAMPAIN"
              )?.attrValue
            : null,
        campaign_action_id:
          foundDataDefault?.attributes?.value == true
            ? foundDataDefault?.attributes?.campain?.find(
                (c) => c.attrName == "CAMPAIGN_ACTION"
              )?.attrValue
            : null,
        unit_price:
          foundDataDefault?.oldPrice?.length > 0
            ? foundDataDefault?.oldPrice[0]?.price
            : null,
      },
    ];

    return await this.safeRequest(() =>
      context.$sdk.order.addProductInOrderWithoutLogin(
        orderId,
        token?.partyId,
        data,
        context.$route.query.store
      )
    );
  },

  async handleGetToken(context) {
    const response = await this.safeRequest(() =>
      context.$sdk.auth.login({ username: "anonymous", password: "anonymous" })
    );

    if (response) {
      console.log("🚀 ~ handleGetToken ~ response:", response);
      Cookies.set("token_anonymous", response?.accessToken, {
        expires: 7,
      });

      return response;
    } else {
      return null;
    }
  },

  async handleCreateOrderTemp(token, context) {
    const param = {
      time: new Date().getTime(),
      orderType: "SERVICE",
      source: "cart",
    };

    await context.$sdk.order.setToken(token?.accessToken);

    const response = await this.safeRequest(() =>
      context.$sdk.order.createOrderTemp(param, "website")
    );

    if (response?.status == 1) {
      // Cookies.set("orderId_with_cart", response?.data?.orderId, {
      //   expires: 7,
      // });
      return response?.data?.orderId;
    } else {
      return null;
    }
  },

  async handleGetProductOption(id, context) {
    const response = await this.safeRequest(() =>
      context.$store.dispatch("getProductOptionV2", {
        id,
        store: context.$route.query.store,
      })
    );

    if (response?.data?.getProductOption) {
      return response?.data?.getProductOption;
    } else {
      return [];
    }
  },

  async handleUpdateProductOption(orderLineItemId, userId, jsonAll, context) {
    const dataOptionSystem = {
      id: orderLineItemId,
      productOptionId: jsonAll,
      useID: userId,
    };

    return await this.safeRequest(() =>
      context.$store.dispatch(
        "updateProductOptionOrderLineItem",
        dataOptionSystem
      )
    );
  },

  async handleGetOrderDetail(orderId, context) {
    return await this.safeRequest(() =>
      context.$sdk.order_graphQL.getOrderDetail(orderId)
    );
  },

  async handleSetToken(context) {
    if (context.$store.getters.getUser) {
      const token = await this.handleGetDataWithToken(token_anonymous, context);
      if (token) {
        return await context.$sdk.order.setToken(token?.accessToken);
      }
    } else {
      const response = await this.handleGetToken(context);
      if (response) {
        return await context.$sdk.order.setToken(response?.accessToken);
      }
    }
  },

  async safeRequest(requestFn) {
    try {
      return await requestFn();
    } catch (error) {
      console.error("🚀 ~ safeRequest ~ error:", error);
      return null;
    }
  },
};
