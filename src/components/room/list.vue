<template>
<!-- Default box -->
<div class="box">
  <div class="box-header table-bordered">
    <h3 class="box-title">List</h3>
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
    </div>
    <!-- /.box-body -->
  </div>
  <!--TODO-->
  <router-link to="/room/add" class="btn btn-default">Add new</router-link>
</div>
<!-- /.box -->
</template>

<script>
import Axios from "axios"
export default {
    name:"RoomList",
    data() {
      return {
        roomlist: []
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        Axios.get("http://localhost:8081/room/list/all", {
          params:{

          }
        }).then(result => {
          console.log(result);
          this.roomlist = result.data.list;
        });
      },
      deleteRoom(id) {
        let check = confirm("确定？");
        if (check) {
            Axios.post("http://localhost:8081/room/delete", {id:id}).then(result => {
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