<!-- 登入 -->
<template>
  <div align="middle" class="login">
    <el-row>
      <!--  :xl="{span:5, offset:9}" -->
      <el-col
        :span="5"
        :xl="{span:6, offset:9}"
        :lg="{span:8, offset:8}"
        :md="{span:12, offset:6}"
        :sm="{span:16, offset:4}"
        :xs="24"
      >
        <el-card class="box-card">
          <h1>登入</h1>
          <el-form :model="user" status-icon :rules="rules" ref="user" class="demo-ruleForm">
            <el-form-item label="用户名" prop="name" label-width="70px">
              <el-input placeholder="请输入用户名" v-model="user.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="密 码" prop="pass" label-width="70px">
              <el-input placeholder="请输入密码" v-model="user.pass" show-password></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="kap" label-width="70px">
              <el-col :span="16">
                <el-input placeholder="请输入验证码" v-model="user.kap"></el-input>
              </el-col>
              <el-col :span="8">
                <el-image :src="imgKap" @click="getKaptcha" fit="scale-down"></el-image>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login">登 入</el-button>
            </el-form-item>
          </el-form>
          <!-- <img :src="imgKap" alt="验证码" /> -->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { login } from "network/home";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateKap = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      imgKap: "",
      user: {
        name: "",
        pass: "",
        kap: ""
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        kap: [{ validator: validateKap, trigger: "blur" }]
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    login() {
      this.$refs["user"].validate(valid => {
        if (valid) {
          login(this.user).then(data => {
            if ("ERR_PWD" === data.data || "ERR_NAME" === data.data) {
              this.$message.error('用户名或密码错误');
            }else if ("ERR_KAP" === data.data) {
              this.$message.error('验证码错误');
              this.getKaptcha();
            }else if("SUCCESS" === data.data) {
              sessionStorage.setItem('user', data.data)
              this.$router.push("/")
            }else {
              this.$message.error('服务器错误');
            }
          });
        }
      });
    },
    // 获取验证码
    getKaptcha() {
      this.imgKap = "http://localhost:8808/kaptcha?t=" + new Date().getTime();
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    if (sessionStorage.getItem('user') === "SUCCESS") {
      this.$router.push("/")
    }
    this.getKaptcha();
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
.login {
  background-color: cadetblue;
  height: 100%;
}
.el-row {
  height: 100%;
}
.box-card {
  margin-top: 40%;
}
</style>