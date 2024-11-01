<template>
    <div>
        <el-row style="margin-top:50px" align="middle" group="componentsGroup" animation="340" :gutter="24">
            <el-col :span="12">
                <div style="display: flex;align-items: center;justify-content: center;margin-bottom: 10px;">
                    <span style="color: orange;">实际效果</span>
                </div>

                <el-table ref="tabA" class="elTable" :data="dList">
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
            </el-col>
            <el-col :span="12" style="border-left: 1px solid #409eff;">
                <div style="display: flex;align-items: center;justify-content: center;margin-bottom: 10px;">
                    <span style="color: green;">期望效果</span>
                </div>

                <el-table ref="tabB" :data="newList">
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
            </el-col>
        </el-row>

        <div style="display: flex;align-items: center;justify-content: center;margin-top: 10px;">
            <el-button style="margin-left: 50px;margin-top: 20px;" type="primary" @click="savAction">应用排序</el-button>
        </div>
    </div>

</template>

<script setup>
import Sortable from 'sortablejs';
import { onMounted, ref, toRaw, watch } from "vue"

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
const tabA = ref(null)
const tabB = ref(null)

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
            console.log('onstart...');
            console.log(sortInstance.value.toArray())
        },
        onSort: function (/**Event*/evt) {
            console.log('onsort...')
            console.log(sortInstance.value.toArray())
        },
        // 结束拖动事件
        onEnd: (item) => {
            console.log(item);
            console.log('oldIdx=' + item.oldIndex + ', newIdx=' + item.newIndex)
            onEnd(item)
        },
    })
}

watch(dList, (old, newv) => {
    console.log('dList changed...')
})

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
            num: idx + 1,
            name: item.name
        }
    })
    newList.value = reOrList

    console.log('sortable 对象。。。（原生）')
    console.log(sortInstance.value)

    console.log('最新值')
    console.log(reOrList)
    dList.value = reOrList

    console.log('table 对象...(vue)')
    console.log(tabA.value)
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
    // dList.value = newOrderList
    console.log(tabA.value)
}

</script>

<style></style>