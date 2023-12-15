/*
 * @Description: 判断工具库
 * @Author: zhangxiao
 * @Date: 2022-07-06 09:53:03
 * @LastEditors: ZHANGXIAO
 * @LastEditTime: 2023-12-15 17:09:01
 */
const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}
// 是否定义了
export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined';
}
// 是否undefined
export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val);
}
// 是否时对象
export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object');
}
// 是否为空
export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0;
  }

  return false;
}
// 是否时时间对象
export function isDate(val: unknown): val is Date {
  return is(val, 'Date');
}
// 是否为null
export function isNull(val: unknown): val is null {
  return val === null;
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val);
}
//是否是数字
export function isNumber(val: unknown): val is number {
  return is(val, 'Number');
}

//是否是promise
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

//是否是字符串
export function isString(val: unknown): val is string {
  return is(val, 'String');
}

//是否是function
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

//是否是Boolean
export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}

//是否是正则
export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp');
}

//是否是数组
export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

//是否是Window
export function isWindow(val: any): val is Window {
  return typeof window !== 'undefined' && is(val, 'Window');
}

export function isElement(val: unknown): val is Element {
  return isObject(val) && !!val.tagName;
}

export function isMap(val: unknown): val is Map<any, any> {
  return is(val, 'Map');
}

export const isServer = typeof window === 'undefined';

export const isClient = !isServer;

export function isUrl(path: string): boolean {
  const reg =
    /^(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?(\/#\/)?(?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}
