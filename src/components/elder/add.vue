<template>
<!-- Default box -->
<div class="box">
  <div class="box-header table-bordered">
    <h3 class="box-title">添加信息</h3>
    <div class="box-body">
      <form v-on:submit.prevent="add()">
        <div class="form-group">
          <label>ID</label>
          <input type="text" class="form-control" v-model="elder.id" required>
        </div>
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" v-model="elder.name">
        </div>
        <div class="form-group">
          <label>Sex</label>
          <select class="form-control" v-model="elder.sex" >
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
          <!--input type="select" class="form-control" v-model="elder.sex"-->
        </div>
        <div class="form-group">
          <label>Birthday</label>
          <input type="date" class="form-control" v-model="elder.birthday">
        </div>
        <div class="form-group">
          <label>Join day</label>
          <input type="date" class="form-control" v-model="elder.joinday">
        </div>
        <div class="form-group">
          <label>Leave day</label>
          <input type="date" class="form-control" v-model="elder.leaveday">
        </div>
        <div class="form-group">
          <label>Room id</label>
          <input type="text" class="form-control" v-model="elder.room.id">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <router-link to="/elder/list">
          <button type="submit" class="btn btn-primary">Cancel</button>
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
        elder: {
            
        }
      };
    },
    methods: {
      add() {
          this.AxiosJSON.post("/elder/add", this.elder).then(result => {
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