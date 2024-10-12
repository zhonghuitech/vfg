import DemoButton from "./button/index.vue";
import type { App, Plugin } from 'vue';

// 按需引入
export { DemoButton };

const component = [DemoButton];

const FormGenerator = {
    install(app: App) {
        component.forEach((item: any) => {
            app.component(item.name, DemoButton as any);
        });
    },
};

export default FormGenerator;