<template>
    <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">
        <el-table-column v-if="showSelection" type="selection" width="55" align="center" />
        <el-table-column v-for="item in filterHeader(true)" :label="item.label" :align="item.align || 'center'"
            :prop="item.prop">
            <template #default="scope">
                <!-- <dict-tag v-if="item.type === 'dict'" :options="optionsDict[item.dictKey]" :value="scope.row[item.prop]"
                    debugger /> -->
                <el-button v-if="item.type === 'link'" type="primary" link @click="item.action(scope.row)">{{
                    scope.row[item.prop] }}</el-button>
                <CompItem v-else-if="item.type === 'comp'" :component="buildCompProps(item, scope.row)"></CompItem>
                <!-- <image-preview v-else-if="item.type === 'image'" :src="scope.row[item.prop]" :width="50" :height="50" /> -->
                <span v-else>{{ scope.row[item.prop] }}</span>
            </template>
        </el-table-column>
        <el-table-column v-for="item in filterHeader(false)" :label="item.label || '操作'" :align="item.align || 'center'"
            class-name="small-padding fixed-width" :fixed="item.fixed">
            <template #default="scope">
                <el-button v-for="btn in item.data" :type="btn.style.type" :link="btn.style.link" :icon="btn.style.icon"
                    @click="btn.action(scope.row)">{{ btn.label }}</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import CompItem from './CompItem.vue'
import CircleCloseFilled from 'element-plus'
import { defineComponent, computed, ref, watch, reactive } from "vue";

export default defineComponent({
    name: "VfgTable",
    emits: ["update:modelValue"],
    components: { CircleCloseFilled, CompItem },
    props: ["dataList", "header", "loading", "selection-change", "showSelection"],
    setup(props, ctx) {
        console.log(props)
        function handleSelectionChange(selection) {
            ctx.emit('selection-change', selection)
        }

        function filterHeader(isDataHeader = true) {
            return props.header.filter((item) => {
                return (item.type == 'action' && !isDataHeader)
                    || (item.type !== 'action' && isDataHeader)
            })
        }

        function buildCompProps(header, row) {
            return {
                is: header.comp,
                props: {
                    value: row[header.prop],
                    row: row,
                }
            }
        }

        return {
            handleSelectionChange, filterHeader, buildCompProps
        }
    }
})
</script>