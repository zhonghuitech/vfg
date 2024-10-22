<script setup>
import { markRaw } from 'vue';
import { parseToComponent, parseToAsync } from './utils/loader';
import { demoSfcStr, demoSfcStr2 } from "./utils/demo"
import { generate, generateAsyncComponent } from "./utils/generate";

const props = defineProps({
    settings: Object
})

const sfcString = generate(props.settings);
const sfgParsed = parseToAsync(sfcString)
console.log(sfgParsed)

const parsedComponent = markRaw(parseToComponent(demoSfcStr2));
</script>

<template>
    <div>
        <parsedComponent />
    </div>
</template>