import helper from "../../helper";
import { createTabCol } from "/@/components/VFG/form/ui/helper";

const selection = {
    tag: "el-table-column",
    tagIcon: "table",
    __ID: '',
    name: "表格列描述",
    attrs: {
    },
    props: {
        type: 'selection',
        ':selectable': 'selectable'
    }
}

const optList = [
    selection,
    helper.cloneItem(createTabCol("id", "编号")),
    helper.cloneItem(createTabCol("name", "姓名"))
]

export default {
    __ID: '',            // 这个 ID 应用到页面上会被替换为随机生成的
    tag: "el-table",     // 组件名，全局唯一
    tagIcon: "table",   // 组件图标 SVG文件
    name: "表格",         // 组件名
    __openRules: false,  // 验证规则
    ctrlBtn: true,
    // __text: helper.input_text("表格文本", "表格"),
    attrs: {
        fieldName: helper.input_text("字段名", '字段名'),
        border: helper.input_boolean("带边框", true),
        stripe: helper.input_boolean("带条纹", false),
        size: helper.input_radio("表的尺寸",
            [{
                key: "large",
                value: "较大"
            }, {
                key: "default",
                value: "默认"
            }, {
                key: "small",
                value: "较小"
            }], "default"),
        'show-header': helper.input_boolean("显示表头", true),
    },
    slots: {
    },
    props: {
        ":data": [
            {
                "id": 1,
                "name": "张三"
            }
        ]
    },
    __table__: helper.input_table("列配置", optList),
    childrens: [
        ...optList
    ],
}