<!-- 新增文章 -->
<template>
  <div class="addOrEditRelease" style="height: 100%; border-style: 50000px solid red;">
    <vueQuill ref="editQuill"></vueQuill>
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import vueQuill from "components/comment/Vue-Quill";
import { addRelease, updateRelease } from "network/home";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "addOrEditRelease",
  components: { vueQuill },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 进行编辑操作, 读取到要编辑的内容
    editRelease(id) {
      this.$refs.editQuill.getReleaseData(id);
    },
    // 提交数据
    sumData() {
      let data = this.$refs.editQuill.sumData();
      console.log(data);
      if (data.id != "") {
        // 编辑数据
        updateRelease(data).then(res => {
          if (res.data > 0) {
            this.$message({
              message: "编辑成功",
              type: "success"
            });
            // 关闭当前对话框
            this.$emit("addOrEditRelease");
          } else {
            this.$message.error("编辑失败")
          }
        });
      } else {
        // 添加数据
        addRelease(data).then(res => {
          if (res.data > 0) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            // 关闭当前对话框
            this.$emit("addOrEditRelease");
          } else {
            this.$message.error("新增失败")
          }
        });
      }
    },
    // 清除富文本中的内容
    clearData() {
      this.$refs.editQuill.clearReleaseData();
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