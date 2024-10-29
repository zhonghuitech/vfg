import helper from "../../helper";

export default {
    __ID: '',            // 这个 ID 应用到页面上会被替换为随机生成的
    tag: "el-date-picker",     // 组件名，全局唯一
    tagIcon: "calendar",   // 组件图标 SVG文件
    name: "日期选择器",         // 组件名
    __openRules: false,  // 验证规则
    ctrlBtn: true,
    // __text: helper.input_text("日期选择器", "日期选择22"),
    formItem: {
        showLabel: helper.input_boolean("显示 label", true),
        labelWidth: helper.input_number("label 宽", 100),
        label: helper.input_text("label", '日期选择',),
    },
    attrs: {
        fieldName: helper.input_text("字段名", "字段名"),
        placeholder: helper.input_text("占位字符", '请选择日期'),
        type: helper.input_select("显示类型",
            // 'year' | 'years' |'month' | 'months' | 'date' | 'dates' | 'datetime' | 'week' | 'datetimerange' | 'daterange' | 'monthrange' | 'yearrange'
            [{
                key: "year",
                value: "year"
            },{
                key: "years",
                value: "years"
            }, {
                key: "month",
                value: "month"
            }, {
                key: "months",
                value: "months"
            }, {
                key: "date",
                value: "date"
            }, {
                key: "dates",
                value: "dates"
            }, {
                key: "datetime",
                value: "datetime"
            }, {
                key: "week",
                value: "week"
            }, {
                key: "datetimerange",
                value: "datetimerange"
            }, {
                key: "daterange",
                value: "daterange"
            }, {
                key: "monthrange",
                value: "monthrange"
            }, {
                key: "yearrange",
                value: "yearrange"
            }
            ], 'date')
    },
    slots: {
    },
    props: {

    }
}