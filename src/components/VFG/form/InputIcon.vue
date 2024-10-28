<template>
  <el-dialog v-model="dialogTableVisible" width="980px" @open="scrollToActive">
    <template #header>
      <el-form ref="refForm" size="large" label-position="right" label-width="100">
        <el-form-item :show-label="true" label-width="100" label="选择图标" prop="key">
          <el-input v-model="key" placeholder="请输入图标名称" prefix-icon="search" type="text" clearable :autofocus="true" />
        </el-form-item>
      </el-form>
    </template>

    <el-scrollbar height="400px">
      <ul ref="iconWrap" class="icon-ul">
        <li v-for="icon in iconList" :key="icon" :class="setIcon === icon ? 'active-item' : ''" @click="onSelect(icon)">
          <el-icon>
            <component :is="icon" />
          </el-icon>
          <div>{{ icon }}</div>
        </li>
      </ul>
    </el-scrollbar>
  </el-dialog>

  <el-input v-model="setIcon" placeholder="请输入内容">{{ dialogTableVisible }}
    <template #append>
      <el-button :icon="setIcon" @click="dialogTableVisible = true">选择</el-button>
    </template>
  </el-input>
</template>
<script>
import iconListOrigin from "./icon.json";
import { defineComponent, nextTick, ref, watch } from "vue";

export default defineComponent({
  name: "input-icon",
  props: ["modelValue"],
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const key = ref("");
    const dialogTableVisible = ref(false);
    const setIcon = ref(props.modelValue);
    const iconList = ref(iconListOrigin.map((name) => `${name}`))

    watch(key, () => {
      iconList.value = key.value ? iconListOrigin.filter((name) => name.indexOf(key.value) > -1)
        : iconListOrigin.map((name) => `${name}`)
    });

    const onOpen = function () {
      this.key = "";
      this.scrollToActive();
    };

    const onSelect = function (icon) {
      setIcon.value = icon;
      ctx.emit("update:modelValue", icon);
    };
    const scrollToActive = async function () {
      await nextTick();
      const $activeItem = document.getElementsByClassName("active-item")[0];
      $activeItem && $activeItem.scrollIntoView && $activeItem.scrollIntoView();
    };

    return {
      iconList,
      key,
      onOpen,
      scrollToActive,
      onSelect,
      setIcon,
      dialogTableVisible,
    };
  },
});
</script>
<style lang="scss" scoped>
.icon-ul {
  margin: 0;
  padding: 0;
  font-size: 0;

  li {
    list-style-type: none;
    text-align: center;
    font-size: 14px;
    display: inline-block;
    width: 16.66%;
    box-sizing: border-box;
    height: 108px;
    padding: 15px 6px 6px 6px;
    cursor: pointer;
    overflow: hidden;

    &:hover {
      background: #f2f2f2;
    }

    &.active-item {
      background: #e1f3fb;
      color: #7a6df0;
    }

    >i {
      font-size: 30px;
      line-height: 50px;
    }
  }
}

.icon-dialog {
  ::v-deep(.el-dialog) {
    border-radius: 8px;
    margin-bottom: 0;
    margin-top: 4vh !important;
    display: flex;
    flex-direction: column;
    max-height: 92vh;
    overflow: hidden;
    box-sizing: border-box;

    .el-dialog__header {
      padding-top: 14px;
    }

    .el-dialog__body {
      margin: 0 20px 20px 20px;
      padding: 0;
      overflow: auto;
    }
  }
}
</style>
