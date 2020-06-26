<!-- release -->
<template>
  <div class="preview" style="height: 100%; border-style: 50000px solid red;">
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
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--
    <el-row :gutter="20">
      <el-col v-for="(item, index) in data" :key="index" :span="3">
        <el-card class="box-card" shadow="hover" @click.native="viewArticle(item.id)">
          <div slot="header" class="clearfix">
            <span>{{ item.title }}</span>
          </div>
          <div class="text item">
            
          </div>
        </el-card>
      </el-col>
    </el-row>-->
    <!-- 对话框中暂时文章 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="1300px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <el-divider></el-divider>
      <div class="dialogClass">
        <span v-html="content">{{ content }}</span>
      </div>
      <el-divider></el-divider>
      <span>
        <el-tag v-for="tag in ctag" :key="tag">{{ tag }}</el-tag>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyRelease(cid)" type="danger">编 辑</el-button>
        <el-button @click="clearData" type="primary">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getReleaseTable, getRelease } from "network/home";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "preview",
  components: {},
  data() {
    //这里存放数据
    return {
      dialogVisible: false,
      title: "",
      content: "",
      ctag: [],
      cid: 0,
      data: [
        {
          listTag: [],
          title: "",
          state: 0,
          Id: 0
        }
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // subData() {
    //   this.$refs.quill.subData(this.value);
    // },
    // updateData() {
    //   this.$refs.quill.updateData(this.value);
    // },
    // 查询所有的文章的标题和标签
    getReleases() {
      getReleaseTable().then(data => {
        console.log("表格内容: ", data.data);
        this.data = data.data;
      });
    },
    // 通过文章id查询文章内容
    viewArticle(id) {
      this.dialogVisible = true;
      getRelease(id).then(data => {
        this.title = data.data.title;
        this.content = data.data.content;
        this.ctag = data.data.ctag.split(";");
        this.cid = data.data.id;
      });
    },
    // 关闭对话框并清空内容
    handleClose(done) {
      done();
      this.clearData();
    },
    // 修改文章
    modifyRelease(id) {
      this.$router.push(`/release/${id}`).catch(err => err);
    },
    // 关闭时清空数据
    clearData() {
      this.dialogVisible = false;
      this.title = "";
      this.ctag = [];
      this.cid = 0;
      this.content = "";
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getReleases();
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