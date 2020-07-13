<!-- 上传多张图片 -->
<template>
  <div class="imgs">
    <el-upload
      class="avatar-uploader"
      action="http://myblog-altria.oss-cn-shenzhen.aliyuncs.com"
      :data="dataObj"
      list-type="picture-card"
      :multiple="false"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
      :on-error="uploadError"
      :limit="maxCount"
      :on-exceed="handleExceed"
      :show-file-list="true"
    >
      <i class="el-icon-plus"></i>
      <!-- <i v-else class="avatar-uploader-icon"></i> -->
      <!-- <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>-->
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="fileList.length > 0 ? fileList[0].url:''" alt />
      <!-- <img width="100%" :src="fileList[0].url" alt /> -->
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getOSSPolicy } from "network/api";
import { getUUID } from "assets/js/QuillComment";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "multiUpload",
  props: {
    //图片属性数组
    value: Array,
    //最大上传图片数量
    maxCount: {
      type: Number,
      default: 5
    }
  },
  components: {},
  data() {
    //这里存放数据
    return {
      dataObj: {
        policy: "",
        signature: "",
        key: "",
        ossaccessKeyId: "",
        dir: "",
        host: "",
        uuid: ""
      },
      dialogVisible: false,
      dialogImageUrl: null
    };
  },
  //监听属性 类似于data概念
  computed: {
    fileList() {
      let fileList = [];
      for (let i = 0; i < this.value.length; i++) {
        fileList.push({ url: this.value[i] });
      }
      return fileList;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    emitInput(fileList) {
      let value = [];
      for (let i = 0; i < fileList.length; i++) {
        value.push(fileList[i].url);
      }
      this.$emit("getImages", value);
    },
    handleRemove(file, fileList) {
      // 每删除一张图片就会将子组件中的数据传递给父组件中
      let value = [];
      for (let i = 0; i < fileList.length; i++) {
        value.push(fileList[i].url);
      }
      this.$emit("getImages", value);
    },
    handlePreview(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    beforeUpload(file) {
      if (file.type != "image/png" && file.type != "image/jpeg") {
        this.$message("图片格式不对");
        return false;
      }
      if (file.size > 5242880) {
        this.$message("图片大于5M");
        return false;
      }
      let _self = this;
      return new Promise((resolve, reject) => {
        getOSSPolicy()
          .then(response => {
            // console.log("这是什么${filename}");
            _self.dataObj.policy = response.data.policy;
            _self.dataObj.signature = response.data.signature;
            _self.dataObj.ossaccessKeyId = response.data.accessid;
            _self.dataObj.key = response.data.dir + getUUID() + "_${filename}";
            _self.dataObj.dir = response.data.dir;
            _self.dataObj.host = response.data.host;
            resolve(true);
          })
          .catch(err => {
            console.log("出错了...", err);
            reject(false);
          });
      });
    },
    handleUploadSuccess(res, file) {
      this.fileList.push({
        name: file.name,
        // url: this.dataObj.host + "/" + this.dataObj.dir + "/" + file.name； 替换${filename}为真正的文件名
        url:
          this.dataObj.host +
          "/" +
          this.dataObj.key.replace("${filename}", file.name)
      });
      this.emitInput(this.fileList);
    },
    handleExceed() {
      this.$message({
        message: "最多只能上传" + this.maxCount + "张图片",
        type: "warning",
        duration: 1000
      });
    },
    uploadError(err) {
      this.$message.error("图片上传失败");
      this.quillUpdateImg = false;
      console.log(err);
    }
    // 获取到当前的所有图片路径
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
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  border-color: #8c939d;
  font-size: 28px;
  color: #718299;
  /* width: 178px;
  height: 178px;
  line-height: 178px; */
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader-icon:hover {
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-color: #409eff;
}
</style>