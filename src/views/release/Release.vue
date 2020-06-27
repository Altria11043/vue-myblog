<!-- release -->
<template>
  <div class="release" style="height: 100%;">
    <Container>
      <h1>文章管理</h1>
      <el-divider></el-divider>

      <Preview ref="preview" @editRelease="editRelease" @addRelease="addRelease"></Preview>
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="1400px"
        :before-close="handleClose"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        lock-scroll
      >
        <addOrEditRelease ref="addOrEditRelease" @addOrEditRelease="close"></addOrEditRelease>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="subData">提交</el-button>
          <el-button @click="handleClose">取 消</el-button>
        </span>
      </el-dialog>
      
    </Container>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Container from "components/comment/container";
import Preview from "./preview/Preview";
import addOrEditRelease from "./Quill/addOrEditRelease";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "release",
  components: { Container, Preview, addOrEditRelease },
  data() {
    //这里存放数据
    return {
      dialogVisible: false,
      title: ""
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
      console.log("马上关闭");
      this.dialogVisible = false;
      this.$refs.addOrEditRelease.clearData();
    },
    // 提交数据
    subData() {
      // 这里要判断是新增还是编辑
      this.$refs.addOrEditRelease.sumData();
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
        this.$refs.addOrEditRelease.editRelease(id);
      }, 10);
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
<style scoped>
</style>