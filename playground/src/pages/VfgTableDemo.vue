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
import { computed, ref, watch, inject, reactive, onMounted } from "vue";
import Sortable from 'sortablejs';

const vm = ref({
    data: [
        {
            "id": 1,
            "name": "张三",
            "address": "中国人革载地有有有有有有有"
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
        , {
            label: '地址 1',
            prop: 'address'
        }
        , {
            label: '姓名',
            prop: 'address'
        }
        , {
            label: '姓名',
            prop: 'address'
        }
        , {
            label: '姓名',
            prop: 'address'
        }
        , {
            label: '姓名',
            prop: 'address'
        }
        , {
            label: '地址 1',
            prop: 'address'
        }
        , {
            label: '地址 1',
            prop: 'address'
        }
        , {
            label: '地址 1',
            prop: 'address'
        }
        , {
            label: '地址 1',
            prop: 'address'
        }
        , {
            label: '地址 9',
            prop: 'address'
        }
        , {
            label: '地址 9',
            prop: 'address'
        }
        , {
            label: '地址 9',
            prop: 'address'
        }
        , {
            label: '地址 9',
            prop: 'address'
        }
        , {
            label: '地址 9',
            prop: 'address'
        }
        , {
            label: '地址 9',
            prop: 'address'
        }
        , {
            label: '地址 9',
            prop: 'address'
        }
        , {
            label: '地址 9',
            prop: 'address'
        }
    ],
    loading: false,
    showSelection: true
})

const changAction = () => {
    // clearn()
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

const clearn = function () {
    localStorage.removeItem("settings");
};

console.log(Sortable.awaitingDragStarted)

onMounted(() => {
    document.addEventListener('touchmove', function (event) {
        // 先执行自己的逻辑，例如处理双指左右滑动事件
        // 可以添加双指左右滑动的判断和处理逻辑，这里是一个简单示例
        if (event.touches.length === 2) {
            // 这里添加双指左右滑动的具体处理逻辑
            console.log('双指左右滑动处理');
        }
        // 不调用 event.preventDefault() 以允许默认行为继续
        // 如果需要阻止默认行为，只在某些情况下调用 event.preventDefault()
    }, true); // 注意这里的 true，表示在捕获阶段添加事件监听器
})

</script>