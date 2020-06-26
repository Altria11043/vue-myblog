<!-- user -->
<template>
  <div class="user" style="height: 100%">
    <Container>
      <el-form :inline="true" :model="userForm" class="demo-form-inline">
        <el-form-item label="搜索内容">
          <el-input v-model="userForm.content" placeholder="搜索内容"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-col :span="10">
            <el-date-picker
              v-model="userForm.startDate"
              type="date"
              placeholder="选择开始日期"
              @change="contrastDate"
            ></el-date-picker>
          </el-col>
          <el-col :span="2">-</el-col>
          <el-col :span="10">
            <el-date-picker
              v-model="userForm.endDate"
              type="date"
              placeholder="选择结束日期"
              @change="contrastDate"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUserLists">查询</el-button>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <el-button @click="addUser" type="primary">添加</el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="用户ID" width="90">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮箱" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.creatorTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.comment }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="90">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
            <!-- <span style="margin-left: 10px">{{  }}</span> -->
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              v-if="scope.row.id !== 1"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <updateUserDialog ref="updateUserDialog" />
      <!-- @refreshDataList="getUserLists" -->
      <addUserDialog ref="addUserDialog" />
    </Container>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getUserList, delectByid } from "network/home";
import updateUserDialog from "views/user/UpdateUserDialog";
import addUserDialog from "views/user/AddUserDialog";

import Container from "components/comment/container";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "user",
  props: {},
  components: {
    updateUserDialog,
    addUserDialog,
    Container
  },
  data() {
    //这里存放数据
    return {
      tableData: null,
      userForm: {
        content: "",
        startDate: "",
        endDate: ""
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 点击获取到当前用户id并进行修改
    handleEdit(index, row) {
      this.$refs.updateUserDialog.getUser(row.id);
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delectByid(row.id).then(data => {
            if (data.data === 1) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getUserLists();
            } else {
              this.$message.error("添加失败");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addUser() {
      this.$refs.addUserDialog.displayDialog();
    },
    // 加载数据
    getUserLists() {
      getUserList(this.userForm)
        .then(res => {
          this.tableData = null;
          this.tableData = res.data;
        })
        .catch(() => {
          this.$message.error("请求数据失败");
        });
    },
    // 对比结束时间是否早于开始时间
    contrastDate() {
      if (this.userForm.startDate != "" && this.userForm.endDate != "") {
        if (this.userForm.startDate > this.userForm.endDate) {
          this.$message.error("结束时间不能早于开始时间");
          this.userForm.startDate = "";
          this.userForm.endDate = "";
        }
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getUserLists();
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
</style>