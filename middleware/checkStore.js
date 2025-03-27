// middleware/checkStore.js

export default function ({ query, store }) {
  // Kiểm tra nếu có query 'store', nếu không có thì dùng process.env.STORE_ID
  const storeId = query.store || process.env.STORE_ID;
  //console.log("🚀 ~ storeId:", storeId);

  store.dispatch("updateStoreId", storeId);
}
