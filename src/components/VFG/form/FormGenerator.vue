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
            <el-button v-if="showLive" type="default" link icon="Aim"
              style="font-size: 21px;margin-bottom: 5px;margin-left: 10px;" @click="liveAction"></el-button>
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
          <el-button v-if="!isProd" style="margin-left: 5px;" type="warning" link icon="MapLocation"
            @click="preViewCodeDebug">调试</el-button>
          <el-button style="margin-left: 5px;" type="default" link icon="VideoPlay" @click="preViewCode">生成</el-button>
          <el-button style="margin-left: 5px;" type="primary" link icon="View" @click="preViewShow">预览</el-button>
          <el-button type="danger" link icon="Delete" @click="clearn()">清空</el-button>

          <div class="btn">
            <el-switch v-model="device" active-text="电脑模式" inactive-text="手机模式" active-value="pc"
              inactive-value="mobile" />
          </div>

          <div class="btn">
            <el-switch v-model="settings.preview" active-text="开发模式" inactive-text="预览模式" active-value=""
              inactive-value="preview" />
          </div>
        </div>

        <!-- <el-row>
          <el-col :span="8" style="background-color: yellow;">
            <draggable class="drawing-board" style="padding: 10px; height: 100%" v-model="dList" :animation="340"
              group="componentsGroup" @change="onEnd" ghostClass="ghost">
              <template v-for="(item, index) in dList" :key="item.id">
                <element-render 
                style="padding-top: 10px;padding-bottom: 10px;" v-bind="item" class="item-tool-box">{{ item.name }}</element-render>
              </template>
</draggable>
</el-col>
<el-col :span="8" style="background-color: gray;">bb</el-col>
<el-col :span="8" style="background-color: red;">gg</el-col>
</el-row> -->

        <el-scrollbar class="center-scrollbar" :class="[device, settings.preview]">
          <page-drawer :model-value="settings" @update:model-value="update"></page-drawer>
        </el-scrollbar>
      </div>

      <page-setting :model-value="settings" @update:model-value="update" style="padding-left: 10px"></page-setting>
    </div>

    <el-drawer v-model="showCode" direction="rtl" size="50%" style="height:100%">
      <template #header>
        <div class="preview-action-bar">
          <el-button type="default" link icon="Download" @click="execDownload('test.vue')">下载代码</el-button>
          <el-button type="default" link icon="DocumentCopy" @click="ClipboardWrite()">复制代码</el-button>
        </div>
      </template>
      <el-scrollbar>
        <CodemirrorComp v-model="code" lang="vue" />
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
import CodemirrorComp from '/@/components/CodemirrorComp/index.vue'

import {
  deepClone,
  findEle,
  isObjectArray,
  randFieldId,
  buildEleTree,
  reBuildEleTree,
  buildIdArray
} from "./utils/func";
import { initConf } from "./utils/drawer"
import { formConf } from "./ui/index";
import { generate, generateAndFormatAsync } from "./utils/generate";
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
  emits: ["preview"],
  props: {
    showLive: {
      type: Boolean,
      default: false
    }
  },
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
  mounted() {
    document.addEventListener("keydown", this.keyClickHandler)
  },
  unmounted() {
    window.removeEventListener('keydown', this.keyClickHandler);
  },
  setup(props, context) {
    const isProd = __ISPROD__
    const showLive = props.showLive
    const device = ref("pc");
    const showCode = ref(false);
    const code = ref('')
    const dList = ref([])
    const loadSetting = function () {
      let strs = localStorage.getItem("settings");
      if (strs) {
        return JSON.parse(strs);
      }

      return {
        current: "",
        preview: "",
        formConf: formConf,
        drawingList: [],
      };
    };
    const settings = reactive(loadSetting());

    const onEnd = (e) => {
      console.log(dList.value)
      console.log(e)
    }

    const update = function (e, ele) {
      console.log('update action @FormGenerator...')
      console.log(settings.drawingList)
      console.log(e)
      if (ele) {
        // 选中当前
        settings.current = ele.__ID
      }
      //settings.formConf = e.formConf;
      //settings.drawingList = e.drawingList;
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
      if (s) {
        settings.current = s;
      }
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
      if (settings.current == s /*&& preview.value != 'preview'*/) {
        return { border: "1px dashed #409eff", backgroundColor: "#f6f7ff", "border-radius": "4px", padding: "1px" };
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
          const newItem = deepClone(item, true);
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
      console.log('更新子组件...')
      let item = findEle(settings.drawingList, ids);
      // TODO 这里涉及一个数据转换，将 conf 数据转成 settings 的数据 ?
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
      code.value = generate(settings)
      // code.value = await generateAndFormatAsync(settings)
    }

    const preViewCodeDebug = () => {
      console.log(settings)
      console.log(initConf(settings))
    }

    const preViewShow = () => {
      context.emit("preview", generate(settings, true))
    }

    const liveAction = () => {
      context.emit("live", generate(settings, true))
    }

    const { toClipboard } = useClipboard()
    const ClipboardWrite = async () => {
      // const codeStr = await generateAndFormatAsync(settings);
      const codeStr = generate(settings)
      try {
        await toClipboard(codeStr);
        ElMessage({ message: "复制成功！", type: 'success' })
        console.log('Copied to clipboard')
      } catch (e) {
        console.error(e)
      }
    }

    watch(settings, () => {
      localStorage.setItem("settings", JSON.stringify(settings));
    });

    const getOrigin = function (id) {
      return settings;
    }

    const keyClickHandler = (e) => {
      console.log("您按下的按钮的keyCode为：" + e.keyCode + ', current:' + settings.current)
      if (e.keyCode == 46 && settings.current) {
        deleteItem(settings.current)
      } else if (e.keyCode == 38 || e.keyCode == 40) {
        // 方向键 up = 38
        const isUp = e.keyCode == 38
        const treeList = buildEleTree(settings.drawingList)
        const idarr = buildIdArray(treeList)
        reBuildEleTree(treeList, undefined, idarr)
        console.log(treeList)
        const ele = idarr[settings.current]
        const finded = isUp ? ele.pre : ele.next
        if (finded) {
          settings.current = finded
        }
      }
    }

    provide("copyItem", copyItem);
    provide("deleteItem", deleteItem);
    provide("selected", selected);
    provide("updateChild", updateChild);
    provide("hightLight", hightLight);
    provide("updateDefaultValue", updateDefaultValue);
    provide("getOrigin", getOrigin)

    return {
      settings,
      update,
      device,
      clearn,
      generate,
      execDownload,
      code,
      showCode,
      preViewCode,
      preViewCodeDebug,
      ClipboardWrite,
      addComponentAction,
      dList,
      isProd,
      onEnd,
      preViewShow,
      liveAction,
      showLive,
      keyClickHandler
    };
  },
});
</script>

<style lang="scss">
@import "./styles/home";
@import "./styles/index";
</style>
