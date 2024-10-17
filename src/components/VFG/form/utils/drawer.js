import { reactive, ref, watch } from "vue";

import {
    isObjectObject,
    isObjectArray,
    isStr,
    isNumber,
    isObjectUnde,
} from "./func";

import { Api } from "./api";

const optParseHandles = {
    default: function (_c, data, tag) {
        if (!data) { return }
        for (let item of data) {
            let son = {};
            son.tag = tag || _c.__opt__.tag;
            son.attrs = {
                value: item.value,
            };
            son.slots = {
                default: item.key,
            };
            _c.childrens.value.push(son);
        }
    },
    "el-option": function (_c, data, tag) {
        for (let item of data) {
            let son = {};
            son.tag = tag || _c.__opt__.tag;
            son.attrs = {
                value: item.value,
                label: item.key,
            };

            _c.childrens.value.push(son);
        }
    },
};

const toVal = function (obj) {
    const _c = {};
    for (let a in obj) {
        if (typeof obj[a] == "object") {
            if ("__val__" in obj[a]) {
                _c[a] = obj[a]["__val__"];
            } else {
                _c[a] = toVal(obj[a]);
            }
        } else {
            _c[a] = obj[a];
        }
    }

    return _c;
};

// 对于 el-checkbox-group 样式类型依赖于 type
export const getTag = (_c) => {
    if (_c.tag === 'el-checkbox-group') {
        return 'el-checkbox' + (_c.attrs.type == 'button' ? '-button' : '')
    } else if (_c.tag === 'el-radio-group') {
        return 'el-radio' + (_c.attrs.type == 'button' ? '-button' : '')
    }
    return _c.__opt__.tag
}

const _clone = function (obj) {
    if (isNumber(obj) || isStr(obj) || isObjectUnde(obj)) {
        return obj;
    }

    const _c = {};
    for (let a in obj) {
        if (isObjectObject(obj[a])) {
            if ("__val__" in obj[a]) {
                _c[a] = obj[a]["__val__"];
            } else {
                if (["name", "tagIcon", "__formId", "rule"].includes(a) == false) {
                    _c[a] = _clone(obj[a]);
                }
            }
        } else if (isObjectArray(obj[a])) {
            _c[a] = obj[a].map((x) => {
                return _clone(x);
            });
        } else {
            if (["name", "tagIcon", "__formId", "rule"].includes(a) == false) {
                _c[a] = obj[a];
            }
        }
    }

    if (obj && Object.keys(obj).indexOf("events") > -1 && Object.keys(obj.events)) {
        _c.events = obj.events;
    }

    if ("slots" in _c) {
        for (let name in _c.slots) {
            if (!_c.slots[name]) {
                delete _c.slots[name];
            }
        }
    }

    if ("props" in _c) {
        _c.attrs = Object.assign(_c.attrs, _c.props);
        delete _c.props;
    }

    if (!isObjectArray(_c.childrens)) {
        ///api 接口为异步模式，此处定义为响应式
        _c.childrens = ref([]);
    } else {
        _c.childrens = ref(_c.childrens);
    }

    if ("__text" in _c) {
        _c["slots"]["default"] = _c.__text;
    }

    if ("__opt__" in _c) {
        const optTag = getTag(_c)
        let data =
            _c.__opt__.type == "static"
                ? _c.__opt__.staticData
                : _c.__opt__.dynamicData;
        let parseFunc =
            _c.__opt__.tag in optParseHandles
                ? optParseHandles[optTag]
                : optParseHandles["default"];

        if (_c.__opt__.type == "static") {
            parseFunc(_c, data, optTag);
        } else {
            Api.Get(data.url).then((res) => {
                parseFunc(_c, res.data, optTag);
            });
        }
    }

    return _c;
};

export function initRender(settings) {
    console.log(settings.drawingList)
    const conf = reactive({
        formConf: settings.formConf,
        current: settings.current,
        drawingList: settings.drawingList.map((x) => {
            return _clone(x);
        }),
    });

    watch(settings, () => {
        conf.drawingList = settings.drawingList.map((x) => {
            return _clone(x);
        });
    });

    return conf;
}
