import { SDK } from "@longvansoftware/service-js-client";
//import { SDK } from "../../storefront-js-client";

export default ({ app }, inject) => {
  const sdkInstance = new SDK(
      process.env.ORG_ID,
      process.env.STORE_ID,
      "U2FsdGVkX1/Cci00sR9oVNTJxPhwM7jKkQP6xg97IVI=",
      process.env.ENVIROMENT,
  );
  inject('sdk', sdkInstance);
};
