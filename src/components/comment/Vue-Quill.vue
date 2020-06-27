<!-- quill -->
<template>
  <div class="vue-quill">
    <el-form ref="data" :model="data">
      <!-- 富文本编辑器 -->
      <el-form-item>
        <el-input placeholder="标题" v-model="data.title" clearable></el-input>
      </el-form-item>
      <el-row v-loading="quillUpdateImg">
        <!--           @focus="onEditorFocus($event)"
          @blur="onEditorBlur($event)"
        @change="onEditorChange($event)"-->
        <quillEditor
          class="quill-editor"
          ref="myQuillEditor"
          v-model="data.content"
          :options="editorOption"
        ></quillEditor>
      </el-row>
      <br />
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
    <!-- 图片上传 -->
    <!-- :file-list="fileList" -->
    <el-upload
      class="avatar-uploader"
      action="http://myblog-altria.oss-cn-shenzhen.aliyuncs.com"
      :data="dataObj"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :on-success="uploadSuccess"
      :on-error="uploadError"
    ></el-upload>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import toolbarOptions from "assets/js/QuillComment.js";
import { getUUID } from "assets/js/QuillComment";
import { getOSSPolicy, getRelease } from "network/home";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "vue-quill",
  components: { quillEditor },
  data() {
    //这里存放数据
    return {
      quillUpdateImg: false,
      value: 1,
      inputVisible: false,
      inputValue: "",
      data: {
        listTag: [],
        state: 1,
        content: "",
        title: "",
        id: ""
      },
      editorOption: {
        placeholder: "",
        theme: "snow", // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      },
      dataObj: {
        policy: "",
        signature: "",
        key: "",
        ossaccessKeyId: "",
        dir: "",
        host: ""
        // callback:'',
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 富文本相关方法
    // onEditorFocus() {
    //   console.log("获得焦点事件");
    // },
    // onEditorBlur() {
    //   console.log("失去焦点事件");
    // },
    // onEditorChange() {
    //   console.log("内容改变事件");
    // },
    // 编辑时, 读取数据
    getReleaseData(id) {
      getRelease(id).then(data => {
        this.data.title = data.data.title;
        this.data.state = data.data.state;
        this.data.content = data.data.content;
        this.data.listTag = data.data.ctag.split(";");
        this.data.id = id;
      });
    },
    // 清除数据
    clearReleaseData() {
      console.log("清除数据");
      this.data.listTag = [];
      this.data.state = 1;
      this.data.content = "";
      this.data.title = "";
      this.data.id = "";
    },
    // 将数据传递给父组件, 由父组件提交数据
    sumData() {
      return this.data;
    },
    // 标签相关方法
    handleClose(tag) {
      this.data.tag.splice(this.data.tag.indexOf(tag), 1);
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
        this.data.tag.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    // 图片相关
    uploadSuccess(res, file) {
      // 拼接图片路径
      let imgUrl =
        this.dataObj.host +
        "/" +
        this.dataObj.key.replace("${filename}", file.name);
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill;
      // 如果上传成功
      if (imgUrl != "" && file !== null) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.info为服务器返回的图片地址
        quill.insertEmbed(length, "image", imgUrl);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      // loading动画消失
      this.quillUpdateImg = false;
    },
    uploadError(err) {
      this.$message.error("图片上传失败");
      this.quillUpdateImg = false;
      console.log(err);
    },
    beforeUpload() {
      this.quillUpdateImg = true;
      let _self = this;
      return new Promise((resolve, reject) => {
        getOSSPolicy()
          .then(response => {
            _self.dataObj.policy = response.data.policy;
            _self.dataObj.signature = response.data.signature;
            _self.dataObj.ossaccessKeyId = response.data.accessid;
            _self.dataObj.key = response.data.dir + getUUID() + "_${filename}";
            _self.dataObj.dir = response.data.dir;
            _self.dataObj.host = response.data.host;
            this.quillUpdateImg = false;
            resolve(true);
          })
          .catch(err => {
            this.$message.error("图片上传错误: ", err);
            this.quillUpdateImg = false;
            reject(false);
          });
      });
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
.quill-editor {
  height: 500px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
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
</style>