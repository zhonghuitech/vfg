<template>
    <el-tree-select v-model="value" :data="data" :render-after-expand="renderAfterExpand" style="width: 240px" />
</template>

<script>
import { defineComponent, computed, ref, watch, reactive } from "vue";

export default defineComponent({
    name: "VfgTreeSelect",
    emits: ["update:modelValue"],
    props: ["data", "value", "renderAfterExpand"],
    setup(props, ctx) {
    }
})
</script>