<template>
  <div class="components-list">
    <div>
      <el-form ref="refForm" label-position="right" label-width="100">
        <el-input ref="keyInput" v-model="key" placeholder="输入组件名称查询" suffix-icon="search" type="text" clearable />
      </el-form>
      <template v-for="(group, name) in filterEles" :key="name">
        <el-divider> {{ group.title }} </el-divider>
        <draggable class="components-draggable" v-model="group.eles" animation="300" ghostClass="ghost"
          :group="{ name: 'componentsGroup', pull: 'clone', put: false }" :clone="copy" :sort="true" @end="onEnd">
          <div v-for="(element, index) in group.eles" :key="index" class="components-item"
            @click="addComponent(element)">
            <div class="components-body">
              <svg-icon :icon-class="element.tagIcon" />
              {{ element.name }}
            </div>
          </div>
        </draggable>
      </template>
    </div>
  </div>
</template>

<script>
import cloneComponent from "./utils/cloneComponent";
import { elements } from "./ui/index";
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "PagePanel",
  emits: ["addComponent"],

  props: {
    formId: {
      type: String,
      default: "form_",
    },
    idGlobal: {
      type: Number,
      default: 1,
    },
  },

  setup(props, ctx) {
    const key = ref('');
    const filterEles = ref(elements);
    const { copy, onEnd } = cloneComponent(props);
    const addComponent = function (el) {
      ctx.emit("addComponent", copy(el));
    };

    const filterFun = (key, eles) => {
      const res = {}
      for (const [ke, value] of Object.entries(eles)) {
        const arr = value['eles'].filter(item => item.name.indexOf(key) > -1 || item.tag.indexOf(key) > -1)
        if (arr.length > 0) {
          res[ke] = { eles: arr, title: value['title'] }
        }
      }
      return res;
    }

    watch(key, () => {
      filterEles.value = filterFun(key.value, elements)
    });

    return { elements, onEnd, copy, addComponent, filterEles, key };
  },
});
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
