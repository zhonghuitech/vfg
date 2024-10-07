import Button from "./button/index.vue";

// 按需引入
export { Button };

const component = [Button];

const FormGenerator = {
    install(App) {
        component.forEach((item) => {
            App.component(item.name, Button);
        });
    },
};

export default FormGenerator;