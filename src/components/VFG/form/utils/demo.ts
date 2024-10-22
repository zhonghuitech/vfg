export const demoSfcStr = `
      <template>
    <el-drawer title="导入表" v-model="visible" direction="rtl" size="50%">
        <el-form ref="refForm" :model="formData" size="default" label-position="right" wrap-style="drawer"
            label-width="100" :rules="rules">
            <el-row v-model="formData.field_J7PXe" :gutter="24" justify="start" align="middle" group="componentsGroup"
                class="drag-wrapper box" style="margin-left:0px;margin-right:0px" animation="340">
                <el-col v-model="formData.field_RVHil" :span="12"
                    style="min-height:100px;border-style:dotted;border-color:red" class="box">
                    <el-form-item :show-label="true" label-width="100" label="颜色拾取" prop="field_TpOpa">
                        <el-color-picker v-model="formData.field_TpOpa" size="default" color-format="rgb">
                        </el-color-picker>
                    </el-form-item> <el-form-item :show-label="true" label-width="100" label="单行文本" prop="field_r2Br2">
                        <el-input-number v-model="formData.field_r2Br2" placeholder="请输入" type="text">
                        </el-input-number>
                    </el-form-item>
                </el-col> <el-col v-model="formData.field_OpIxl" :span="12"
                    style="min-height:100px;border-style:dotted;border-color:red" class="box">
                    <el-form-item :show-label="true" label-width="100" label="评分" prop="field_njEfu">
                        <el-rate v-model="formData.field_njEfu">
                        </el-rate>
                    </el-form-item>
                </el-col>
            </el-row> <el-form-item :show-label="true" label-width="100" label="颜色拾取" prop="field_Hz0hV">
                <el-color-picker v-model="formData.field_Hz0hV" size="default" color-format="rgb">
                </el-color-picker>
            </el-form-item> <el-form-item :show-label="true" label-width="100" label="单行文本" prop="field_Ekubk">
                <el-input-number v-model="formData.field_Ekubk" placeholder="请输入" type="text">
                </el-input-number>
            </el-form-item> <el-form-item :show-label="true" label-width="100" label="评分" prop="field_n1qWF">
                <el-rate v-model="formData.field_n1qWF">
                </el-rate>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer"> <el-button type="primary" @click="postData(refForm)">确 定</el-button> <el-button
                    @click="cancel">取 消</el-button> </div>
        </template>
    </el-drawer>
</template>

<script>
import { ref, reactive } from "vue";
//import { ElMessage } from 'element-plus'
//import { request } from "vfg";

export default {
    components: {  },
    setup(props, context) {
        const formData = reactive({
            "field_J7PXe": [],
            "field_RVHil": [],
            "field_BXfIq": [],
            "field_TpOpa": "#000000",
            "field_r2Br2": 0,
            "field_OpIxl": [],
            "field_OW8yb": [],
            "field_njEfu": 3,
            "field_Hz0hV": "#000000",
            "field_Ekubk": 0,
            "field_n1qWF": 4
        });
        const UIData = reactive({});

        const rules = {}
        const refForm = ref(null)

        const postData = function (formEl) {
            formEl.validate((valid) => {
                if (valid === false) {
                    return false;
                }
                request({
                    url: 'undefined',
                    method: 'post',
                    data: formData
                }).then(res => {
                    console.log(res);
                    // ElMessage.success("操作成功!");
                });
            })
        }

        const visible = ref(true);

        function show() {
            visible.value = true;
        }

        function cancel() {
            visible.value = false;
        }

        return {
            formData,
            UIData,
            rules,
            refForm,
            postData,
            visible,
            show,
            cancel
        }
    }
}
</script>
      `



export const demoSfcStr2 = `
<template>
    <el-drawer title="导入表" v-model="visible" direction="rtl" size="50%">
        <el-form ref="refForm" :model="formData" size="default" label-position="right" wrap-style="drawer" label-width="100" :rules="rules">
            <el-row v-model="formData.field_J7PXe" gutter="24" justify="start" align="middle" group="componentsGroup" class="drag-wrapper box" style="margin-left:0px;margin-right:0px" animation="340">
                <el-col v-model="formData.field_RVHil" span="12" style="min-height:100px;border-style:dotted;border-color:red" class="box">
                    <el-form-item :show-label="true" label-width="100" label="颜色拾取" prop="field_TpOpa">
                        <el-color-picker v-model="formData.field_TpOpa" size="default" color-format="rgb">
                        </el-color-picker>
                    </el-form-item> <el-form-item :show-label="true" label-width="100" label="单行文本" prop="field_r2Br2">
                        <el-input-number v-model="formData.field_r2Br2" placeholder="请输入" type="text">
                        </el-input-number>
                    </el-form-item>
                </el-col> <el-col v-model="formData.field_OpIxl" span="12" style="min-height:100px;border-style:dotted;border-color:red" class="box">
                    <el-form-item :show-label="true" label-width="100" label="评分" prop="field_njEfu">
                        <el-rate v-model="formData.field_njEfu">
                        </el-rate>
                    </el-form-item>
                </el-col>
            </el-row> <el-form-item :show-label="true" label-width="100" label="颜色拾取" prop="field_Hz0hV">
                <el-color-picker v-model="formData.field_Hz0hV" size="default" color-format="rgb">
                </el-color-picker>
            </el-form-item> <el-form-item :show-label="true" label-width="100" label="单行文本" prop="field_Ekubk">
                <el-input-number v-model="formData.field_Ekubk" placeholder="请输入" type="text">
                </el-input-number>
            </el-form-item> <el-form-item :show-label="true" label-width="100" label="评分" prop="field_n1qWF">
                <el-rate v-model="formData.field_n1qWF">
                </el-rate>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer"> <el-button type="primary" @click="postData(refForm)">确 定</el-button> <el-button @click="cancel">取 消</el-button> </div>
        </template>
    </el-drawer>
</template>

<script setup>
import {
    ref,
    reactive
} from "vue";
import {
    ElMessage
} from 'element-plus'
// import {
//     request
// } from "vfg";
const formData = reactive({
    "field_J7PXe": [],
    "field_RVHil": [],
    "field_BXfIq": [],
    "field_TpOpa": "#000000",
    "field_r2Br2": 0,
    "field_OpIxl": [],
    "field_OW8yb": [],
    "field_njEfu": 3,
    "field_Hz0hV": "#000000",
    "field_Ekubk": 0,
    "field_n1qWF": 4
});
const UIData = reactive({});

const rules = {}
const refForm = ref(null)

const postData = function(formEl) {
    formEl.validate((valid) => {
        if (valid === false) {
            return false;
        }
        request({
            url: 'undefined',
            method: 'post',
            data: formData
        }).then(res => {
            console.log(res);
            // ElMessage.success("操作成功!");
        });
    })
}

const visible = ref(true);

function show() {
    visible.value = true;
}

function cancel() {
    visible.value = false;
}

defineExpose({
    show,
});
</script>
`