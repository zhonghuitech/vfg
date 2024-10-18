import helper from "../../helper.js";

const elDragable = {
    tag: "draggable",
    name: "拖拽容器",
    __openRules: false,
    tagIcon: 'row',
    __ID: '',
    defaultvalue: [],
    attrs: {
        fieldName: helper.input_text("字段名", '字段名'),
        span: helper.input_range("列数2", 1, 24, 8),
        offset: helper.input_range("左侧间隔2", 0, 24, 0),
        push: helper.input_range("右移动2", 0, 24, 0),
        pull: helper.input_range("左移动2", 0, 24, 0),
    },
    props: {
        style: {
            "min-height": "80px",
            "background": "gray",
            "margin-top": "7.5px",
            "border-style": "solid",
            "border-color": "yellow"
        },
        component: "el-col",
        group: "componentsGroup",
        // class: "drag-wrapper box",
        animation: 340,
    },
    childrens: [

    ],
    ctrlBtn: true,
    slots: {
    }
}

const elCol = {
    tag: "el-col",
    name: "列组件",
    __openRules: false,
    tagIcon: 'row',
    __ID: '',
    defaultvalue: [],
    attrs: {
        fieldName: helper.input_text("字段名", '字段名'),
        span: helper.input_range("列数", 1, 24, 8),
        offset: helper.input_range("左侧间隔", 0, 24, 0),
        push: helper.input_range("右移动", 0, 24, 0),
        pull: helper.input_range("左移动", 0, 24, 0),
    },
    props: {
        style: {
            "min-height": "100px",
            "background": "yellow",
            "border-style": "dotted",
            "border-color": "red"
        },
        component: "el-col",
        group: "componentsGroup",
        animation: 340,
    },
    childrens: [
        helper.cloneItem(elDragable)
    ],
    ctrlBtn: true,
    slots: {
    }
}

export default {
    tag: "el-row",
    defaultvalue: [],
    props: {
        component: "el-row",
        group: "componentsGroup",
        class: "drag-wrapper box",
        style: {
            "margin-left": "0px",
            "margin-right": "0px"
        },
        animation: 340,
    },
    ctrlBtn: true,
    name: "布局组件",
    __openRules: false,
    tagIcon: 'input',
    __ID: '',
    attrs: {
        fieldName: helper.input_text("字段名", '字段名'),
        gutter: helper.input_range("栅格间隔", 1, 24, 24),
        justify: helper.input_radio("justify", [{
            key: 'start',
            value: 'start'
        },
        {
            key: 'end',
            value: 'end'
        },
        {
            key: 'center',
            value: 'center'
        },
        {
            key: 'space-around',
            value: 'space-around'
        },
        {
            key: 'space-between',
            value: 'space-between'
        }
        ], "start"),
        align: helper.input_radio("align", [{
            key: 'top',
            value: 'top'
        }, {
            key: 'middle',
            value: 'middle'
        }, {
            key: 'bottom',
            value: 'bottom'
        }], "middle"),
    },

    actions: {
        "增加列": function (current: any) {
            current.childrens.push(helper.cloneItem(elCol))
        }
    },

    childrens: [
        helper.cloneItem(elCol)
    ],
    slots: {}
}