const handleFormatRedirectUrl = (redirectUrlData) => {
  const params = new URLSearchParams(redirectUrlData);
  const redirectUrl = decodeURIComponent(params.get("redirectUrl"));

  // Kiểm tra nếu đã có dấu '?' trong redirectUrl thì không cần thêm nữa
  const additionalParams = redirectUrlData.split("&").slice(1).join("&");
  const finalUrl = redirectUrl.includes("?")
    ? redirectUrl + "&" + additionalParams
    : redirectUrl + "?" + additionalParams;

  return finalUrl;
};
export { handleFormatRedirectUrl };
