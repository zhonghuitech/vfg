import TestButton from "./button/index.vue";
import FormGenerator from "./form/FormGenerator.vue"
import type { App, Plugin } from 'vue';

// 按需引入
export { TestButton, FormGenerator };

const component = [TestButton, FormGenerator];

const VFG = {
    install(app: App) {
        component.forEach((item: any) => {
            app.component(item.name, item);
        });
    },
};

export { VFG };