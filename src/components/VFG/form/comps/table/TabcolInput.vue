<template>
    <el-form size="small">
        <el-form-item>
            <el-row>
                <draggable v-model="dragList" :animation="340" ghostClass="ghost" @end="onEnd">
                    <div v-for="(item, index) in dragList" :key="item.id">
                        <div style="display: flex;margin-top: 5px">
                            <div class="select-line-icon option-drag">
                                <el-icon>
                                    <Operation />
                                </el-icon>
                            </div>
                            <el-input v-model="item.label"
                                style="margin-left: 5px;margin-right: 5px;max-width:120px;"></el-input>
                            <el-input v-model="item.prop" style="margin-left: 5px;margin-right: 5px;" />

                            <div style="display:flex;align-items: center;cursor: pointer;">
                                <el-icon>
                                    <Edit />
                                </el-icon>
                                <el-icon style="margin-right: 5px; margin-left: 5px;">
                                    <Plus @click="addItem(index)"/>
                                </el-icon>
                                <el-icon>
                                    <Minus @click="delItem(index)" />
                                </el-icon>
                            </div>
                        </div>
                    </div>
                </draggable>
            </el-row>
        </el-form-item>
        <el-form-item style="margin-top: 20px;">
            <el-button @click.prevent="addItem" type="primary" link>添加选项</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { ref, defineComponent, watch, reactive } from "vue";
import { deepClone, isNumberType } from "/@/components/VFG/form/utils/func";
import { Remove } from "@element-plus/icons-vue";

export default defineComponent({
    name: "TabcolInput",
    emits: ["update:modelValue"],
    props: ["modelValue", "defaultvalue"],
    components: { Remove },
    setup(props, ctx) {
        let modelValue = props.modelValue || {};
        const current = ref(modelValue.type || '');
        const header = reactive(deepClone(modelValue.header));
        const dragList = ref(header)

        // console.log(header)
        // console.log(dragList.value)

        const addItem = function (index) {
            let cont = header.length + 1
            console.log(header)
            console.log(index)
            const addItem = { label: "选项" + cont, prop: "" + cont };
            header.splice(index + 1, 0, addItem);
        };

        const delItem = function (index) {
            console.log(index)
            header.splice(index, 1);
            // dragList.value.splice(index, 1)
        };

        watch([header, current], () => {
            console.log('变动事件...')
            dragList.value = []
            header.forEach((item, index) => {
                dragList.value[index] = item
            })
            ctx.emit("update:modelValue", {
                type: current.value,
                tag: props.modelValue.tag,
                header,
            });
        });

        const onEnd = function (obj) {
            dragList.value.forEach((item, index) => {
                header[index] = item
            })
        };

        return { header, addItem, delItem, current, onEnd, dragList };
    },
});
</script>

<style></style>