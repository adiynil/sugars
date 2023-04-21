/**
 * @description: 生成唯一字符串
 * @param {*}
 * @return {*}
 */
function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536 + '')
  return (+(randomNum + timestamp)).toString(32).toUpperCase()
}

/**
 * @description: 生成唯一数字
 * @param {*}
 * @return {*}
 */
function createUniqueNumber() {
  const timestamp = +new Date()
  const randomNum = Math.random() * Math.random() * timestamp
  return Math.floor(randomNum)
}
/**
 * @description: （浏览器运行）切换元素的指定class
 * @param {HTMLElement} element
 * @param {string} className
 * @return {*}
 */
function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substring(0, nameIndex) +
      classString.substring(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @description: （浏览器运行）设置页面标签名字
 * @param {string} t document title
 * @return {*}
 */
function setTitle(t) {
  document.title = t
}

/**
 * @description: （浏览器运行）打开指定链接窗口
 * @param {*} url
 * @param {*} title
 * @param {*} w
 * @param {*} h
 * @return {*}
 */
function openWindow(url, title, w, h) {
  const dualScreenLeft = window.screenLeft || screen.left
  const dualScreenTop = window.screenTop || screen.top

  const width =
    window.innerWidth || document.documentElement.clientWidth || screen.width
  const height =
    window.innerHeight || document.documentElement.clientHeight || screen.height

  const left = width / 2 - w / 2 + dualScreenLeft
  const top = height / 2 - h / 2 + dualScreenTop
  const newWindow = window.open(
    url,
    title,
    'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' +
      w +
      ', height=' +
      h +
      ', top=' +
      top +
      ', left=' +
      left
  )
  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus()
  }
}

/**
 * @description: 生成唯一uuid
 * @param {number} length
 * @param {string} chars
 * @return {*}
 */
function uuid(
  length = 8,
  chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
) {
  var result = ''
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

/**
 * @description: （浏览器运行）关闭当前窗口
 * @param {*}
 * @return {*}
 */
function closeWindow() {
  var userAgent = navigator.userAgent
  if (
    userAgent.indexOf('Firefox') !== -1 ||
    userAgent.indexOf('Chrome') !== -1
  ) {
    window.location.replace('about:blank')
  } else {
    window.opener = null
    window.open('', '_self')
  }
  window.close()
}

/**
 * @description: 扁平化树型数据
 * @param {Array} source
 * @param {*} children
 * @param {*} filter
 * @return {*}
 */
function flatTree(source, children = 'children', filter = i => true) {
  let res = []
  source.forEach(el => {
    if (filter(el)) {
      res.push(el)
      el[children] &&
        el[children].length > 0 &&
        res.push(...flatTree(el[children], children, filter))
      delete el[children]
    }
  })
  return res
}

/**
 * @description: 树型数组转化为树型数据
 * @param {Array} source
 * @param {*} id
 * @param {*} parentId
 * @param {*} children
 * @return {*}
 */
function treeData(
  source,
  id = 'id',
  parentId = 'parentId',
  children = 'children'
) {
  let cloneData = JSON.parse(JSON.stringify(source))
  return cloneData.filter(father => {
    let branchArr = cloneData.filter(child => father[id] == child[parentId])
    branchArr.length > 0 && (father[children] = branchArr)
    return father[parentId] == '0'
  })
}

export function myDebounce(func, delay = 800) {
  let timer = null
  return function (...args) {
    const _this = this
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(_this, args)
    }, delay)
  }
}

export function myThrottle(func, delay = 1000) {
  let timer = null
  return function (...args) {
    const _this = this
    if (timer) return
    timer = setTimeout(() => {
      func.apply(_this, args)
      timer = null
    }, delay)
  }
}
