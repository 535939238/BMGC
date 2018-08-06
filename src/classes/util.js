/**
 * Dispatch element event on HTMLElement such as 'resize'
 *
 * @export
 * @param {string} type
 * @param {HTMLElement} element
 */
export function DispatchHTMLEvent(type, element = window) {
  let e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  element.dispatchEvent(e);
}


import {
  BindKey
} from "@/classes/KeyPress";
const prefix = "$store.state.keyBoard"
export function createWatchList(list) {
  const result = {};
  Object.keys(list).forEach(key1 => {
    let list1 = list[key1]
    Object.keys(list1).forEach(key2 => {
      const args = list1[key2];
      result[`${prefix}.${key1}.${key2}`] = function (val, oval) {
        BindKey(val, oval, () => this[`on${args[0]}`](args[1]), () => this[`un${args[0]}`](args[1]));
      }
    })
  });
  return result;
}
