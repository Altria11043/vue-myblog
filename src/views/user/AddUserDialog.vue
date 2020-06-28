<!-- AddUserDialog -->
<template>
  <div class="addUserDialog">
    <el-dialog
      title="新增用户信息"
      :visible.sync="dialogFormVisible"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-form :model="form" :label-width="formLabelWidth" status-icon :rules="rules" ref="form">
        <el-form-item label="头像" prop="photo">
          <!-- <el-input v-model="form.photo" autocomplete="off"></el-input> -->
          <updataImg ref="updataImg" v-model="form.photo"></updataImg>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPwd">
          <el-input v-model="form.confirmPwd" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="userName">
          <el-input v-model="form.comment" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { addUser } from "network/api";
import updataImg from "components/comment/updateImg";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "addUserDialog",
  components: {
    updataImg
  },
  data() {
    //校验数据
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      callback();
    };
    var validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("confirmPwd");
        }
        callback();
      }
    };
    var validateCPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      var re = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!re.test(value)) {
        callback(new Error("请输入正确的邮箱格式"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      var re = /(^0\d{2,3}-\d{7,8}(-\d{1,6})?$)|(^0?1[34578]\d{9}$)/;
      if (value === "") {
        callback(new Error("请输入电话"));
      } else if (!re.test(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      form: {
        photo: "",
        userName: "",
        password: "",
        confirmPwd: "",
        email: "",
        phone: "",
        comment: ""
      },
      formLabelWidth: "80px",
      rules: {
        userName: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePwd, trigger: "blur" }],
        confirmPwd: [{ validator: validateCPwd, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        phone: [{ validator: validatePhone, trigger: "blur" }]
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    addUser() {
      console.log("添加用户", this.form);
      this.$refs["form"].validate(valid => {
        if (valid) {
          // this.getUpdateImgUrl();
          let form = {
            photo: "",
            userName: "",
            password: "",
            email: "",
            phone: "",
            comment: ""
          };
          form = this.form;
          addUser(form).then(data => {
            console.log("打印响应的数据", data);
            if (data.data === 1) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              // 关闭弹窗, 并触发页面刷新
              this.dialogFormVisible = false;
              this.form = {
                photo: "",
                userName: "",
                password: "",
                confirmPwd: "",
                email: "",
                phone: "",
                comment: ""
              };
              console.log("添加结束");
              this.$parent.getUserLists();
            } else {
              this.$message.error("添加失败");
            }
          });
        }
      });
    },
    // 展开添加对话框
    displayDialog() {
      this.dialogFormVisible = true;
    }
    // 获取到上传的头像地址
    // getUpdateImgUrl() {
    //   this.form.photo = this.$refs.updataImg.getUpdateImgUrl();
    // }
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