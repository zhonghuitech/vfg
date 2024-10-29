import helper from "../../helper";

export default {
        tag: "el-slider",
        name: "滑块 Slider",
        __openRules: true,
        tagIcon: "slider",
        ctrlBtn: true,
        formItem: {
                showLabel: helper.input_boolean("显示 label", true),
                labelWidth: helper.input_number("label 宽", 100),
                label: helper.input_text("label", "滑块"),
        },
        attrs: {
                fieldName: helper.input_text("字段名", "字段名"),
                disabled: helper.input_boolean("是否禁用", false),
                "show-input": helper.input_boolean(
                        "显示输入框",
                        false
                ),
                "show-input-controls": helper.input_boolean(
                        "控制按钮",
                        true
                ),
                "show-stops": helper.input_boolean("显示间断点", false),
                "show-tooltip": helper.input_boolean("显示提示信息", true),
                range: helper.input_boolean("范围选择", false),
                vertical: helper.input_boolean("垂直模式", false),
        },
        slots: {},
        props: {},
        childrens: [],
};
