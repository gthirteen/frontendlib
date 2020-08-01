<template>
<!-- Default box -->
<div class="box">
  <div class="box-header table-bordered">
    <h3 class="box-title">添加信息</h3>
    <div class="box-body">
      <form v-on:submit.prevent="submitAdd()">
        <div class="form-row">
          <div class="form-group  col-md-6">
            <label>ID</label>
            <input type="text" class="form-control" v-model="elder.id" required>
          </div>
          <div class="form-group  col-md-6">
            <label>Name</label>
            <input type="text" class="form-control" v-model="elder.name">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group  col-md-6">
            <label>Sex</label>
            <select class="form-control" v-model="elder.sex" >
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
            <!--input type="select" class="form-control" v-model="elder.sex"-->
          </div>
          <div class="form-group  col-md-6">
            <label>Birthday</label>
            <input type="date" class="form-control" v-model="elder.birthday">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group  col-md-6">
            <label>Join day</label>
            <input type="date" class="form-control" v-model="elder.joinday">
          </div>
          <div class="form-group  col-md-6">
            <label>Leave day</label>
            <input type="date" class="form-control" v-model="elder.leaveday">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group  col-md-6">
            <label>Room id</label>
            <select class="form-control" v-model="elder.room.id" >
              <option disabled selected value=null>select an option</option>
              <option v-for="rm in roomlist" :key="rm.id" :value="rm.id">{{rm.id}}</option>
            </select>
          </div>
          <div class="form-group  col-md-6">
            <label>Photo</label>
            <input type="file" class="form-control" v-on:change="getPhoto($event)"/>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <router-link to="/elder/list">
          <button class="btn btn-primary">Cancel</button>
        </router-link>
      </form>
    </div>
    <!-- /.box-body -->
  </div>
  <!--TODO-->
  <a href="/elder/add" class="btn btn-default">Add new</a>
</div>
<!-- /.box -->
</template>

<script>
export default {
    name:"ElderAdd",
    data() {
      return {
        roomlist:[],
        elder: {
          room:{
            id:""
          }
        },
        elderPhoto: null
      };
    },
    created() {
      this.getRoomList();
    },
    methods: {
      getPhoto(event) {
        this.elderPhoto = event.target.files[0];
      },
      submitAdd() {
        if (this.elder.room.id=="") {
          this.elder.room.id=null;
        }
        this.AxiosJSON.post("/elder/add", this.elder).then(result => {
          if (result.data.status != "OK") {
            alert("Oops");
          }
          let formData = new FormData();
          formData.append("id", this.elder.id);
          formData.append("elderPhoto", this.elderPhoto);
          this.AxiosUpload.post("/elder/addphoto", formData).then(result=>{
            //alert(result.data.message);
            if (result.data.status == "OK") {
              this.$router.push("/elder/list");
            } else {
              alert("Oops");
            }
          });
        });
      },
      getRoomList() {
        this.AxiosJSON.get("/room/list/all", {
          params:{
            
          }
        }).then(result => {
          console.log(result);
          this.roomlist = result.data.list;
        });
      }
    }
}
</script>