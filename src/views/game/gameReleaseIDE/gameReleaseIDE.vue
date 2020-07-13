<!-- 游戏文章新增 -->
<template>
  <div class="gameReleaseIDE" style="height: 100%">
    <Container>
      <el-row>
        <el-col :lg="24" :xl="16">
          <el-form ref="form" :model="gameFormData">
            <!-- 标题和分类 -->
            <el-form-item>
              <el-row :gutter="10">
                <el-col :lg="2" :xl="1">
                  <span>标题:</span>
                </el-col>
                <el-col :lg="24" :xl="18">
                  <el-input
                    type="text"
                    placeholder="请输入标题"
                    v-model="gameFormData.gameTitle"
                    maxlength="50"
                    show-word-limit
                  ></el-input>
                </el-col>
                <!-- 游戏分类 -->
                <el-col :lg="2" :xl="1">
                  <span>分类:</span>
                </el-col>
                <el-col :lg="24" :xl="4">
                  <el-select v-model="gameFormData.gameClass" placeholder="请选择">
                    <el-option
                      v-for="item in gameClass"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
            <!-- 富文本编辑器 -->
            <vueQuill ref="vueQuill" @getQuillData="getGameReleaseData"></vueQuill>
            <br />
            <br />
            <br />
            <!-- 游戏标签 -->
            <el-form-item>
              <el-tag
                :key="tag"
                v-for="tag in gameFormData.gameTag"
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
            <!-- 是否公开 -->
            <el-form-item>
              <el-switch
                v-model="gameFormData.state"
                active-color="#ff4949"
                inactive-color="#13ce66"
                active-text="私有"
                inactive-text="公开"
                :active-value="1"
                :inactive-value="2"
              ></el-switch>
            </el-form-item>
            <!-- 预览图??? -->
            <el-form-item>
              <el-col :lg="6" :xl="3">
                <span>预览图(最多五张):</span>
              </el-col>
              <el-col :span="24">
                <multiUpload
                  ref="multiUpload"
                  v-model="gameFormData.gamePreview"
                  @getImages="getImages"
                ></multiUpload>
              </el-col>
            </el-form-item>
            <!-- 上传游戏封面 -->
            <el-form-item>
              <el-col :lg="6" :xl="3">
                <span>封面(只能上传一张):</span>
              </el-col>
              <el-col :span="24">
                <singleUpload @getImage="getImage" v-model="gameFormData.gameCover"></singleUpload>
              </el-col>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item>
              <el-button type="danger" @click="resetRelease">重置</el-button>
              <el-button type="primary" @click="sumRelease()">提交</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </Container>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Container from "components/comment/container";
import vueQuill from "components/comment/Vue-Quill";
import multiUpload from "components/comment/multiUpload";
import singleUpload from "components/comment/singleUpload";
import {
  getGameRelease,
  addGameRelease,
  getGameClassList,
  updateGameRelease
} from "network/api";
//  ,
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "gameReleaseIDE",
  components: { Container, vueQuill, multiUpload, singleUpload },
  data() {
    //这里存放数据
    return {
      gameFormData: {
        gameTitle: "",
        gameTag: [],
        state: 1,
        gameClass: "请选择",
        // gamePreviewList: [],
        gamePreview: [],
        gameCover: "",
        gameContent: "",
        gId: ""
      },
      previewImage: "",
      gameClass: [],
      value: "",
      inputVisible: false,
      inputValue: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 跳转过来时获取到数值
    getGameRelease() {
      let id = { id: this.$route.query.gameReleaseId };
      if (null != id.id) {
        getGameRelease(id).then(data => {
          this.gameFormData.gameTitle = data.data.gameTitle;
          this.gameFormData.gameTag = data.data.gameTag;
          this.gameFormData.state = data.data.state;
          this.gameFormData.gameClass = data.data.gameClass;
          this.gameFormData.gamePreview = data.data.gamePreview;
          this.gameFormData.gameCover = data.data.gameCover;
          this.gameFormData.gId = data.data.gId;
          this.setGameReleaseData(data.data.gameContent);
        });
      }
    },
    // 标签相关方法
    handleClose(tag) {
      this.gameFormData.gameTag.splice(
        this.gameFormData.gameTag.indexOf(tag),
        1
      );
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
        if (!this.gameFormData.gameTag.includes(inputValue)) {
          this.gameFormData.gameTag.push(inputValue);
        } else {
          this.$message.error("该标签已存在");
        }
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    // 获取到游戏分类
    getGameClass() {
      getGameClassList().then(data => {
        data.data.forEach(element => {
          let data = { value: "", label: "" };
          data.label = element.gclassName;
          data.value = element.id;
          this.gameClass.push(data);
        });
      });
    },
    // 富文本编辑器的get和set方法
    getGameReleaseData() {
      this.gameFormData.gameContent = this.$refs.vueQuill.getQuillData();
    },
    setGameReleaseData(data) {
      this.$refs.vueQuill.setQuillData(data);
    },
    // 预览图, 接收子组件中的图片
    getImages(data) {
      // this.previewImage = data;
      this.gameFormData.gamePreview = [];
      this.gameFormData.gamePreview = data;
      // this.gameFormData.previewImage.push(data);
    },
    // 封面
    getImage(data) {
      this.gameFormData.gameCover = data;
    },
    // 重置文章
    resetRelease() {
      this.$confirm("此操作将清除文章内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log("清除文章内容")
          this.clearRelease();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    clearRelease() {
      this.gameFormData.gameTitle = "";
      this.gameFormData.gameTag = [];
      this.gameFormData.state = 1;
      this.gameFormData.gameClass = "请选择";
      this.gameFormData.previewImage = [];
      this.gameFormData.gameCover = "";
      this.gameFormData.gId = "";
      this.setGameReleaseData("");
    },
    sumRelease() {
      // 完善数据
      this.getGameReleaseData();
      console.log("this.gameFormData: ", this.gameFormData);
      // this.gameFormData.gamePreview = this.previewImage;
      if (this.gameFormData.gId != "") {
        // 修改
        updateGameRelease(this.gameFormData).then(data => {
          if (1 === data.data) {
            this.$message({
              type: "success",
              message: "修改成功"
            });
            // 进行跳转并清除
            this.clearRelease();
            this.$router.push("/game").catch(err => err);
          } else {
            this.$message.error("修改失败!!!");
          }
        });
      } else {
        // 新增
        addGameRelease(this.gameFormData).then(data => {
          if (1 === data.data) {
            this.$message({
              type: "success",
              message: "新增成功"
            });
            // 进行跳转并清除
            this.clearRelease();
            this.$router.push("/game").catch(err => err);
          } else {
            this.$message.error("新增失败!!!");
          }
        });
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getGameClass();
    this.getGameRelease();
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