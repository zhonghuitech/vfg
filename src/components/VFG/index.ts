import TestButton from "./button/index.vue";
import FormGenerator from "./form/FormGenerator.vue"
import type { App, Plugin } from 'vue';
import OptionInput from "./form/comps/OptionInput.vue";
import UploadWrap from "./form/comps/UploadWrap.vue";
import TabcolInput from "./form/comps/table/TabcolInput.vue";
import VfgTable from "/@/components/VFG/form/comps/table/VfgTable.vue"
import VfgTreeSelect from "/@/components/VFG/form/comps/VfgTreeSelect.vue"

// 按需引入
export { TestButton, FormGenerator, OptionInput, UploadWrap, TabcolInput, VfgTable, VfgTreeSelect };

const component = [TestButton, FormGenerator, UploadWrap, OptionInput, TabcolInput, VfgTable, VfgTreeSelect];

const VFG = {
    install(app: App) {
        component.forEach((item: any) => {
            app.component(item.name, item);
        });
    },
};

export { VFG };