<template>
    <div>
        <ul style="overflow: auto" class="infinite-list sortlist">
            <li v-for="i in dList" :key="i" class="infinite-list-item sortitem">{{ i.name }} --- {{ i.num }}</li>
        </ul>
        <el-button style="margin-left: 50px;margin-top: 20px;" type="primary" @click="savAction">Save</el-button>
    </div>
</template>

<script setup>
import Sortable from 'sortablejs';
import { onMounted, ref, toRaw } from "vue"

const initArr = [
    { num: 1, name: "N1" },
    { num: 2, name: "N2" },
    { num: 3, name: "N3" },
    { num: 4, name: "N4" },
    { num: 5, name: "N5" },
]
const newList = ref(initArr)
const dList = ref(initArr.map(i => i))
const sortInstance = ref(null)

const initSort = () => {
    console.log('init sort.........')
    const table = document.querySelector(".sortlist");
    sortInstance.value = new Sortable(table, {
        group: 'shared',
        animation: 150,
        ghostClass: 'sortable-ghost', //拖拽样式
        easing: 'cubic-bezier(1, 0, 0, 1)',
        store: null,
        onStart: (item) => {
            console.log(item);
        },
        onSort: function (/**Event*/evt) {
            console.log('onsort...')
        },
        // 结束拖动事件
        onEnd: (item) => {
            console.log(item);
            console.log('oldIdx=' + item.oldIndex + ', newIdx=' + item.newIndex)
            onEnd(item)
        },
    })
}

onMounted(() => {
    initSort()
})

const savAction = () => {
    console.log('save action')
    const reOrList = toRaw(newList.value).map((item, idx) => {
        return {
            num: idx + 1,
            name: item.name
        }
    })
    dList.value = reOrList
}

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
    cursor: move;
    background: var(--el-color-primary-light-9);
    margin: 10px;
    color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}
</style>