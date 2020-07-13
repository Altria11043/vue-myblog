<!-- 游戏文章新增 -->
<template>
  <div class="gameClass" style="height: 100%">
    <Container>
      <h1>游戏分类表</h1>
      <el-form :inline="true" :model="classForm" class="demo-form-inline">
        <el-form-item label="搜索内容">
          <el-input v-model="classForm.content" placeholder="搜索内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getClassList">查询</el-button>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <el-button @click="addGameClass" type="primary">添加</el-button>
      <br />
      <br />
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="分类ID">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类名称">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.gclassName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              @change="updateState(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
        :close-on-click-modal="false"
      >
        <!-- 添加子组件 -->
        <gameClassForm ref="gameClassForm" @sumGameClassForm="insertGameClass"></gameClassForm>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="sumGameClassForm">确 定</el-button>
        </span>
      </el-dialog>
    </Container>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Container from "components/comment/container";
import gameClassForm from "./GameClassForm";
import {
  getGameClassAll,
  addGameClass,
  deleteGameClass,
  updateGameClassState,
  updataGameClass
} from "network/api";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "gameClass",
  components: { Container, gameClassForm },
  data() {
    //这里存放数据
    return {
      tableData: null,
      title: "",
      dialogVisible: false,
      classForm: {
        content: ""
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getClassList() {
      getGameClassAll(this.classForm)
        .then(data => {
          console.log("游戏分类: ", data);
          this.tableData = data.data;
        })
        .catch(() => {
          this.$message.error("请求数据失败");
        });
    },
    handleEdit(row) {
      console.log("点击编辑", row);
      this.title = "编辑";
      this.dialogVisible = true;
      // 查询需要编辑的数据
      // this.$refs.updateUserDialog.getUser(row.id);
      setTimeout(() => {
        this.$refs.gameClassForm.setClassFormData(row);
      }, 500);
    },
    addGameClass() {
      this.title = "添加";
      this.dialogVisible = true;
      // 获取到要提交的数据
    },
    handleClose() {
      this.$confirm("确认关闭？")
        .then(() => {
          this.clearData();
        })
        .catch(() => {});
    },
    // 关闭弹窗并清除数据
    clearData() {
      this.dialogVisible = false;
      this.$refs.gameClassForm.clearClassFormData();
      console.log(this.tableData);
    },
    sumGameClassForm() {
      this.$refs.gameClassForm.getClassFormData();
    },
    insertGameClass(data) {
      console.log("要提交的数据:", data);
      if (data.id === "") {
        addGameClass(data).then(data => {
          if (data.data === 1) {
            this.$message({
              message: "新增成功",
              type: "success"
            });
            this.getClassList();
            this.clearData();
          }
        });
      } else {
        updataGameClass(data).then(data => {
          if (data.data === 1) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.getClassList();
            this.clearData();
          }
        });
      }
    },
    // 删除分类
    handleDelete(data) {
      let id = { id: data.id };
      deleteGameClass(id).then(data => {
        if (data.data === 2) {
          this.$message.error("该分类下还有数据, 请先清除这些数据");
        } else if (data.data === 1) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getClassList();
        } else {
          this.$message.error("删除失败!!");
        }
      });
    },
    // 更改分类状态
    updateState(data) {
      console.log("更改的参数", data);
      updateGameClassState(data).then(data => {
        console.log(data);
        if (data.data === 1) {
          this.$message({
            message: "状态更新成功",
            type: "success"
          });
          this.getClassList();
        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getClassList();
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