<template>
<!-- Default box -->
<div class="box">
  <div class="box-header table-bordered">
    <h3 class="box-title">查看信息</h3>
    <div class="box-body">
      <form>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>ID</label>
            <input type="text" class="form-control" v-model="elder.id" readonly>
          </div>
          <div class="form-group col-md-6">
            <label>Name</label>
            <input type="text" class="form-control" v-model="elder.name" readonly="readonly">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Sex</label>
            <input type="text" class="form-control" v-model="elder.sex" readonly="readonly">
          </div>
          <div class="form-group col-md-6">
            <label>Birthday</label>
            <input type="text" class="form-control" v-model="elder.birthday" readonly="readonly">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Join day</label>
            <input type="text" class="form-control" v-model="elder.joinday" readonly="readonly">
          </div>
          <div class="form-group col-md-6">
            <label>Leave day</label>
            <input type="text" class="form-control" v-model="elder.leaveday" readonly="readonly">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Room id</label>
            <input type="text" class="form-control" v-model="elder.room.id" readonly="readonly">
          </div>
          <div class="form-group col-md-6">
            <label>Room layout</label>
            <input type="text" class="form-control" v-model="elder.room.layout" readonly="readonly">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Pic</label>
            <span v-show="elder.photoPath!=null">
              <img v-bind:src="photoURL"/>
            </span>
            <span v-show="elder.photoPath==null">
              NoPic
            </span>
          </div>
        </div>
        <router-link to="/elder/list">
          <button class="btn btn-primary">Back</button>
        </router-link>
      </form>
    </div>
    <!-- /.box-body -->
  </div>
</div>
<!-- /.box -->
</template>

<script>
import MainConfig from '../../config/'

export default {
    name:"ElderView",
    data() {
      return {
        photoURL: null,
        elder: {
        }
      };
    },
    created() {
      let elder_id = this.$route.params.id;
      this.getElder(elder_id);
    },
    methods: {
      getElder(id) {
          this.AxiosJSON.get("/elder/getbyid?id="+id).then(result => {
              this.elder = result.data.result;
              if (this.elder.birthday!=null) {
                this.elder.birthday = this.elder.birthday.split("T")[0];
              }
              if (this.elder.joinday!=null) {
                this.elder.joinday = this.elder.joinday.split("T")[0];
              }
              if (this.elder.leaveday!=null) {
                this.elder.leaveday = this.elder.leaveday.split("T")[0];
              }
              if (this.elder.photoPath!=null) {
                this.photoURL = MainConfig.rootURL + this.elder.photoPath;
              }
          });
      }
    }
}
</script>