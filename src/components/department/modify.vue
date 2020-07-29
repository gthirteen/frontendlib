<template>
<!-- Default box -->
<div class="box">
  <div class="box-header table-bordered">
    <h3 class="box-title">修改部门</h3>
    <div class="box-body">
      <form v-on:submit.prevent="modify()">
        <div class="form-group">
          <label>ID</label>
          <input type="text" class="form-control" v-model="department.id" readonly>
        </div>
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" v-model="department.name">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <router-link to="/department/list">
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
export default {
    name:"DepartmentModify",
    data() {
      return {
        department: {
            id:"",
            name: ""
        }
      };
    },
    created() {
      let department_id = this.$route.params.id;
      this.getDepartment(department_id);
    },
    methods: {
      getDepartment(id) {
          this.AxiosJSON.get("/department/getbyid?id="+id).then(result => {
              this.department = result.data.result;
          });
      },
      modify() {
          this.AxiosJSON.post("/department/modify", this.department).then(result => {
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