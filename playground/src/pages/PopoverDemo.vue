<template>
    <div style="margin: 20px;display:flex;flex-direction:column">
        <div>
            <span style="font-size: 30px;">el-popover内有select时在选择后会自动关闭示例, <el-button link type="danger"
                    style="font-size: 30px;" @click="showSourceCode">查看源码</el-button></span>
        </div>
        <div style="margin-top: 20px;display:flex;">
            <el-popover placement="bottom" :width="500" trigger="click">
                <template #default>
                    <el-card style="max-width: 500px;border:0px solid red;--el-card-border-color:#ffffff"
                        shadow="never">
                        <template #header>
                            <div class="card-header">
                                <span style="font-weight: bold;font-size: large;">筛选</span>
                            </div>
                        </template>

                        <el-form ref="taskRef">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item prop="itemCode" style="margin-left: 10px;">
                                        <el-select v-model="form.type" placeholder="" :teleported="true"
                                            placement="bottom">
                                            <el-option v-for="dict in type_dic" :key="dict.value" :label="dict.label"
                                                :value="dict.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>

                        <template #footer>
                            <div style="display: flex;justify-content:space-between">
                                <span>
                                    <el-button @click="cancel" link>取 消</el-button>
                                    <el-button type="primary" @click="submitFilterForm">确 定</el-button>
                                </span>
                            </div>
                        </template>
                    </el-card>
                </template>
                <template #reference>
                    <el-button type="primary" @click="proBtnClick">问题示例</el-button>
                </template>
            </el-popover>

            <el-popover placement="bottom" :width="500" trigger="click">
                <template #default>
                    <el-card style="max-width: 500px;border:0px solid red;--el-card-border-color:#ffffff"
                        shadow="never">
                        <template #header>
                            <div class="card-header">
                                <span style="font-weight: bold;font-size: large;">筛选</span>
                            </div>
                        </template>

                        <el-form ref="taskRef">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item prop="itemCode" style="margin-left: 10px;">
                                        <el-select v-model="form.type" placeholder="" :teleported="false"
                                            placement="bottom">
                                            <el-option v-for="dict in type_dic" :key="dict.value" :label="dict.label"
                                                :value="dict.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>

                        <template #footer>
                            <div style="display: flex;justify-content:space-between">
                                <span>
                                    <el-button @click="cancel" link>取 消</el-button>
                                    <el-button type="primary" @click="submitFilterForm">确 定</el-button>
                                </span>
                            </div>
                        </template>
                    </el-card>
                </template>
                <template #reference>
                    <el-button type="primary" @click="proBtnClick">问题修复（teleported:false）</el-button>
                </template>
            </el-popover>

            <el-popover placement="bottom" :width="500" trigger="click" :visible="popoverVisible">
                <template #default>
                    <div ref="elPopoverFilterCardWrapDivRef">
                        <el-card style="max-width: 500px;border:0px solid red;--el-card-border-color:#ffffff"
                            shadow="never">
                            <template #header>
                                <div class="card-header">
                                    <span style="font-weight: bold;font-size: large;">筛选</span>
                                </div>
                            </template>

                            <el-form ref="taskRef">
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item prop="itemCode" style="margin-left: 10px;">
                                            <el-select v-model="form.type" placeholder="" :teleported="true"
                                                placement="bottom">
                                                <el-option v-for="dict in type_dic" :key="dict.value"
                                                    :label="dict.label" :value="dict.value"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>

                            <template #footer>
                                <div style="display: flex;justify-content:space-between">
                                    <span>
                                        <el-button @click="cancel" link>取 消</el-button>
                                        <el-button type="primary" @click="submitFilterForm">确 定</el-button>
                                    </span>
                                </div>
                            </template>
                        </el-card>
                    </div>
                </template>
                <template #reference>
                    <el-button type="primary" @click="proBtnClick">优雅解决</el-button>
                </template>
            </el-popover>

            <el-popover placement="bottom" :width="500" trigger="click" :visible="popoverVisibleNew">
                <template #default>
                    <div ref="elPopoverFilterCardWrapDivNewRef">
                        <el-card style="max-width: 500px;border:0px solid red;--el-card-border-color:#ffffff"
                            shadow="never">
                            <template #header>
                                <div class="card-header">
                                    <span style="font-weight: bold;font-size: large;">筛选</span>
                                </div>
                            </template>

                            <el-form ref="taskRef">
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item prop="itemCode" style="margin-left: 10px;">
                                            <el-select v-model="form.type" placeholder="" :teleported="true"
                                                placement="bottom">
                                                <el-option v-for="dict in type_dic" :key="dict.value"
                                                    :label="dict.label" :value="dict.value"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="12">
                                        <el-form-item>
                                            <el-date-picker id="itemValueDataPickerId" v-model="form.itemValue"
                                                type="datetimerange" range-separator="到" start-placeholder="开始时间"
                                                end-placeholder="结束时间" :shortcuts="shortcuts" :teleported="true" />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>

                            <template #footer>
                                <div style="display: flex;justify-content:space-between">
                                    <span>
                                        <el-button @click="cancelNew" link>取 消</el-button>
                                        <el-button type="primary" @click="submitFilterFormNew">确 定</el-button>
                                    </span>
                                </div>
                            </template>
                        </el-card>
                    </div>
                </template>
                <template #reference>
                    <el-button type="primary" @click="proNewBtnClick">新的问题：el-date-picker</el-button>
                </template>
            </el-popover>

            <el-popover placement="bottom" :width="500" trigger="click" :visible="popoverVisibleFinal">
                <template #default>
                    <div ref="elPopoverFilterCardWrapDivFinalRef">
                        <el-card style="max-width: 500px;border:0px solid red;--el-card-border-color:#ffffff"
                            shadow="never">
                            <template #header>
                                <div class="card-header">
                                    <span style="font-weight: bold;font-size: large;">筛选</span>
                                </div>
                            </template>

                            <el-form ref="taskRef">
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item prop="itemCode" style="margin-left: 10px;">
                                            <el-select v-model="form.type" placeholder="" :teleported="true"
                                                placement="bottom">
                                                <el-option v-for="dict in type_dic" :key="dict.value"
                                                    :label="dict.label" :value="dict.value"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="12">
                                        <el-form-item>
                                            <el-date-picker id="itemValueDataPickerId"
                                                popper-class="ItemValueDataPickerPopoverVitualClass"
                                                v-model="form.itemValue" type="datetimerange" range-separator="到"
                                                start-placeholder="开始时间" end-placeholder="结束时间" :shortcuts="shortcuts"
                                                :teleported="true" />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>

                            <template #footer>
                                <div style="display: flex;justify-content:space-between">
                                    <span>
                                        <el-button @click="cancelFinal" link>取 消</el-button>
                                        <el-button type="primary" @click="submitFilterFormFinal">确 定</el-button>
                                    </span>
                                </div>
                            </template>
                        </el-card>
                    </div>
                </template>
                <template #reference>
                    <el-button type="success" @click="proFinalBtnClick">最终优雅解决</el-button>
                </template>
            </el-popover>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref, toRefs, nextTick } from 'vue';

const popoverVisible = ref(false)
const popoverVisibleNew = ref(false)
const popoverVisibleFinal = ref(false)

const data = reactive({
    form: { type: '' }
})
const { form } = toRefs(data);

function proBtnClick(e) {
    popoverVisible.value = true
    e.stopPropagation();
}

function proNewBtnClick(e) {
    popoverVisibleNew.value = true
    e.stopPropagation();
}

function proFinalBtnClick(e) {
    popoverVisibleFinal.value = true
    e.stopPropagation();
}

function showSourceCode(e) {
    window.open('https://github.com/zhonghuitech/vfg/blob/main/playground/src/pages/PopoverDemo.vue', '_blank');
    e.stopPropagation();
}

const elPopoverFilterCardWrapDivRef = ref(null)
const elPopoverFilterCardWrapDivNewRef = ref(null)
const elPopoverFilterCardWrapDivFinalRef = ref(null)

function submitFilterForm() {
    console.log('submit')
    popoverVisible.value = false
}

function cancel() {
    popoverVisible.value = false
}

function cancelNew() {
    popoverVisibleNew.value = false
} 

function submitFilterFormNew() {
    popoverVisibleNew.value = false
}

function cancelFinal() {
    popoverVisibleFinal.value = false
}

function submitFilterFormFinal() {
    popoverVisibleFinal.value = false
}

const type_dic = [{
    label: '等于',
    value: 'eq',
}, {
    label: '不等',
    value: 'ne',
}, {
    label: '=',
    value: 'eq',
    isnumber: true
},
{
    label: '<',
    value: 'lt',
    isnumber: true
},
{
    label: '<=',
    value: 'le',
    isnumber: true
},
{
    label: '>',
    value: 'gt',
    isnumber: true
},
{
    label: '>=',
    value: 'ge',
    isnumber: true
}, {
    label: '包含',
    value: 'like'
}, {
    label: '为空',
    value: 'isnull'
}, {
    label: '非空',
    value: 'notnull'
}, {
    label: '区间',
    value: 'bt',   // 在一个时间区间
    isdatetime: true
}, {
    label: '含有其一',
    value: 'in',
    ismultiple: true
}, {
    label: '排除所有',
    value: 'notin',
    ismultiple: true
}]

const shortcuts = [
    {
        text: '前一天',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setDate(start.getDate() - 1)
            return [start, end]
        },
    },
    {
        text: '前一周',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setDate(start.getDate() - 7)
            return [start, end]
        },
    },
    {
        text: '前一月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 1)
            return [start, end]
        },
    },
    {
        text: '前三月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 3)
            return [start, end]
        },
    },
]

const isPopoverChildComponent = (element, parent) => {
    if (element && element.classList) {
        if (element.classList.contains('ItemValueDataPickerPopoverVitualClass')) {
            console.log('ItemValueDataPickerPopoverVitualClass')
            return true;
        }
    }

    if (element === parent) {
        // ref 只能作用于原生 html 组件上，不能在 el-card 之上，所以只能在 el-card 上包一层。
        console.log(element)
        return true;
    }
    if (element.parentElement) {
        return isPopoverChildComponent(element.parentElement, parent);
    }
    return false;
};

const handleGlobalClick = (event) => {
    nextTick(() => {
        // debugger
        if (isPopoverChildComponent(event.target, elPopoverFilterCardWrapDivRef.value)) {
            console.log('点击发生在 Popover 或其子组件上');
        } else {
            console.log('点击发生在 Popover 之外');
            popoverVisible.value = false
        }

        if (isPopoverChildComponent(event.target, elPopoverFilterCardWrapDivNewRef.value)) {
            console.log('点击发生在 Popover2 或其子组件上');
        } else {
            console.log('点击发生在 Popover2 之外');
            popoverVisibleNew.value = false
        }

        if (isPopoverChildComponent(event.target, elPopoverFilterCardWrapDivFinalRef.value)) {
            console.log('点击发生在 Popover3 或其子组件上');
        } else {
            console.log('点击发生在 Popover2 之外');
            popoverVisibleFinal.value = false
        }
    });
};

const registerGlobalClick = () => {
    window.addEventListener('click', handleGlobalClick);
};

const unregisterGlobalClick = () => {
    window.removeEventListener('click', handleGlobalClick);
};

onMounted(() => {
    // 组件挂载时注册全局点击事件
    registerGlobalClick();
});

onUnmounted(() => {
    // 组件卸载时取消注册全局点击事件
    unregisterGlobalClick();
});

</script>