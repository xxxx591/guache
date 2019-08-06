import Vue from 'vue'
import { Toast } from 'mint-ui'
import { Decimal } from 'decimal.js'
const tool = {}

tool.add = (a, b) => {
  return new Decimal(a).plus(b).toNumber()
}

tool.sub = (a, b) => {
  return new Decimal(a).minus(b).toNumber()
}

tool.mul = (a, b) => {
  return new Decimal(a).times(b).toNumber()
}

tool.div = (a, b) => {
  return new Decimal(a).dividedBy(b).toNumber()
}

tool.deepCopy = target => {
  let copyed_objs = [] //此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象
  function _deepCopy(target) {
    if (typeof target !== 'object' || !target) {
      return target
    }
    for (let i = 0; i < copyed_objs.length; i++) {
      if (copyed_objs[i].target === target) {
        return copyed_objs[i].copyTarget
      }
    }
    let obj = {}
    if (Array.isArray(target)) {
      obj = [] //处理target是数组的情况
    }
    copyed_objs.push({ target: target, copyTarget: obj })
    Object.keys(target).forEach(key => {
      if (obj[key]) {
        return
      }
      obj[key] = _deepCopy(target[key])
    })
    return obj
  }
  return _deepCopy(target)
}

let flag2 = false
tool.debounce = (fun, timeout) => {
  let time = ''
  if (flag2) {
    return
  }
  flag2 = true
  clearTimeout(time)
  time = setTimeout(() => {
    fun()
    flag2 = false
  }, timeout || 500)
}

tool.checkPhoneNum = phoneNum => {
  if (/^1[345678]\d{9}$/.test(phoneNum)) {
    return true
  } else {
    if (!phoneNum) {
      Toast({
        message: '手机号不能为空!',
        position: 'top',
        duration: 1500
      })
      return false
    }
    Toast({
      message: '请填写正确的手机号!',
      position: 'top',
      duration: 1500
    })
    return false
  }
}

tool.checkEmpty = (varib = [], txt = []) => {
  let flag = true
  for (let i = 0; i < varib.length; i++) {
    if (!varib[i]) {
      flag = false
      Toast({
        message: txt[i],
        position: 'top',
        duration: 1500
      })
      break
    }
  }
  return flag
}

// 全局定时器
let timeFn = Function
setInterval(() => {
  timeFn()
}, 1000)

tool.time = callback => {
  timeFn = callback
}

// // 防重复
// let flag = false
// tool.debounce = (fun, timeout) => {
//   let time = ''
//   if (flag) {
//     return
//   }
//   flag = true
//   clearTimeout(time)
//   time = setTimeout(() => {
//     fun()
//     flag = false
//   }, timeout || 500)
// }

tool.hrefObj = () => {
  let decodeURL = window.location.href
  let hrefObj = parseURL(decodeURL)
  return hrefObj
  // 解析地址
  function parseURL(url) {
    var qs = url.split('?')
    qs = qs[1] ? qs[1] : ''
    var obj = {}
    if (typeof qs !== 'string' || qs.length === 0) {
      return obj
    }

    var key = []
    var decode = decodeURIComponent
    qs = qs.split('&')
    var qsLen = qs.length
    for (var i = 0; i < qsLen; ++i) {
      var x = qs[i]
      var idx = x.indexOf('=')
      var k
      var v
      if (idx >= 0) {
        k = decode(x.substring(0, idx))
        v = decode(x.substring(idx + 1))
      } else {
        k = x
        v = ''
      }
      if (key.indexOf(k) === -1) {
        obj[k] = v
        key.push(k)
      } else if (obj[k] instanceof Array) {
        obj[k].push(v)
      } else {
        obj[k] = [obj[k], v]
      }
    }
    return obj
  }
}

export default tool
