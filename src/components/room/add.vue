<template>
<!-- Default box -->
<div class="box">
  <div class="box-header table-bordered">
    <h3 class="box-title">添加房间</h3>
    <div class="box-body">
      <form v-on:submit.prevent="add()">
        <div class="form-group">
          <label>ID</label>
          <input type="text" class="form-control" name="code" v-model="room.id" required>
        </div>
        <div class="form-group">
          <label>Layout</label>
          <input type="text" class="form-control" name="name" v-model="room.name" required>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <router-link to="/room/list">
          <button type="submit" class="btn btn-primary">Cancel</button>
        </router-link>
      </form>
    </div>
    <!-- /.box-body -->
  </div>
  <!--TODO-->
  <a href="/room/add" class="btn btn-default">Add new</a>
</div>
<!-- /.box -->
</template>

<script>
export default {
    name:"RoomAdd",
    data() {
      return {
        room: {
            id:"",
            layout: -1
        }
      };
    },
    created() {
      this.getList();
    },
    methods: {
      add() {
          this.AxiosJSON.post("http://localhost:8081/room/add", this.room).then(result => {
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