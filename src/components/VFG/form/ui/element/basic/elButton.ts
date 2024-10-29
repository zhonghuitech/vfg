import helper from "../../helper";

export default {
        __ID: '',            // 这个 ID 应用到页面上会被替换为随机生成的
        tag: "el-button",    // 组件名，全局唯一
        tagIcon: "button",   // 组件图标 SVG文件
        name: "按钮",         // 组件名
        __openRules: false,  // 验证规则
        ctrlBtn: true,
        __text: helper.input_text("按钮文本", "提交"),
        slots: {
        },
        props: {},
        attrs: {
                fieldName: helper.input_text("字段名", "字段名"),
                'size': helper.input_radio('尺寸', [{
                        "key": "default",
                        "value": "默认"
                }, {
                        "key": "large",
                        "value": "较大"
                }, {
                        "key": "small",
                        "value": "较小"
                }], 'default'),
                'type': helper.input_radio('类型', [{
                        "key": "primary",
                        "value": "primary"
                }, {
                        "key": "success",
                        "value": "success"
                }, {
                        "key": "warning",
                        "value": "warning"
                }, {
                        "key": "danger",
                        "value": "danger"
                }, {
                        "key": "info",
                        "value": "info"
                }], 'primary'),
                'icon': helper.input_icon('icon', ''),
                'link': helper.input_boolean('Link', false),
                'plain': helper.input_boolean('Plain', false),
                'text': helper.input_boolean('Text', false),
                'round': helper.input_boolean('Round', false),
                'circle': helper.input_boolean('Circle', false),
                'loading': helper.input_boolean('Loading', false),
                'disabled': helper.input_boolean('Disabled', false),
                'autofocus': helper.input_boolean('Autofocus', false)
        }
}