import helper from "../../helper";

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

function createTabCol(prop: string, label: string) {
    return {
        tag: "el-table-column",
        tagIcon: "table",
        __ID: '',
        name: "表格列描述",
        attrs: {
            prop: helper.input_text("prop", prop),
            label: helper.input_text("label", label),
        }
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