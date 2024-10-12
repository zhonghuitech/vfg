import helper from "../../helper.js";

export default {
    tag: "el-radio-group",
    name: "单选框",
    __openRules: false,
    tagIcon: 'radio',
    __ID: '',
    defaultvalue: '',
    formItem: {
        showLabel: helper.input_boolean("显示 label", true),
        labelWidth: helper.input_number("label 宽", 100),
        label: helper.input_text("label", '单选框',),
    },
    attrs: {
        fieldName: helper.input_text("字段名", '字段名'),
        disabled: helper.input_boolean("是否禁用", false),
        border: helper.input_boolean("占位字符", true),

        size: helper.input_radio("尺寸", [{
            key: "default",
            value: "默认"
        }, {
            key: "large",
            value: "较大"
        }, {
            key: "small",
            value: "较小"
        }], "default"),
    },
    __opt__: helper.input_opt("选择项", 'el-radio-button'),
 
    slots: {
    },
    props:{},
    childrens: [],
    ctrlBtn: true,

    rule: {

    }
}