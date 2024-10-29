export interface CompItemType {
    __ID: string,               // 这个 ID 应用到页面上会被替换为随机生成的
    tag: string,                // 组件标识（英文），全局唯一
    tagIcon: string ,           // 组件图标, 对应 SVG文件 名
    name: string,               // 组件名
    __openRules: boolean, 
    __text: any,
    slots: object,
    props: object,              // 参数属性，不可编辑
    attrs: object,              // 属性，可编辑
    childrens: CompItemType[]   // 子组件
}