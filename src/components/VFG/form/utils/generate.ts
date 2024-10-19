import {
    deepClone,
    isObjectObject,
    isObjectArray,
    isStr,
    isNumber,
    isObjectUnde
} from "./func";
import { getTag } from "./drawer"

import beautify from 'js-beautify';
import * as prettier from "prettier";
import parserHtml from "prettier/plugins/html";
import parserBabel from "prettier/plugins/babel";
import parserPostcss from "prettier/plugins/postcss";

class Set {
    private __data: any;

    constructor() {
        this.__data = [];
    }
    add(s: any) {
        if (this.__data.indexOf(s) > -1) {
            return
        }
        this.__data.push(s);
    }
    data() {
        return this.__data;
    }
}

class Scripts {
    private importFuncVue: Set;
    private importString: Set;
    private UIData: Set;
    private vars: Set;
    private formData: Set;
    private APIData: Set;
    private ActionData: Set;
    private returnData: Set;
    private rules: any;

    constructor() {
        this.importFuncVue = new Set();
        this.importString = new Set();
        this.UIData = new Set();
        this.vars = new Set();
        this.formData = new Set();
        this.APIData = new Set();
        this.ActionData = new Set();
        this.returnData = new Set();
        this.rules = false;
    }

    definedVar(name: string, val: string) {
        this.vars.add(`const ${name}=ref(${val})`)
    }

    addRules(rules: any) {
        this.rules = rules;
    }

    addUiDataFromApi(apiUrl: string, method: string, name: string) {
        this.UIData.add(name);
        this.importString.add('import {request} from "vfg"; ')
        this.APIData.add(`
        request({
            url: '${apiUrl}',
            method: '${method}'
        }).then(res=>{
            UIData.${name}=res.data.data;
        });
        `);
    }

    addPostAction(apiUrl: string) {
        this.importString.add('import {request} from "vfg"; ');
        this.ActionData.add(`
        const postData=function(formEl){
        formEl.validate((valid) => {
            if(valid===false){
                return false;
            }
            request({
                url: '${apiUrl}',
                method: 'post',
                data: formData
            }).then(res => {
                console.log(res);
                ElMessage.success("操作成功!");
            });
            })
        }
        `);
        this.returnData.add("postData");

    }

    renderImport(lines: any) {
        let vueFunc = this.importFuncVue.data().join(",");
        lines.push(`import {${vueFunc}} from "vue";\nimport { ElMessage } from 'element-plus'`);
        return lines.concat(this.importString.data());
    }

    red(lines: any) {
        this.importFuncVue.add('reactive');
        let formData: any = {};
        this.formData.data().forEach((element: any) => {
            console.log(element)
            formData[element[0]] = element[1];
        });
        lines.push(`const formData=reactive(${JSON.stringify(formData)});`);
        this.returnData.add("formData");
        return lines;
    }

    renderUIData(lines: any) {
        this.importFuncVue.add('reactive');
        let uiData: any = {};
        this.UIData.data().forEach((element: any) => {
            uiData[element] = '';
        });
        lines.push(`const UIData=reactive(${JSON.stringify(uiData)});`);
        this.returnData.add("UIData");
        return lines;
    }

    renderApiScript(lines: any) {
        return lines.concat(this.APIData.data().join("\n"));
    }
    renderVarsData(lines: any) {
        return lines.concat(this.vars.data().join("\n"));
    }
    renderActionData(lines: any) {
        return lines.concat(this.ActionData.data().join("\n"));
    }

    renderFormRules(lines: any) {
        if (this.rules === false) {
            return lines;
        }
        for (let p in this.rules) {
            this.rules[p] = Object.values(this.rules[p])
        }
        this.returnData.add("rules");
        let ruleStr = JSON.stringify(this.rules, (k, v) => {
            if (k === 'pattern') {
                return `--${v}--`;
            }
            return v;
        });

        ruleStr = ruleStr.replace(/\-\-"/g, '/').replace(/"\-\-/g, '/')
        lines.push(`const rules=${ruleStr}`);
        return lines;
    }

    renderSetup(lines: any) {
        lines = this.red(lines);
        lines = this.renderUIData(lines);
        lines = this.renderApiScript(lines);
        lines = this.renderFormRules(lines);
        lines = this.renderVarsData(lines);
        lines = this.renderActionData(lines);
        return lines;
    }

    renderEnd(lines: any) {
        return lines;
    }

    render() {
        this.importFuncVue.add('ref');
        let lines = [""];
        lines = this.renderSetup(lines);
        lines = this.renderEnd(lines);
        lines[0] = this.renderImport([]).join("\n");
        return lines.join("\n")
    }
}

const keyName = function (k: string) {
    let r = new RegExp('([A-Z]{1,1})');
    return k.replace(r, '-$1').toLowerCase();
}

const toVal = function (obj: any) {
    const _c: any = {}
    for (let a in obj) {
        // 默认值不要处理，否则 Array 类型的 [1, 2] 会变成 obj {0:1,1:2}
        if (typeof obj[a] == 'object' && a !== 'defaultvalue') {
            if ('__val__' in obj[a]) {
                _c[a] = obj[a]['__val__'];
            } else {
                _c[a] = toVal(obj[a]);
            }
        } else {
            _c[a] = obj[a];
        }
    }

    return _c;
}

const isBoolean = function (s: any) {
    if (typeof s == 'boolean') {
        return true;
    }
    return ['true', "false"].indexOf(s) > -1;
}

const attrFuns: any = {
    FormData: "formData",
    default(k: any, v: any) {
        if (k.substring(0, 2) === '__') {
            return "";
        }
        if (v) {
            if (isBoolean(v)) {
                console.log(k, '=----')
                return `:${keyName(k)}="${v}"`
            }
            return `${keyName(k)}="${v}"`
        }
        return "";
    },
    __formRef(v: any) {
        // attrFuns.FormData = v;
        return `ref="${v}"`;
    },
    __formModel(v: any) {
        attrFuns.FormData = v;
        return `:model="${v}"`;
    },
    fieldName(v: any) {
        return `v-model="${attrFuns.FormData}.${v}"`;
    },
    style(css: any) {
        let lines = [];
        for (let name in css) {
            lines.push(`${keyName(name)}:${css[name]}`);
        }
        return `style="${lines.join(";")}"`
    }
}

const attrFormat = function (attrs: any, props: any) {
    attrs = Object.assign({}, attrs, props);
    let attr: any = [];
    for (let k in attrs) {
        if (k in attrFuns) {
            attr.push(attrFuns[k](attrs[k]));
        } else {
            attr.push(attrFuns.default(k, attrs[k]));
        }
    }
    return attr.join(" ");
}

const slotFormat = function (slots: any) {
    let eles = [];
    for (let name in slots) {
        if (slots[name]) {
            eles.push(`<template #${name}>${slots[name]}</template>`)
        }
    }
    return eles.join("");
}

const optParseHandles: any = {
    dynamic: {
        default: function (name: any, opts: any, data: any) {
            let sons = [];

            let son: any = {
                props: {}
            }
            son.tag = opts.tag
            son.attrs = {
                ":label": "item.value",
                "v-for": `item in UIData.${name}`,
                ":key": "item.key"
            }
            son.slots = {
                default: "{{item.key}}"
            }
            sons.push(son);

            return sons;

        },
        "el-option": function (name: any, opts: any, data: any) {
            let sons = [];

            let son: any = {
                props: {}
            }
            son.tag = opts.tag
            son.attrs = {
                ":value": "item.value",
                ":label": "item.key",
                "v-for": `item in UIData.${name}`,
                ":key": "item.key"
            }

            sons.push(son);
            return sons;
        }
    },

    static: {
        default: function (name: any, opts: any, data: any) {
            let sons = [];
            for (let item of data) {
                let son: any = {
                    props: {}
                }
                son.tag = opts.tag;
                son.attrs = {
                    "value": item.value
                }
                son.slots = {
                    default: item.key
                }
                sons.push(son);
            }
            return sons;

        },
        "el-option": function (name: any, opts: any, data: any) {
            let sons = [];
            for (let item of data) {
                let son: any = {
                    props: {}
                }
                son.tag = opts.tag
                son.attrs = {
                    value: item.value,
                    label: item.key
                }

                sons.push(son);

            }
            return sons;
        }
    },
}

const opt = function (name: any, opts: any, js: any) {
    console.log(name)
    console.log(opts)
    let data = opts.type === 'static' ? opts.staticData : opts.dynamicData;
    let parseFunc = opts.tag in optParseHandles[opts.type] ? optParseHandles[opts.type][opts.tag] : optParseHandles[opts.type]['default'];

    if (opts.type === "dynamic") {
        js.addUiDataFromApi(data.url, data.medth, name);
    }

    return parseFunc(name, opts, data)
}

const renderBtns = function (ele: any, js: any) {
    if (('__formBtns' in ele.attrs) && ele.attrs.__formBtns) {
        js.addPostAction(ele.api);
        return ele.attrs.wrapStyle === 'none' ? `<el-form-item><el-button type="primary" @click="postData(${ele.attrs.__formRef})">确定</el-button><el-button>取消</el-button></el-form-item>` : '';
    }
}

const renderFooter = function () {
    return `<template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="postData(refForm)">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </template>`
}

const childrenFormat = function (childrens: any, js: any) {
    if (!childrens) {
        return ''
    }
    childrens = Object.values(childrens)
    let sons = childrens.map((ele: any) => {
        return toHtml(ele, js);
    })

    return sons.join(" ");
}

const toHtml = function (ele: any, js: any) {
    // form表单数据映射
    if (ele.attrs.fieldName) {
        js.formData.add([ele.attrs.fieldName, ele.defaultvalue]);
    }

    // 表单的校验规则
    if (ele.__rules) {
        js.addRules(deepClone(ele.__rules))
        ele.attrs[":rules"] = "rules";
    }
    
    let tagName = (ele.props && 'component' in ele.props) ? ele.props.component : ele.tag;

    if ('__text' in ele) {
        ele['slots']['default'] = ele.__text;
    }

    if ('__opt__' in ele) {
        if (isObjectArray(ele['childrens']) === false) {
            ele['childrens'] = [];
        }

        const tag = getTag(ele)
        ele.__opt__.tag = tag  // 处理el-radio-group这种类型， button 或 default.

        let ops = opt(ele.attrs.fieldName, ele.__opt__, js);
        ele['childrens'] = ele['childrens'].concat(ops);
    }

    let node = "draggable" == tagName ?
        [childrenFormat(ele.childrens, js)]
        :
        ["<", tagName, " ", attrFormat(ele.attrs, ele.props), " ", ">\n", childrenFormat(ele.childrens, js), slotFormat(ele.slots), renderBtns(ele, js), "\n</", tagName, ">\n"]
    if (ele.formItem) {
        node = ["<", "el-form-item", " ", attrFormat(ele.formItem, {
            prop: ele.attrs.fieldName
        }), " ", ">\n", node.join(""), "\n</", "el-form-item", ">\n"];
    }

    return node.join("");

}

export function generate(settings: any) {
    console.log('generate...')

    console.log(settings)
    const settingsV = toVal(settings);
    console.log('---after')
    console.log(settingsV)
    let element = settingsV.formConf;
    element.childrens = settingsV.drawingList;
    console.log(element)

    console.log(typeof element.childrens)
    console.log(Array.isArray(element.childrens))

    const js = new Scripts();
    let html = toHtml(element, js);

    js.definedVar(element.attrs.__formRef, 'null');

    const wrapStyle = element.attrs.wrapStyle
    let appendToBody = wrapStyle === 'dialog' ? ' append-to-body' : ''
    const footer = renderFooter()
    let wrapHtml = wrapStyle === 'none' ? html : `<el-${wrapStyle} title="导入表" v-model="visible" direction="rtl" size="50%"${appendToBody}>${html}${footer}</el-${wrapStyle}>`
    const templateContent = ["<template>\n", wrapHtml, '</template>'].join('').replace(/(\r\n|\n|\r)/gm, "").replaceAll('><', '>\n<');

    const jsConst = wrapStyle === 'none' ? '' : `
    const visible = ref(false);
    function show() {
        visible.value = true;
    }

    function cancel() {
        visible.value = false;
    }
    
    defineExpose({
    show,
    });
    `
    return [beautify.html(templateContent), "\n<script setup>", beautify.js(js.render() + jsConst), "</script>"].join("\n")
}

export async function generateAndFormatAsync(settings: any) {
    const codeContent = generate(settings);

    return prettier.format(codeContent, {
        parser: 'vue',
        semi: false,
        singleQuote: true,
        plugins: [parserHtml, parserBabel, parserPostcss]
    })
}