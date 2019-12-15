import * as config from '../service/config.js'

let native = {}

native.JSBridge = callback => {
  if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge)
  }
  else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      function () {
        callback(WebViewJavascriptBridge)
      },
      false
    );
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }

  window.WVJBCallbacks = [callback] // 创建一个 WVJBCallbacks 全局属性数组，并将 callback 插入到数组中。
  var WVJBIframe = document.createElement('iframe') // 创建一个 iframe 元素
  WVJBIframe.style.display = 'none' // 不显示
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__' // 设置 iframe 的 src 属性
  document.documentElement.appendChild(WVJBIframe) // 把 iframe 添加到当前文导航上。
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

native.saveToken = obj => {
  return new Promise((resolve, reject) => {
    native.JSBridge(bridge => {
      bridge.callHandler(
        'setToken',
        `{"token": "${obj.token}"}`,
        dataFromOC => {
          resolve(JSON.parse(dataFromOC))
        }
      )
    })
  })
}
if (config.env === 1) {
  // 正式环境使用此getToken
  native.getToken = obj => {
    return new Promise((resolve, reject) => {
      native.JSBridge(bridge => {
        bridge.callHandler('getToken', '{}', dataFromOC => {
          resolve(JSON.parse(dataFromOC))
        })
      })
    })
  }
}

if (config.env === 0) {
  // web测试时提供token
  native.getToken = obj => {
    return new Promise((resolve, reject) => {
      // 552b0a5f93835d1d29a7aaba62d6dd91   15812340001
      // 31204e4a13634791520297bc28626ba6   17191098959
      // f905c9d34bbb7d47b459fe420a70d042
      // of2j85_QmZ9g1kLHzaz6ZbNKEqKI
      // resolve({ token: 'c2740354f0d140193ed04185c66b6e8f' })
      resolve({ token: '6264d7f1f2d7f9748f059c76e14d1a1f' })
    })
  }
}

native.wxLogin = obj => {
  return new Promise((resolve, reject) => {
    native.JSBridge(bridge => {
      bridge.callHandler('WX_Login', '{}', dataFromOC => {
        resolve(JSON.parse(dataFromOC))
      })
    })
  })
}

native.qqLogin = obj => {
  return new Promise((resolve, reject) => {
    native.JSBridge(bridge => {
      bridge.callHandler('QQ_Login', '{}', dataFromOC => {
        resolve(JSON.parse(dataFromOC))
      })
    })
  })
}

// 登录页的返回按钮
native.login_back_btn = obj => {
  return new Promise((resolve, reject) => {
    native.JSBridge(bridge => {
      bridge.callHandler('back_Login', '{}', dataFromOC => {
        resolve(JSON.parse(dataFromOC))
      })
    })
  })
}

// 普通返回按钮
native.back_btn = obj => {
  return new Promise((resolve, reject) => {
    native.JSBridge(bridge => {
      bridge.callHandler('back', '{}', dataFromOC => {
        resolve(JSON.parse(dataFromOC))
      })
    })
  })
}

// 获取极光ID
native.getJPushId = obj => {
  return new Promise((resolve, reject) => {
    native.JSBridge(bridge => {
      bridge.callHandler('getJPushId', '{}', dataFromOC => {
        resolve(JSON.parse(dataFromOC))
      })
    })
  })
}

// 即将跳转的页面
native.routerGoTo = obj => {
  return new Promise((resolve, reject) => {
    native.JSBridge(bridge => {
      bridge.callHandler(
        'router',
        `{"url": "${obj.url}"}`,
        // JSON.stringify({
        //   url: obj.url
        // }),
        dataFromOC => {
          resolve(JSON.parse(dataFromOC))
        }
      )
    })
  })
}

// 用于刷新页面数据
native.viewWillAppear = fn => {
  native.JSBridge(bridge => {
    bridge.registerHandler('viewWillAppear', '{}', dataFromOC => {
      fn(JSON.parse(dataFromOC))
    })
  })
}
// 用于分享页面数据
native.share = obj => {
  native.JSBridge(bridge => {
    bridge.callHandler('share', obj, dataFromOC => {
      console.log('dataFromOC----', dataFromOC);
    })
  })
}
// 用于跳转到好评
native.good = obj => {
  native.JSBridge(bridge => {
    bridge.callHandler('evaluation', obj, dataFromOC => {
      console.log('dataFromOC----', dataFromOC);
    })
  })
}

// 拨号
native.makeCall = obj => {
  return new Promise((resolve, reject) => {
    native.JSBridge(bridge => {
      bridge.callHandler(
        'call',
        `{"mobile": "${obj.mobile}"}`,
        // JSON.stringify({
        //   mobile: obj.mobile
        // }),
        dataFromOC => {
          resolve(JSON.parse(dataFromOC))
        }
      )
    })
  })
}

// 上传图片
native.uploadImgs = obj => {
  return new Promise((resolve, reject) => {
    native.JSBridge(bridge => {
      bridge.callHandler(
        'get_image',
        `{
          "count": "${obj.count}",
          "type": "${obj.type}"
        }`,
        // JSON.stringify({
        //   count: obj.count,
        //   // banner, category(分类), content(单页), Info(资讯), user(用户)
        //   type: obj.type
        // }),
        dataFromOC => {
          resolve(JSON.parse(dataFromOC))
        }
      )
    })
  })
}

// 跳转爱车主页
native.gotoQualityMain = obj => {
  return new Promise((resolve, reject) => {
    native.JSBridge(bridge => {
      bridge.callHandler('my_car', '{}', dataFromOC => {
        resolve(JSON.parse(dataFromOC))
      })
    })
  })
}

// 跳转积分商城
native.gotoPointsMall = obj => {
  return new Promise((resolve, reject) => {
    native.JSBridge(bridge => {
      bridge.callHandler('points_Mall', '{}', dataFromOC => {
        resolve(JSON.parse(dataFromOC))
      })
    })
  })
}


// 跳转到首页
native.gotoHome = obj => {
  return new Promise((resolve, reject) => {
    native.JSBridge(bridge => {
      bridge.callHandler('goHome', '{}', dataFromOC => {
        resolve(JSON.parse(dataFromOC))
      })
    })
  })
}

// 跳转到圈子
native.gotoQuan = obj => {
  return new Promise((resolve, reject) => {
    native.JSBridge(bridge => {
      bridge.callHandler('goNote', '{}', dataFromOC => {
        resolve(JSON.parse(dataFromOC))
      })
    })
  })
}
// 跳转到支付
native.gotoPay = obj => {
  return new Promise((resolve, reject) => {
    native.JSBridge(bridge => {
      bridge.callHandler('pay', obj, dataFromOC => {
        resolve(JSON.parse(dataFromOC))
      })
    })
  })
}

export default native
