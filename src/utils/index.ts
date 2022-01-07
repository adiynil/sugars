/**
 * @description:
 * @param {*}
 * @return {*}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536 + '')
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * @description:
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
