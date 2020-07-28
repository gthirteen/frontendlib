<template>
<!-- Default box -->
<div class="box">
  <div class="box-header table-bordered">
    <h3 class="box-title">查看房间</h3>
    <div class="box-body">
      <form>
        <div class="form-group">
          <label>ID</label>
          <input type="text" class="form-control" v-model="room.id" readonly="readonly">
        </div>
        <div class="form-group">
          <label>Layout</label>
          <input type="text" class="form-control" v-model="room.layout" readonly="readonly">
        </div>
        <router-link to="/room/list">
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
import Axios from "axios"
export default {
    name:"RoomView",
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
      }
    }
}
</script>