import helper from "./helper";

// 表单属性【右面板】
const formConf = {
    tag: "el-form",
    props: {},
    childrens: [],
    __rules: {},
    attrs: {
        __formRef: helper.input_text("表单名", 'refForm'),
        __formModel: helper.input_text("表单模型", 'formData'),
        size: helper.input_radio("表单尺寸", [{
            key: "default",
            value: "默认"
        }, {
            key: "large",
            value: "较大"
        }, {
            key: "small",
            value: "较小"
        }], "default"),
        labelPosition: helper.input_radio("标签对齐", [{
            key: "right",
            value: "右对齐"
        }, {
            key: "left",
            value: "右对齐"
        }, {
            key: "top",
            value: "顶部对齐"
        }], "right"),
        wrapStyle: helper.input_radio("交互样式", [{
            key: "drawer",
            value: "抽屉"
        }, {
            key: "dialog",
            value: "对话框"
        }, {
            key: "none",
            value: "无样式"
        }], "drawer"),
        labelWidth: helper.input_number("标签宽度", 100),
        disabled: helper.input_boolean("禁用", false),
        inline: helper.input_boolean("行内模式", false),
        hideRequiredAsterisk: helper.input_boolean("必填标星隐藏", false),
        __formBtns: helper.input_boolean("是否显示按钮", true),
    },
}

const elements: any = {
    base: { eles: [], title: "基本组件" },
    form: { eles: [], title: "表单组件" },
};

let files: any = import.meta.glob('./element/form/*.ts', { eager: true });
for (const key in files) {
    elements.form.eles.push(files[key].default)
}
files = import.meta.glob('./element/base/*.ts', { eager: true });
for (const key in files) {
    elements.base.eles.push(files[key].default)
}

export {
    elements,
    formConf
};