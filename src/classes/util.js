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
      const [key, handler, change, filter] = list1[key2];
      let changeKeys = Object.keys(change);
      result[`${prefix}.${key1}.${key2}`] = function (val, oval) {
        let bindkey = this[key];
        this[`_${key}_handnum`] = 0;
        BindKey(val, oval, () => {
          if (this[`_${key}_handnum`] == 0) {
            let hName = `on${handler}`;
            this[hName] && this[hName]()
          }
          changeKeys.forEach(changekey => {
            bindkey[changekey] += change[changekey];
            let filtres = filter && filter(bindkey);
            if (filtres instanceof Function)
              filtres(bindkey);
          })
          this[`_${key}_handnum`]++;
          console.log(this[`_${key}_handnum`]);
        }, () => {
          this[`_${key}_handnum`]--;
          if (this[`_${key}_handnum`] == 0) {
            let hName = `un${handler}`;
            this[hName] && this[hName]()
          }
          changeKeys.forEach(changekey => {
            if (change[changekey] !== 0)
              bindkey[changekey] = 0;
          });
          console.log(this[`_${key}_handnum`]);
        });
      }
    });
  });
  return result;
}

export function JoyStickFilter(status) {
  return (
    status.x ** 2 + status.y ** 2 > 1 &&
    function (status) {
      let angle = Math.atan(status.y / status.x);
      if (status.x < 0) angle += Math.PI;
      status.x = Math.cos(angle);
      status.y = Math.sin(angle);
    }
  );
}
