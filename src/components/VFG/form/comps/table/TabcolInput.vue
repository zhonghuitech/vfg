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
                                    <Plus />
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
        const staticData = reactive(deepClone(modelValue.staticData));
        const dragList = ref(staticData)

        // console.log(staticData)
        // console.log(dragList.value)

        const addItem = function () {
            let cont = staticData.length + 1
            console.log(staticData)
            const addItem = { label: "选项" + cont, prop: "" + cont };
            staticData.push(addItem);
        };

        const delItem = function (index) {
            console.log(index)
            staticData.splice(index, 1);
            // dragList.value.splice(index, 1)
        };

        watch([staticData, current], () => {
            console.log('变动事件...')
            dragList.value = []
            staticData.forEach((item, index) => {
                dragList.value[index] = item
            })
            ctx.emit("update:modelValue", {
                type: current.value,
                tag: props.modelValue.tag,
                staticData,
            });
        });

        const onEnd = function (obj) {
            dragList.value.forEach((item, index) => {
                staticData[index] = item
            })
        };

        return { staticData, addItem, delItem, current, onEnd, dragList };
    },
});
</script>

<style></style>