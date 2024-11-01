<template>
    <ul style="overflow: auto" class="infinite-list">
        <VueDraggable class="drawing-board" style="padding: 10px; height: 100%" v-model="dList" :animation="340"
            @end="onEnd">
            <li v-for="i in dList" :key="i" class="infinite-list-item">{{ i.name }} --- {{ i.num }}</li>
        </VueDraggable>
    </ul>
</template>

<script setup>
import { VueDraggable } from 'vue-draggable-plus'
import { ref, toRaw } from "vue"

const initArr = [
    { num: 1, name: "N1" },
    { num: 2, name: "N2" },
    { num: 3, name: "N3" },
    { num: 4, name: "N4" },
    { num: 5, name: "N5" },
]
const newList = ref(initArr)
const dList = ref(initArr.map(i => i))

const onEnd = (item) => {
    console.log('oldIdx=' + item.oldIndex + ', newIdx=' + item.newIndex)

    const newIdx = item.newIndex
    const oldIdx = item.oldIndex

    const newOrderList = toRaw(newList.value).map(item => item)
    const currentRow = newOrderList.splice(oldIdx, 1)[0]
    newOrderList.splice(newIdx, 0, currentRow)
    console.log('最新的orderList')
    console.log(newOrderList)
    console.log('原始 orderlist')
    console.log(initArr)
    newList.value = newOrderList

    const reOrList = newOrderList.map((item, idx) => {
        return {
            num: idx + 1,
            name: item.name
        }
    })
    dList.value = reOrList
}
</script>

<style>
.infinite-list {
    height: 300px;
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: var(--el-color-primary-light-9);
    margin: 10px;
    color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}
</style>