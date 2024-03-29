/**
 * @description: 生成唯一字符串
 * @param {*}
 * @return {*}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536 + '')
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * @description: 生成唯一数字
 * @param {*}
 * @return {*}
 */
export function createUniqueNumber() {
  const timestamp = +new Date()
  const randomNum = Math.random() * Math.random() * timestamp
  return Math.floor(randomNum)
}
/**
 * @description:
 * @param {HTMLElement} element
 * @param {string} className
 * @return {*}
 */
export function toggleClass(element: HTMLElement, className: string) {
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
 * @description:
 * @param {string} t document title
 * @return {*}
 */
export function setTitle(t: string) {
  document.title = t
}

export function openWindow(url: string, title: string, w: number, h: number) {
  // Fixes dual-screen position                            Most browsers       Firefox
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
 * @description:
 * @param {number} length
 * @param {string} chars
 * @return {*}
 */
export function uuid(
  length: number = 8,
  chars: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
) {
  var result = ''
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

/**
 * @description: close current window
 * @param {*}
 * @return {*}
 */
export function closeWindow() {
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
export function flatTree(
  source: Array<any>,
  children = 'children',
  filter = (i: any) => true
) {
  let res: Array<any> = []
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
export function treeData(
  source: Array<any>,
  id = 'id',
  parentId = 'parentId',
  children = 'children'
) {
  let cloneData = JSON.parse(JSON.stringify(source))
  return cloneData.filter((father: any) => {
    let branchArr = cloneData.filter(
      (child: any) => father[id] == child[parentId]
    )
    branchArr.length > 0 && (father[children] = branchArr)
    return father[parentId] == '0'
  })
}

/**
 * @description: File对象转为base64格式
 * @param {File} file
 * @return {*}
 */
export function readFileAsBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    let fileResult = ''
    reader.readAsDataURL(file)
    reader.onload = () => {
      fileResult = reader.result as string
    }
    reader.onerror = error => {
      reject(error)
    }
    reader.onloadend = () => {
      resolve(fileResult)
    }
  })
}

/**
 * @description: 获取文件对象的本地预览链接（仅限浏览器本地预览）
 * @param {File} file
 * @return {*}
 */
export function getLocalPreview(file: File) {
  return URL.createObjectURL(file)
}
