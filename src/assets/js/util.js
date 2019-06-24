
/**
 * 解析URL参数
 * @returns {{}}
 */
export function urlParse () {
  let url = window.location.search
  let obj = {}
  // 1，/g 表示该表达式将用来在输入字符串中查找所有可能的匹配，返回的结果可以是多个。如果不加/g最多只会匹配一个
  // 2，/i  表示匹配的时候不区分大小写
  // 3，/m 表示多行匹配，什么是多行匹配呢？就是匹配换行符两端的潜在匹配。影响正则中的^$符号
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}

/**
 * 正则匹配
 * @returns {{regPhone: RegExp, regCode: RegExp, regUser: RegExp, regCompanyName: RegExp, regPsd: RegExp, card: RegExp}}
 */
export function regTest () {
  return {
    regPhone: /^[1][3456789][\d]{9}$/, // 手机号码
    regAccount: /^[_A-Za-z0-9]{6,16}$/, // 6到16位数字字母下划线组合
    regPwd: /^[A-Za-z0-9~'`!@#￥$%^&*()-+_=:]{6,16}$/, // 6到16位密码
    regCode: /^\d{4}$/, // 4位验证码
    regUser: /^[\u4e00-\u9fa5]{2,15}$/, // 用户名（汉字）
    regEmail: /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/, // 邮箱
    regPsd: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, // 必须包含字母与数字
    card: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ // 身份证
  }
}

// 对象键值排序
export function objKeySort(obj) {
    let newKey = Object.keys(obj).sort(), str = ''
    for (let i = 0; i < newKey.length; i++) {
        if (obj[newKey[i]] instanceof Array) {
            str += newKey[i] + '=' + JSON.stringify(obj[newKey[i]]) + '&'
        } else if (obj[newKey[i]] instanceof Object) {
            Object.keys(obj[newKey[i]]).sort()
            str += newKey[i] + '=' + JSON.stringify(obj[newKey[i]]) + '&'
        } else {
            str += newKey[i] + '=' + obj[newKey[i]] + '&'
        }
    }
    return str;
}

// 数组排列组合
export function sortArray(arr, size) {
    let r = []; //result
    function _(t, a, n) { //tempArr, arr, num
        if (n === 0) {
            r[r.length] = t;
            return;
        }
        for (var i = 0, l = a.length - n; i <= l; i++) {
            var b = t.slice();
            b.push(a[i]);
            _(b, a.slice(i + 1), n - 1);
        }
    }
    _([], arr, size);``
    return r.length;
}

/**
 * 获取昨天，明天等日期
 * @param num -1表示昨天， 1表示明天
 * @param str 日期分割方式
 * @returns {string}
 */
export function getNewDate (num, str = '-') {
    let today = new Date();
    let nowTime = today.getTime();
    let ms = 24*3600*1000*num;
    today.setTime(parseInt(nowTime + ms));
    let oYear = today.getFullYear();
    let oMoth = (today.getMonth() + 1).toString();
    if (oMoth.length <= 1) oMoth = '0' + oMoth;
    let oDay = today.getDate().toString();
    if (oDay.length <= 1) oDay = '0' + oDay;
    return oYear + str + oMoth + str + oDay;
}

// 时间格式化
export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

/**
 * 获取最近的日期
 * @param day -> 1天前传-1
 */
export function getDay (day) {
  let today = new Date()
  let targetDay = today.getTime() + 1000 * 60 * 60 * 24 * day
  today.setTime(targetDay) // 显示最新日期
  let tYear = today.getFullYear() // 年份
  let tMonth = today.getMonth() // 月份
  let tDate = today.getDate() // 日
  tMonth = doHandleMonth(tMonth + 1)
  tDate = doHandleMonth(tDate)
  return tYear + '-' + tMonth + '-' + tDate
}

/**
 * 月份加0
 * @param month -> 月份
 * @returns {*}
 */
function doHandleMonth (month) {
  let m = month
  if (month.toString().length === 1) {
    m = '0' + month
  }
  return m
}

/*
  @prams data 模拟数据
 */
export function resultData (jsonObj) {
  return new Promise(resolve => {
    let arr = []
    jsonObj.forEach(item => {
      item.list.forEach(res => {
          res.list.forEach(r => {
              if ((r.group_name == '连码' && (r.name == '二全中' || r.name == '二中特' || r.name == '特串')) || (r.group_name == '连肖' && (r.name == '二肖连中' || r.name == '二肖连不中')) || (r.group_name == '连尾' && (r.name == '二尾连中' || r.name == '二尾连不中')) || r.group_name == '冠亚') r.betsNum = 2
              if ((r.group_name == '连码' && (r.name == '三全中' || r.name == '三中二')) || (r.group_name == '连肖' && (r.name == '三肖连中' || r.name == '三肖连不中')) || (r.group_name == '连尾' && (r.name == '三尾连中' || r.name == '三尾连不中'))) r.betsNum = 3
              if ((r.group_name == '连肖' && (r.name == '四肖连中' || r.name == '四肖连不中')) || (r.group_name == '连尾' && (r.name == '四尾连中' || r.name == '四尾连不中'))) r.betsNum = 4
              if (r.group_name == '不中' && r.name == '五不中') r.betsNum = 5
              if (r.group_name == '不中' && r.name == '六不中') r.betsNum = 6
              if (r.group_name == '不中' && r.name == '七不中') r.betsNum = 7
              if (r.group_name == '不中' && r.name == '八不中') r.betsNum = 8
              if (r.group_name == '不中' && r.name == '九不中') r.betsNum = 9
              if (r.group_name == '不中' && r.name == '十不中') r.betsNum = 10
              r.selected = false
              arr.push(r)
          })
      })
    })
    resolve(arr)
  })
}

/**
 * 牛牛算法
 * @param arr 数据值
 * @returns {*}
 */

function sum (arr) {
    return arr.reduce((a, b) => (a + b)) % 10
}
function cal (arr = []) {
    if (!arr || arr.length < 5) return ''
    let card5 = []
    arr.forEach(item => {
        if (item == 'J' || item == 'Q' || item == 'K') item = 0
        card5.push(parseInt(item))
    })
    for (let i = 0; i < 3; i++) {
        for (let j = i + 1; j < 4; j++) {
            for (let k = j + 1; k < 5; k++) {
                if (sum([card5[i], card5[j], card5[k]]) === 0) {
                    var copy = card5.slice()
                    delete copy[i]
                    delete copy[j]
                    delete copy[k]
                    let a = sum(copy.filter(() => (true)))
                    return a || 10
                }
            }
        }
    }
    return 0
}
export function calFormat (arr) {
    if (!arr || !arr.length) return
    let res = cal(arr)
    return res ? (res === 10 ? '牛牛' : '牛' + res) : '没牛'
}
