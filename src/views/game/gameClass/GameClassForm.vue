<!-- GameClassForm -->
<template>
  <div class="gameClassForm">
    <el-form :rules="rules" label-width="80px" ref="classForm" :model="classForm">
      <el-form-item label="分类名称" prop="gClassName">
        <el-input v-model="classForm.gclassName"></el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch
          v-model="classForm.state"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "gameClassForm",
  components: {},
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入分类名称"));
      } else {
        callback();
      }
    };
    //这里存放数据
    return {
      classForm: {
        gclassName: "",
        state: 1,
        id: ""
      },
      rules: {
        gclassName: [{ validator: validateName, trigger: "blur" }]
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 获取数据
    getClassFormData() {
      this.$refs["classForm"].validate(valid => {
        if (valid) {
          console.log("校验成功", this.classForm);
          this.$emit("sumGameClassForm", this.classForm);
        } else {
          console.log("校验失败", this.classForm);
        }
      });
    },
    // 放入数据
    setClassFormData(data) {
      // this.classForm = data;
      // 通过id获取到数据库中的数据
      this.classForm.gclassName = data.gclassName;
      this.classForm.state = data.state;
      this.classForm.id = data.id;
      console.log()
    },
    // 清除数据
    clearClassFormData() {
      this.classForm.gclassName = "";
      this.classForm.state = 1;
      this.classForm.id = "";
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