<template>
<!-- Default box -->
<div class="box">
  <div class="box-header table-bordered">
    <h3 class="box-title">添加房间</h3>
    <div class="box-body">
      <form v-on:submit.prevent="modify()">
        <div class="form-group">
          <label>ID</label>
          <input type="text" class="form-control" v-model="room.id" >
        </div>
        <div class="form-group">
          <label>Layout</label>
          <input type="text" class="form-control" v-model="room.layout">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <router-link to="/room/list">
          <button type="submit" class="btn btn-primary">Cancel</button>
        </router-link>
      </form>
    </div>
    <!-- /.box-body -->
  </div>
</div>
<!-- /.box -->
</template>

<script>
import Axios from "axios"
export default {
    name:"RoomModify",
    data() {
      return {
        room: {
            id:"",
            layout: -1
        }
      };
    },
    created() {
      let room_id = this.$route.params.id;
      this.getRoom(room_id);
    },
    methods: {
      getRoom(id) {
          Axios.get("http://localhost:8081/room/getbyid?id="+id).then(result => {
              this.room = result.data.result;
          });
      },
      modify() {
          Axios.post("http://localhost:8081/room/modify", this.room).then(result => {
              if (result.data.status == "OK") {
                  alert("OK");
                  this.$router.push("/room/list");
              } else {
                  alert("Oops");
              }
          });
      }
    }
}
</script>