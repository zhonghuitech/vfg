import helper from "../../helper";

export default {
    __ID: '',            // 这个 ID 应用到页面上会被替换为随机生成的
    tag: "el-progress",     // 组件名，全局唯一
    tagIcon: "progress",   // 组件图标 SVG文件
    name: "进度条",         // 组件名
    __openRules: false,  // 验证规则
    ctrlBtn: true,
    attrs: {
        percentage: helper.input_number("percentage", 20),
        status: helper.input_select("进度条状态",
            [{
                key: "",
                value: "无"
            }, {
                key: "success",
                value: "成功"
            }, {
                key: "exception",
                value: "异常"
            }, {
                key: "warning",
                value: "告警"
            }], ""),
        type: helper.input_select("进度条类型",
            [{
                key: "line",
                value: "line"
            }, {
                key: "circle",
                value: "circle"
            }, {
                key: "dashboard",
                value: "dashboard"
            }], 'line')
    },
    slots: {
    },
    props: {
    }
}