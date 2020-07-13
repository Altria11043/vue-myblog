<!-- 
  游戏
 -->
<template>
  <div class="game" style="height: 100%">
    <Container>
      <h1>游戏文章预览</h1>
      <el-row :gutter="10">
        <el-col
          :xs="24"
          :sm="18"
          :md="12"
          :lg="8"
          :xl="4"
          v-for="item in releaseList"
          :key="item.gid"
        >
          <el-card :body-style="{ padding: '4px'}" style="margin-bottom: 10px">
            <!-- <img :src="item.gameCover" class="image" style="height: 200px; width: 100%;" /> -->
            <el-image :src="item.gameCover" class="image"></el-image>
            <span>{{item.gameTitle}}</span>
            <div>
              <time class="time" style="font-size: 15px; color: #acacac;">{{ item.creatorTime }}</time>
              <div class="bottom clearfix" style="text-align: right;">
                <el-button type="primary" icon="el-icon-search" circle @click="prreviewGameRelease(item)"></el-button>
                <el-button type="warning" icon="el-icon-edit" circle @click="editGameRelease(item)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="deleteGameRelease(item)"></el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>



    </Container>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Container from "components/comment/container";
import { getGameReleaseList } from "network/api";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "game",
  components: { Container },
  data() {
    //这里存放数据
    return {
      releaseList: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 查询到所有的游戏文章
    getGameReleaseList() {
      getGameReleaseList().then(data => {
        // console.log(data.data);
        this.releaseList = data.data;
      });
    },
    // 查看
    prreviewGameRelease(data) {
      console.log("查看: ", data)
      // 点击查看打开弹窗
    },
    // 编辑
    editGameRelease(data) {
      // 点击编辑进行跳转
      this.$router.push({path:"/gameReleaseIDE", query:{gameReleaseId: data.gid}}).catch(err => err);
    },
    // 删除
    deleteGameRelease(data) {
      console.log("删除: ", data)
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getGameReleaseList();
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
.div {
  color: #acacac;
  
}
</style>