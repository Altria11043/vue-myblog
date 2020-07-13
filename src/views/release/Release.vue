<!-- release -->
<template>
  <div class="release" style="height: 100%;">
    <Container>
      <h1>文章管理</h1>
      <el-divider></el-divider>

      <Preview
        ref="preview"
        @editRelease="editRelease"
        @addRelease="addRelease"
        @releasePreview="releasePreview"
      ></Preview>
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="1400px"
        :before-close="handleClose"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        lock-scroll
      >
        <releaseIDE ref="releaseIDE" @addOrEditRelease="close" @updateDate="updateDate"></releaseIDE>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="subData">提交</el-button>
          <el-button @click="handleClose">取 消</el-button>
        </span>
      </el-dialog>

      <el-dialog
        :title="title"
        :visible.sync="dialogPreview"
        width="1400px"
        :before-close="previewClose"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        lock-scroll
      >
        <!-- 这里对文章进行预览 -->
        <!-- 标题 -->
        <el-row class="p_title">
          <h1>{{ releaseContent.title }}</h1>
          <!-- 标签 -->
          <el-tag v-for="tag in releaseContent.listTag" :key="tag" size="mini">{{ tag }}</el-tag>

          <el-divider></el-divider>
        </el-row>
        <!-- 内容 -->
        <el-row class="p_content">
          <div v-html="releaseContent.content"></div>
        </el-row>
      </el-dialog>
    </Container>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Container from "components/comment/container";
import Preview from "./preview/Preview";
import releaseIDE from "./Quill/ReleaseIDE";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "release",
  components: { Container, Preview, releaseIDE },
  data() {
    //这里存放数据
    return {
      dialogVisible: false,
      dialogPreview: false,
      title: "",
      releaseContent: {
        listTag: [],
        content: "",
        title: ""
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 关闭弹窗
    handleClose() {
      this.$confirm("确认关闭？")
        .then(() => {
          this.close();
        })
        .catch(() => {});
    },
    close() {
      // 关闭时清理富文本中的数据
      this.dialogVisible = false;
      this.$refs.releaseIDE.clearData();
    },
    // 关闭预览弹窗
    previewClose() {
      this.dialogPreview = false;
      this.releaseContent = {
        listTag: [],
        content: "",
        title: ""
      };
    },
    // 提交数据
    subData() {
      this.$refs.releaseIDE.sumData();
    },
    // 添加文章
    addRelease() {
      this.dialogVisible = true;
      this.title = "新增";
    },
    // 编辑文章
    editRelease(id) {
      this.dialogVisible = true;
      this.title = "编辑";
      // 由于一开始调用的时候, 子组件并没有加载, 需要进行延时处理,
      // 等待子组件加载好, 不然会导致第一次点击报错
      setTimeout(() => {
        this.$refs.releaseIDE.getReleaseData(id);
      }, 10);
    },
    // 更新数据
    updateDate() {
      this.$refs.preview.getReleases();
    },
    // 文章预览
    releasePreview(data) {
      this.releaseContent = data;
      this.releaseContent.listTag = data.ctag.split(";");
      this.dialogPreview = true;
      console.log("文章数据: ", this.releaseContent);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style>
.p_title {
  text-align: center;
  font-size: 30px;
}
.el-tag {
  margin-left: 5px;
}
.p_content pre {
  background-color: rgb(153, 153, 153);
}
</style>