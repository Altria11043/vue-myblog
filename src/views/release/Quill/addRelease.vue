<!-- 新增文章 -->
<template>
  <div class="addRelease" style="height: 100%; border-style: 50000px solid red;">
    <vueQuill></vueQuill>
    <br />
    <el-row>
      <el-button v-if="judge === 'add'" type="primary" @click="subData">提交</el-button>
      <el-button v-if="judge === 'update'" type="primary" @click="subData">修改</el-button>
    </el-row>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getRelease } from "network/home";
import vueQuill from "components/comment/Vue-Quill"

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "addRelease",
  components: { vueQuill },
  data() {
    //这里存放数据
    return {
      judge: "add"
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    subData() {
    },
    updateData() {
    },
    clearDate() {
      this.value = 1;
    },
    addOrUpdate() {
      console.log();
      let id = this.$route.params.id;
      // 判断是否为0, 如果是0则是添加, 否则是修改
      if (id === "0") {
        this.title = "发布文章";
      } else {
        this.title = "修改文章";
        this.judge = "update";
        getRelease(id).then(data => {
          this.value = data.data.state;
        });
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.addOrUpdate();
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
</style>