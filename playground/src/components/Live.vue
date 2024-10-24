<template>
    <div>
        <div class="header_line">
            <el-radio-group>
                <el-button type="default" link icon="Download" @click="execDownload('vfg.vue')">下载代码</el-button>
                <el-button type="default" link icon="DocumentCopy" @click="ClipboardWrite()">复制代码</el-button>
            </el-radio-group>

            <el-radio-group v-model="showType">
                <el-radio-button label="全显示" value="both" />
                <el-radio-button label="仅源码" value="source" />
                <el-radio-button label="仅UI" value="ui" />
            </el-radio-group>

            <el-radio-group>
                <el-button v-if="!showClose" link @click="goHome">
                    <svg-icon icon-class="vfg" style="font-size: 25px;" />
                </el-button>
                <el-button v-else @click="closeAction" icon="Close" link style="font-size: 25px;" />
            </el-radio-group>
        </div>

        <el-row :gutter="24">
            <el-col v-if="visiableSource" :span="spanColVal"
                style="border: 1px solid #409eff;max-height: calc(100vh - 175px);min-height: 100px;">
                <CodemirrorComp v-model="sfc" lang="vue" />
            </el-col>
            <el-col v-if="visiableUI" :span="spanColVal"
                style="border: 1px solid #409eff;max-height: calc(100vh - 175px);">
                <el-scrollbar>
                    <DynaComp :sfc="sfc"></DynaComp>
                </el-scrollbar>
            </el-col>
        </el-row>

        <div class="footer_line" style="display: flex;justify-content:space-between;align-items:center">
            <span class="tips">注意：实时源码编辑和UI预览同步功能，源码中仅可import引入vue库，import其他库不支持！</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue"
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from "element-plus"
import DynaComp from "/~/components/DynaComp.vue";
import CodemirrorComp from '/@/components/CodemirrorComp/index.vue'
import { mockData } from "/~/js/mock"
import useClipboard from 'vue-clipboard3';
import { saveAs } from "file-saver";

const emit = defineEmits(['close'])
const router = useRouter()
const route = useRoute()

const props = defineProps({
    sfc: String,
    showClose: Boolean
})

const showType = ref('both')
const spanColVal = computed(() => 'both' == showType.value ? 12 : 24)
const visiableSource = computed(() => 'ui' == showType.value ? false : true)
const visiableUI = computed(() => 'source' == showType.value ? false : true)

const sfc = ref(props.sfc)
if (!sfc.value || sfc.value.trim() === 0) {
    sfc.value = mockData
}

watch(() => props.sfc, () => {
    sfc.value = props.sfc
})

function goHome() {
    router.push('/')
}

function closeAction() {
    emit('close')
}

const execDownload = function (filename) {
    const codeStr = sfc.value
    const blob = new Blob([codeStr], {
        type: "text/plain;charset=utf-8",
    });
    saveAs(blob, filename);
};

const { toClipboard } = useClipboard()
const ClipboardWrite = async () => {
    const codeStr = sfc.value
    try {
        await toClipboard(codeStr);
        ElMessage({ message: "复制成功！", type: 'success' })
        console.log('Copied to clipboard')
    } catch (e) {
        console.error(e)
    }
}
</script>

<style scoped>
.header_line {
    align-items: center;
    color: #72767b;
    display: flex;
    margin-bottom: 20px;
    padding: 20px;
    padding-bottom: 0;
    justify-content: space-between
}

.footer_line {
    padding: 20px;

}
</style>