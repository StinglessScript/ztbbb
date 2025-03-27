import { mount, createLocalVue } from "@vue/test-utils";
import Cart from "../../components/Cart/CartTwo.vue";
import Cookies from "js-cookie";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);
describe("cart", () => {
  let wrapper;
  let $store;
  let actions
  beforeEach(() => {
     actions = {
      getCart: jest.fn(),
    };
    $store = new Vuex.Store({
      actions,
      // getters: {
      //   isAuthenticated: false,
      // },
    });
    Cookies.set("sessionId", "website-longvancloud-1666143208169-423");
    wrapper = mount(Cart, {
      mocks: { localVue, $store },
    });
  });
  test("giỏ hàng k có", () => {
    expect(
      wrapper.find('<strong>Không có sản phẩm nào trong giỏ hàng của bạn</strong>')
    ).toBe("Không có sản phẩm nào trong giỏ hàng của bạn")
  });
  test('get cart có được chạy"', async () => {
    expect(actions.getCart).toHaveBeenCalled()
  });
  test('carts emty', async () => {

    expect(wrapper.vm.carts.length).toBe(0)
  });
 
});
