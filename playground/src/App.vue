<template>
  <div>
    <FormGenerator device="pc" @preview="previewAction" />
    <el-drawer title="预览" v-model="visible" direction="rtl" size="100%">
      <template #header style="margin-top: 100px;">
        <div style="display:flex;justify-content:center">
          <el-radio-group v-model="showType">
            <el-radio-button label="全显示" value="both" />
            <el-radio-button label="仅源码" value="source" />
            <el-radio-button label="仅UI" value="ui" />
          </el-radio-group>
        </div>
      </template>
      <el-row :gutter="24">
        <el-col v-if="visiableSource" :span="spanColVal" style="border: 1px solid #409eff;max-height: calc(100vh - 160px);">
          <CodemirrorComp v-model="sfc" lang="vue" />
        </el-col>
        <el-col v-if="visiableUI" :span="spanColVal" style="border: 1px solid #409eff;max-height: calc(100vh - 160px);">
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
import { computed, ref } from "vue"
import DynaComp from "/~/components/DynaComp.vue";
import CodemirrorComp from '/@/components/CodemirrorComp/index.vue'

const visible = ref(false);
const showType = ref('both')
const spanColVal = computed(() => 'both' == showType.value ? 12 : 24)
const visiableSource = computed(() => 'ui' == showType.value ? false : true)
const visiableUI = computed(() => 'source' == showType.value ? false : true)

const sfc = ref('')

const cancel = function () {
  visible.value = false
}

const previewAction = function (sfcInput: string) {
  sfc.value = sfcInput
  visible.value = true
}
</script>

<style scoped></style>