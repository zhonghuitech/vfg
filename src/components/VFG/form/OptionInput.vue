<template>
  <el-tabs type="border-card" v-model="current">
    <el-tab-pane label="静态数据" name="static">
      <el-form size="small">
        <el-form-item>
          <el-row>
            <draggable v-model="dragList" :animation="340" ghostClass="ghost" @end="onEnd">
              <div v-for="(item, index) in dragList" :key="item.id">
                <div style="display: flex;margin-top: 5px">
                  <div class="select-line-icon option-drag">
                    <el-icon>
                      <Operation />
                    </el-icon>
                  </div>
                  <el-input v-model="item.key" style="margin-left: 5px;margin-right: 5px;max-width:120px;"></el-input>

                  <el-input-number v-if="isNumberValueType" v-model="item.value"
                    style="margin-left: 5px; width:200px;" />
                  <el-input v-else v-model="item.value" style="margin-left: 5px;margin-right: 5px;" />

                  <div class="close-btn select-line-icon" @click="delItem(index)">
                    <el-icon>
                      <Remove color="red" />
                    </el-icon>
                  </div>
                </div>
              </div>
            </draggable>
          </el-row>
        </el-form-item>
        <el-form-item style="margin-top: 20px;">
          <el-button @click.prevent="addItem" type="primary" link>添加选项</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="动态数据" name="dynamic">
      <el-form size="small">
        <el-form-item label="接口地址">
          <el-input placeholder="请输入接口地址" v-model="dynamicData.url" class="input-with-select">
            <template #prepend>
              <el-select v-model="dynamicData.medth" placeholder="请选择" style="width: 80px">
                <el-option label="get" value="get"></el-option>
                <el-option label="post" value="post"></el-option>
                <el-option label="put" value="put"></el-option>
              </el-select>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="label键值">
          <el-input type="text" v-model="dynamicData.keyName"></el-input>
        </el-form-item>
        <el-form-item label="value键值">
          <el-input type="text" v-model="dynamicData.valueName"></el-input>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { ref, defineComponent, watch, reactive } from "vue";
import { deepClone, isNumberType } from "./utils/func";
import { Remove } from "@element-plus/icons-vue";

export default defineComponent({
  name: "OptionInput",
  emits: ["update:modelValue"],
  props: ["modelValue", "defaultvalue"],
  components: { Remove },
  setup(props, ctx) {
    let modelValue = props.modelValue || {};
    const isNumberValueType = ref(false)
    const current = ref(props.modelValue.type);
    const staticData = reactive(deepClone(props.modelValue.staticData));
    const dynamicData = reactive(deepClone(props.modelValue.dynamicData));
    const dragList = ref(staticData)

    if (staticData.length > 0) {
      isNumberValueType.value = isNumberType(staticData[0].value)
    }

    // console.log(staticData)
    // console.log(dragList.value)

    const addItem = function () {
      let cont = staticData.length + 1
      console.log(staticData)

      if (isNumberValueType.value) {
        staticData.forEach(item => {
          if (isNumberType(item.value) && item.value >= cont) {
            cont = item.value + 1;
          }
        })
      }
      const addItem = { key: "选项" + cont, value: isNumberValueType.value ? cont : "" + cont };
      staticData.push(addItem);
      //dragList.value.push(addItem)
      console.log(staticData)
    };

    const delItem = function (index) {
      console.log(index)
      staticData.splice(index, 1);
      // dragList.value.splice(index, 1)
    };

    watch([dynamicData, staticData, current], () => {
      console.log('变动事件...')
      dragList.value = []
      staticData.forEach((item, index) => {
        dragList.value[index] = item
      })
      ctx.emit("update:modelValue", {
        type: current.value,
        tag: props.modelValue.tag,
        staticData,
        dynamicData,
      });
    });

    const onEnd = function (obj) {
      dragList.value.forEach((item, index) => {
        staticData[index] = item
      })
    };

    return { staticData, addItem, delItem, dynamicData, current, onEnd, dragList, isNumberValueType };
  },
});
</script>

<style></style>
