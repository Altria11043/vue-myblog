<!-- release -->
<template>
  <div class="release" style="height: 100%; border-style: 50000px solid red;">
    <Container>
      <h1>文章管理</h1>
      <el-divider></el-divider>
      <el-button type="primary" @click="dialogVisible = true">添加</el-button>
      <Preview></Preview>
      <el-dialog
        title="添加"
        :visible.sync="dialogVisible"
        width="1400px"
        :before-close="handleClose"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <addRelease></addRelease>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
import addRelease from "./Quill/addRelease"

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "release",
  components: { Container, Preview, addRelease },
  data() {
    //这里存放数据
    return {
      dialogVisible: false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
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