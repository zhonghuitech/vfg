import { fa, id } from "element-plus/es/locales.mjs";

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

export const findEle: any = function (items: any, _id: string, key: string = '__ID') {
    for (let item of items) {
        if (item) {
            if (item[key] == _id) {
                return item;
            } else if (isObjectArray(item.childrens)) {
                let el = findEle(item.childrens, _id, key);
                if (el) {
                    return el;
                }
            }
        }
    }

    return false;
};

export const buildEleTree: any = function (items: any[], parentId: string) {
    const tItems: any[] = [];
    const len = items.length;
    items.forEach(function (item, index) {
        tItems.push({
            id: item.__ID,
            index,
            parent: parentId,
            preSibling: index == 0 ? undefined : items[index - 1].__ID,
            nextSibling: index == len - 1 ? undefined : items[index + 1].__ID,
            childrens: item.childrens && item.childrens.length > 0 ? buildEleTree(item.childrens, item.__ID) : 0
        })
    });
    return tItems;
}

export function buildIdArray(items: any[]): any {
    let idarr = {} as any;
    items.forEach(function (item, index) {
        idarr[item.id] = item;
        if (item.childrens && item.childrens.length > 0) {
            const idarrChlid = buildIdArray(item.childrens) as any
            idarr = { ...idarr, ...idarrChlid }
        }
    })
    return idarr;
}

function findParentSibling(idarr: any[], parentEle: any, isNext: boolean = true): any {
    if (!parentEle) {
        return undefined
    } else if (isNext && parentEle.nextSibling) {
        return parentEle.nextSibling
    } else if (!isNext && parentEle.preSibling) {
        return parentEle.preSibling
    } else {
        return parentEle.parent ? findParentSibling(idarr, idarr[parentEle.parent], isNext) : undefined
    }
}

export const reBuildEleTree: any = function (items: any[], parentEle: any, idarr: any) {
    const len = items.length;
    items.forEach(function (item, index) {
        item.next = (item.childrens && item.childrens.length > 0) ?
            item.childrens[0].id :  // 先找 child 中第一个
            (item.nextSibling ?
                item.nextSibling : // 再找下一个 兄弟节点
                findParentSibling(idarr, parentEle)  // 最后找 parent 的下一个 兄弟
            )
        item.pre = item.preSibling ?
            item.preSibling :      // 先找上一个 兄弟节点
            findParentSibling(idarr, parentEle, false)   // 再找 parent 节点的 上一个兄弟结点
        if (item.childrens && item.childrens.length > 0) {
            reBuildEleTree(item.childrens, item, idarr)
        }
    });
}