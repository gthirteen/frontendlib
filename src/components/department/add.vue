<template>
<!-- Default box -->
<div class="box">
  <div class="box-header table-bordered">
    <h3 class="box-title">添加部门</h3>
    <div class="box-body">
      <form v-on:submit.prevent="add()">
        <div class="form-group">
          <label>ID</label>
          <input type="text" class="form-control" name="code" v-model="department.id" required>
        </div>
        <div class="form-group">
          <label>name</label>
          <input type="text" class="form-control" name="name" v-model="department.name" required>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <router-link to="/department/list">
          <button type="submit" class="btn btn-primary">Cancel</button>
        </router-link>
      </form>
    </div>
    <!-- /.box-body -->
  </div>
  <!--TODO-->
  <a href="/department/add" class="btn btn-default">Add new</a>
</div>
<!-- /.box -->
</template>

<script>
export default {
    name:"DepartmentAdd",
    data() {
      return {
        department: {
            id:"",
            name: ""
        }
      };
    },
    methods: {
      add() {
          this.AxiosJSON.post("/department/add", this.department).then(result => {
              if (result.data.status == "OK") {
                  alert("OK");
                  this.$router.push("/department/list");
              } else {
                  alert("Oops");
              }
          });
      }
    }
}
</script>