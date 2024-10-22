<script setup>
import { defineAsyncComponent } from 'vue/dist/vue.esm-bundler.js';
import { ElLoading } from 'element-plus'
import { generate, generateAsyncComponent } from "./utils/generate";

const props = defineProps({
    settings: Object
})

const AsyncComp = defineAsyncComponent(() =>
  import('./Demo.vue')
)

const AsyncCompAdmin = defineAsyncComponent({
    // the loader function
    loader: () => generateAsyncComponent(props.settings),

    // A component to use while the async component is loading
    loadingComponent: ElLoading,
    // Delay before showing the loading component. Default: 200ms.
    delay: 200,

    // A component to use if the load fails
    errorComponent: ElLoading,
    // The error component will be displayed if a timeout is
    // provided and exceeded. Default: Infinity.
    timeout: 3000
})
</script>

<template>
    <AsyncComp />
    <!-- <AsyncCompAdmin /> -->
</template>