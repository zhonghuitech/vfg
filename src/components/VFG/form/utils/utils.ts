import {
    isObjectObject
} from "./func";

const slotParser = {
    default(conf: any) {
        let childrens = []
        for (let db of conf.opts) {
            let attr = {} as any
            let slots = {} as any
            for (let k in conf.__child.keyValue) {
                if ('__default__' == conf.__child.keyValue[k]) {
                    slots['default'] = db[k];
                } else {
                    attr[conf.__child.keyValue[k]] = db[k];
                }

            }
            let item = {
                tag: conf.__child.tag,
                attrs: attr,
                slots: slots
            }
            childrens.push(item)
        }
        return childrens

    }
}

function initTypes() {
    return {
        input_text: {
            childrens: [],
            tag: "el-input",
            attrs: { type: "text" },
            formItem: {},
            slots: {}
        },
        input_icon: {
            childrens: [],
            tag: "input-icon",
            attrs: {},
            formItem: {},
            slots: {}
        },
        input_number: {
            childrens: [],
            tag: "el-input-number",
            attrs: { type: "number" },
            formItem: {},
            slots: {}
        },
        input_range: {
            childrens: [],
            tag: "el-slider",
            attrs: { type: "number" },
            formItem: {},
            slots: {}
        },
        input_radio: {
            childrens: [],
            tag: "el-radio-group",
            attrs: {},
            formItem: {},
            slots: {}

        },
        input_select: {
            childrens: [],
            tag: "el-select",
            attrs: {},
            formItem: {},
            slots: {}
        },
        input_opt: {
            childrens: [],
            tag: "option-input",
            attrs: {},
            slots: {}
        },
        input_table: {
            childrens: [],
            tag: "tabcol-input",
            attrs: {},
            slots: {}
        },
        input_boolean: {
            childrens: [],
            tag: "el-switch",
            attrs: { "active-value": true, "inactive-value": false },
            formItem: {},
            slots: {}
        },
    }
}

export const eleRenderFormat = function (conf: any, eleName: any) {
    if (!isObjectObject(conf)) {
        return null
    }
    const types: any = initTypes()

        let t = conf.input_type
    if (conf.input_type in types == false) {
        t = 'input_text'
    }
    let ini = types[t] as any; // 初始设置
    for (let k in conf) {
        if (['__val__', 'input_type', 'label', 'opts'].includes(k) == false) {
            ini['attrs'][k] = conf[k];
        }
    }

    if ('__child' in conf) {
        ini.childrens = slotParser.default(conf);
    } else if (ini.slots && Object.keys(ini.slots).length === 0) {
        delete ini.slots
    }

    ini['formItem'] = { showLabel: true, label: conf.label, labelWidth: conf.labelWidth ? conf.labelWidth : '80px' }
    ini['defaultvalue'] = conf['__val__']
    ini['eleName'] = eleName;
    //console.log(ini)
    return ini

}

const getComName = function (conf: any) {
    if (conf.tag == 'el-row' || conf.tag == 'el-col' || conf.tag == 'draggable') {
        return (conf.name || conf.tag)
    }
    return "form item"
}

export const eleRenderSetFormat = function (conf: any) {
    console.log(conf)

    const eles = [];
    eles.push({ tag: "el-divider", slots: { default: getComName(conf) } });
    for (let f in conf.formItem) {
        let item = conf.formItem[f];
        eles.push(eleRenderFormat(item, f))
    }

    eles.push({ tag: "el-divider", slots: { default: "属性" } });

    if ('__text' in conf) {
        eles.push(eleRenderFormat(conf.__text, '__text'))
    }

    for (let f in conf.attrs) {
        let item = conf.attrs[f];
        eles.push(eleRenderFormat(item, f))
    }

    const opt = eleRenderFormat(conf.__opt__, '__opt__')
    if (opt && opt.formItem) {
        eles.push({ tag: "el-divider", slots: { default: "选项" } });
        opt.formItem.label = undefined
        opt.formItem.labelWidth = '1'
        eles.push(opt)
    }

    const tabCol = eleRenderFormat(conf.__table__, '__table__')
    if (tabCol && tabCol.formItem) {
        eles.push({ tag: "el-divider", slots: { default: "表格列配置" } });
        tabCol.formItem.label = undefined
        tabCol.formItem.labelWidth = '1'
        eles.push(tabCol)
    }
    console.log(eles)
    return eles;

}