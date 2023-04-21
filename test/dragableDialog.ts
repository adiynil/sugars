/*
 * @Author: adiynil
 * @Date: 2022-02-10 14:50:14
 * @LastEditors: adiynil
 * @LastEditTime: 2022-02-11 10:20:03
 * @Description: 使element-plus1.x版本的dialog支持拖拽移动，element-plus2.0.0版本开始已经支持draggable属性，添加custom-class为no-drag可禁止拖动
 */
// import { App } from 'vue'
let draging = false
let dragDom: HTMLElement | null
let dragpoint: { x: number; y: number }
function handleMouseUp(ev: MouseEvent) {
  draging = false
  dragDom = null
  let target = ev.target as HTMLElement
  //点住标题栏进行拖拽
  if (!target.classList.contains('el-dialog__header')) {
    return
  }
  dragDom = target.parentElement as HTMLElement
  if (dragDom.classList.contains('no-drag')) {
    return
  }
  dragDom.style.cursor = 'auto'
}
function handleMousemove(ev: MouseEvent) {
  if (draging) {
    let _dragdom = dragDom as HTMLElement
    let sty = window.getComputedStyle(_dragdom, null)
    // 判断是否还在可视范围，超出则不再移动
    if (
      parseFloat(sty.marginLeft) + ev.clientX - dragpoint.x >= 0 &&
      parseFloat(sty.marginTop) + ev.clientY - dragpoint.y >= 0 &&
      parseFloat(sty.marginLeft) +
        ev.clientX -
        dragpoint.x +
        parseFloat(sty.width) <=
        window.innerWidth &&
      parseFloat(sty.marginTop) +
        ev.clientY -
        dragpoint.y +
        parseFloat(sty.height) <=
        window.innerHeight
    ) {
      _dragdom.style.marginLeft = `${
        parseFloat(sty.marginLeft) + ev.clientX - dragpoint.x
      }px`
      _dragdom.style.marginTop = `${
        parseFloat(sty.marginTop) + ev.clientY - dragpoint.y
      }px`
      dragpoint = {
        x: ev.clientX,
        y: ev.clientY
      }
    }
  }
}
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('mousemove', handleMousemove)
document.addEventListener('mousedown', (ev: MouseEvent) => {
  let target = ev.target as HTMLElement
  //点住标题栏进行拖拽
  if (!target.classList.contains('el-dialog__header')) {
    return
  }
  //根据标题栏的dom找到控制弹窗组件布局位置的dom
  dragDom = target.parentElement as HTMLElement
  if (dragDom.classList.contains('no-drag')) {
    return
  }
  dragDom.style.cursor = 'all-scroll'
  draging = true
  dragpoint = {
    x: ev.clientX,
    y: ev.clientY
  }
})
// deleted
// function bind(el: HTMLElement) {
//   let dialogHeaderEl = el.querySelector('.el-dialog__header') as HTMLElement
//   dialogHeaderEl.addEventListener('mousedown', (ev: MouseEvent) => {
//     let target = ev.target as HTMLElement
//     if (target.classList.contains('el-dialog__close')) {
//       return
//     }
//     draging = true
//     dragDom = el
//     dragpoint = {
//       x: ev.clientX,
//       y: ev.clientY
//     }
//   })
// }

// export default {
//   install(app: App) {
//     app.directive('dragable', el => {
//       document.addEventListener('mouseup', handleMouseUp)
//       document.addEventListener('mousemove', handleMousemove)
//       el.addEventListener('mousedown', (ev: MouseEvent) => {
//         el.style.cursor = 'all-scroll'
//         draging = true
//         dragDom = el
//         dragpoint = {
//           x: ev.clientX,
//           y: ev.clientY
//         }
//       })
//       el.addEventListener('mouseup', () => {
//         el.style.cursor = 'auto'
//       })
//     })
//   }
// }
