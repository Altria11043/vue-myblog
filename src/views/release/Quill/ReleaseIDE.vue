<!-- 文章编辑器 -->
<template>
  <div class="addOrEditRelease" style="height: 100%; border-style: 50000px solid red;">
    <el-form ref="data" :model="data">
      <!-- 富文本编辑器 -->
      <el-form-item>
        <el-input placeholder="标题" v-model="data.title" clearable></el-input>
      </el-form-item>
      <vueQuill ref="vueQuill"></vueQuill>
      <br />
      <br />
      <br />
      <el-form-item>
        <el-tag
          :key="tag"
          v-for="tag in data.listTag"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{tag}}</el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        ></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </el-form-item>
      <el-form-item>
        <el-switch
          v-model="data.state"
          active-color="#ff4949"
          inactive-color="#13ce66"
          active-text="私有"
          inactive-text="公开"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import vueQuill from "components/comment/Vue-Quill";
import { addRelease, updateRelease, getRelease } from "network/api";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "addOrEditRelease",
  components: { vueQuill },
  data() {
    //这里存放数据
    return {
      value: 1,
      inputVisible: false,
      inputValue: "",
      data: {
        listTag: [],
        state: 1,
        content: "",
        title: "",
        id: ""
      }
    };
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
      this.getQuillData();
      let data = this.data;
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
            // 更新数据
            this.$emit("updateDate");
          } else {
            this.$message.error("编辑失败");
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
            // 更新数据
            this.$emit("updateDate");
          } else {
            this.$message.error("新增失败");
          }
        });
      }
    },
    // 清除富文本中的内容
    clearData() {
      this.data.listTag = [];
      this.data.state = 1;
      this.data.title = "";
      this.data.id = "";
      this.clearQuillData();
    },
    // 获取文章数据
    getReleaseData(id) {
      let d = { id };
      getRelease(d).then(data => {
        // console.log("获取文章数据: ", data);
        this.data.listTag = data.data.ctag.split(";");
        this.data.state = data.data.state;
        this.data.title = data.data.title;
        this.data.id = data.data.id;
        this.setQuillData(data.data.content);
      });
    },
    // 标签相关方法
    handleClose(tag) {
      this.data.listTag.splice(this.data.listTag.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        if (!this.data.listTag.includes(inputValue)) {
          this.data.listTag.push(inputValue);
        } else {
          this.$message.error("该标签已存在")
        }
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    // 富文本相关方法
    clearQuillData() {
      this.$refs.vueQuill.clearQuillData();
    },
    getQuillData() {
      this.data.content = this.$refs.vueQuill.getQuillData();
    },
    setQuillData(data) {
      this.$refs.vueQuill.setQuillData(data);
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
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>