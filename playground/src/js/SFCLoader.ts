import * as Vue from 'vue';
// @ts-ignore
import { loadModule } from 'vue3-sfc-loader';

function randomString(length: number) {
    var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i)
        result += str[Math.floor(Math.random() * str.length)];
    return result;
}

export function parseToComponent(sfcString: string) {
    const id = randomString(8);
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