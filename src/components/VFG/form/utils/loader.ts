import * as Vue from 'vue';
import { loadModule } from 'vue3-sfc-loader';
import { randomString } from "./func"
import {
	parse as sfc_parse,
	compileStyleAsync as sfc_compileStyleAsync,
	compileScript as sfc_compileScript,
	compileTemplate as sfc_compileTemplate,
} from '@vue/compiler-sfc'

export const demoSfcStr = `
      <template>
        <span class="example">{{ msg }}</span>
      </template>
      <script>
        export default {
          data () {
            return {
              msg: 'world!'
            }
          }
        }
      </script>

      <style scoped>
        .example {
          color: red;
        }
      </style>
      `

export function parseToComponent(sfcString: string) {
    const id = randomString(5);
    const options = {
        moduleCache: { vue: Vue },
        async getFile(url: string) {
            return Promise.resolve(sfcString);
        },
        addStyle(styleString: string) {
            let style = document.getElementById(id);
            if (!style) {
                style = document.createElement('style');
                style.setAttribute('id', id);
                const ref = document.head.getElementsByTagName('style')[0] || null;
                document.head.insertBefore(style, ref);
            }
            style.textContent = styleString;
        }
    };
    const component = loadModule(`${id}.vue`, options);
    return Vue.defineAsyncComponent(() => component);
}

export function parseToAsync(sfcString: string) {
  const { descriptor, errors } = sfc_parse(sfcString, {
		filename: "abc.vue",
		sourceMap: true,
	});
  console.log(descriptor)
  console.log(errors)
}
