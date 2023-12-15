/*
 * @Author: ZHANGXIAO
 * @Date: 2022-12-14 21:07:22
 * @LastEditors: ZHANGXIAO
 * @LastEditTime: 2023-12-15 17:21:51
 * @Description: 浏览器cookie，storage
 */
//  删除 cookie
const delCookie = name => {
    setCookie(name, '', '-1');
    // 通过建立 cookie 的时间设置，将时间设置提前一天，从而强行让 cookie 失效，最后达到 删除cookie 的目的
};

// 取cookie
const getCookie = name => {
    let cookieArr = document.cookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
        let arr = cookieArr[i].split('=');
        if (name === arr[0]) {
            return arr[1];
        }
    }
    return false;
};

// 存cookie
const setCookie = (name, value, times) => {
    const date = new Date();
    date.setDate(date.getDate() + times);
    document.cookie = name + '=' + value + ';expires=' + date;
};
const addStorageValue = (key, data, type = 'localStorage') => {
    var newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
        setItem: function (k, val) {
            if (type === 'localStorage') {
                window && window.localStorage.setItem(k, val);
            } else {
                window && window.sessionStorage.setItem(k, val);
            }
            newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
            window && window.dispatchEvent(newStorageEvent);
        }
    };
    return storage.setItem(key, data);
};
export default {
    cookie: {
        del: delCookie,
        get: getCookie,
        set: setCookie
    },
    addStorageValue
};
