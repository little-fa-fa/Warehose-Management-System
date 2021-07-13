<template>
  <div>
  <el-table
      ref="multipleTable"
      :data="tableData"
      :row-key="getRowKeys"
      style="width: 100%"
      :default-sort="{prop: 'customer_id', order:'ascending'}"
      @selection-change="handleSelectionChange"
      >

    <el-table-column
        :reserve-selection="true"
        type="selection"
        width="55">
    </el-table-column>

    <el-table-column
        fixed
        label="Customer ID"
        prop="customer_id"
    width="80"
    sortable>
    </el-table-column>

    <el-table-column
        fixed
        label="Date"
        prop="date"
        width="100"
    sortable>
    </el-table-column>

    <el-table-column
        label="Job#"
        prop="job_num"
        width="110">
    </el-table-column>

    <el-table-column
        label="Box Mark"
        prop="box_mark"
        width="120">
    </el-table-column>

    <el-table-column
        label="FBA#"
        prop="fba_num"
        width="195">
    </el-table-column>

    <el-table-column
        label="Dest"
        prop="destination"
        width="70">
    </el-table-column>

    <el-table-column
        label="CBM"
        prop="cbm"
        width="60">
    </el-table-column>

    <el-table-column
        label="Weight (kg)"
        prop="weight"
        width="100">
    </el-table-column>

    <el-table-column
        label="Quantity amount"
        prop="quantity"
        width="75">
    </el-table-column>

    <el-table-column
        label="Source"
        prop="source"
        width="150">
    </el-table-column>

    <el-table-column
        label="Status"
        prop="status"
        width="70">
      <template slot-scope="scope">
        <el-switch v-model="scope.row.status"
                   active-value="已发送"
                   inactive-value=""
                   @change="changeSwitch(scope.row)"
        ></el-switch>
      </template>

    </el-table-column>
    <el-table-column
        label="Note"
        prop="note"
        width="70">
    </el-table-column>

    <el-table-column
        fixed = "right"
        width="170"
        >
      <template slot="header" slot-scope="scope">
        <el-input
            v-model="search"
            icon="search"
            class="search"
            size="mini"
            placeholder="Type to search"
            @keyup.enter.native="searchLike()"
            />
        <el-button
            size="mini"
            @click = "searchLike()" type="text">
          搜索
        </el-button>
      </template>
      <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>

        <el-popconfirm
            icon="el-icon-info"
            icon-color="red"
            title="Are you sure to delete this?"
            @confirm="handleDelete(scope.$index, scope.row)">
          <el-button
              size="mini"
              type="danger"
              slot="reference"
          >Delete</el-button>
        </el-popconfirm>
      </template>
    </el-table-column>

  </el-table>


      <el-pagination
          background
          layout="prev, pager, next"
          page-size="30"
          :total="total"
          @current-change="page"
      >
      </el-pagination>

      <el-button
          type="danger" v-if="multipleSelectionFlag" @click="popDelete" size="mini">
        批量删除
      </el-button>
      <el-dialog :visible.sync="multipleDeleteVisible" v-if="dialogVisible" title="提示" width="30%">
        <span>确定要删除吗</span>
        <span slot="footer">
          <el-button type="primary" @click="multipleDelete">确定</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </span>
      </el-dialog>
    <el-button type="danger" v-if="multipleSelectionFlag" @click="toggleSelection" size="mini">
      清除选择
    </el-button>


    </div>


</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      total: null,
      tableData: null,
      search: '',
      multipleSelectionFlag: false,
      multipleDeleteVisible: false,
      multipleSelection: '',
      dialogVisible: false,

    }
  },
  methods: {
    //单个数据跳转编辑页面，传递此行id
    handleEdit(index, row) {
      this.$router.push({
        path:'/outboundUpdate',
        query:{
          id:row.id,
        }
      })
    },
    //根据id删除单行数据
    handleDelete(index, row) {
      const _this = this
      axios.delete('http://localhost:8181/outbound/deleteById/' + row.id).then(function(resp){
        _this.$alert('删除成功','',{
          confirmButtonText:'确定',
          callback: action => {
            window.location.reload()
          }
        })
      })
    },

    //跳转页面重新加载数据
    page(currentPage){
      const _this = this;
      axios.get('http://localhost:8181/outbound/findAll/'+currentPage+'/30').then(function (resp)
      {
        _this.tableData = resp.data.content;
        _this.total = resp.data.totalElements;
      })
    },
    //跳转搜索页面，根据输入框内关键词搜索相关数据
    searchLike(){

      this.$router.push({
        path:'/outboundSearch/',
        query:{search:this.search}
      })
    },

    //在表格内通过开关改变数据状态
    changeSwitch(row){
      const _this = this;
      axios.post('http://localhost:8181/outbound/save',row).then(function(resp){
        _this.$alert("已更改状态");
      })
    },

    //在有多个选择时更新data
    handleSelectionChange(val){
      this.multipleSelection=val;
      this.multipleSelectionFlag=true;
      if(this.multipleSelection.length==0){
        this.multipleSelectionFlag=false;
      }
    },

    //点击批量删除后使确定弹窗弹出
    popDelete(){
      this.multipleDeleteVisible = true;
      this.dialogVisible = true;
    },

    //进行批量删除数据
    multipleDelete(){
      const _this = this;
      _this.multipleDeleteVisible = false;
      _this.multipleSelection.forEach((val,index)=>{
        axios.delete('http://localhost:8181/outbound/deleteById/' + val.id).then(function(resp){})
      });
      _this.$alert('删除成功','',{
        confirmButtonText:'确定',
        callback: action => {
          window.location.reload()
        }
      })
    },

    //清除所有选择
    toggleSelection() {

        this.$refs.multipleTable.clearSelection();
    },
    //记住所有多选框
    getRowKeys(row) {
      return row.id

    },
  },
  created:function(){
    const _this = this;
    axios.get('http://localhost:8181/outbound/findAll/1/30').then(function (resp)
    {
      _this.tableData = resp.data.content;
      _this.total = resp.data.totalElements;
    })

  },



}
</script>
