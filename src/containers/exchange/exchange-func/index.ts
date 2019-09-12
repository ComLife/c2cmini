import { addition, sub } from '../../../utils/digital';
import Colors from '../../../const/colors';
/**
 * 下方面板改颜色
 * @param arr 数据数据
 * @param index 要改的下标
 * @param value 要改的值
 * @param other 其它的值
 * @param obj 对象中要改的字段
 * @note 有返回
 */
export const arrAlter = (arr: { [x: string]: any }[], index: number, value: string, other: string, obj: string) => {
  if (!arr || !arr.length) {
    return arr;
  }

  let tmp = arr;
  console.log('afdsfsdfsa', arr);

  for (let i = 0; i < tmp.length; i += 1) {
    if (index === i) {
      tmp[i][obj] = value;
    } else {
      tmp[i][obj] = other;
    }
  }
  return tmp;
};

/**
 * 加减方法处理
 * @param type '1'减号 '2'加号
 * @param data 数据源
 * @param step 步长
 * @note 值传递，有返回
 */
export const addOrSub = (type: string, data: string, step: string) => {
  if (data === '' || (type === '1' && data === '0')) {
    return data;
  }
  let tmpValue = '';
  if (type === '1') {
    tmpValue = sub(data, step);
  } else {
    tmpValue = addition(data, step);
  }

  return tmpValue;
};

/**
 * 深度数组处理
 * @param valuation 精度 (-1为初始值)
 * @param data 数据源
 * @note 有返回
 */
export const depthArr = (valuation: number, data: any) => {
  let tmpValuation = valuation === -1 ? 4 : valuation;

  for (let i = 0; i < 6; i++) {
    if (tmpValuation - i > 0) {
      data[i]['text'] = Math.abs(tmpValuation - i) + '位小数';
    } else {
      data[i]['text'] = Math.abs(tmpValuation - i) + 1 + '位整数';
    }
  }
  return data;
};

/**
 * 处理盘口买卖数据
 * @param type 样式 '0' 两边盘 '1'买盘 '2'卖盘
 * @param data 数据源
 * @note 有返回
 */
export const depthBuy = (type: string, data: any) => {
  let tmpData = [];
  if (type === '2' || !data.length) {
    return tmpData;
  }

  if (type === '0') {
    if (data.length > 4) {
      tmpData = data.slice(0, 5);
    } else {
      tmpData = data.slice(0);
    }
  } else {
    if (data.length > 10) {
      tmpData = data.slice(0, 11);
    } else {
      tmpData = data.slice(0);
    }
  }

  return tmpData;
};

export const depthSell = (type: string, data: any) => {
  let tmpData = [];
  if (type === '1' || !data.length) {
    return tmpData;
  }

  const tmpData1 = { entrustPrice: '', entrustNum: '', accumulativeTotal: '' };

  if (type === '0') {
    if (data.length > 4) {
      tmpData = data.slice(data.length - 5, data.length);
    } else {
      tmpData = data.slice(0);
      for (let i = data.length; i < 5; i++) {
        // @ts-ignore
        tmpData.unshift(tmpData1);
      }
    }
  } else {
    if (data.length > 10) {
      tmpData = data.slice(data.length - 11, data.length);
    } else {
      tmpData = data.slice(0);
    }
  }

  console.log('bbbbbbb', tmpData, data);
  return tmpData;
};

/**
 * 修改明细数据
 * @param data 被修改数据源
 * @param index 要改的下标
 * @param citeData 引用数据源
 * @note 引用传递，无返回
 */
export const detailDataAlter = (data, index, citeData) => {
  if (!data || !data.length || !citeData || !citeData.length) {
    return;
  }

  for (let i = 0; i < citeData.length; i += 1) {
    if (citeData[i].color === Colors.colorA1) {
      console.log('citeData', citeData, data, citeData[i].color === Colors.colorA1);
      data[index]['text'] = citeData[i]['text'];
    }
  }
};
