<template>
  <div>
    <FormGenerator device="pc" @preview="previewAction" />
    <el-drawer title="导入表" v-model="visible" direction="rtl" size="50%">
      <DynaComp :sfc="sfc"></DynaComp>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import DynaComp from "/~/components/DynaComp.vue";
const visible = ref(false);

const sfc = ref('')

const previewAction = function (sfcInput: string) {
  sfc.value = sfcInput
  visible.value = true
}
</script>