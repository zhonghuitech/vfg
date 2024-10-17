import helper from "../../helper.js";

export default {
    tag: "el-checkbox-group",
    name: "复选框",
    __openRules: false,
    tagIcon: 'checkbox',
    __ID: '',
    defaultvalue: [1, 2],
    formItem: {
        showLabel: helper.input_boolean("显示 label", true),
        labelWidth: helper.input_number("label 宽", 100),
        label: helper.input_text("label", '复选框',),
    },
    attrs: {
        fieldName: helper.input_text("字段名", '字段名'),
        disabled: helper.input_boolean("是否禁用", false),
        border: helper.input_boolean("占位字符", true),
        size: helper.input_radio("选项尺寸", [{
            key: "default",
            value: "默认"
        }, {
            key: "large",
            value: "较大"
        }, {
            key: "small",
            value: "较小"
        }], "default"),
        type: helper.input_radio("选项样式", [{
            key: "default",
            value: "默认"
        }, {
            key: "button",
            value: "按钮"
        }], "default"),
    },
    __opt__: helper.input_opt("选择项", 'el-checkbox-button'),
    props: {
    },
    childrens: [],
    ctrlBtn: true,
}