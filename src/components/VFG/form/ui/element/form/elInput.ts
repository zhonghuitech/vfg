import helper from "../../helper";

export default {
    tag: "el-input",
    name: "输入框",
    __openRules: true,
    tagIcon: 'input',
    __ID: '',
    defaultvalue: '',
    formItem: {
        showLabel: helper.input_boolean("显示 label", true),
        labelWidth: helper.input_number("label 宽", 100),
        label: helper.input_text("label", '输入框',),
    },
    attrs: {
        fieldName: helper.input_text("字段名", '字段名'),
        placeholder: helper.input_text("占位字符", '请输入'),
        "prefix-icon": helper.input_icon("框头部图标", ''),
        "suffix-icon": helper.input_icon("框头部图标", ''),
        type: helper.input_select("文本类型", [{
            key: "text",
            value: "文本"
        }, {
            key: "textarea",
            value: "多行文本"
        }, {
            key: "password",
            value: "密码"
        }, {
            key: "number",
            value: "数字"
        }], "text")
    },
    props: {
    },
    childrens: [],
    ctrlBtn: true,
    slots: {
        "prefix": helper.input_text("框头部内容", ''),
        "suffix": helper.input_text("框尾部内容", ''),
        "prepend": helper.input_text("框前置内容", ''),
        "append": helper.input_text("框后置内容", ''),
    },
    rule: {
        required: helper.input_boolean("必填", false),
    }
}
