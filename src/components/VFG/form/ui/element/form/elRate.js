import helper from "../../helper.js";

export default {
        tag: "el-rate",
        name: "评分",
        __openRules: true,
        tagIcon: "rate",
        defaultvalue: 0,
        ctrlBtn: true,
        formItem: {
                showLabel: helper.input_boolean("显示 label", true),
                labelWidth: helper.input_number("label 宽", 100),
                label: helper.input_text("label", '评分', ),
        },
        attrs: {
                fieldName: helper.input_text("字段名", '字段名'),
                'disabled': helper.input_boolean('是否只读', false),
                'allow-half': helper.input_boolean('允许半选', false),
                'show-text': helper.input_boolean('显示辅助文字', false),
                'show-score': helper.input_boolean('显示当前分数', false)
        },
        slots: {
        },
        props: {},
        childrens: []
}