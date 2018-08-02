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
