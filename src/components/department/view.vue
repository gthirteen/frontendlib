<template>
<!-- Default box -->
<div class="box">
  <div class="box-header table-bordered">
    <h3 class="box-title">查看部门</h3>
    <div class="box-body">
      <form>
        <div class="form-group">
          <label>ID</label>
          <input type="text" class="form-control" v-model="department.id" readonly="readonly">
        </div>
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" v-model="department.name" readonly="readonly">
        </div>
        <router-link to="/department/list">
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
    name:"DepartmentView",
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
      }
    }
}
</script>