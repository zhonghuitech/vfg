import DemoButton from "./button/index.vue";

// 按需引入
export { DemoButton };

const component = [DemoButton];

const FormGenerator = {
    install(App) {
        component.forEach((item) => {
            App.component(item.name, DemoButton);
        });
    },
};

export default FormGenerator;