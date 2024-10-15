<template>
    <!-- :indent-with-tab="true" 是否自动获取焦点-->
    <codemirror v-model="code" placeholder="Code here..." :style="{ height: '100%' }" :autofocus="true" :tabSize="2"
        :extensions="extensions" />
</template>

<script setup>
import { Codemirror } from "vue-codemirror";
import { vue } from "@codemirror/lang-vue";
// import { javascript } from "@codemirror/lang-javascript";
// import { java } from "@codemirror/lang-java";
// import { sql } from "@codemirror/lang-sql";
// import { json } from "@codemirror/lang-json";
// import { xml } from "@codemirror/lang-xml";
import { basicSetup, EditorView } from "codemirror"
import { EditorState, Compartment } from "@codemirror/state"

import { oneDark } from "@codemirror/theme-one-dark";
import { ref } from "vue";

let myTheme = EditorView.theme({
    // 输入的字体颜色
    "&": {
        color: "#0052D9",
        backgroundColor: "#FFFFFF"
    },
    ".cm-content": {
        caretColor: "#0052D9",
    },
    // 激活背景色
    ".cm-activeLine": {
        backgroundColor: "#FAFAFA"
    },
    // 激活序列的背景色
    ".cm-activeLineGutter": {
        backgroundColor: "#FAFAFA"
    },
    //光标的颜色
    "&.cm-focused .cm-cursor": {
        borderLeftColor: "#0052D9"
    },
    // 选中的状态
    "&.cm-focused .cm-selectionBackground, ::selection": {
        backgroundColor: "#0052D9",
        color: '#FFFFFF'
    },
    // 左侧侧边栏的颜色
    ".cm-gutters": {
        backgroundColor: "#FFFFFF",
        color: "#ddd", //侧边栏文字颜色
        border: "none"
    }
}, { dark: true })

const langConfigMap = {
    vue: [vue()],
    // js: [javascript()],
    // java: [java()],
    
    // sql: [sql()],
    // xml: [xml()],
    // json: [json()]
}

let language = new Compartment

const props = defineProps({
    height: {
        type: String,
        required: false,
        default: '400px'
    },
    lang: {
        type: String,
        required: true,
        default: 'js'
    }
});

const code = ref(``);
const extensions = [basicSetup, langConfigMap[props.lang]];
const Change = () => {

}
</script>
