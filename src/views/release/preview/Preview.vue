<!-- release -->
<template>
  <div class="preview" style="height: 100%; border-style: 50000px solid red;">
    <el-form :inline="true" :model="lookUp" class="demo-form-inline">
      <el-form-item label="内容">
        <el-input v-model="lookUp.content" placeholder="内容"></el-input>
      </el-form-item>
      <el-form-item label="日期">
        <el-col :span="10">
          <el-date-picker
            v-model="lookUp.startDate"
            type="date"
            placeholder="选择开始日期"
            @change="contrastDate"
          ></el-date-picker>
        </el-col>
        <el-col :span="2">-</el-col>
        <el-col :span="10">
          <el-date-picker
            v-model="lookUp.endDate"
            type="date"
            placeholder="选择结束日期"
            @change="contrastDate"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="handleAdd">添加</el-button>
    <!-- 使用卡片会导致布局无法自适应, 这里改用表格展示 -->
    <el-table :data="data" style="width: 100%">
      <el-table-column label="文章ID" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="180">
        <template slot-scope="scope">
          <el-link type="primary" @click.native="viewArticle(scope.row.id)">{{ scope.row.title }}</el-link>
          <!-- <span style="margin-left: 10px"></span> -->
        </template>
      </el-table-column>

      <el-table-column label="标签" width="480">
        <template slot-scope="scope">
          <el-tag v-for="tag in scope.row.listTag" :key="tag">{{ tag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            active-color="#ff4949"
            inactive-color="#13ce66"
            active-text="私有"
            inactive-text="公开"
            :active-value="1"
            :inactive-value="2"
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
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getReleaseTable, updataState } from "network/home";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "preview",
  components: {},
  data() {
    //这里存放数据
    return {
      dialogVisible: false,
      data: [
        {
          listTag: [],
          title: "",
          state: 1,
          Id: 0
        }
      ],
      lookUp: {
        content: "",
        startDate: null,
        endDate: null
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 查询所有的文章放入表格中
    getReleases(content) {
      console.log("查找数据: ", content);
      getReleaseTable(content).then(data => {
        console.log("查找数据: ", data.data)
        this.data = data.data;
      });
    },
    // 添加文章
    handleAdd() {
      this.$emit("addRelease");
    },
    // 编辑
    handleEdit(row) {
      // 这里调用父组件组件, 并将id传递给父组件
      this.$emit("editRelease", row.id);
    },
    // 这里对父组件统一处理??
    // 删除
    handleDelete(row) {
      console.log(row);
    },
    // 改变状态
    updateState(row) {
      updataState({
        id: row.id,
        state: row.state
      }).then(res => {
        if (res.data > 0) {
          this.$message({
            message: "状态修改成功",
            type: "success"
          });
        } else {
          this.$message.error("状态修改失败");
        }
      });
    },
    // 查找数据
    onSubmit() {
      this.getReleases(this.lookUp);
      // 调用子组件的方法进行数据查询
    },
    // 对比结束时间是否早于开始时间
    contrastDate() {
      if (this.lookUp.startDate != "" && this.lookUp.endDate != "") {
        if (this.lookUp.startDate > this.lookUp.endDate) {
          this.$message.error("结束时间不能早于开始时间");
          this.lookUp.startDate = "";
          this.lookUp.endDate = "";
        }
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getReleases(this.lookUp);
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
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.el-tag {
  margin-left: 10px;
}
.dialogClass img {
  max-width: 100%;
}
</style>