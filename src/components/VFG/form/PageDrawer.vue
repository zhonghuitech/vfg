<template>
  <el-form :model="formModel" v-bind="formSetting" :gutter="modelValue.formConf.gutter" :rules="rules">
    <draggable class="drawing-board" style="padding: 10px; height: 100%" v-model="modelValue.drawingList"
      :animation="340" group="componentsGroup" ghostClass="ghost" @change="onEnd">
      <template v-for="(item, index) in conf.drawingList" :key="item.__ID">
        <!-- {{item}} -->
        <element-render @click.stop="selected(item.__ID)" @update="changeValue" :currentID="modelValue.current"
          style="padding-top: 10px;padding-bottom: 10px;" v-bind="item"  class="item-tool-box"></element-render>
      </template>
    </draggable>

    <el-empty v-if="conf.drawingList.length < 1" description="从左侧拖入或点选组件进行表单设计"></el-empty>
    <template v-else>
      <el-form-item v-if="conf.formConf.attrs.__formBtns.__val__">
        <el-button type="primary">确认</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import { deepClone, isObjectArray } from "./utils/func";

import { defineComponent, reactive, computed, inject, watch } from "vue";
import { initRender } from "./utils/drawer";
import ElementRender from "./ElementRender.vue";

export default defineComponent({
  name: "PageGenerator",
  props: ["modelValue"],
  emits: ["update:modelValue"],

  components: { ElementRender },

  setup(props, context) {
    const selected = inject("selected");
    const updateDefaultValue = inject("updateDefaultValue");
    
    const onEnd = function (e) {
      console.log('draggle onEnd... selected current!')
      if (e.clonedData) {
        selected(e.clonedData.__ID)
      }
      // context.emit("update:modelValue", props.modelValue, e.clonedData);
    };

    // 将外层传到的参数 modelValue，转化为可渲染的结构，这里会将 __opt__ 这种转成 children
    const conf = initRender(props.modelValue);
    const formModel = reactive({});
    const rules = computed(() => props.modelValue.formConf.__rules)

    let formEleKeys = [];
    const watchElement = function (eles) {
      for (let item of eles) {
        formModel[item.__ID] = formModel[item.__ID]
          ? formModel[item.__ID]
          : item.defaultvalue;
        formEleKeys.push(item.__ID);
        if (isObjectArray(item.childrens)) {
          watchElement(item.childrens);
        }
      }
    };

    watch(props.modelValue, () => {
      formEleKeys = [];
      watchElement(props.modelValue.drawingList);
      for (let k in formModel) {
        if (!formEleKeys.includes(k)) {
          delete formModel[k];
        }
      }
    });

    const formSetting = computed(() => {
      let ini = {};

      for (let attr in props.modelValue.formConf.attrs) {
        if (attr.substring(0, 2) != "__") {
          ini[attr] = props.modelValue.formConf.attrs[attr].__val__;
        }
      }
      ini["rules"] = deepClone(props.modelValue.formConf.attrs["__rules"]);
      for (let p in ini["rules"]) {
        ini["rules"][p] = ini["rules"][p].map((a) => {
          a.pattern = new RegExp(a.pattern);
          return a;
        });
      }
      return ini;
    });

    const changeValue = function (val, elename, idname) {
      console.log(val, elename, idname);
      updateDefaultValue(val, idname);
      formModel[idname] = val;
    };

    return { onEnd, conf, formSetting, selected, changeValue, formModel, rules };
  },
});
</script>
<style>
.tool-btn-del:hover {
  background: #f56c6c;
  color: #fff;
}

.tool-btn-copy:hover {
  background: #409eff;
  color: #fff;
}

.tool-btn-del {
  right: 24px;
  border-color: #f56c6c;
  color: #f56c6c;
  background: #fff;
}

.tool-btn-copy {
  right: 56px;
  border-color: #409eff;
  color: #409eff;
  background: #fff;
}

.tool-btn {
  display: initial;
  position: absolute;
  top: -10px;
  width: 22px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  border-radius: 50%;
  font-size: 12px;
  border: 1px solid;
  cursor: pointer;
  z-index: 15;
}

.item-tool-box {
  position: relative;
}

.el-scrollbar__view {
  height: 100%;
}

.item-attribute {
  padding: 10px;
  border: 1px solid black;
}

.clone-grid {
  display: flex;
}
</style>
