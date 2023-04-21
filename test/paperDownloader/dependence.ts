/*
 * @Author: adiynil
 * @Date: 2022-01-14 15:55:19
 * @LastEditors: adiynil
 * @LastEditTime: 2022-01-17 14:30:02
 * @Description: paperDownloader依赖的工具类方法
 */
/**
 * @description: load script file
 * @param {string} url
 * @param {Function} callback
 * @return {*}
 */
export function loadScript(url: string, callback?: Function) {
  let script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = url
  document.getElementsByTagName('head')[0].appendChild(script)
  // modern browser (not support IE)
  !!callback &&
    (script.onload = () => {
      callback()
    })
  if (!callback) {
    return new Promise((resolve, reject) => {
      script.onload = () => {
        resolve(true)
      }
    })
  }
}
/**
 * @description: convert images to base64 inside dom
 * @param {HTMLElement} targetDom
 * @return {*}
 */
export function convertImagesToBase64(targetDom: HTMLElement | null) {
  if (!targetDom) return
  var regularImages: NodeListOf<HTMLImageElement> =
    targetDom!.querySelectorAll('img')
  var canvas: HTMLCanvasElement = document.createElement('canvas')
  var ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')
  ;[].forEach.call(regularImages, function (imgElement: HTMLImageElement) {
    // preparing canvas for drawing
    ctx!.clearRect(0, 0, canvas.width, canvas.height)
    canvas.width = imgElement.width
    canvas.height = imgElement.height
    ctx!.drawImage(imgElement, 0, 0)
    // by default toDataURL() produces png image, but you can also export to jpeg
    // checkout function's documentation for more details
    var dataURL: string = canvas.toDataURL()
    imgElement.setAttribute('src', dataURL)
  })
  canvas.remove()
}

/**
 * @description: 阿拉伯数字转换为中文标题数字
 * @param {number} num
 * @return {*}
 */
export const arabiaToSimplifiedChinese = (num: number) => {
  let chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  let chnUnitSection = ['', '万', '亿', '万亿', '亿亿']
  let chnUnitChar = ['', '十', '百', '千']
  function SectionToChinese(section: number) {
    var strIns = '',
      chnStr = ''
    var unitPos = 0
    var zero = true
    while (section > 0) {
      var v = section % 10
      if (v === 0) {
        if (!zero) {
          zero = true
          chnStr = chnNumChar[v] + chnStr
        }
      } else {
        zero = false
        strIns = chnNumChar[v]
        strIns += chnUnitChar[unitPos]
        chnStr = strIns + chnStr
      }
      unitPos++
      section = Math.floor(section / 10)
    }
    return chnStr
  }
  let unitPos = 0
  let strIns = '',
    chnStr = ''
  let needZero = false

  if (num === 0) {
    return chnNumChar[0]
  }
  while (num > 0) {
    let section = num % 10000
    if (needZero) {
      chnStr = chnNumChar[0] + chnStr
    }
    strIns = SectionToChinese(section)
    strIns += section !== 0 ? chnUnitSection[unitPos] : chnUnitSection[0]
    chnStr = strIns + chnStr
    needZero = section < 1000 && section > 0
    num = Math.floor(num / 10000)
    unitPos++
  }
  return chnStr
}
