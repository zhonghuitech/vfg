import helper from "../../helper";

export default {
    __ID: '',            // 这个 ID 应用到页面上会被替换为随机生成的
    tag: "vfg-tree-select",     // 组件名，全局唯一
    tagIcon: "tree-select",   // 组件图标 SVG文件
    name: "树型选择",         // 组件名
    __openRules: false,  // 验证规则
    ctrlBtn: true,
    formItem: {
        showLabel: helper.input_boolean("显示 label", true),
        labelWidth: helper.input_number("label 宽", 100),
        label: helper.input_text("label", '树型选择',),
    },
    attrs: {
        fieldName: helper.input_text("字段名", '字段名'),
        'show-checkbox': helper.input_boolean("显示选择框", false),
        'check-strictly': helper.input_boolean("显示任意级别", false),
        'renderAfterExpand': helper.input_boolean("自动扩展树", false),
    },
    slots: {
    },
    props: {
        data: [
            {
                value: '1',
                label: 'Level one 1',
                children: [
                    {
                        value: '1-1',
                        label: 'Level two 1-1',
                        children: [
                            {
                                value: '1-1-1',
                                label: 'Level three 1-1-1',
                            },
                        ],
                    },
                ],
            },
            {
                value: '2',
                label: 'Level one 2',
                children: [
                    {
                        value: '2-1',
                        label: 'Level two 2-1',
                        children: [
                            {
                                value: '2-1-1',
                                label: 'Level three 2-1-1',
                            },
                        ],
                    },
                    {
                        value: '2-2',
                        label: 'Level two 2-2',
                        children: [
                            {
                                value: '2-2-1',
                                label: 'Level three 2-2-1',
                            },
                        ],
                    },
                ],
            },
            {
                value: '3',
                label: 'Level one 3',
                children: [
                    {
                        value: '3-1',
                        label: 'Level two 3-1',
                        children: [
                            {
                                value: '3-1-1',
                                label: 'Level three 3-1-1',
                            },
                        ],
                    },
                    {
                        value: '3-2',
                        label: 'Level two 3-2',
                        children: [
                            {
                                value: '3-2-1',
                                label: 'Level three 3-2-1',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    childrens: [
    ],
}