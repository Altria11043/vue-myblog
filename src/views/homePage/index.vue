<!-- 展示给外界看的页面 -->
<template>
  <div class="index">
    <!-- 导航栏 -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      text-color="#fff"
      active-text-color="#ffd04b"
      background-color="#545c64"
    >
      <!-- -->
      <el-row type="flex" justify="center">
        <el-col :xs="4" :md="3" :xl="2">
          <el-menu-item index="1">首页</el-menu-item>
        </el-col>
        <el-col :xs="4" :md="3" :xl="2">
          <el-menu-item index="2">文章</el-menu-item>
        </el-col>
        <el-col :xs="4" :md="3" :xl="2">
          <el-menu-item index="3">游戏</el-menu-item>
        </el-col>
        <el-col :xs="4" :md="3" :xl="2">
          <el-menu-item index="4">画集</el-menu-item>
        </el-col>
        <el-col :xs="4" :md="3" :xl="2"></el-col>
        <el-col :xs="4" :md="3" :xl="2">
          <el-submenu index="5">
            <template slot="title">我的工作台</template>
            <el-menu-item index="5-1">选项1</el-menu-item>
          </el-submenu>
        </el-col>
      </el-row>
    </el-menu>
    <!-- 上段 -->
    <el-row type="flex" justify="center" :gutter="10">
      <el-col :xs="24" :md="18" :xl="12" class="content">
        <el-col :xs="24" :md="16">
          <!-- 轮播图 -->
          <Carousel></Carousel>
        </el-col>
        <el-col :xs="24" :md="8">
          <!-- 通知 -->
          <el-card class="box-card">
            <!-- <div slot="header" class="clearfix">
              <span>通知</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>-->
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="name" label="通知" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="address" width="90" align="left"></el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <!-- 中段 -->
        <el-col :xs="24" :md="8">
          <!-- 文章相关 -->
          <el-card class="box-card">
            <!-- <div slot="header" class="clearfix">
              <span>文章</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>-->
            <template>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="文章相关" width="180" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="address"></el-table-column>
              </el-table>
            </template>
          </el-card>
        </el-col>
        <el-col :xs="24" :md="8">
          <!-- 游戏相关 -->
          <el-card class="box-card">
            <!-- <div slot="header" class="clearfix">
              <span>游戏</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>-->
            <template>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="游戏相关" width="180" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="address"></el-table-column>
              </el-table>
            </template>
          </el-card>
        </el-col>
        <el-col :xs="24" :md="8">
          <!-- 工具相关 -->
          <el-card class="box-card">
            <!-- <div slot="header" class="clearfix">
              <span>工具</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>-->
            <template>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="工具相关" width="180" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="address"></el-table-column>
              </el-table>
            </template>
          </el-card>
        </el-col>
        <!-- 下段 -->
        <el-col :xs="24" :md="16">
          <el-card class="box-card">
            <!-- <div slot="header" class="clearfix">
              <span>留言展示</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>-->
            <template>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="留言板" width="180" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="address"></el-table-column>
              </el-table>
            </template>
          </el-card>
        </el-col>
        <el-col :xs="24" :md="8">
          <!-- 留言 -->
          <el-card class="box-card">
            <span>留言</span>
            <el-input
              type="textarea"
              :autosize="{ minRows: 9, maxRows: 9}"
              maxlength="180"
              show-word-limit
              placeholder="请输入内容"
              v-model="textarea2"
              resize="none"
            ></el-input>
            <el-button type="primary" class="msg">成功按钮</el-button>
          </el-card>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Carousel from "./carousel/Carousel";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "index",
  components: { Carousel },
  data() {
    //这里存放数据
    return {
      activeIndex: "1",
      textarea2: "",
      tableData: [
        {
          name: "王小虎",
          address: "2016-05-02"
        },
        {
          name: "王小虎",
          address: "2016-05-02"
        },
        {
          name: "王小虎",
          address: "2016-05-02"
        },
        {
          name: "王小虎",
          address: "2016-05-02"
        },
        {
          name: "王小虎",
          address: "2016-05-02"
        },
        {
          name: "王小虎",
          address: "2016-05-02"
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
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
<style>
.grid {
  background-color: #545c64;
}
.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 20px;
}
.el-table__body tr,
.el-table__body td {
  padding: 0;
  height: 40px;
}
.content .el-col {
  margin-top: 10px;
}
.footer {
  background-color: #545c64;
}
.box-card {
  height: 100%;
}
.el-col {
  height: 100%;
}
.msg {
  margin-top: 1px;
}
</style>