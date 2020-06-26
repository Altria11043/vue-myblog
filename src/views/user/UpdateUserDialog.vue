<!-- UpdateUserDialog -->
<template>
  <div class="updateUserDialog">
    <el-dialog
      title="修改用户信息"
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
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="启用"
            inactive-text="禁用"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.comment" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser()">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getUserByid, updateById } from "network/home";
import updataImg from "components/comment/updateImg";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "updateUserDialog",
  components: {
    updataImg
  },
  data() {
    //这里存放数据
    var validateName = (rule, value, callback) => {
      console.log(value);
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      callback();
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
      form: {},
      formLabelWidth: "80px",
      rules: {
        userName: [{ validator: validateName, trigger: "blur" }],
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
    // 通过ID查询数据
    getUser(id) {
      this.dialogFormVisible = true;
      console.log("请求数据");
      getUserByid(id)
        .then(data => {
          this.form = data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 提交表单
    updateUser() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          updateById(this.form).then(data => {
            if (data.data === 1) {
              this.$message({
                message: "更新成功",
                type: "success"
              });
              // 关闭弹窗, 并触发页面刷新
              this.dialogFormVisible = false;
              this.form = {};
              console.log("提交表单结束");
              this.$parent.getUserLists();
            } else {
              this.$message.error("更新失败");
            }
          });
        }
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
</style>