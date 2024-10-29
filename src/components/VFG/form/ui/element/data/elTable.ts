import helper from "../../helper";

export default {
    __ID: '',            // 这个 ID 应用到页面上会被替换为随机生成的
    tag: "el-table",     // 组件名，全局唯一
    tagIcon: "table",   // 组件图标 SVG文件
    name: "表格",         // 组件名
    __openRules: false,  // 验证规则
    ctrlBtn: true,
    __text: helper.input_text("表格文本", "表格"),
    attrs: {
    },
    slots: {
    },
    props: {

    }
}