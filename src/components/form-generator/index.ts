import TestButton from "./button/index.vue";
import FormGenerator from "./form/FormGenerator.vue"

// 按需引入
export { TestButton, FormGenerator };

const component = [TestButton, FormGenerator];

const FormBuilder = {
    install(App) {
        component.forEach((item) => {
            App.component(item.name, item);
        });
    },
};

export default FormBuilder;