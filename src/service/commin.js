export default {
  getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var str = location.href.split('?')[1] || '';
    var r = str.match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },

  setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge)
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady',
        function () {
          callback(WebViewJavascriptBridge)
        },
        false
      );
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  },
  connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge)
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady'
        , function() {
          WebViewJavascriptBridge.init(function(message, responseCallback) {
          });
          callback(WebViewJavascriptBridge)
        },
        false
      );
    }
  }
};
