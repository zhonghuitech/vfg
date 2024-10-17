import TestButton from "./button/index.vue";
import FormGenerator from "./form/FormGenerator.vue"
import type { App, Plugin } from 'vue';
import OptionInput from "./form/OptionInput.vue";
import UploadWrap from "./form/elementWarp/UploadWrap.vue";
import { request } from "./core/request";

// 按需引入
export { TestButton, FormGenerator, OptionInput, UploadWrap, request };

const component = [TestButton, FormGenerator, UploadWrap, OptionInput];

const VFG = {
    install(app: App) {
        component.forEach((item: any) => {
            app.component(item.name, item);
        });
    },
};

export { VFG };