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

const prefix = "$store.state.keyBoard."
export function createWatchList(list) {
  const result = {};
  Object.keys(list).forEach(key1 => {
    list[key1].forEach(key2=>{
      result[`${prefix} `]
    })
  });
}
