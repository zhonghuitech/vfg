<template>
  <div>
    <div class="container">
      <div class="left-board">
        <div class="logo-wrapper">
          <div class="logo">
            Vue3 Form Generator
            <a class="github" href="https://github.com/zhonghuitech/vfg" target="_blank">
              <img src="https://github.githubassets.com/pinned-octocat.svg" alt />
            </a>
          </div>
        </div>
        <el-scrollbar class="left-scrollbar">
          <!-- {{generate(settings)}} -->

          <page-panel @addComponent="addComponentAction"></page-panel>

          <div class="components-list"></div>
        </el-scrollbar>
      </div>

      <div class="center-board">
        <div class="action-bar">
          <div class="btn" @click="preViewCode">
            <el-icon>
              <video-play />
            </el-icon>生成
          </div>
          <div class="btn" @click="clearn()">
            <el-icon>
              <delete />
            </el-icon>清空
          </div>
          <div class="btn">
            <el-switch v-model="device" active-text="电脑模式" inactive-text="手机模式" active-value="pc"
              inactive-value="mobile" />
          </div>

          <div class="btn">
            <el-switch v-model="preview" active-text="开发模式" inactive-text="预览模式" active-value=""
              inactive-value="preview" />
          </div>
        </div>
        <el-scrollbar class="center-scrollbar" :class="[device, preview]">
          <page-drawer :model-value="settings" @update:model-value="update"></page-drawer>
        </el-scrollbar>
      </div>

      <page-setting :model-value="settings" @update:model-value="update" style="padding-left: 10px"></page-setting>
    </div>

    <el-drawer v-model="showCode" direction="rtl" size="50%" style="height:100%">
      <template #header>
        <div class="preview-action-bar">
          <div class="btn" @click="execDownload('test.vue')">
            <el-icon>
              <download />
            </el-icon>下载代码
          </div>

          <div class="btn" @click="ClipboardWrite()">
            <el-icon>
              <document-copy />
            </el-icon>复制代码
          </div>
        </div>
      </template>
      <el-scrollbar>
        <CodemirrorComp v-model="code" lang="vue"/>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<script>
import PageDrawer from "./PageDrawer.vue";
import PagePanel from "./PagePanel.vue";
import PageSetting from "./PageSetting.vue";
import useClipboard from 'vue-clipboard3';
import { ElMessage } from 'element-plus';
import { saveAs } from "file-saver";
import CodemirrorComp from '../../CodemirrorComp/index.vue'

import {
  deepClone,
  findEle,
  isObjectArray,
  randFieldId,
} from "./utils/func.js";
import { formConf } from "./ui/index";
import { generate, generateAndFormatAsync } from "./utils/generate.js";
import {
  Iphone,
  Monitor,
  VideoPlay,
  Delete,
  Download,
  DocumentCopy
} from "@element-plus/icons-vue";
import { defineComponent, provide, reactive, ref, watch } from "vue";

export default defineComponent({
  name: "FormGenerator",
  props: {},
  components: {
    PagePanel,
    PageDrawer,
    PageSetting,
    DocumentCopy,
    Iphone,
    Monitor,
    VideoPlay,
    Delete,
    Download,
    CodemirrorComp
  },

  setup(props) {
    const device = ref("pc");
    const showCode = ref(false);
    const preview = ref("");
    const code = ref('')
    const loadSetting = function () {
      let strs = localStorage.getItem("settings");
      if (strs) {
        return JSON.parse(strs);
      }

      return {
        current: "",
        formConf: formConf,
        drawingList: [],
      };
    };
    const settings = reactive(loadSetting());

    const update = function (e, ele) {
      if (ele) {
        // 选中当前
        settings.current = ele.__ID
      }
      settings.formConf = e.formConf;
      settings.drawingList = e.drawingList;
    };

    const addComponentAction = function (el) {
      console.log('add item action...')
      console.log(settings.drawingList)
      settings.drawingList.push(el);
      console.log('after...----')
      console.log(settings.drawingList)
      settings.current = el.__ID;
    }

    const selected = function (s) {
      settings.current = s;
    };

    const clearn = function () {
      localStorage.removeItem("settings");

      settings.current = "";
      settings.formConf = formConf;
      settings.drawingList = [];
    };

    /**
     * 选中高亮
     */
    const hightLight = function (s) {
      if (settings.current == s) {
        return { border: "1px dashed #f6f7ff", backgroundColor: "#f6f7ff", "border-radius": "6px", padding: "1px" };
      }
      return {};
    };

    const _del = function (items, _id) {
      for (let item of items) {
        if (item.__ID == _id) {
          items.splice(items.indexOf(item), 1);
          return true;
        } else if (isObjectArray(item.childrens)) {
          if (_del(item.childrens, _id)) {
            return true;
          }
        }
      }
    };

    const deleteItem = function (_id) {
      _del(settings.drawingList, _id);
    };

    const _copy = function (items, _id) {
      for (let item of items) {
        if (item.__ID == _id) {
          const newItem = deepClone(item);
          newItem.__ID = randFieldId();
          items.push(reactive(newItem));
          return true;
        } else if (isObjectArray(item.childrens)) {
          if (_copy(item.childrens, _id)) {
            return true;
          }
        }
      }
    };

    const copyItem = function (_id) {
      _copy(settings.drawingList, _id);
    };

    const updateChild = function (eles, ids) {
      let item = findEle(settings.drawingList, ids);

      item.childrens = eles;
    };

    const updateDefaultValue = function (val, ids) {
      let item = findEle(settings.drawingList, ids);

      item.defaultvalue = val;
    };

    const execDownload = function (filename) {
      const codeStr = generate(settings);
      const blob = new Blob([codeStr], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, filename);
    };

    const preViewCode = async () => {
      showCode.value = true;
      code.value = await generateAndFormatAsync(settings)
    }

    const { toClipboard } = useClipboard()
    const ClipboardWrite = async () => {
      const codeStr = await generateAndFormatAsync(settings);
      try {
        await toClipboard(codeStr);
        ElMessage("复制成功！")
        console.log('Copied to clipboard')
      } catch (e) {
        console.error(e)
      }
    }

    watch(settings, () => {
      localStorage.setItem("settings", JSON.stringify(settings));
    });

    provide("copyItem", copyItem);
    provide("deleteItem", deleteItem);
    provide("selected", selected);
    provide("updateChild", updateChild);
    provide("hightLight", hightLight);
    provide("updateDefaultValue", updateDefaultValue);
    return {
      settings,
      update,
      device,
      clearn,
      preview,
      generate,
      execDownload,
      code,
      showCode,
      preViewCode,
      ClipboardWrite,
      addComponentAction
    };
  },
});
</script>

<style lang="scss">
@import "./styles/home";
@import "./styles/index";
</style>
