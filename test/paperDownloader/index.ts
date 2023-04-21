/*
 * @Author: adiynil
 * @Date: 2022-01-14 10:40:29
 * @LastEditors: adiynil
 * @LastEditTime: 2022-01-17 16:20:55
 * @Description: 下载组卷工具
 * @Description: To use this you have to add `<script src='path/to/html-docx.js'></script>` to your root html document's head tag and install npm package file-saver
 */
import { saveAs } from 'file-saver'
import {
  BasketRowData,
  PreviewQuestionRowData
} from '../../view/center-question/type'
import { arabiaToSimplifiedChinese, loadScript } from './dependence'
interface htmlDocx {
  asBlob: Function
}
interface DownloadOption {
  fileName?: string
  ext?: string
  withAnswers?: number
  withAnalysis?: boolean
}
declare const htmlDocx: htmlDocx
declare const window: {
  htmlDocx: htmlDocx
}

export async function generateDom(
  content: PreviewQuestionRowData[],
  paperTitle: string,
  option?: DownloadOption
) {
  const d: Document = document
  !window.htmlDocx && (await loadScript('./html-docx.js'))
  if (!Blob) {
    let message: string =
      '你的浏览器太旧了，请使用新版谷歌浏览或者Edge浏览器再尝试！'
    !!Promise && Promise.reject({ message })
  }
  let pBody = d.createElement('div')
  let pTitle: HTMLElement = d.createElement('h1')
  pTitle.innerText = paperTitle
  pTitle.style.textAlign = 'center'
  pTitle.style.fontWeight = '800'
  pBody.appendChild(pTitle)
  ;[].forEach.call(
    content,
    (typeList: PreviewQuestionRowData, index: number) => {
      pBody.innerHTML += `<h2>${arabiaToSimplifiedChinese(index + 1)}、${
        typeList.typeName
      }</h2>`
      ;[].forEach.call(typeList.list, (question: BasketRowData, i) => {
        let p =
          question.body.slice(0, 3) +
          (i + 1) +
          '.&nbsp;&nbsp;' +
          question.body.slice(3)
        pBody.innerHTML += p
        option?.withAnswers === 3 &&
          (pBody.innerHTML += `<p>参考答案：${
            question.answers.toString() || '略'
          }</p>`) &&
          option?.withAnswers === 3 &&
          option?.withAnalysis &&
          (pBody.innerHTML += `<p>解析：${question.analysis || '略'}</p>`)
      })
    }
  )
  option?.withAnswers === 1 &&
    (pBody.innerHTML += '<h2>参考答案</h2>') &&
    [].forEach.call(
      content,
      (typeList: PreviewQuestionRowData, index: number) => {
        pBody.innerHTML += `<h4>${arabiaToSimplifiedChinese(index + 1)}、${
          typeList.typeName
        }</h5>`
        ;[].forEach.call(typeList.list, (question: BasketRowData, i) => {
          pBody.innerHTML += `<p>${i + 1}题</p>`
          pBody.innerHTML += `<p>参考答案：${question.answers.toString()}</p>`
          pBody.innerHTML += `<p>解析：${question.analysis || '略'}</p>`
        })
      }
    )
  return pBody
}

export const domToDocx = (dom: HTMLElement, opt?: object) => {
  const defaultOpt = {
    orientation: 'landscape',
    margins: { top: 300, right: 800, bottom: 300, left: 800 }
  }
  return htmlDocx.asBlob(
    `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>${dom.innerHTML}</html>`,
    { ...defaultOpt, ...opt }
  )
}

export const paperDownloader = async (
  content: PreviewQuestionRowData[],
  paperTitle: string,
  option?: DownloadOption
) => {
  let targetDom = await generateDom(content, paperTitle, option)
  saveAs(
    domToDocx(targetDom),
    (option?.fileName ? option.fileName : paperTitle) + option?.ext
  )
}

export default paperDownloader
