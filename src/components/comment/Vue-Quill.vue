<!-- quill
  这是一个富文本编辑器的组件集合
  掺杂了多余的不必要的组件和关联
  富文本编辑器, 图片上传 应该单独独立出来(图片上传与富文本编辑器整合在一起了)
  富文本编辑器单独提供set和get方法
 -->
<template>
  <div class="vue-quill">
    <!-- 富文本编辑器 -->
    <el-row v-loading="quillUpdateImg">
      <quillEditor
        class="quill-editor"
        ref="myQuillEditor"
        v-model="content"
        :options="editorOption"
      ></quillEditor>
    </el-row>
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
import { getOSSPolicy } from "network/api";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "vue-quill",
  components: { quillEditor },
  data() {
    //这里存放数据
    return {
      quillUpdateImg: false,
      content: "",
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
    // 清除数据
    clearQuillData() {
      this.content = "";
    },
    // 将数据传递给父组件, 由父组件提交数据
    getQuillData() {
      return this.content;
    },
    // 放入数据
    setQuillData(data) {
      // console.log("放入数据: ", data)
      this.content = data;
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
</style>