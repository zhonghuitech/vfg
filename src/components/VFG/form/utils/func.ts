function randomString(length: number) {
    var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i)
        result += str[Math.floor(Math.random() * str.length)];
    return result;
}

export function toHump(name: string) {
    return name.replace(/\_?\-(\w)/g, function (all, letter) {
        return letter.toUpperCase();
    });
}

export function randFieldId() {
    return `field_${randomString(5)}`;
}

// 深拷贝对象
export function deepClone(obj: any, needRandFieldId: boolean = false) {
    const _toString = Object.prototype.toString

    // null, undefined, non-object, function
    if (!obj || typeof obj !== 'object') {
        return obj
    }

    // DOM Node
    if (obj.nodeType && 'cloneNode' in obj) {
        return obj.cloneNode(true)
    }

    // Date
    if (_toString.call(obj) === '[object Date]') {
        return new Date(obj.getTime())
    }

    // RegExp
    if (_toString.call(obj) === '[object RegExp]') {
        const flags = []
        if (obj.global) {
            flags.push('g')
        }
        if (obj.multiline) {
            flags.push('m')
        }
        if (obj.ignoreCase) {
            flags.push('i')
        }

        return new RegExp(obj.source, flags.join(''))
    }

    const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {}

    for (const key in obj) {
        result[key] = ("__ID" === key && needRandFieldId) ? randFieldId() : deepClone(obj[key], needRandFieldId)
    }

    if (result.attrs && ("fieldName" in result.attrs)) {
        result.attrs.fieldName.__val__ = result.__ID;
    }

    return result
}

const toStr = Function.prototype.call.bind(Object.prototype.toString)

export function isObjectObject(t: any) {
    return toStr(t) === '[object Object]'
}
export function isObjectArray(t: any) {
    return toStr(t) === '[object Array]'
}
export function isObjectNull(t: any) {
    return toStr(t) === '[object Null]'
}
export function isObjectUnde(t: any) {
    return toStr(t) === '[object Undefined]'
}

export function isNumber(t: any) {
    return toStr(t) === '[object Number]'
}

export function isNumberType(t: any) {
    return typeof t === 'number'
}

export function isStr(t: any) {
    return toStr(t) === '[object String]'
}

export const findEle: any = function (items: any, _id: string) {
    for (let item of items) {
        if (item) {
            if (item.__ID == _id) {
                return item;
            } else if (isObjectArray(item.childrens)) {
                let el = findEle(item.childrens, _id);
                if (el) {
                    return el;
                }
            }
        }
    }

    return false;
};