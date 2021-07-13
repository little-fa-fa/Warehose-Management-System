<template>
  <div id="index" style="height: 100%">

    <el-container style="height: 100%; border: 1px solid #eee">

      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-active="$route.path" :router="true">
          <el-menu-item :key="index" :index="'/home'" :route="{path:'/home'}">
            <template slot="title">
              <i class="el-icon-house">主页</i>
            </template>
          </el-menu-item>
          <el-menu-item :key="index" :index="'/currentStorage'" :route="{path:'/currentStorage'}">
            <template slot="title">
              <i class="el-icon-box">仓库管理</i>
            </template>
          </el-menu-item>

          <el-submenu :index="'/inbound'">
            <template slot="title"><i class="el-icon-receiving
">入库管理</i></template>
            <el-menu-item :key="index" :index="'/inbound'" :route="{path:'/inbound'}">入库</el-menu-item>
            <el-menu-item :key="index" :index="'/inboundRecord'" :route="{path:'/inboundRecord'}">入库记录</el-menu-item>
          </el-submenu>

          <el-submenu :index="'/outbound'">
            <template slot="title"><i class="el-icon-position">出库管理</i></template>
            <el-menu-item :key="index" :index="'/outbound'" :route="{path:'/outbound'}">出库</el-menu-item>
            <el-menu-item :key="index" :index="'/outboundRecord'" :route="{path:'/outboundRecord'}">出库记录</el-menu-item>
          </el-submenu>

          <el-submenu :index="'/fullContainerLoad'">
            <template slot="title"><i class="el-icon-truck">整柜直送管理</i></template>
            <el-menu-item :key="index" :index="'/fullContainerLoad'" :route="{path:'/fullContainerLoad'}">整柜直送</el-menu-item>
            <el-menu-item :key="index" :index="'/fullContainerLoadRecord'" :route="{path:'/fullContainerLoadRecord'}">整柜直送记录</el-menu-item>
          </el-submenu>


          <!--          <el-submenu v-for="(item,index) in $router.options.routes" :index="index+''" v-if="item.show">-->
          <!--            <template slot="title"><i class="el-icon-message"></i>{{item.name}}</template>-->
          <!--            <el-menu-item v-for ="(item2,index2) in item.children" :index="item2.path":class="$route.path == item2.path?'is-active':''">{{item2.name}}</el-menu-item>-->
          <!--          </el-submenu>-->
        </el-menu>
      </el-aside>


      <el-main>
        <router-view></router-view>
      </el-main>

    </el-container>

  </div>
</template>

<style>


</style>

<script>
export default {
  name: "Index"

};
</script>
