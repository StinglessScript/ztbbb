export function formatData(query) {
  let newRedirectUrl = query.redirectUrl || query.callback;

  if (newRedirectUrl) {
    // Kiểm tra nếu redirectUrl chưa chứa dấu "?"
    if (!newRedirectUrl.includes("?")) {
      // Thêm dấu "?" vào redirectUrl
      newRedirectUrl += "?";
    } else {
      // Nếu redirectUrl đã có dấu "?" thì thêm dấu "&" vào redirectUrl
      newRedirectUrl += "&";
    }

    // Kiểm tra xem có các tham số ngoài redirectUrl không
    const queryString = Object.keys(query)
      .filter((key) => key !== "redirectUrl" && query[key] !== undefined) // Loại bỏ redirectUrl và các tham số không có giá trị
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
      )
      .join("&");

    // Nếu có queryString thì mới thêm vào newRedirectUrl
    if (queryString) {
      newRedirectUrl += queryString;
    }

    // Trả về URL đã format
    return newRedirectUrl || "";
  } else {
    return;
  }
}
