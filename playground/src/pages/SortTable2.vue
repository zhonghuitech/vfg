<template>
    <div>
        <el-table :data="dList" v-dragable="dragOptions">
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
        <el-button style="margin-left: 50px;margin-top: 20px;" type="primary" @click="savAction">Save2</el-button>
    </div>
</template>

<script setup>
import { onMounted, ref, toRaw } from "vue"
import { vDragable } from "element-plus-table-dragable"; 

const dragOptions = [
    {
        selector: "thead tr", // add drag support for column
        option: { // sortablejs's option
            animation: 150,
            onEnd: (evt) => {
                /* you can define a 'columns' ref 
                and use v-for render it in table's slot. 
                then you can change index of the item in 'column' here 
                to implement drag column to sort */
                console.log(evt.oldIndex, evt.newIndex);
            },
        },
    },
    {
        selector: "tbody", // add drag support for row
        option: { // sortablejs's option
            animation: 150,
            onEnd: (evt) => {
                onEnd(evt);
            },
        },
    },
];

const initArr = [
    { num: 1, name: "N1" },
    { num: 2, name: "N2" },
    { num: 3, name: "N3" },
    { num: 4, name: "N4" },
    { num: 5, name: "N5" },
]
const newList = ref(initArr)
const dList = ref(initArr.map(i => i))


const handleUpdate = (row) => {
}

const handleDelete = (row) => {
}

onMounted(() => {
})

const savAction = () => {
    console.log('save action')
    const reOrList = toRaw(newList.value).map((item, idx) => {
        return {
            num: idx + 1,
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