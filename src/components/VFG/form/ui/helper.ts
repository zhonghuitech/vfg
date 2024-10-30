import {
    randFieldId,
    deepClone
} from "../utils/func";

const cloneItem = function (item: any) {
    const newitem = deepClone(item, true);
    newitem.__ID = randFieldId()
    return newitem;
}

const input_text = function (name: string, val: any) {
    return {
        __val__: val,
        input_type: "input_text",
        label: name
    }
}

const input_slot_text = function (name: string, val: any) {
    let ini: any = input_text(name, val);
    ini.tag = "text";
    return ini;
}

const input_number = function (name: string, val: any) {
    return {
        __val__: val,
        input_type: "input_number",
        label: name
    }
}

const input_boolean = function (name: string, val: any) {
    return {
        __val__: val,
        input_type: "input_boolean",
        label: name
    }
}

const input_icon = function (name: string, val: any) {
    return {
        __val__: val,
        input_type: "input_icon",
        label: name
    }
}

const input_range = function (label: string, min: number, max: number, val: any) {
    return {
        __val__: val,
        input_type: "input_range",
        label,
        min,
        max
    }
}

export const input_radio = function (value: any, opts: any, val: any) {
    const __child = {
        tag: "el-radio-button",
        keyValue: {
            "key": "value",
            "value": "__default__"
        }
    }

    return {
        __val__: val,
        input_type: "input_radio",
        value,
        opts,
        label: value,
        __child
    }
}

const input_select = function (value: any, opts: any, val: any) {
    const __child = {
        tag: "el-option",
        keyValue: {
            "key": "value",
            "value": "label"
        }
    }

    return {
        __val__: val,
        input_type: "input_select",
        value,
        opts,
        label: value,
        __child
    }

}

const optValue = function (tag: string) {
    return {
        type: 'static',
        tag: tag,
        staticData: [{
            key: "选项1",
            value: 1
        }, {
            key: "选项2",
            value: 2
        }],
        dynamicData: {
            url: "http://",
            medth: "post",
            keyName: "keyName",
            valueName: "valueName",
        }
    }
}

const input_opt = function (value: string, tag: string) {
    return {
        __val__: optValue(tag),
        input_type: "input_opt",
        label: value
    }
}

const colOptValue = function () {
    return {
        type: 'static',
        tag: 'el-checkbox-button',
        header: [{
            prop: "id",
            label: "编号"
        }, {
            prop: "name",
            label: "姓名"
        }]
    }
}

const input_table = function (value: string, optList: any) {
    return {
        __val__: colOptValue(),
        input_type: "input_table",
        label: value
    }
}

export function createTabCol(prop: string, label: string) {
    return {
        tag: "el-table-column",
        tagIcon: "table",
        __ID: '',
        name: "表格列描述",
        attrs: {
            prop: input_text("prop", prop),
            label: input_text("label", label),
        }
    }
}

export default {
    input_text, input_icon, input_boolean, input_number, input_opt, input_radio, input_range,
    input_select, input_slot_text, cloneItem, optValue, input_table
}