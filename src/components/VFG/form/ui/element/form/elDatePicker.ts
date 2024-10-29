import helper from "../../helper";

export default {
    __ID: '',            // 这个 ID 应用到页面上会被替换为随机生成的
    tag: "el-date-picker",     // 组件名，全局唯一
    tagIcon: "calendar",   // 组件图标 SVG文件
    name: "日期选择器",         // 组件名
    __openRules: false,  // 验证规则
    ctrlBtn: true,
    __text: helper.input_text("日期选择器", "表格"),
    attrs: {
    },
    slots: {
    },
    props: {

    }
}