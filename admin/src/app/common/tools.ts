/**
 * @file 工具方法
 * @description 提供公用的工具 function
 * @author dadong
 * @date 2017/09/22
 */

/**
 * 获取URL指定key的参数值
 * @param {string} key
 * @returns {string}
 */
export function getQueryString(key: string): string {
  let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)');
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return '';
}

/**
 * 设定URL指定key的参数值
 * @param {string} key
 * @param {string} value
 */
export function setQueryString(key: string, value: string): void {
  let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)');
  let r = window.location.search.substr(1).match(reg);
  let h = window.location.href;
  let targetStr = key + '=' + value;
  let resultStr;
  if (r) {
    if (r[2] === value) {
      return;
    }
    resultStr = h.replace(r[0], targetStr);
  } else {
    resultStr = h + (window.location.search ? '&' : '?') + targetStr;
  }
  window.location.href = resultStr;
}

/**
 * 把指定日期弄成 'YYYYMMDD' 格式
 * @param {Date} date JS日期对象
 * @returns {string} 'YYYYMMDD' 格式的日期
 * @author Benz
 */
export function getYYYYMMDD(date: Date): string {
  let year = date.getFullYear() + '';
  let month = date.getMonth() + 1;
  let monthStr = month < 10 ? '0' + month : '' + month;
  let dateN = date.getDate();
  let dateStr = dateN < 10 ? '0' + dateN : '' + dateN;
  return year + monthStr + dateStr;
}

/**
 * 把今天的日期弄成 'YYYYMMDD' 格式
 * @returns {string}
 * @author Benz
 */
export function getTodayYYYYMMDD() {
  return getYYYYMMDD(new Date());
}

/**
 * 把昨天的日期弄成 'YYYYMMDD' 格式
 * @returns {string}
 * @author Benz
 */
export function getYesterdayYYYYMMDD() {
  let today = new Date();
  let yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  return getYYYYMMDD(yesterday);
}

/**
 * 把两个 Object 深度合并。把 source 合并到 target
 * @param {object|array} target 目标 object（或 array）
 * @param {object|array} source 要合并的 object（或 array）
 * @returns {object|array} target 把 target 返回
 * @author Benz
 */
export function deepAssign(target, source) {
  let keys = Object.keys(source);
  for (let key of keys) {
    if (
      target.hasOwnProperty(key) &&
      typeof target[key] === 'object' &&
      typeof source[key] === 'object'
    ) {
      deepAssign(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

/**
 * 转换对象为URL参数形式的方法
 * @param {obj}
 * @returns {string}
 * @author zyj
 */
export function tranformParams(obj) {
  var query = '',
    name,
    value,
    fullSubName,
    subName,
    subValue,
    innerObj,
    i;

  for (name in obj) {
    value = obj[name];

    if (value instanceof Array) {
      for (i = 0; i < value.length; ++i) {
        subValue = value[i];
        fullSubName = name + '[' + i + ']';
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += tranformParams(innerObj) + '&';
      }
    } else if (value instanceof Object) {
      for (subName in value) {
        subValue = value[subName];
        fullSubName = name + '[' + subName + ']';
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += tranformParams(innerObj) + '&';
      }
    } else if (value !== undefined && value !== null)
      query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
  }

  return query.length ? query.substr(0, query.length - 1) : query;
}

/**
 * 删除数组对象中空元素的方法
 * @param object
 */
export function deleteEmptyProperty(object) {
  for (var i in object) {
    var value = object[i];
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        if (value.length == 0) {
          delete object[i];
          // console.log('delete Array', i);
          continue;
        }
      }
      deleteEmptyProperty(value);
      if (isEmpty(value)) {
        // console.log('isEmpty true', i, value);
        delete object[i];
        // console.log('delete a empty object');
      }
    } else {
      if (value === '' || value === null || value === undefined) {
        delete object[i];
        // console.log('delete ', i);
      } else {
        // console.log('check ', i, value);
      }
    }
  }
}

/**
 * 判断是否为空对象或者空数组
 * @param {object|array} object
 * @returns {boolean}
 */
export function isEmpty(object) {
  if (Array.isArray(object)) {
    return object.length ? false : true;
  } else {
    for (let name in object) {
      return false;
    }
  }
  return true;
}

/**
 * 判断元素是否在数组
 * @param {any} el
 * @param {boolean} arr
 * @returns {boolean}
 * @author huangyongming
 */
export function inArray(el, arr) {
  let isInArray = false;
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] === el) {
      isInArray = true;
      break;
    }
  }
  return isInArray;
}
/**
 * @description 深复制对象或数组
 * @author wangdongcheng
 * @param {object} objectToBeCloned - 要复制的对象
 * @returns {object}
 */
export function deepcopy(objectToBeCloned) {
  // 类型判断
  if (!(objectToBeCloned instanceof Object)) {
    return objectToBeCloned;
  }

  var objectClone;

  // 过滤特殊类型，只实现了RegExp,Date和Array特殊对象
  var Constructor = objectToBeCloned.constructor;
  switch (Constructor) {
    // 各种类型的处理
    case RegExp:
      objectClone = new Constructor(objectToBeCloned);
      break;
    case Date:
      objectClone = new Constructor(objectToBeCloned.getTime());
      break;
    default:
      objectClone = new Constructor();
  }

  // 深复制每一个属性
  for (var prop in objectToBeCloned) {
    objectClone[prop] = deepcopy(objectToBeCloned[prop]);
  }

  return objectClone;
}
