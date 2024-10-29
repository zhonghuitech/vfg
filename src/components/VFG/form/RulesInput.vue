<template>
  <el-form v-if="openRule" label-position="left" label-width="100px" style="margin-top: 5px; margin-bottom: 25px;">
    <el-row>
      <el-col :span="12">
        <el-switch v-model="required" size="large" active-text="必填" inactive-text="可选" />
      </el-col>
      <el-col :span="12"  style="display: flex; flex-direction:row-reverse">
        <el-button ref="btn" type="default" link icon="CirclePlusFilled" @click.prevent="addItem">添加规则</el-button>
      </el-col>
    </el-row>

    <template>
      <template v-for="(item, index) in data[fieldName]" :key="'c' + index">
        <el-card v-if="'pattern' in item" style="margin: 10px 5px" class="_box">
          <el-form-item label="表达式">
            <el-autocomplete v-model="item.pattern" :fetch-suggestions="querySearch" class="inline-input"
              placeholder="输入验证正则表达式" @select="handleSelect" clearable @focus="fucusAction(item)">
              <template #default="{ item }">
                {{ item.title }}
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="错误提示">
            <el-input v-model="item.message"></el-input>
          </el-form-item>

          <el-form-item label="触发事件">
            <el-radio-group v-model="item.trigger">
              <el-radio-button label="blur" value="blur" />
              <el-radio-button label="change" value="change" />
            </el-radio-group>
          </el-form-item>

          <span class="tool">
            <el-icon :size="20" @click="del(item.id)">
              <circle-close-filled />
            </el-icon>
          </span>

        </el-card>
      </template>
    </template>
    <!--    <template v-if="fieldName in data && data[fieldName].length > 0">-->
    <!--      <el-form-item>-->
    <!--        <el-button @click.prevent="save" ref="btn">保存</el-button>-->
    <!--      </el-form-item>-->
    <!--    </template>-->
  </el-form>
</template>
<script>
import { deepClone, randFieldId } from "./utils/func";
import { rule_options } from "./utils/rules"
import { CircleCloseFilled } from "@element-plus/icons-vue";
import { defineComponent, nextTick, reactive, ref, toRaw, watch, watchEffect, computed } from "vue";

export default defineComponent({
  name: "RulesInput",
  emits: ["update:modelValue"],
  components: { CircleCloseFilled },
  props: ["modelValue", "defaultvalue", "fieldName", "openRule"],
  setup(props, ctx) {
    const btn = ref(null);
    const currentRule = ref(null)
    const mV = toRaw(props.modelValue)
    const data = reactive(deepClone(mV));
    // console.log(data)

    if (!(props.fieldName in data)) {
      data[props.fieldName] = [];
    }

    const scrollTo = async () => {
      await nextTick();
      btn.value.$el.scrollIntoView();
    };

    const required = ref(false);
    for (let item of data[props.fieldName]) {
      if ('required' in item) {
        required.value = true;
      }
    }

    const addItem = function () {
      data[props.fieldName].push({
        id: randFieldId(),
        pattern: "",
        message: "请输入正确内容",
        trigger: "blur",
      });
      scrollTo();
    };

    const save = function () {
      let newData = toRaw(data);
      // console.log(newData)

      let index = -1
      if (newData[props.fieldName]) {
        index = newData[props.fieldName].findIndex((item) => item.id === "_required");
      }

      if (index > -1) {
        newData[props.fieldName].splice(index, 1);
      }

      if (required.value) {
        if (!newData[props.fieldName]) {
          newData[props.fieldName] = []
        }
        newData[props.fieldName].push({
          id: "_required",
          required: true,
          message: '必填项目',
          trigger: 'change',
        });
      }
      ctx.emit("update:modelValue", newData);
    };

    watch(() => props.fieldName, (newId, oldId) => {
      // console.log('------>>' + newId)
      const rawModelValue = toRaw(props.modelValue)
      // console.log(rawModelValue)
      if (rawModelValue[newId]) {
        const idx = rawModelValue[newId].findIndex(item => item.id === '_required')
        required.value = idx > -1
      } else {
        required.value = false
      }
    })

    watch([data, required], () => {
      console.log('change.ddddd--> ' + required.value)
      save(required.value);
    })

    const querySearch = function (qs, cb) {
      const results = qs
        ? rule_options.filter((item) => {
          const qsLowerCase = qs.toLowerCase()
          return item.title.toLowerCase().includes(qsLowerCase) || item.msg.toLowerCase().includes(qsLowerCase)
        })
        : rule_options
      cb(results);
    };

    function fucusAction(item) {
      currentRule.value = item.id
    }

    function handleSelect(item) {
      if (currentRule.value) {
        const finded = data[props.fieldName].find(i => i.id === currentRule.value)
        if (finded) {
          finded.message = item.msg
        }
      }
    };

    const del = function (id) {
      data[props.fieldName].splice(
        data[props.fieldName].findIndex((item) => item.id === id),
        1
      );
      // save();
    };
    watchEffect([required])
    return {
      data,
      addItem,
      save,
      querySearch,
      handleSelect,
      fucusAction,
      del,
      btn, required
    };
  },
});
</script>
<style scoped>
._box {
  position: relative;
}

.tool {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>