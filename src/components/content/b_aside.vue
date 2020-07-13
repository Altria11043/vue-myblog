<!-- b_aside -->
<template>
  <div class="b_aside">
    <el-aside style="height: 100%; background-color: #545c64">
      <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="index"
      >
        <el-menu-item index="/home" @click="routclick('/home')">
          <i class="el-icon-s-home"></i>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/user" @click="routclick('/user')">
          <i class="el-icon-s-custom"></i>
          <span>用户</span>
        </el-menu-item>
        <el-menu-item index="/release" @click="routclick('/release')">
          <i class="el-icon-s-order"></i>
          <span>文章</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-platform"></i>
            <span>游戏相关</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/game" @click="routclick('/game')">预览</el-menu-item>
            <el-menu-item index="/gameReleaseIDE" @click="routclick('/gameReleaseIDE')">游戏文章编辑</el-menu-item>
            <el-menu-item index="/GameClass" @click="routclick('/GameClass')">游戏分类</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="5">
          <i class="el-icon-picture-outline"></i>
          <span>画集</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-bell"></i>
          <span>通知</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-s-comment"></i>
          <span>留言板</span>
        </el-menu-item>
        <!-- <el-menu-item index="4" @click="routclick('/updateImg')">
          <i class="el-icon-s-order"></i>
          <span>上传图片</span>
        </el-menu-item>-->
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "b_aside",
  components: {},
  data() {
    //这里存放数据
    return {
      index: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    routclick(path) {
      this.$router.push(path).catch(err => err);
    },
    // 获取到当前所选菜单
    getRouter() {
      this.index = this.$route.path;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getRouter();
  },
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
/* .el-aside {
  color: #333;
} */
</style>