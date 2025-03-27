(function (d, t) {
  var BASE_URL = "https://chat.longvan.net";
  var g = d.createElement(t),
    s = d.getElementsByTagName(t)[0];
  g.src = BASE_URL + "/packs/js/sdk.js";
  g.defer = true;
  g.async = true;
  s.parentNode.insertBefore(g, s);
  g.onload = function () {
    window.chatwootSDK.run({
      websiteToken: "qw5ro7fduWYzcEHGSrmovwbB",
      baseUrl: BASE_URL,
    });
  };
})(document, "script");



window.chatwootSettings = {
  hideMessageBubble: true,
  position: "right",
  locale: "en",
  type: "expanded_bubble",
  darkMode: "auto",
};

export default {
  name: "ChatwootWidget",
};
