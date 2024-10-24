<template>
    <div>
        <FormGenerator device="pc" @preview="previewAction" />
        <el-drawer v-model="visible" direction="rtl" size="100%" :with-header="false">
            <live :sfc="sfc" :showClose="true" @close="visible=false"></live>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import Live from "/~/components/Live.vue";

const sfc = ref('')
const visible = ref(false);

const cancel = function () {
    visible.value = false
}

const previewAction = function (sfcInput: string) {
    sfc.value = sfcInput
    visible.value = true
}
</script>

<style scoped></style>