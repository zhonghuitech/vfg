<template>
  <div>
    <FormGenerator device="pc" @preview="previewAction" />
    <el-drawer title="预览" v-model="visible" direction="rtl" size="100%">
      <template #header>
        <div class="dialog-footer"> <el-button @click="cancel">取 消</el-button> </div>
      </template>
      <el-row :gutter="24">
        <el-col :span="12" style="border: 1px solid #409eff;max-height: calc(100vh - 200px);">
          <CodemirrorComp v-model="sfc" lang="vue" />
        </el-col>
        <el-col :span="12" style="border: 1px solid #409eff;max-height: calc(100vh - 200px);">
          <el-scrollbar>
            <DynaComp :sfc="sfc"></DynaComp>
          </el-scrollbar>
        </el-col>
      </el-row>
      <template #footer>
        <div class="dialog-footer"> <el-button @click="cancel">取 消</el-button> </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import DynaComp from "/~/components/DynaComp.vue";
import CodemirrorComp from '/@/components/CodemirrorComp/index.vue'

const visible = ref(false);

const sfc = ref('')

const cancel = function () {
  visible.value = false
}

const previewAction = function (sfcInput: string) {
  sfc.value = sfcInput
  visible.value = true
}
</script>

<style scoped>
</style>