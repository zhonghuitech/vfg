<template>
  <!-- {{currentItem}} -->
  <div class="right-board">
    <el-tabs v-model="currentTab" class="center-tabs">
      <el-tab-pane label="组件属性" name="field">
        <div class="field-box">
          <el-scrollbar class="right-scrollbar">
            <el-button type="danger" text bg icon="Delete" @click="deleteItem(currentItem.__ID)">删除组件</el-button>

            <template v-if="currentItem">
              <el-form ref="form2" label-position="top" label-width="80px">
                <el-form-item v-for="(func, title) in currentItem.actions" :key="title">
                  <el-button @click="func(currentItem)">{{ title }}</el-button>
                </el-form-item>
                <template v-for="(item, index) in eleRenderSetFormat(currentItem)"
                  :key="index + '-' + currentItem.__ID">
                  <!-- {{item}} -->
                  <element-render @update="updateEleSet" v-bind="item"></element-render>
                </template>
              </el-form>

              <el-divider>验证规则</el-divider>
              <rules-input :openRule="currentItem.__openRules" v-if="currentItem.tag !== 'draggable'"
                :fieldName="currentItem.attrs.fieldName && currentItem.attrs.fieldName.__val__"
                v-model="modelValue.formConf.__rules"></rules-input>
            </template>
          </el-scrollbar>
        </div>
      </el-tab-pane>

      <el-tab-pane label="表单属性" name="form">
        <div class="field-box">
          <el-scrollbar class="right-scrollbar">
            <el-form ref="form" label-position="top" label-width="80px">
              <template v-for="(item, index) in formConf" :key="index">
                <!-- {{index}} -->
                <element-render @update="(e) => {
                  modelValue.formConf.attrs[index]['__val__'] = e;
                }
                  " v-bind="eleRenderFormat(item)"></element-render>

              </template>
              <el-form-item label="接口地址">
                <el-input v-model="modelValue.formConf.api"></el-input>
              </el-form-item>
            </el-form>
          </el-scrollbar>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { ref, defineComponent, toRaw, computed, inject, watch } from "vue";

import { eleRenderFormat, eleRenderSetFormat } from "./utils/utils.js";
import { findEle, isObjectArray, deepClone, randFieldId } from "./utils/func";
import RulesInput from "./RulesInput.vue";
import ElementRender from "./ElementRender.vue";

export default defineComponent({
  components: { ElementRender, RulesInput },
  name: "page-setting",
  props: ["modelValue"],
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const deleteItem = inject("deleteItem");
    const currentTab = ref("form");
    console.log(props.modelValue)

    const currentItem = computed(() => {
      let ele = findEle(props.modelValue.drawingList, props.modelValue.current);
      if (ele) {
        currentTab.value = "field";
        return ele;
      }
    });

    watch(props.modelValue.drawingList, function () {
      // console.log("update ....")
      // console.log(props.modelValue.drawingList)
      ctx.emit("update:modelValue", props.modelValue);
    });

    const updateEleSet = function (val, field) {

      let ele = findEle(props.modelValue.drawingList, props.modelValue.current);

      if (field in ele) {
        ele[field]["__val__"] = val;
        return;
      }
      for (let k of ["formItem", "attrs"]) {
        if (ele[k] && field in ele[k]) {
          ele[k][field]["__val__"] = val;
          return;
        }
      }
    };

    const formConf = toRaw(props.modelValue.formConf.attrs);

    return {
      currentTab,
      eleRenderFormat,
      eleRenderSetFormat,
      currentItem,
      formConf,
      updateEleSet,
      deleteItem,
    };
  },
});
</script>
