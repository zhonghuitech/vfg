

const sfcContent = `
<template>
      <el-form ref="refForm" :model="formData" size="default" label-position="right" wrap-style="none" label-width="100" :rules="rules">
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
        <el-form-item>
            <el-button type="primary" @click="postData(refForm)">确定</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import {
    ref,
    reactive
} from "vue";
// import {
//     ElMessage
// } from 'element-plus'
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
    ElementPlus.ElMessage.success("操作成功!");
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
            ElementPlus.ElMessage.success("操作成功!");
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
</script>`

export { sfcContent }
