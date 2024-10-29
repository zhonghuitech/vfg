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
                            <el-input v-model="item.key"
                                style="margin-left: 5px;margin-right: 5px;max-width:120px;"></el-input>
                            <el-input v-model="item.value" style="margin-left: 5px;margin-right: 5px;" />
                            
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
        const isNumberValueType = ref(false)
        const current = ref(props.modelValue.type);
        const staticData = reactive(deepClone(props.modelValue.staticData));
        const dynamicData = reactive(deepClone(props.modelValue.dynamicData));
        const dragList = ref(staticData)

        if (staticData.length > 0) {
            isNumberValueType.value = isNumberType(staticData[0].value)
        }

        // console.log(staticData)
        // console.log(dragList.value)

        const addItem = function () {
            let cont = staticData.length + 1
            console.log(staticData)

            if (isNumberValueType.value) {
                staticData.forEach(item => {
                    if (isNumberType(item.value) && item.value >= cont) {
                        cont = item.value + 1;
                    }
                })
            }
            const addItem = { key: "选项" + cont, value: isNumberValueType.value ? cont : "" + cont };
            staticData.push(addItem);
            //dragList.value.push(addItem)
            console.log(staticData)
        };

        const delItem = function (index) {
            console.log(index)
            staticData.splice(index, 1);
            // dragList.value.splice(index, 1)
        };

        watch([dynamicData, staticData, current], () => {
            console.log('变动事件...')
            dragList.value = []
            staticData.forEach((item, index) => {
                dragList.value[index] = item
            })
            ctx.emit("update:modelValue", {
                type: current.value,
                tag: props.modelValue.tag,
                staticData,
                dynamicData,
            });
        });

        const onEnd = function (obj) {
            dragList.value.forEach((item, index) => {
                staticData[index] = item
            })
        };

        return { staticData, addItem, delItem, dynamicData, current, onEnd, dragList, isNumberValueType };
    },
});
</script>

<style></style>