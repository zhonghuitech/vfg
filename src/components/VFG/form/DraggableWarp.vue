<template>
  <el-col v-bind="$attrs">
    <VueDraggable v-bind="ini" :modelValue="vm" @update:modelValue="update">
      <slot></slot>
    </VueDraggable>
  </el-col>
</template>

<script>
import { defineComponent, inject, reactive, ref, watch } from "vue";
import { VueDraggable } from 'vue-draggable-plus'

export default defineComponent({
  name: "DraggableWarp",
  emits: ["update:modelValue"],
  props: {
    modelValue: Array,
  },

  setup(props, ctx) {
    const ini = {
      style: { "min-height": "60px" },
      component: "div",
      group: "componentsGroup",
      class: "drag-wrapper box",
      animation: 340,
      filter: ".btn",
    };
    const vm = ref(props.modelValue);

    const update = function (e) {
      console.log(e);
      vm.value = e;
      ctx.emit("update:modelValue", e);
    };

    return { vm, ini, update };
  },
});
</script>
