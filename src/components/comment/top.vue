<!-- top -->
<template>
  <div class="top">
    <!-- <a href="#">用户操作</a> -->
    <!-- <el-avatar class="photo" size="large" :src="circleUrl"></el-avatar> -->
    <!-- <el-button class="quit" type="danger" icon="el-icon-delete" circle></el-button> -->
    <el-dropdown @command="handleCommand">
      <el-button type="primary">
        用户操作
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="exit">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { clearSession } from "network/home";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "top",
  components: {},
  data() {
    //这里存放数据
    return {
      circleUrl: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleCommand(command) {
      if ("exit" === command) {
        this.userExit();
      }
    },
    userExit() {
      this.$alert("你确定要退出当前用户吗?", "提醒", {
        confirmButtonText: "确定",
        callback: () => {
          clearSession().then(data => {
            if ("SUCCESS" === data.data) {
              this.$message({
                type: "warning",
                message: "用户退出"
              });
              sessionStorage.clear();
              this.$router.push("/");
            }
          });
        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // 获取头像
    // getPhoto().then(data => {
    //   this.circleUrl = data.data;
    //   console.log("用户头像: ", this.circleUrl);
    // });
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
<style scoped>
.quit {
  margin: 10px;
}
.photo {
  margin: 10px;
}
</style>