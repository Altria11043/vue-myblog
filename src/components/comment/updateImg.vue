<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="http://myblog-altria.oss-cn-shenzhen.aliyuncs.com"
      :data="dataObj"
      list-type="picture"
      :multiple="false"
      :show-file-list="showFileList"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
      :on-error="uploadError"
    >
      <img v-if="image" :src="image" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      <!-- <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>-->
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="fileList[0].url" alt />
    </el-dialog>
  </div>
</template>
<script>
import { getOSSPolicy } from "network/api";
import { getUUID } from "assets/js/QuillComment";

export default {
  name: "singleUpload",
  props: {
    value: String
  },
  computed: {
    imageUrl() {
      return this.value;
    },
    imageName() {
      if (this.value != null && this.value !== "") {
        return this.value.substr(this.value.lastIndexOf("/") + 1);
      } else {
        return null;
      }
    },
    fileList() {
      return [
        {
          name: this.imageName,
          url: this.imageUrl
        }
      ];
    },
    showFileList: {
      get: function() {
        return (
          this.value !== null && this.value !== "" && this.value !== undefined
        );
      },
      set: function(newValue) {
        console.log(newValue);
      }
    }
  },
  data() {
    return {
      dataObj: {
        policy: "",
        signature: "",
        key: "",
        ossaccessKeyId: "",
        dir: "",
        host: ""
        // callback:'',
      },
      dialogVisible: false,
      image: ""
    };
  },
  methods: {
    emitInput(val) {
      this.$emit("input", val);
    },
    handleRemove() {
      this.dialogVisible = true;
    },
    handlePreview() {
      this.dialogVisible = true;
    },
    beforeUpload(file) {
      console.log(file);
      let _self = this;
      return new Promise((resolve, reject) => {
        getOSSPolicy()
          .then(response => {
            console.log("响应的数据: ", response);
            _self.dataObj.policy = response.data.policy;
            _self.dataObj.signature = response.data.signature;
            _self.dataObj.ossaccessKeyId = response.data.accessid;
            _self.dataObj.key = response.data.dir + getUUID() + "_${filename}";
            _self.dataObj.dir = response.data.dir;
            _self.dataObj.host = response.data.host;
            resolve(true);
          })
          .catch(err => {
            console.log("上传图片前错误: ", err);
            reject(false);
          });
      });
    },
    handleUploadSuccess(res, file) {
      this.showFileList = true;
      this.fileList.pop();
      this.fileList.push({
        name: file.name,
        url:
          this.dataObj.host +
          "/" +
          this.dataObj.key.replace("${filename}", file.name)
      });
      this.emitInput(this.fileList[0].url);
      this.image = this.fileList[0].url;
      console.log(this.image);
    },
    uploadError(err) {
      this.$message.error("图片上传失败");
      this.quillUpdateImg = false;
      console.log(err);
    }
    // getUpdateImgUrl() {
    //   return this.image;
    // }
  }
};
</script>
<style>
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload:hover {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-color: #409eff;
}
</style>


