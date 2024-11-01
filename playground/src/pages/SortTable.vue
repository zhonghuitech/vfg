<template>
    <div>
        <el-row style="margin-top:50px" align="middle" group="componentsGroup" animation="340" :gutter="24">
            <el-col :span="12">
                <div style="display: flex;align-items: center;justify-content: center;margin-bottom: 10px;">
                    <span style="color: orange;">实际效果</span>
                </div>

                <el-table ref="tabA" class="elTable" :data="dList">
                    <el-table-column label="排序号" width="150px" align="center" fixed prop="num">
                        <template #default="scope">
                            <div style="display: flex; align-items: center" :attrabc="scope.row.num" class="attrabcccc">
                                <span style="margin-left: 10px">{{ scope.row.num }}</span>
                            </div>
                        </template>
                    </el-table-column>
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
            <el-button style="margin-left: 50px;margin-top: 20px;" type="warning" icon="WarningFilled"
                @click="savAction(false)">提交排序</el-button>
            <el-button style="margin-left: 20px;margin-top: 20px;" type="success" icon="SuccessFilled"
                @click="savAction(true)">提交排序（修复后）</el-button>
            <el-button style="margin-left: 20px;margin-top: 20px;" icon="RefreshLeft" @click="iniData" circle />
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
const newList = ref(initArr)  // newList 永远保持最新拖拽完后的排序
const dList = ref(initArr.map(i => i))

const sortInstance = ref(null)
const tabA = ref(null)
const tabB = ref(null)

const iniData = () => {
    newList.value = initArr
    dList.value = initArr.map(i => i)
    forceReoderChild()
}

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
        draggable: '.el-table__row',
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

const handleUpdate = (row) => {
}

const handleDelete = (row) => {
}

onMounted(() => {
    initSort()
})

// 强制原生排序
const forceReoderChild = () => {
    // 找到所有 children
    const childCols = document.querySelectorAll('.attrabcccc')
    let sortArr = []
    // 找到 list 的排序值，按这个值重新排序下这个 children
    // 举例： 2 3 1 4 7
    for (let i = 0; i < childCols.length; i++) {
        sortArr[i] = parseInt(childCols[i].attributes['attrabc'].value)
    }
    const sortedArr = sortArr.map(i => i).sort((a, b) => {
        return a < b ? -1 : (a > b ? 1 : 0)
    })
    // 重新排序后找到真正的下标
    let sortedArrMap = {}
    sortedArr.forEach((item, idx) => {
        sortedArrMap[item] = idx
    })

    // sortedArray 为最后排序好的数组
    let sortedArray = []
    const rootEl = sortInstance.value.el;
    sortArr.forEach((item, idx) => {
        const idxOri = sortedArrMap[item]
        sortedArray[idxOri] = rootEl.children[idx]
    })

    // 删除原数组数据
    for (let i = 0; i < rootEl.children.length; i++) {
        rootEl.removeChild(rootEl.children[i])
    }

    // 将排序好的数组 append 到 rootEl
    sortedArray.forEach((item, idx) => {
        rootEl.appendChild(item)
    })
}

const savAction = (forceReorder) => {
    console.log('save action')

    const reOrList = toRaw(newList.value).map((item, idx) => {
        return {
            num: idx + 1,
            name: item.name
        }
    })
    newList.value = reOrList
    dList.value = reOrList

    if (forceReorder) {
        forceReoderChild()
    }
}

const onEnd = (item) => {
    const newIdx = item.newIndex
    const oldIdx = item.oldIndex
    // 生成新的排序后列表
    const newOrderList = toRaw(newList.value).map(item => item)
    const currentRow = newOrderList.splice(oldIdx, 1)[0]
    newOrderList.splice(newIdx, 0, currentRow)

    newList.value = newOrderList
    // dList.value = newOrderList
}
</script>

<style></style>