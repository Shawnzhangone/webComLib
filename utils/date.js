/*
 * @Author: ZHANGXIAO
 * @Date: 2023-12-15 17:23:05
 * @LastEditors: ZHANGXIAO
 * @LastEditTime: 2023-12-15 18:16:19
 * @Description: 返回时间
 */

/**
 * getDate: 获取时间
 * params：
 *      connect： 年份连接线 default value: '-'
 *      type: 日期类型
 *          可选值： date： 返回所有日期内容
 *                  day： 仅返回年月日*/
const getDate = (time, connect = '-', type = 'date') => {
    let date = new Date(time);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, 0);
    const day = String(date.getDate()).padStart(2, 0);
    const hours = String(date.getHours()).padStart(2, 0);
    const minutes = String(date.getMinutes()).padStart(2, 0);
    const seconds = String(date.getSeconds()).padStart(2, 0);
    return type === 'date' ? `${year}${connect}${month}${connect}${day} ${hours}:${minutes}:${seconds}` : `${year}${connect}${month}${connect}${day}`;
};
export default { getDate };
