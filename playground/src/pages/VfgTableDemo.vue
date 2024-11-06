<template>
    <div>
        <VfgTable v-bind="vm"></VfgTable>
        <div style="display: flex;align-items: center;justify-content: center;margin-top: 10px;">
            <el-button style="margin-left: 50px;margin-top: 20px;" type="primary" icon="WarningFilled"
                @click="changAction">修改</el-button>
        </div>
    </div>
</template>

<script setup>
import VfgTable from "/@/components/VFG/form/comps/table/VfgTable.vue"
import { computed, ref, watch, inject, reactive } from "vue";

const vm = ref({
    dataList: [
        {
            "id": 1,
            "name": "张三"
        }
    ],
    header: [
        {
            label: '编号',
            prop: 'id'
        }, {
            label: '姓名',
            prop: 'name'
        }
    ],
    loading: false,
    showSelection: true
})

const changAction = () => {
    vm.value.header = [
        {
            label: '编号',
            prop: 'id'
        }, {
            label: '地址',
            prop: 'address'
        }
    ]
}
</script>