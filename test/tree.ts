/*
 * @Author: adiynil
 * @Date: 2022-02-10 14:47:44
 * @LastEditors: adiynil
 * @LastEditTime: 2022-02-10 14:47:45
 * @Description:
 */
/**
 * @description: 扁平化树型数据
 * @param {Array} source
 * @param {*} children
 * @param {*} filter
 * @return {*}
 */
function flatTree(
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
function treeData(
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

export function filterTree(source: Array<any>, targetId: string) {
  return treeData(flatTree(source, 'children', e => e.id != targetId))
}
