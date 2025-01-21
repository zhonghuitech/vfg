<template>
    <div style="margin: 20px;display:flex;flex-direction:column">
        <div>
            <span style="font-size: 30px;">el-popover内有select时在选择后会自动关闭示例</span>
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
        </div>
    </div>
</template>

<script setup>
import { computed, reactive, ref, toRefs } from 'vue';

const popoverVisible = ref(false)
const data = reactive({
    form: { type: '' }
})
const { form } = toRefs(data);

function submitFilterForm() {
    console.log('submit')
    popoverVisible.value = false
}

function cancel() {
    popoverVisible.value = false
}

function proBtnClick() {
    popoverVisible.value = true
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

</script>