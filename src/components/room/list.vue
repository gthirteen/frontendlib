<template>
<!-- Default box -->
<div class="box">
  <div class="box-header table-bordered">
    <h3 class="box-title" >房间列表</h3>
    <div class="dataTables_info">Result count: {{this.count}}</div>
    <div class="dataTables_info">Page: {{this.page}}/{{this.pageCount}}</div>
    <div class="box-body">
      <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Layout</th>
          <th scope="col">Operation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rm in roomlist" v-bind:key="rm.id">
          <td>{{rm.id }}</td>
          <td>{{rm.layout }}</td>
          <td>
            <router-link v-bind:to="'/room/modify/'+rm.id" class="btn btn-info">Modify</router-link>
            <router-link v-bind:to="'/room/view/'+rm.id" class="btn btn-info">View</router-link>
            <a href="#" class="btn btn-danger" v-on:click="deleteRoom(rm.id)">Delete</a>
          </td>
        </tr>
      </tbody>
      </table>
      <a class="btn btn-primary" style="float: right;" href="#" v-on:click="toPage('e')">末页</a>
      <a class="btn btn-primary" style="float: right;" href="#" v-on:click="toPage('n')">下页</a>
      <a class="btn btn-primary" style="float: right;" href="#" v-on:click="toPage('p')">上页</a>
      <a class="btn btn-primary" style="float: right;" href="#" v-on:click="toPage('h')">首页</a>
    </div>
    <!-- /.box-body -->
  </div>
  <!--TODO-->
  <router-link to="/room/add" class="btn btn-default">Add new</router-link>
</div>
<!-- /.box -->
</template>

<script>
export default {
    name:"RoomList",
    data() {
      return {
        roomlist: [],
        page: 1,
        rows: 2,
        count: null,
        pageCount: null
      };
    },
    created() {
      this.getList();
    },
    methods: {
      toPage(ch) {
        switch(ch) {
          case 'h':
            this.page = 1;
            break;
          case 'p':
            if (this.page>1) this.page--;
            break;
          case 'n':
             if (this.page<this.pageCount) this.page++;
            break;
          case 'e':
            this.page = this.pageCount;
            break;
          default:
            // code block
        }
        this.getList();
      },
      getList() {
        this.AxiosJSON.get("/room/list/all/page", {
          params:{
            rows: this.rows,
            page: this.page
          }
        }).then(result => {
          console.log(result);
          this.roomlist = result.data.list;
          this.count = result.data.count;
          this.pageCount = result.data.pageCount;
        });
      },
      deleteRoom(id) {
        let check = confirm("确定？");
        if (check) {
            this.AxiosJSON.Axios.post("/room/delete", {id:id}).then(result => {
              if (result.data.status == "OK") {
                  alert("OK");
                  this.getList();
              } else {
                  alert("Oops");
              }
          });
        }
      }
    }
}
</script>