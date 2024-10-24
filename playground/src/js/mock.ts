export const mockData = `
    <template>
        <div>
            <div style="padding:10px">
                <el-text class="mx-1" size="large">Hello Word! </el-text>
                <el-text class="mx-1" type="success" size="large"> {{cnt}}</el-text>
            </div>
            <el-button @click="countFun" type="primary" icon="Plus" plain>Click</el-button>
        </div>
    </template>
    <script setup>
    import { computed, ref } from "vue"
    const cnt = ref(1)
    const countFun = () => {
        cnt.value = cnt.value + 1
    }
    </script>
`