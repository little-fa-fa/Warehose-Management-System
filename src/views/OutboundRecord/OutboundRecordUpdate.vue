
<template>
  <el-form style="width:80%" ref="form" :model="form" label-width="120px">
    <el-form-item label="Customer ID">
      <el-select v-model="form.customer_id" placeholder="please select customer">
        <el-option label="AirSea" value="AirSea"></el-option>
        <el-option label="FAKE" value="FAKE"></el-option>
        <el-option label="FW" value="FW"></el-option>
        <el-option label="ZHV" value="ZHV"></el-option>
        <el-option label="KQ" value="KQ"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Date">
        <el-date-picker type="date" placeholder="Pick a date" v-model="form.date" style="width: 100%;"></el-date-picker>
    </el-form-item>
    <el-form-item label="Job Number">
      <el-input v-model="form.job_num"></el-input>
    </el-form-item>
    <el-form-item label="Box Mark">
      <el-input v-model="form.box_mark"></el-input>
    </el-form-item>
    <el-form-item label="FBA Number">
      <el-input v-model="form.fba_num"></el-input>
    </el-form-item>
    <el-form-item label="Destination">
      <el-input v-model="form.destination"></el-input>
    </el-form-item>


        <el-form-item label="CBM">
          <el-input v-model="form.cbm" size="mini" style="width:120px" ></el-input>
        </el-form-item>


    <el-form-item label="Weight (kg)">
      <el-input v-model="form.weight" size="mini" style="width:120px"></el-input>
    </el-form-item>

    <el-form-item label="Quantity Amount">
      <el-input v-model="form.quantity" size="mini" style="width:120px"></el-input>
    </el-form-item>

    <el-form-item label="Source">
      <el-input v-model="form.source"></el-input>
    </el-form-item>
    <el-form-item label="Status">
      <el-switch v-model="form.status"
                 active-value="已发送"
                 ></el-switch>
    </el-form-item>
    <el-form-item label="Note">
      <el-input type="textarea" v-model="form.note"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit()">Update</el-button>
      <el-button @click="resetForm('ruleForm')">Reset</el-button>
      <el-button @click = "cancel">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        id:'',
        customer_id: '',
        date:'',
        job_num:'',
        box_mark:'',
        fba_num:'' ,
        destination:'',
        cbm:'',
        weight:'',
        quantity:'',
        source:'',
        status:'',
        note:'',
      }
    }
  },
  methods: {
    onSubmit() {
      const _this = this;
        this.$confirm('确定要提交更改吗', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          axios.post('http://localhost:8181/outbound/save', _this.form).then(function(resp){

          })
          this.$message({
            type: 'success',
            message: 'Update completed'
          });
          _this.$router.push('/outboundRecord')
          window.location.reload()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Update canceled'
          });
        });
      },
    cancel(){
      this.$router.push('/outboundRecord')
    },
    resetForm(){
      const _this= this
      axios.get('http://localhost:8181/outbound/findById/' + _this.$route.query.id).then(function(resp){
        _this.form = resp.data
      })

    }

  },
  created(){
    const _this= this
    axios.get('http://localhost:8181/outbound/findById/' + _this.$route.query.id).then(function(resp){
      _this.form = resp.data
    })
  }
}
</script>
