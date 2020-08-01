<template>
<!-- Default box -->
<div class="box">
  <div class="box-header table-bordered">
    <h3 class="box-title">修改信息</h3>
    <div class="box-body">
      <form v-on:submit.prevent="modify()">
        <div class="form-row">
          <div class="form-group  col-md-6">
            <label>ID</label>
            <input type="text" class="form-control" v-model="elder.id" readonly>
          </div>
          <div class="form-group  col-md-6">
            <label>Name</label>
            <input type="text" class="form-control" v-model="elder.name" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group  col-md-6">
            <label>Sex</label>
            <input type="text" class="form-control" v-model="elder.sex" >
          </div>
          <div class="form-group  col-md-6">
            <label>Birthday</label>
            <input type="date" class="form-control" v-model="elder.birthday" >
          </div>
        </div>
        <div class="form-row">
          <div class="form-group  col-md-6">
            <label>Join day</label>
            <input type="date" class="form-control" v-model="elder.joinday" >
          </div>
          <div class="form-group  col-md-6">
            <label>Leave day</label>
            <input type="date" class="form-control" v-model="elder.leaveday" >
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Room id</label>
            <select class="form-control" v-model="elder.room.id" >
              <option v-for="rm in roomlist" v-bind:key="rm.id" v-bind:value="rm.id">{{rm.id}}</option>
            </select>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
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
export default {
    name:"ElderModify",
    data() {
      return {
        roomlist:[],
        elder: {
          room: {
            id: ""
          }
        }
      };
    },
    created() {
      let elder_id = this.$route.params.id;
      this.getElder(elder_id);
      this.getRoomList();
    },
    methods: {
      getRoomList() {
         this.AxiosJSON.get("/room/list/all", {
           params:{
             
           }
         }).then(result => {
           console.log(result);
           this.roomlist = result.data.list;
         });
       },
      getElder(id) {
          this.AxiosJSON.get("elder/getbyid?id="+id).then(result => {
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
          });
      },
      modify() {
          this.AxiosJSON.post("elder/modify", this.elder).then(result => {
              if (result.data.status == "OK") {
                  alert("OK");
                  this.$router.push("/elder/list");
              } else {
                  alert("Oops");
              }
          });
      }
    }
}
</script>