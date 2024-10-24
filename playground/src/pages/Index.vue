<template>
    <div>
        <FormGenerator device="pc" @preview="previewAction" @live="liveAction" :showLive="true"/>
        <el-drawer v-model="visible" direction="rtl" size="100%" :with-header="false">
            <live :sfc="sfc" :showClose="true" @close="visible = false"></live>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import { useRoute, useRouter } from 'vue-router'
import Live from "/~/components/Live.vue";
const router = useRouter()

const sfc = ref('')
const visible = ref(false);

const cancel = function () {
    visible.value = false
}

const previewAction = function (sfcInput: string) {
    sfc.value = sfcInput
    visible.value = true
}

const liveAction = function (sfcInput: string) {
    console.log('goo')
    router.push('/live')
}
</script>

<style scoped></style>