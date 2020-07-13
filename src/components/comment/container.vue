<!-- 侧边容器aside -->
<template>
  <div class="container" style="height: 100%">
    <el-container style="height: 100%">
      <BAside name="b_aside"></BAside>
      <el-container>
        <el-header>
          <Top></Top>
        </el-header>
        <el-main>
          <slot></slot>
        </el-main>
        <!-- <el-footer>页脚</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getSession } from "network/api";
import Top from "components/comment/top";
import BAside from "components/content/b_aside";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "container",
  components: {
    Top,
    BAside
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    getSession().then(data => {
      if (!data.data) {
        sessionStorage.clear();
        this.$router.push("/");
      } else {
        sessionStorage.setItem('user', "SUCCESS")
      }
    });
  },
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
.el-header,
.el-footer {
  background-color: #545c64;
  color: #333;
  line-height: 60px;
  font-size: 12px;
}
.el-header {
  text-align: right;
}
.el-footer {
  text-align: center;
}
/* .el-container {
  border: 2px solid #eee;
} */
</style>