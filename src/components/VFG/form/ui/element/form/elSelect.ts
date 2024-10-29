import helper from "../../helper";


const elOption = {
        tag: "el-option",
        name: "eloption",
        __openRules: false,
        tagIcon: "input",
        ctrlBtn: true,
        attrs: {
                fieldName: helper.input_text("字段名", "字段名"),
                'disabled': helper.input_boolean('是否禁用该选项', false)
        },
        slots: {
        },
        props: {},
        childrens: []
}

export default {
        tag: "el-select",
        name: "选择器",
        __openRules: false,
        tagIcon: "select",
        ctrlBtn: true,
        defaultvalue: "",

        __opt__: helper.input_opt("选择项", 'el-option'),

        formItem: {
                showLabel: helper.input_boolean("显示 label", true),
                labelWidth: helper.input_number("label 宽", 100),
                label: helper.input_text("label", '选择器',),
        },
        attrs: {
                fieldName: helper.input_text("字段名", "字段名"),
                'multiple': helper.input_boolean('是否多选', false),
                'disabled': helper.input_boolean('是否禁用', false),
                'size': helper.input_radio('输入框尺寸', [{ "key": "default", "value": "默认" }, { "key": "large", "value": "较大" }, { "key": "small", "value": "较小" }], 'default'),
                'clearable': helper.input_boolean('可清空选项', false),
                'collapse-tags': helper.input_boolean('按文字的形式展示', false),
                'filterable': helper.input_boolean('可搜索', false),
                'allow-create': helper.input_boolean('允许用户创建新条目', false),
                'remote': helper.input_boolean('远程搜索', false),
                'loading': helper.input_boolean('正在从远程获取数据', false),
                'reserve-keyword': helper.input_boolean('保留当前的搜索关键词', false),
                'default-first-option': helper.input_boolean('选择第一个匹配项', false),
                'popper-append-to-body': helper.input_boolean('将弹出框插入到Body', true),
                'automatic-dropdown': helper.input_boolean('自动弹出选项菜单', false)
        }, slots: {
        },
        props: {},
        childrens: []
}