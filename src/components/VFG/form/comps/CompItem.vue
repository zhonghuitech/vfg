<script setup>
import { computed, defineAsyncComponent } from 'vue'

const props = defineProps({
    component: {
        type: Object,   // is  props 两个属性
        required: true
    }
})

//  '/src/components/VFG/form/comps/demoComp'
//  '@/components/VFG/form/comps/demoComp'
//  'demoComp'
// 转化为正确的： /src/components/VFG/form/comps/demoComp
function getFullComponetAddress(is) {
    let comAddress = is;
    if (is.startsWith('@')) {
        comAddress = comAddress.replace('@', '/src')
    } else if (!is.includes('/')) {
        comAddress = '/src/components/VFG/form/comps/' + is
    } else if (!is.startsWith('/src')) {
        comAddress = (is.startsWith('/') ? '' : '/') + (is.startsWith('src') ? '' : 'src') + + is
    }

    return comAddress.endsWith('.vue') ? comAddress : comAddress + '.vue'
}

const is = computed(() =>
    defineAsyncComponent(() => import( /* @vite-ignore */getFullComponetAddress(props.component.is)))
)

</script>

<template>
    <component :is="is" v-bind="component.props" />
</template>