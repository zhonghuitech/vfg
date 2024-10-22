<script setup>
import { markRaw, computed } from 'vue';
import { parseToComponent } from '/~/js/SFCLoader';
const props = defineProps({
    sfc: String
})
const parsedComponent = computed(() => markRaw(parseToComponent(props.sfc)));
</script>

<template>
    <div>
        <parsedComponent />
    </div>
</template>