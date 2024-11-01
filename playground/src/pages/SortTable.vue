<template>
    <div>
        <el-table class="elTable" :data="dList">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="排序号" width="150px" align="center" fixed prop="num" />
            <el-table-column label="姓名" fixed align="center" prop="name" />
            <el-table-column label="操作" align="center" fixed="right" width="150px"
                class-name="small-padding fixed-width">
                <template #default="scope">
                    <el-button type="primary" link icon="Edit" @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button type="danger" link icon="Delete" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

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
    const table = document.querySelector(".elTable .el-table__body-wrapper tbody");
    console.log(table)
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

const handleUpdate = (row) => {
}

const handleDelete = (row) => {
}

onMounted(() => {
    initSort()
})

const savAction = () => {
    console.log('save action')
    const reOrList = toRaw(newList.value).map((item, idx) => {
        return {
            num: idx + 10,
            name: item.name
        }
    })
    console.log('最新值')
    console.log(reOrList)
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
.el-table__row {
    cursor: move;
}

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